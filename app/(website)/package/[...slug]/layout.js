import axios from 'axios';
import { getParticularPackageUrl } from '@/routes/serviceRoutes';
import { urlDecode } from '@/libs/urlHelper';

function parsePackageRouteParam(urlOrSlug) {
  if (!urlOrSlug) return { cleanSlug: null, pkgId: null, raw: "" };

  let raw = "";
  if (Array.isArray(urlOrSlug)) {
    raw = urlOrSlug[urlOrSlug.length - 1];
  } else if (typeof urlOrSlug === 'string') {
    const segments = urlOrSlug.split('/');
    raw = segments[segments.length - 1];
  }

  const parts = raw.split('-');
  let pkgId = null;
  let cleanSlug = raw;

  if (parts.length > 1) {
    const possibleId = parts[parts.length - 1];
    try {
      const decoded = urlDecode(possibleId);
      if (decoded && !isNaN(decoded) && Number(decoded) > 0) {
        pkgId = possibleId;
        cleanSlug = parts.slice(0, -1).join('-');
      }
    } catch (e) {
      // not an encoded id
    }
  }

  return { cleanSlug, pkgId, raw };
}

function resolveFullImageUrl(rawPath, serverUrl, siteUrl) {
  if (!rawPath || typeof rawPath !== 'string') return null;
  let trimmed = rawPath.trim().replace(/\\/g, '/');

  // Fix known broken domains
  trimmed = trimmed.replace(/https?:\/\/serverds\.deltasafari\.in/gi, 'https://serverds.sundarbandeltasafari.com');

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  if (cleanPath.startsWith('/assets/')) {
    const cleanSiteUrl = (siteUrl || 'https://deltasafari.in').replace(/\/+$/, '');
    return `${cleanSiteUrl}${cleanPath}`;
  }

  const cleanServerUrl = (serverUrl || 'https://serverds.sundarbandeltasafari.com')
    .replace(/https?:\/\/serverds\.deltasafari\.in/gi, 'https://serverds.sundarbandeltasafari.com')
    .replace(/\/+$/, '');

  return `${cleanServerUrl}${cleanPath}`;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const rawPath = Array.isArray(slug) ? slug.join('/') : (slug || '');
  
  const siteUrl = (process.env.NEXT_PUBLIC_PUBLIC_URL || 'https://deltasafari.in')
    .replace(/https?:\/\/(www\.)?sundarbandeltasafari\.com/gi, 'https://deltasafari.in')
    .replace(/\/+$/, '') || 'https://deltasafari.in';

  let serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || '')
    .replace(/https?:\/\/serverds\.deltasafari\.in/gi, 'https://serverds.sundarbandeltasafari.com')
    .replace(/\/+$/, '');
  
  if (!serverUrl) {
    serverUrl = 'https://serverds.sundarbandeltasafari.com';
  }

  const { cleanSlug, pkgId, raw } = parsePackageRouteParam(slug);

  const candidateEndpoints = [
    getParticularPackageUrl,
    `${serverUrl}/service/getParticularPackage`,
    'https://serverds.sundarbandeltasafari.com/service/getParticularPackage'
  ].filter((url, idx, arr) => url && typeof url === 'string' && arr.indexOf(url) === idx);

  const queries = [];
  if (cleanSlug) {
    queries.push(`slug=${encodeURIComponent(cleanSlug)}${pkgId ? `&id=${encodeURIComponent(pkgId)}` : ''}`);
  }
  if (raw && raw !== cleanSlug) {
    queries.push(`slug=${encodeURIComponent(raw)}`);
  }
  if (pkgId) {
    queries.push(`id=${encodeURIComponent(pkgId)}`);
  }
  if (rawPath && rawPath !== raw && rawPath !== cleanSlug) {
    queries.push(`slug=${encodeURIComponent(rawPath)}`);
  }

  let pkg = null;
  for (const endpoint of candidateEndpoints) {
    if (pkg) break;
    for (const q of queries) {
      try {
        const fullUrl = endpoint.includes('?') ? `${endpoint}&${q}` : `${endpoint}?${q}`;
        const response = await axios.get(fullUrl, { timeout: 6000 });
        if (response.data?.status && response.data?.package) {
          pkg = response.data.package;
          break;
        }
      } catch (err) {
        // Continue to next endpoint/query candidate
      }
    }
  }

  const defaultCanonical = `${siteUrl}/package/${rawPath || cleanSlug || raw}`;
  const canonical = pkg?.canonical_url 
    ? (pkg.canonical_url.startsWith('http') ? pkg.canonical_url : `${siteUrl}${pkg.canonical_url.startsWith('/') ? '' : '/'}${pkg.canonical_url}`)
        .replace(/https?:\/\/(www\.)?sundarbandeltasafari\.com/gi, 'https://deltasafari.in')
    : defaultCanonical;

  if (pkg) {
    const title = pkg.meta_title || `${pkg.title} | Delta Safari`;
    const description = pkg.meta_description || pkg.short_description || `Book ${pkg.title} at best rates with Delta Safari. All-inclusive holiday tour package.`;
    const keywords = pkg.meta_keywords || pkg.tags || `${pkg.title}, tour package, delta safari, holiday package`;

    // High-priority package image extraction:
    let rawImagePath = null;

    // 1. Explicit og_image or featured_image
    if (pkg.og_image) {
      rawImagePath = pkg.og_image;
    } else if (pkg.featured_image) {
      rawImagePath = pkg.featured_image;
    }

    // 2. Primary asset with type == 1 (or type null/undefined)
    if (!rawImagePath && Array.isArray(pkg.assets) && pkg.assets.length > 0) {
      const primary = pkg.assets.find(a => (a.type == 1 || a.type === null || a.type === undefined) && a.path);
      if (primary && primary.path) {
        rawImagePath = primary.path;
      }
    }

    // 3. Any image asset in pkg.assets (type != 2 where type 2 is video)
    if (!rawImagePath && Array.isArray(pkg.assets) && pkg.assets.length > 0) {
      const anyImage = pkg.assets.find(a => a.type != 2 && a.path);
      if (anyImage && anyImage.path) {
        rawImagePath = anyImage.path;
      }
    }

    // 4. pkg.path direct from package record
    if (!rawImagePath && pkg.path) {
      rawImagePath = pkg.path;
    }

    // 5. pkg.banner_path or pkg.image
    if (!rawImagePath && (pkg.banner_path || pkg.image)) {
      rawImagePath = pkg.banner_path || pkg.image;
    }

    // 6. First asset in pkg.assets
    if (!rawImagePath && Array.isArray(pkg.assets) && pkg.assets[0]?.path) {
      rawImagePath = pkg.assets[0].path;
    }

    let ogImage = resolveFullImageUrl(rawImagePath, serverUrl, siteUrl);

    // Fallback if no package image exists
    if (!ogImage) {
      ogImage = `${siteUrl}/assets/images/fav-icon.png`;
    }

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'Delta Safari',
        locale: 'en_IN',
        type: 'website',
        images: ogImage ? [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ogImage ? [ogImage] : [],
      },
    };
  }

  const fallbackTitle = rawPath ? `${rawPath.replace(/[-_]+/g, ' ')} | Delta Safari` : 'Tour Package | Delta Safari';
  return {
    metadataBase: new URL(siteUrl),
    title: fallbackTitle,
    description: 'Explore handpicked tour packages and holiday itineraries with Delta Safari.',
    alternates: {
      canonical,
    },
    openGraph: {
      title: fallbackTitle,
      url: canonical,
      siteName: 'Delta Safari',
      type: 'website',
    },
  };
}

export default function PackageLayout({ children }) {
  return <>{children}</>;
}
