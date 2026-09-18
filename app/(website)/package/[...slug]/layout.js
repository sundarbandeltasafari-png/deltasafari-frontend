import { fetchPackageDetails, getOgImageUrl, parsePackageRouteParam } from '@/libs/packageHelper';

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

  const pkg = await fetchPackageDetails(slug);

  const { cleanSlug, raw } = parsePackageRouteParam(slug);
  const defaultCanonical = `${siteUrl}/package/${rawPath || cleanSlug || raw}`;
  const canonical = pkg?.canonical_url
    ? (pkg.canonical_url.startsWith('http') ? pkg.canonical_url : `${siteUrl}${pkg.canonical_url.startsWith('/') ? '' : '/'}${pkg.canonical_url}`)
        .replace(/https?:\/\/(www\.)?sundarbandeltasafari\.com/gi, 'https://deltasafari.in')
    : defaultCanonical;

  if (pkg) {
    const title = pkg.meta_title || `${pkg.title} | Delta Safari`;
    const description = pkg.meta_description || pkg.short_description || `Book ${pkg.title} at best rates with Delta Safari. All-inclusive holiday tour package.`;
    const keywords = pkg.meta_keywords || pkg.tags || `${pkg.title}, tour package, delta safari, holiday package`;

    const ogImage = getOgImageUrl(pkg, serverUrl, siteUrl);

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
