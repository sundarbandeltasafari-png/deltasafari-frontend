import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import axios from "axios";
import { getSiteSettingsUrl } from "@/routes/settingsRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getSiteSettings() {
  try {
    const response = await axios.get(getSiteSettingsUrl);
    if (response.data?.status) {
      return response.data?.siteSettings;
    }
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
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
      icon: data?.site_favicon ?  process.env.NEXT_PUBLIC_SERVER_URL + `${data.site_favicon.replace(/\\/g, "/")}` :  process.env.NEXT_PUBLIC_PUBLIC_URL + "/assets/images/fav-icon.png",
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
        ? [ process.env.NEXT_PUBLIC_SERVER_URL + `${data.twitter_image.replace(/\\/g, "/")}`] 
        : [],
    },
  };
}

export default async function RootLayout({ children }) {
  let siteSettings = null;
  try {
    const response = await axios.get(getSiteSettingsUrl);
    if (response.data?.status) {
      siteSettings = response.data?.siteSettings
    }
  } catch (error) {
    siteSettings = null
  }
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/css/jquery-ui.css" rel="stylesheet" />
        <link href="/assets/css/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/css/jquery.fancybox.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/slick.css" />
        <link rel="stylesheet" href="/assets/css/slick-theme.css" />
        <link rel="stylesheet" href="/assets/css/daterangepicker.css" />
        <link href="/assets/css/boxicons.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"></link>
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <ToastContainer />
        {children}
        <Footer />
      </body>
      <Script src="/assets/js/jquery-3.7.1.min.js"></Script>
      <Script src="/assets/js/jquery-ui.js"></Script>
      <Script src="/assets/js/moment.min.js"></Script>
      <Script src="/assets/js/daterangepicker.min.js"></Script>
      <Script src="/assets/js/bootstrap.min.js"></Script>
      <Script src="/assets/js/popper.min.js"></Script>
      <Script src="/assets/js/slick.js"></Script>
      <Script src="/assets/js/waypoints.min.js"></Script>
      <Script src="/assets/js/jquery.counterup.min.js"></Script>
      <Script src="/assets/js/gsap.min.js"></Script>
      <Script src="/assets/js/ScrollTrigger.min.js"></Script>
      <Script src="/assets/js/jquery.fancybox.min.js"></Script>
      <Script src="/assets/js/select-dropdown.js"></Script>
      <Script src="/assets/js/custom2.js"></Script>
    </html>
  );
}
