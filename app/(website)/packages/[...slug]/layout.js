import axios from 'axios';
import { getDestinationsUrl } from '@/routes/serviceRoutes';
import { getAllCitiesUrl } from '@/routes/packageRoutes';

function parseSlugFilters(slugs) {
  const filters = {};
  if (!slugs) return filters;
  const slugArray = Array.isArray(slugs) ? slugs : [slugs];
  slugArray.forEach((slug) => {
    const hyphenIndex = slug.indexOf('-');
    if (hyphenIndex === -1) {
      filters['name'] = decodeURI(slug);
      return;
    }
    const key = slug.substring(0, hyphenIndex);
    const value = slug.substring(hyphenIndex + 1);
    if (key && value) {
      filters[key] = decodeURI(value);
    }
  });
  return filters;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugs = resolvedParams?.slug;
  const filter = parseSlugFilters(slugs);

  const destinationSlugOrId = filter?.destination || filter?.zone;
  const citySlugOrId = filter?.city;
  const siteUrl = process.env.NEXT_PUBLIC_PUBLIC_URL || 'https://sundarbandeltasafari.com';
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';

  // 1. Destination SEO Metadata
  if (destinationSlugOrId) {
    try {
      const response = await axios.post(getDestinationsUrl, {
        condition: isNaN(destinationSlugOrId) ? { slug: destinationSlugOrId } : { id: destinationSlugOrId }
      });

      const destinations = response.data?.destinations;
      const destination = Array.isArray(destinations) && destinations.length > 0 ? destinations[0] : null;

      if (destination) {
        const title = destination.meta_title || `${destination.name} Tour Packages & Safaris | Delta Safari`;
        const description = destination.meta_description || destination.description || `Book authentic ${destination.name} wildlife safaris, boat cruises & customized tour packages with Delta Safari.`;
        const keywords = destination.meta_keywords || destination.tags || `${destination.name}, ${destination.name} tour packages, boat safari, delta safari`;
        const canonical = destination.canonical_url || `${siteUrl}/packages/destination-${destination.slug || destinationSlugOrId}`;
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
  }

  // 2. City SEO Metadata
  if (citySlugOrId) {
    try {
      const response = await axios.post(getAllCitiesUrl, {
        condition: isNaN(citySlugOrId) ? { slug: citySlugOrId } : { id: citySlugOrId }
      });

      const cities = response.data?.cities;
      const city = Array.isArray(cities) && cities.length > 0 ? cities[0] : null;

      if (city) {
        const title = city.meta_title || `${city.name} Tour Packages & Safaris | Delta Safari`;
        const description = city.meta_description || `Book authentic ${city.name} tour packages, holiday trips & customized travel plans with Delta Safari.`;
        const keywords = city.tags || `${city.name}, ${city.name} tour packages, travel booking, delta safari`;
        const canonical = city.canonical_url || `${siteUrl}/packages/city-${city.slug || citySlugOrId}`;
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

  // 3. Fallback for general packages page or filtered listings
  const generalTitle = filter?.name
    ? `${decodeURIComponent(filter.name)} Holiday Packages | Delta Safari`
    : 'Explore Tour Packages & Wildlife Safaris | Delta Safari';

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
