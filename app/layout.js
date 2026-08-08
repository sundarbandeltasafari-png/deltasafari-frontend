import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import CustomPackageWidget from "@/components/website/CustomPackageWidget";
import axios from "axios";
import { getSiteSettingsUrl } from "@/routes/settingsRoute";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const revalidate = 0;

async function getSiteSettings() {
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

export async function generateMetadata() {
  const data = await getSiteSettings();
  const siteUrl = data?.canonical_url || "https://sundarbandeltasafari.com";

  return {
    title: data?.site_title || "Delta Safari",
    description: data?.meta_description || "Delta Safari",
    keywords: data?.meta_keywords || "Delta Safari",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
    },
    robots: data?.robots_meta || "index, follow",
    icons: {
      icon: data?.site_favicon ? process.env.NEXT_PUBLIC_SERVER_URL + `${data.site_favicon.replace(/\\/g, "/")}` : process.env.NEXT_PUBLIC_PUBLIC_URL + "/assets/images/fav-icon.png",
    },
    openGraph: {
      title: data?.og_title || data?.site_title,
      description: data?.og_description || data?.meta_description,
      url: data?.og_url || "/",
      siteName: data?.og_site_name || "Delta Safari",
      type: data?.og_type || "website",
      images: data?.og_image
        ? [{ url: process.env.NEXT_PUBLIC_SERVER_URL + `${data.og_image.replace(/\\/g, "/")}` }]
        : [],
    },
    twitter: {
      card: data?.twitter_card || "summary_large_image",
      title: data?.twitter_title || data?.site_title,
      description: data?.twitter_description || data?.meta_description,
      images: data?.twitter_image
        ? [process.env.NEXT_PUBLIC_SERVER_URL + `${data.twitter_image.replace(/\\/g, "/")}`]
        : [],
    },
  };
}

import ProviderStore from "@/services/ProviderStore";

export default async function RootLayout({ children }) {
  const siteSettings = await getSiteSettings();
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-poppins h-full antialiased`}
    >
      <head>
        <link href={process.env.NEXT_PUBLIC_PUBLIC_URL + "assets/css/bootstrap.min.css"} rel="stylesheet" />
        <link href={process.env.NEXT_PUBLIC_PUBLIC_URL + "assets/css/bootstrap-icons.css"} rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_PUBLIC_URL + "assets/css/style.css"} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courgette&family=Dancing+Script:wght@400..700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${poppins.className} font-poppins min-h-full flex flex-col`}>
        <ProviderStore>
          <Header siteSettings={siteSettings} />
          <ToastContainer />
          {children}
          <Footer siteSettings={siteSettings} />
          <CustomPackageWidget />
        </ProviderStore>
      </body>

      <Script src={process.env.NEXT_PUBLIC_PUBLIC_URL + "assets/js/bootstrap.min.js"}></Script>
    </html>
  );
}
