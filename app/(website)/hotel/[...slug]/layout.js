export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const rawPath = Array.isArray(slug) ? slug.join('/') : (slug || '');
  const siteUrl = (process.env.NEXT_PUBLIC_PUBLIC_URL || 'https://deltasafari.in')
    .replace(/https?:\/\/(www\.)?sundarbandeltasafari\.com/gi, 'https://deltasafari.in')
    .replace(/\/+$/, '') || 'https://deltasafari.in';

  const canonical = `${siteUrl}/hotel/${rawPath}`;
  const title = rawPath ? `${rawPath.replace(/[-_]+/g, ' ')} | Delta Safari Hotels` : 'Hotel Details | Delta Safari';

  return {
    title,
    description: `View hotel amenities, room options, pricing, and availability on Delta Safari.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: `View hotel amenities, room options, pricing, and availability on Delta Safari.`,
      url: canonical,
      siteName: 'Delta Safari',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
    },
  };
}

export default function HotelSlugLayout({ children }) {
  return <>{children}</>;
}
