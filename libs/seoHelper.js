import axios from "axios";
import { getSiteSettingsUrl } from "@/routes/settingsRoute";
import { getPageSeoUrl } from "@/routes/serviceRoutes";

export async function getSiteSettings() {
  try {
    const response = await axios.get(getSiteSettingsUrl);
    if (response.data?.status) {
      const resData = response.data?.siteSettings;
      return Array.isArray(resData) ? resData[0] : resData;
    }
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }
  return null;
}

export async function fetchPageSeo(slug) {
  const siteSettings = await getSiteSettings();

  // Home page explicitly uses /websitesettings SEO
  if (!slug || slug === 'home' || slug === '/') {
    return buildMetadata(siteSettings, null);
  }

  // Other pages try /seopages first via /service/getPageSeo
  try {
    const response = await axios.get(`${getPageSeoUrl}?slug=${slug}`);
    if (response.data?.status && response.data?.seo) {
      const seo = response.data.seo;
      // If valid SEO details exist for this page
      if (seo.meta_title || seo.meta_description || seo.og_title) {
        return buildMetadata(siteSettings, seo);
      }
    }
  } catch (error) {
    console.error(`Error fetching page SEO for ${slug}:`, error);
  }

  // Fallback to /websitesettings if no page SEO found
  return buildMetadata(siteSettings, null);
}

function buildMetadata(siteSettings, pageSeo) {
  const title = pageSeo?.meta_title || siteSettings?.site_title || "Delta Safari";
  const description = pageSeo?.meta_description || siteSettings?.meta_description || "Delta Safari";
  const keywords = pageSeo?.meta_keywords || siteSettings?.meta_keywords || "Delta Safari";
  const og_title = pageSeo?.og_title || siteSettings?.og_title || title;
  const og_description = pageSeo?.meta_description || siteSettings?.og_description || description;
  const siteUrl = siteSettings?.canonical_url || "https://sundarbandeltasafari.com";

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
    },
    robots: siteSettings?.robots_meta || "index, follow",
    icons: {
      icon: siteSettings?.site_favicon
        ? process.env.NEXT_PUBLIC_SERVER_URL + `${siteSettings.site_favicon.replace(/\\/g, "/")}`
        : process.env.NEXT_PUBLIC_PUBLIC_URL + "/assets/images/fav-icon.png",
    },
    openGraph: {
      title: og_title,
      description: og_description,
      url: siteSettings?.og_url || "/",
      siteName: siteSettings?.og_site_name || "Delta Safari",
      type: siteSettings?.og_type || "website",
      images: siteSettings?.og_image
        ? [{ url: process.env.NEXT_PUBLIC_SERVER_URL + `${siteSettings.og_image.replace(/\\/g, "/")}` }]
        : [],
    },
    twitter: {
      card: siteSettings?.twitter_card || "summary_large_image",
      title: og_title,
      description: og_description,
      images: siteSettings?.twitter_image
        ? [process.env.NEXT_PUBLIC_SERVER_URL + `${siteSettings.twitter_image.replace(/\\/g, "/")}`]
        : [],
    },
  };
}
