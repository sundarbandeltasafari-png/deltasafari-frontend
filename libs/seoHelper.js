import axios from "axios";
import { getSiteSettingsUrl } from "@/routes/settingsRoute";
import { getPageSeoUrl } from "@/routes/serviceRoutes";

export async function getSiteSettings() {
  try {
    const response = await axios.get(getSiteSettingsUrl);
    if (response.data?.status) {
      const resData = response.data?.siteSettings;
      const s = Array.isArray(resData) ? resData[0] : resData;
      if (s) {
        delete s.google_client_secret;
        delete s.google_auth_token;
        delete s.whatsapp_access_token;
        delete s.whatsapp_verify_token;
      }
      return s;
    }
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }
  return null;
}

export function getSiteBaseUrl(siteSettings) {
  let url = siteSettings?.canonical_url || process.env.NEXT_PUBLIC_PUBLIC_URL || "https://deltasafari.in";
  // Replace legacy domain if present
  url = url.replace(/https?:\/\/(www\.)?sundarbandeltasafari\.com/gi, "https://deltasafari.in");
  // Normalize by stripping trailing slashes
  url = url.trim().replace(/\/+$/, "");
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://deltasafari.in";
  }
  return url;
}

export function buildPageCanonicalUrl(siteUrl, pagePath, customCanonical) {
  if (customCanonical && typeof customCanonical === "string" && customCanonical.trim() !== "") {
    let trimmed = customCanonical.trim();
    trimmed = trimmed.replace(/https?:\/\/(www\.)?sundarbandeltasafari\.com/gi, "https://deltasafari.in");
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${siteUrl}${cleanPath}`;
  }

  if (!pagePath || pagePath === "/" || pagePath === "home") {
    return `${siteUrl}/`;
  }

  const cleanPath = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  return `${siteUrl}${cleanPath}`;
}

export async function fetchPageSeo(slug, defaultPath = null, fallbackMeta = null) {
  const siteSettings = await getSiteSettings();
  const siteUrl = getSiteBaseUrl(siteSettings);

  // If path is not provided, deduce sensible default path from slug
  let path = defaultPath;
  if (!path) {
    if (!slug || slug === "home" || slug === "/") {
      path = "/";
    } else if (slug === "about" || slug === "about-us") {
      path = "/about";
    } else if (slug === "contact" || slug === "contacts") {
      path = "/contact";
    } else if (slug === "cab" || slug === "cabs") {
      path = "/cab";
    } else {
      path = `/${slug.replace(/^\/+/, "")}`;
    }
  }

  // Home page explicitly uses /websitesettings SEO
  if (!slug || slug === "home" || slug === "/") {
    return buildMetadata(siteSettings, null, path, fallbackMeta);
  }

  // Other pages try /seopages first via /service/getPageSeo
  try {
    const response = await axios.get(`${getPageSeoUrl}?slug=${slug}`);
    if (response.data?.status && response.data?.seo) {
      const seo = response.data.seo;
      // If valid SEO details exist for this page
      if (seo.meta_title || seo.meta_description || seo.og_title || seo.canonical_url) {
        return buildMetadata(siteSettings, seo, path, fallbackMeta);
      }
    }
  } catch (error) {
    console.error(`Error fetching page SEO for ${slug}:`, error);
  }

  // Fallback to fallbackMeta / websitesettings if no page SEO found
  return buildMetadata(siteSettings, null, path, fallbackMeta);
}

export function buildMetadata(siteSettings, pageSeo, pagePath = "/", fallbackMeta = null) {
  const siteUrl = getSiteBaseUrl(siteSettings);

  const title = pageSeo?.meta_title || fallbackMeta?.title || siteSettings?.site_title || "Delta Safari";
  const description = pageSeo?.meta_description || fallbackMeta?.description || siteSettings?.meta_description || "Delta Safari";
  const keywords = pageSeo?.meta_keywords || fallbackMeta?.keywords || siteSettings?.meta_keywords || "Delta Safari";
  const og_title = pageSeo?.og_title || fallbackMeta?.og_title || siteSettings?.og_title || title;
  const og_description = pageSeo?.og_description || pageSeo?.meta_description || fallbackMeta?.og_description || fallbackMeta?.description || siteSettings?.og_description || description;

  const canonicalUrl = buildPageCanonicalUrl(siteUrl, pagePath, pageSeo?.canonical_url || fallbackMeta?.canonical_url);

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
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
      url: canonicalUrl,
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
