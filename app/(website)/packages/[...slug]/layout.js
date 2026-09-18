import axios from 'axios';
import { getDestinationsUrl } from '@/routes/serviceRoutes';
import { getAllCitiesUrl } from '@/routes/packageRoutes';

function parseRouteSlug(slugs) {
  if (!slugs) return { type: 'all' };
  const slugArray = Array.isArray(slugs) ? slugs : [slugs];
  const primarySlug = slugArray[0] ? decodeURIComponent(slugArray[0]).trim() : '';

  if (!primarySlug) return { type: 'all' };

  // 1. Category filter: e.g. category-boat-tour
  if (primarySlug.toLowerCase().startsWith('category-')) {
    return {
      type: 'category',
      value: primarySlug.substring(9).trim(),
    };
  }

  // 2. Name search: e.g. name-weekend
  if (primarySlug.toLowerCase().startsWith('name-')) {
    return {
      type: 'name',
      value: primarySlug.substring(5).trim(),
    };
  }

  // 3. Entity (Destination / City / Tours-Packages):
  let base = primarySlug;
  let isLegacy = false;
  if (/^destination-/i.test(base)) {
    base = base.replace(/^destination-/i, '');
    isLegacy = true;
  } else if (/^city-/i.test(base)) {
    base = base.replace(/^city-/i, '');
    isLegacy = true;
  }

  const toursSuffixRegex = /-(?:tours?|tour)-packages?$/i;
  if (toursSuffixRegex.test(base)) {
    base = base.replace(toursSuffixRegex, '');
  }

  return {
    type: 'entity',
    baseName: base.toLowerCase().trim(),
    rawName: base.trim(),
    isLegacy,
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugs = resolvedParams?.slug;
  const parsed = parseRouteSlug(slugs);

  const siteUrl = (process.env.NEXT_PUBLIC_PUBLIC_URL || 'https://deltasafari.in')
    .replace(/https?:\/\/(www\.)?sundarbandeltasafari\.com/gi, 'https://deltasafari.in')
    .replace(/\/+$/, '') || 'https://deltasafari.in';
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';

  // 1. Category metadata
  if (parsed.type === 'category') {
    const formattedCat = parsed.value.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const title = `${formattedCat} Tour Packages | Delta Safari`;
    const description = `Explore handpicked ${formattedCat} tour packages, itineraries & holiday deals with Delta Safari.`;
    const canonical = `${siteUrl}/packages/category-${parsed.value}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots: 'index, follow',
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'Delta Safari',
        type: 'website',
        images: [`${siteUrl}/assets/images/fav-icon.png`],
      },
    };
  }

  // 2. Name search metadata
  if (parsed.type === 'name') {
    const searchName = parsed.value;
    const title = `${searchName} Holiday Packages | Delta Safari`;
    const description = `Discover tour packages matching ${searchName} with Delta Safari.`;
    const canonical = `${siteUrl}/packages/name-${encodeURIComponent(searchName)}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots: 'index, follow',
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'Delta Safari',
        type: 'website',
        images: [`${siteUrl}/assets/images/fav-icon.png`],
      },
    };
  }

  // 3. Destination First, then City Resolution
  if (parsed.type === 'entity' && parsed.baseName) {
    const baseSlug = parsed.baseName;

    // Step A: Destination check
    try {
      const response = await axios.post(getDestinationsUrl, {
        condition: isNaN(baseSlug) ? { slug: baseSlug } : { id: baseSlug }
      });

      const destinations = response.data?.destinations;
      const destination = Array.isArray(destinations) && destinations.length > 0 ? destinations[0] : null;

      if (destination) {
        const title = destination.meta_title || `${destination.name} Tour Packages & Safaris | Delta Safari`;
        const description = destination.meta_description || destination.description || `Book authentic ${destination.name} wildlife safaris, boat cruises & customized tour packages with Delta Safari.`;
        const keywords = destination.meta_keywords || destination.tags || `${destination.name}, ${destination.name} tour packages, boat safari, delta safari`;
        
        let canonical = destination.canonical_url;
        if (!canonical || canonical.includes('/packages/destination-') || canonical.includes('/packages/city-')) {
          canonical = `${siteUrl}/packages/${destination.slug || baseSlug}-tours-packages`;
        }

        const ogImage = destination.og_image
          ? (destination.og_image.startsWith('http') ? destination.og_image : `${serverUrl}${destination.og_image.replace(/\\/g, '/')}`)
          : destination.image
          ? (destination.image.startsWith('http') ? destination.image : `${serverUrl}${destination.image.replace(/\\/g, '/')}`)
          : `${siteUrl}/assets/images/fav-icon.png`;

        return {
          title: title,
          description: description,
          keywords: keywords,
          alternates: {
            canonical: canonical,
          },
          robots: destination.robots_meta || 'index, follow',
          openGraph: {
            title: destination.og_title || title,
            description: destination.og_description || description,
            url: canonical,
            siteName: 'Delta Safari',
            type: 'website',
            images: ogImage ? [{ url: ogImage }] : [],
          },
          twitter: {
            card: 'summary_large_image',
            title: destination.og_title || title,
            description: destination.og_description || description,
            images: ogImage ? [ogImage] : [],
          },
        };
      }
    } catch (error) {
      console.error('Error generating metadata for destination:', error?.message);
    }

    // Step B: Destination not found -> City check
    try {
      const response = await axios.post(getAllCitiesUrl, {
        condition: isNaN(baseSlug) ? { slug: baseSlug } : { id: baseSlug }
      });

      const cities = response.data?.cities;
      const city = Array.isArray(cities) && cities.length > 0 ? cities[0] : null;

      if (city) {
        const title = city.meta_title || `${city.name} Tour Packages & Safaris | Delta Safari`;
        const description = city.meta_description || `Book authentic ${city.name} tour packages, holiday trips & customized travel plans with Delta Safari.`;
        const keywords = city.tags || `${city.name}, ${city.name} tour packages, travel booking, delta safari`;
        
        let canonical = city.canonical_url;
        if (!canonical || canonical.includes('/packages/destination-') || canonical.includes('/packages/city-')) {
          canonical = `${siteUrl}/packages/${city.slug || baseSlug}-tours-packages`;
        }

        const ogImage = city.og_image
          ? (city.og_image.startsWith('http') ? city.og_image : `${serverUrl}${city.og_image.replace(/\\/g, '/')}`)
          : city.city_image
          ? (city.city_image.startsWith('http') ? city.city_image : `${serverUrl}${city.city_image.replace(/\\/g, '/')}`)
          : `${siteUrl}/assets/images/fav-icon.png`;

        return {
          title: title,
          description: description,
          keywords: keywords,
          alternates: {
            canonical: canonical,
          },
          robots: city.robots_meta || 'index, follow',
          openGraph: {
            title: city.og_title || title,
            description: city.og_description || description,
            url: canonical,
            siteName: 'Delta Safari',
            type: 'website',
            images: ogImage ? [{ url: ogImage }] : [],
          },
          twitter: {
            card: 'summary_large_image',
            title: city.og_title || title,
            description: city.og_description || description,
            images: ogImage ? [ogImage] : [],
          },
        };
      }
    } catch (error) {
      console.error('Error generating metadata for city:', error?.message);
    }
  }

  // 4. Fallback for general packages page or filtered listings
  const generalTitle = 'Explore Tour Packages & Wildlife Safaris | Delta Safari';
  const generalDesc = 'Explore all-inclusive wildlife safaris, luxury boat tours, and personalized holiday packages with Delta Safari.';

  return {
    title: generalTitle,
    description: generalDesc,
    keywords: 'sundarban safari, tour packages, wildlife boat tour, delta safari, travel booking',
    alternates: {
      canonical: `${siteUrl}/packages`,
    },
    openGraph: {
      title: generalTitle,
      description: generalDesc,
      url: `${siteUrl}/packages`,
      siteName: 'Delta Safari',
      type: 'website',
    },
  };
}

export default function PackagesLayout({ children }) {
  return <>{children}</>;
}
