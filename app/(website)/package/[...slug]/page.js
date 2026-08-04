"use client"
import React, { useEffect, useRef, useState } from 'react';
import PackageBanner from '@/components/website/packages/PackageBanner';
import { axiosNormalGet, axiosNormalPost } from '@/libs/axiosHelper';
import { useParams, useRouter } from 'next/navigation';
import { createBookingsUrl, getParticularPackageUrl } from '@/routes/serviceRoutes';
import LoadingComponent from '@/components/common/LoadingComponent';
import { showMessage } from '@/libs/commonHelper';
import Head from 'next/head';
import { urlEncode } from '@/libs/urlHelper';
import ShareButton from '@/components/common/ShareButton';

export default function page() {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(0);
  const [departure, setDeparture] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [packageDetails, setPackageDetails] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { slug } = params;
  const route = useRouter();

  if (!slug && !(slug && slug.split("-").length > 1)) {
    route.back();
  }

  const [ogImageUrl, setOgImageUrl] = useState();
  const siteUrl = process.env.NEXT_PUBLIC_PUBLIC_URL;
  const sidebarRef = useRef();

  useEffect(() => {
    const { cleanSlug, pkgId } = parsePackageRouteParam(slug);
    let queryStr = "";
    if (cleanSlug) {
      queryStr = `slug=${encodeURIComponent(cleanSlug)}`;
      if (pkgId) {
        queryStr += `&id=${encodeURIComponent(pkgId)}`;
      }
    } else if (pkgId) {
      queryStr = `id=${encodeURIComponent(pkgId)}`;
    }

    if (queryStr) {
      axiosNormalGet(`${getParticularPackageUrl}?${queryStr}`)
        .then((res) => {
          if (res?.status) {
            setPackageDetails(res?.package);
            if (res?.package?.assets?.length > 0) {
              let ogImage = null;
              res?.package.assets.forEach((element) => {
                if (element.type == 1 && !ogImage) {
                  ogImage = `${process.env.NEXT_PUBLIC_SERVER_URL}${element.path.replace(/\\/g, '/')}`;
                  setOgImageUrl(ogImage);
                }
              });
            } else {
              setOgImageUrl(`${process.env.NEXT_PUBLIC_PUBLIC_URL}assets/img/logo_DS.png`);
            }
            setLoading(false);
          } else {
            showMessage('error', res?.msg);
          }
        })
        .catch((err) => {
          showMessage('error', 'Something went wrong! Please try again later.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug]);

  // Comprehensive SEO & Meta Tags Handler
  useEffect(() => {
    if (packageDetails) {
      const pageTitle = packageDetails.meta_title || `${packageDetails.title} | Sundarban Delta Safari`;
      document.title = pageTitle;

      const metaDesc = packageDetails.meta_description || packageDetails.description?.substring(0, 160) || `Book ${packageDetails.title} with Sundarban Delta Safari. Enjoy mangrove boat cruise, watchtower safari & traditional meals.`;
      const fullUrl = `${siteUrl}/package/${packageDetails.slug}`;
      const imageBanner = ogImageUrl || `${siteUrl}/assets/img/logo_DS.png`;

      const updateMetaTag = (attrName, attrVal, content) => {
        if (!content) return;
        let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attrName, attrVal);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      updateMetaTag('name', 'description', metaDesc);
      updateMetaTag('name', 'keywords', packageDetails.tags || `${packageDetails.title}, Sundarban tour package, Sundarban package, Delta Safari`);
      updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');

      updateMetaTag('property', 'og:title', pageTitle);
      updateMetaTag('property', 'og:description', metaDesc);
      updateMetaTag('property', 'og:url', fullUrl);
      updateMetaTag('property', 'og:type', 'website');
      updateMetaTag('property', 'og:site_name', 'Sundarban Delta Safari');
      updateMetaTag('property', 'og:image', imageBanner);
      updateMetaTag('property', 'og:locale', 'en_IN');

      updateMetaTag('name', 'twitter:card', 'summary_large_image');
      updateMetaTag('name', 'twitter:title', pageTitle);
      updateMetaTag('name', 'twitter:description', metaDesc);
      updateMetaTag('name', 'twitter:image', imageBanner);

      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', fullUrl);
    }
  }, [packageDetails, ogImageUrl, siteUrl]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('book'); // 'book' or 'enquire'

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  // Form Validation Errors State
  const [errors, setErrors] = useState({});

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Modal Validation & Submission Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axiosNormalPost(createBookingsUrl, {
      package_id: packageDetails.id,
      total_travelers: guestsCount,
      actual_price: packageDetails.actual_price,
      total_cost: packageDetails.actual_price * guestsCount,
      customer_name: formData.name,
      customer_email: formData?.email,
      customer_phone: formData?.phone,
      customer_comment: formData?.comment,
      departure_date: departure,
      request_type: modalType
    })
      .then((res) => {
        setFormData({ name: '', phone: '', email: '', comment: '' });
        showMessage('success', modalType === 'book' ? 'Booking request registered successfully!' : 'Inquiry request submitted successfully!');
        setIsModalOpen(false);
      })
      .catch((err) => {
        showMessage('error', 'Something went wrong! Please try again later');
      });
  };

  const handleViewBooking = (type) => {
    if (type) {
      sidebarRef.current?.classList.add('active-booking-sidebar');
    } else {
      sidebarRef.current?.classList.remove('active-booking-sidebar');
    }
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const parseSafeJSON = (dataStr) => {
    try {
      if (!dataStr) return [];
      if (Array.isArray(dataStr)) return dataStr;
      return JSON.parse(dataStr);
    } catch (e) {
      return [];
    }
  };

  const getFormattedDescription = (desc) => {
    if (!desc) return '';
    if (typeof desc === 'object' && desc?.type === 'Buffer' && Array.isArray(desc?.data)) {
      desc = Buffer.from(desc.data).toString('utf8');
    } else if (typeof desc === 'object' && Buffer.isBuffer(desc)) {
      desc = desc.toString('utf8');
    }
    if (typeof desc !== 'string') return String(desc || '');
    const hasHtml = /<[a-z][\s\S]*>/i.test(desc);
    if (hasHtml) {
      return desc;
    }
    return desc
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '')
      .map(line => `<p>${line}</p>`)
      .join('');
  };

  const getItineraryDays = () => {
    if (packageDetails?.itinerary && Array.isArray(packageDetails.itinerary) && packageDetails.itinerary.length > 0) {
      return packageDetails.itinerary;
    }
    if (packageDetails?.itinararys && Array.isArray(packageDetails.itinararys) && packageDetails.itinararys.length > 0) {
      return packageDetails.itinararys;
    }

    const days = packageDetails?.duration_days || 3;
    const defaultDays = [
      {
        dayNumber: 1,
        title: `Day 1: Arrival & Scenic Cruise to ${packageDetails?.to_destination_name || 'Sundarban'}`,
        description: `Departure from Kolkata/Canning to Godkhali Jetty. Board the comfortable safari boat with welcome beverages. Sail along the scenic rivers into the tranquil Sundarban mangroves. Check-in at Eco-Resort / Boat cabin. Evening experience includes local Baul folk music, evening tea, and snacks.`
      },
      {
        dayNumber: 2,
        title: `Day 2: Core Mangrove Forest & Watchtower Safari`,
        description: `Full day boat safari through the Sajnekhali Tiger Reserve. Visit Sajnekhali Watch Tower & Interpretation Centre, Sudhanyakhali Watch Tower, and Dobanki Canopy Walk. Enjoy delicious traditional fresh Hilsa / Fish lunch served on board. Keep an eye out for Royal Bengal Tigers, Estuarine Crocodiles, and rare birds.`
      },
      {
        dayNumber: 3,
        title: `Day 3: Village Tour, Craft Exploration & Return`,
        description: `Morning visit to a traditional riverine village to witness honey-collecting culture and local lifestyle. Breakfast served on board as you cruise through Panchamukhi (5 Rivers Junction). Sail back to Godkhali Jetty and transfer back with memorable experiences.`
      }
    ];

    return defaultDays.slice(0, Math.max(days, 1));
  };

  const inclusions = parseSafeJSON(packageDetails?.inclusions);
  const exclusions = parseSafeJSON(packageDetails?.exclusions);
  const itineraryDays = packageDetails ? getItineraryDays() : [];

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const jsonLdTrip = packageDetails ? {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": packageDetails.title,
    "description": packageDetails.meta_description || packageDetails.description?.substring(0, 250),
    "touristType": [packageDetails.package_type_name || "Holiday Package", "Wildlife Tour", "Eco Tourism"],
    "offers": {
      "@type": "Offer",
      "price": packageDetails.actual_price || packageDetails.price || 0,
      "priceCurrency": packageDetails.currency || "INR",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/package/${packageDetails.slug}`
    },
    "provider": {
      "@type": "Organization",
      "name": "Sundarban Delta Safari",
      "url": siteUrl,
      "logo": `${siteUrl}/assets/img/logo_DS.png`
    },
    "itinerary": itineraryDays.map((day, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": day.title || `Day ${day.dayNumber || idx + 1}`,
      "description": day.description || day.itinararyDescription || ""
    }))
  } : null;

  const jsonLdBreadcrumbs = packageDetails ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Holidays",
        "item": `${siteUrl}/package`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": packageDetails.title,
        "item": `${siteUrl}/package/${packageDetails.slug}`
      }
    ]
  } : null;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Head>
            <title>{packageDetails.meta_title || `${packageDetails.title} | Sundarban Delta Safari`}</title>
            <meta name="description" content={packageDetails.meta_description || packageDetails.description?.substring(0, 160)} />
            {packageDetails.tags && <meta name="keywords" content={packageDetails.tags} />}
            <link rel="canonical" href={`${siteUrl}/package/${packageDetails?.slug}`} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={packageDetails.meta_title || packageDetails.title} />
            <meta property="og:description" content={packageDetails.meta_description || packageDetails.description?.substring(0, 160)} />
            <meta property="og:url" content={`${siteUrl}/package/${packageDetails?.slug}`} />
            <meta property="og:site_name" content="Sundarban Delta Safari" />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={packageDetails.title} />
            <meta property="og:locale" content="en_IN" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={packageDetails.meta_title || packageDetails.title} />
            <meta name="twitter:description" content={packageDetails.meta_description || packageDetails.description?.substring(0, 160)} />
            <meta name="twitter:image" content={ogImageUrl} />
          </Head>

          {/* JSON-LD Structured Data for Google Rich Snippets */}
          {jsonLdTrip && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTrip) }}
            />
          )}
          {jsonLdBreadcrumbs && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
            />
          )}

          <div className="emt-package-details-wrapper bg-light pb-5 pt-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="container">

              {/* EASEMYTRIP BREADCRUMB BAR */}
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb text-xs mb-0 bg-transparent p-0">
                  <li className="breadcrumb-item"><a href="/" className="text-secondary text-decoration-none">Home</a></li>
                  <li className="breadcrumb-item"><a href="/package" className="text-secondary text-decoration-none">Holidays</a></li>
                  <li className="breadcrumb-item active fw-semibold text-dark text-truncate" style={{ maxWidth: '300px' }} aria-current="page">
                    {packageDetails.title}
                  </li>
                </ol>
              </nav>

              {/* EASEMYTRIP TITLE & QUICK ACTIONS HEADER */}
              <div className="card border-0 shadow-sm bg-white p-4 rounded-4 mb-4">
                <div className="row align-items-center g-3">
                  <div className="col-lg-8">
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                      <span className="badge px-3 py-2 rounded-pill text-uppercase text-xs fw-bold" style={{ backgroundColor: '#ff5c41', color: '#fff' }}>
                        {packageDetails.package_type_name || 'Group Special'}
                      </span>
                      <span className="badge bg-light text-dark border px-3 py-2 rounded-pill text-xs fw-semibold">
                        <i className="bi bi-clock text-danger me-1"></i>
                        {packageDetails.duration_nights || (packageDetails.duration_days - 1)} Nights / {packageDetails.duration_days} Days
                      </span>
                      <span className="badge bg-warning bg-opacity-10 text-warning text-dark border border-warning border-opacity-25 px-3 py-2 rounded-pill text-xs fw-bold">
                        <i className="bi bi-star-fill text-warning me-1"></i> 4.9 Superb (340+ reviews)
                      </span>
                    </div>

                    <h1 className="h3 fw-extrabold text-dark mb-2" style={{ fontWeight: 800, color: '#0F172A', lineHeight: '1.25' }}>
                      {packageDetails.title}
                    </h1>

                    <div className="d-flex flex-wrap align-items-center gap-3 text-secondary text-xs">
                      <div>
                        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                        <strong>Route:</strong> {packageDetails.from_destination_name || 'Kolkata'} ➔ {packageDetails.to_destination_name || 'Sundarban'} ➔ {packageDetails.from_destination_name || 'Kolkata'}
                      </div>
                      <div className="vr d-none d-md-block" style={{ height: '14px' }}></div>
                      <div>
                        <i className="bi bi-check-circle-fill text-success me-1"></i> Instant Booking Confirmation Available
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 text-lg-end d-flex flex-wrap align-items-center justify-content-lg-end gap-2">
                    <button onClick={handleDownloadPdf} className="btn btn-outline-warning rounded-pill px-3 py-2 text-xs font-bold d-flex align-items-center gap-1 shadow-2xs hover-lift" style={{ color: '#EF9720', borderColor: '#EF9720', backgroundColor: '#fffaf4' }}>
                      <i className="bi bi-file-earmark-pdf text-danger fs-6"></i> Download PDF
                    </button>
                    <ShareButton
                      title={packageDetails.title}
                      text={packageDetails.meta_description}
                      url={"/package/" + packageDetails?.slug}
                      className="btn btn-outline-warning rounded-pill px-3 py-2 text-xs font-bold d-flex align-items-center gap-1 shadow-2xs hover-lift"
                      style={{ color: '#EF9720', borderColor: '#EF9720', backgroundColor: '#fffaf4' }}
                    />
                  </div>
                </div>
              </div>

              {/* MEDIA GALLERY BANNER */}

              {/* MAIN CONTENT GRID WITH STICKY SIDEBAR */}
              <div className="row g-4">
                {/* LEFT CONTENT COLUMN */}
                <div className="col-lg-8">
                  <PackageBanner packageDetails={packageDetails} />

                  {/* STICKY QUICK NAVIGATION TABS */}
                  <div className="card border-0 shadow-sm bg-white rounded-4 mb-4 position-sticky" style={{ top: '80px', zIndex: 100 }}>
                    <div className="d-flex overflow-auto text-nowrap px-3 py-2 gap-2 border-bottom">
                      {[
                        { id: 'overview', label: 'Overview', icon: 'bi-info-circle' },
                        { id: 'itinerary', label: 'Day wise Itinerary', icon: 'bi-calendar3' },
                        { id: 'inclusions', label: 'Inclusions & Exclusions', icon: 'bi-check2-circle' },
                        { id: 'policies', label: 'Policies & FAQs', icon: 'bi-file-text' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => scrollToSection(tab.id)}
                          className={`btn btn-sm rounded-pill px-3 py-2 text-xs fw-bold transition-all border-0 ${activeTab === tab.id
                              ? 'text-white'
                              : 'text-secondary hover-bg-light'
                            }`}
                          style={{
                            backgroundColor: activeTab === tab.id ? '#ff5c41' : 'transparent',
                          }}
                        >
                          <i className={`bi ${tab.icon} me-1`}></i>
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 1: OVERVIEW */}
                  <div id="overview" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">
                    <h3 className="h5 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-card-text text-danger"></i> Package Overview
                    </h3>
                    <div
                      className="text-secondary text-sm leading-relaxed mb-4 package-description-content"
                      style={{ lineHeight: '1.8' }}
                      dangerouslySetInnerHTML={{ __html: getFormattedDescription(packageDetails?.description) }}
                    />

                    {packageDetails.tags && (
                      <div className="border-top pt-3">
                        <h4 className="text-xs text-uppercase text-muted fw-bold mb-2">Package Highlights & Themes:</h4>
                        <div className="d-flex flex-wrap gap-2">
                          {packageDetails.tags.split(',').map((tag, i) => (
                            <span key={i} className="badge bg-light text-secondary border px-3 py-2 rounded-pill text-xs fw-medium">
                              #{tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SECTION 2: DAY WISE ITINERARY */}
                  <div id="itinerary" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h3 className="h5 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                        <i className="bi bi-map-fill text-danger"></i> Detailed Day-Wise Itinerary
                      </h3>
                      <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1 rounded-pill text-xs fw-bold">
                        {packageDetails.duration_days} Days Covered
                      </span>
                    </div>

                    <div className="timeline-container position-relative ps-4 ms-2 border-start border-2 border-danger border-opacity-25">
                      {itineraryDays.map((day, index) => (
                        <div key={index} className="timeline-item mb-4 position-relative">
                          {/* TIMELINE NUMBER BADGE CIRCLE */}
                          <div
                            className="position-absolute rounded-circle bg-danger text-white fw-bold d-flex align-items-center justify-content-center text-xs shadow-sm"
                            style={{ width: '36px', height: '36px', left: '-42px', top: '0px' }}
                          >
                            D{day.dayNumber || (index + 1)}
                          </div>

                          <div className="card border rounded-3 p-3 bg-light hover-shadow transition-all">
                            <h4 className="h6 fw-bold text-dark mb-2 d-flex align-items-center justify-content-between">
                              <span>{day.title || `Day ${day.dayNumber || (index + 1)}: Exploration & Sightseeing`}</span>
                              <span className="badge bg-white text-secondary border text-xs fw-medium">
                                Day {day.dayNumber || (index + 1)}
                              </span>
                            </h4>
                            <p className="text-secondary text-xs leading-relaxed mb-0" style={{ lineHeight: '1.75' }}>
                              {day.description || day.itinararyDescription || 'Detailed day plan including boat cruise, sightseeing, watchtower visit and traditional meals.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: INCLUSIONS & EXCLUSIONS */}
                  <div id="inclusions" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">
                    <h3 className="h5 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                      <i className="bi bi-list-check text-danger"></i> Inclusions & Exclusions
                    </h3>

                    <div className="row g-3">
                      {/* INCLUSIONS COLUMN */}
                      <div className="col-md-6">
                        <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25 h-100">
                          <h4 className="h6 fw-bold text-success mb-3 d-flex align-items-center gap-2">
                            <i className="bi bi-check-circle-fill text-success fs-5"></i> What's Included
                          </h4>
                          <ul className="list-unstyled mb-0 d-flex flex-column gap-2 text-xs text-dark">
                            {inclusions.length > 0 ? (
                              inclusions.map((item, i) => (
                                <li key={i} className="d-flex align-items-start gap-2">
                                  <i className="bi bi-check2 text-success fw-bold fs-6 mt-n1"></i>
                                  <span>{item}</span>
                                </li>
                              ))
                            ) : (
                              <>
                                <li className="d-flex align-items-start gap-2"><i className="bi bi-check2 text-success fw-bold fs-6"></i> All meals (Breakfast, Lunch, Evening Snacks & Dinner)</li>
                                <li className="d-flex align-items-start gap-2"><i className="bi bi-check2 text-success fw-bold fs-6"></i> AC Room Hotel/Resort Stay</li>
                                <li className="d-flex align-items-start gap-2"><i className="bi bi-check2 text-success fw-bold fs-6"></i> Exclusive Boat Cruise & Jungle Permit</li>
                                <li className="d-flex align-items-start gap-2"><i className="bi bi-check2 text-success fw-bold fs-6"></i> Tour Manager & Experienced Local Guide</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* EXCLUSIONS COLUMN */}
                      <div className="col-md-6">
                        <div className="p-3 rounded-3 bg-danger bg-opacity-10 border border-danger border-opacity-25 h-100">
                          <h4 className="h6 fw-bold text-danger mb-3 d-flex align-items-center gap-2">
                            <i className="bi bi-x-circle-fill text-danger fs-5"></i> What's Excluded
                          </h4>
                          <ul className="list-unstyled mb-0 d-flex flex-column gap-2 text-xs text-dark">
                            {exclusions.length > 0 ? (
                              exclusions.map((item, i) => (
                                <li key={i} className="d-flex align-items-start gap-2">
                                  <i className="bi bi-x text-danger fw-bold fs-6 mt-n1"></i>
                                  <span>{item}</span>
                                </li>
                              ))
                            ) : (
                              <>
                                <li className="d-flex align-items-start gap-2"><i className="bi bi-x text-danger fw-bold fs-6"></i> Personal expenses (Laundry, Camera Fees)</li>
                                <li className="d-flex align-items-start gap-2"><i className="bi bi-x text-danger fw-bold fs-6"></i> Any optional activity or video camera charges</li>
                                <li className="d-flex align-items-start gap-2"><i className="bi bi-x text-danger fw-bold fs-6"></i> Anything not mentioned in inclusions</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: HOTELS & ACCOMMODATION */}
                  {/* <div id="hotels" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">
                    <h3 className="h5 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-house-door-fill text-danger"></i> Hotel & Stay Details
                    </h3>

                    <div className="border rounded-3 p-3 bg-light">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <h4 className="h6 fw-bold text-dark mb-0">Sundarban Eco Resort / Luxury Boat Cruise</h4>
                          <span className="badge bg-warning text-dark text-2xs">★ 4 Star Rated</span>
                        </div>
                        <span className="badge bg-success text-white text-xs">Verified Partner Stay</span>
                      </div>
                      <p className="text-secondary text-xs mb-3">
                        Experience serene nature staying in deluxe air-conditioned eco-friendly rooms or river boat cabins with attached modern washrooms, 24/7 power backup, and fresh gourmet dining.
                      </p>
                      <div className="d-flex flex-wrap gap-2 text-2xs text-secondary">
                        <span className="badge bg-white text-dark border"><i className="bi bi-wind me-1 text-primary"></i> Air Conditioned</span>
                        <span className="badge bg-white text-dark border"><i className="bi bi-wifi me-1 text-primary"></i> WiFi in Lounge</span>
                        <span className="badge bg-white text-dark border"><i className="bi bi-cup-hot me-1 text-primary"></i> Dining Hall</span>
                        <span className="badge bg-white text-dark border"><i className="bi bi-lightning-charge me-1 text-primary"></i> 24/7 Power Backup</span>
                      </div>
                    </div>
                  </div> */}

                  {/* SECTION 5: POLICIES & ACCORDION FAQS */}
                  <div id="policies" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">
                    <h3 className="h5 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-shield-lock-fill text-danger"></i> Terms, Cancellation & Policies
                    </h3>

                    <div className="accordion accordion-flush" id="policyAccordion">
                      {packageDetails.policies && packageDetails.policies.length > 0 ? (
                        packageDetails.policies.map((policy, index) => (
                          <div key={index} className="accordion-item border rounded-3 mb-2 overflow-hidden">
                            <h2 className="accordion-header" id={`heading${index}`}>
                              <button
                                className={`accordion-button text-dark fw-bold text-xs ${openFaq === index ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                              >
                                {policy.title}
                              </button>
                            </h2>
                            <div className={`accordion-collapse collapse ${openFaq === index ? 'show' : ''}`}>
                              <div className="accordion-body text-xs text-secondary bg-light">
                                <ul className="ps-3 mb-0">
                                  {parseSafeJSON(policy.bullets).map((bullet, idx) => (
                                    <li key={idx} className="mb-1">{bullet}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="border rounded-3 p-3 bg-light mb-2">
                            <h5 className="fw-bold text-dark text-xs mb-1">Cancellation & Refund Policy</h5>
                            <p className="text-secondary text-2xs mb-0">Full refund available up to 7 days prior to departure date. 50% refund between 3 to 7 days.</p>
                          </div>
                          <div className="border rounded-3 p-3 bg-light">
                            <h5 className="fw-bold text-dark text-xs mb-1">Important Travel Guidelines</h5>
                            <p className="text-secondary text-2xs mb-0">Government photo ID proof (Aadhaar / Voter ID / Passport) is mandatory for boat safari permits.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (STICKY EASEMYTRIP PRICING SIDEBAR) */}
                <div className="col-lg-4">
                  <div ref={sidebarRef} className="position-sticky" style={{ top: '80px' }}>

                    {/* PRICING CARD */}
                    <div className="card border-0 shadow-sm bg-white rounded-4 overflow-hidden mb-4">

                      {/* HEADER PRICE BLOCK */}
                      <div
                        className="p-4 border-bottom text-white position-relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #2e266d 0%, #17123d 100%)'
                        }}
                      >
                        <span className="text-uppercase text-xs text-light opacity-75 fw-bold d-block mb-1">Starting From</span>
                        <div className="d-flex align-items-baseline gap-2">
                          <h2 className="h2 fw-extrabold text-warning mb-0" style={{ fontWeight: 800 }}>
                            {packageDetails.currency === 'INR' ? '₹' : '$'}{Number(packageDetails.actual_price).toLocaleString('en-IN')}
                          </h2>
                          {packageDetails.base_price && (
                            <del className="text-light opacity-50 text-sm fw-normal">
                              {packageDetails.currency === 'INR' ? '₹' : '$'}{Number(packageDetails.base_price).toLocaleString('en-IN')}
                            </del>
                          )}
                        </div>
                        <small className="text-light opacity-75 text-3xs d-block mt-1">
                          Per Person on twin sharing basis (Taxes included)
                        </small>
                      </div>

                      {/* BOOKING ACTION BLOCK */}
                      <div className="card-body p-4">
                        <div className="d-flex flex-column gap-3">

                          {/* PACKAGE INCLUDES ICON MATRIX */}
                          <div>
                            <small className="text-2xs text-uppercase text-muted fw-bold d-block mb-2">Package Includes:</small>
                            <div className="d-flex justify-content-between text-center text-muted border-top border-bottom py-2" style={{ fontSize: '11px' }}>
                              <div><i className="bi bi-building d-block fs-5 text-secondary"></i>Hotel</div>
                              <div><i className="bi bi-binoculars d-block fs-5 text-secondary"></i>Safari</div>
                              <div><i className="bi bi-car-front d-block fs-5 text-secondary"></i>Transfer</div>
                              <div><i className="bi bi-egg-fried d-block fs-5 text-secondary"></i>Meals</div>
                            </div>
                          </div>

                          {/* CTA BUTTONS */}
                          <button
                            type="button"
                            onClick={() => { setModalType('book'); setIsModalOpen(true); }}
                            className="btn btn-danger w-100 py-3 text-sm fw-bold rounded-3 shadow-sm hover-lift text-uppercase tracking-wider border-0"
                            style={{ backgroundColor: '#ff5c41' }}
                          >
                            <i className="bi bi-lightning-charge-fill me-1"></i> Book Now
                          </button>

                          <button
                            type="button"
                            onClick={() => { setModalType('enquire'); setIsModalOpen(true); }}
                            className="btn btn-outline-dark w-100 py-2.5 text-xs fw-bold rounded-3"
                          >
                            <i className="bi bi-envelope me-1"></i> Send Free Inquiry
                          </button>

                        </div>
                      </div>

                    </div>

                    {/* PROMO / COUPON CARD */}
                    {/* <div className="card border-0 shadow-2xs rounded-4 p-3 mb-4 text-white" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}>
                      <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-ticket-perforated-fill fs-2"></i>
                        <div>
                          <span className="badge bg-white text-danger text-2xs font-bold uppercase mb-1">Special Offer</span>
                          <p className="text-xs fw-bold mb-0">Use Code: <span className="text-warning bg-dark px-2 py-0.5 rounded">DELTA500</span></p>
                          <small className="text-3xs text-white opacity-90">Get instant ₹500 discount on group reservations!</small>
                        </div>
                      </div>
                    </div> */}

                    {/* HELP & SUPPORT BOX */}
                    <div className="card border-0 shadow-sm bg-white rounded-4 p-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger">
                          <i className="bi bi-headset fs-3"></i>
                        </div>
                        <div>
                          <h5 className="fw-bold text-dark text-xs mb-1">Need Expert Assistance?</h5>
                          <p className="text-secondary text-2xs mb-1">Speak directly with our Sundarban Tour Specialist.</p>
                          <a href="tel:+919876543210" className="text-danger fw-bold text-xs text-decoration-none d-block">
                            <i className="bi bi-telephone-fill me-1"></i> +91 98765 43210 / 033-2410-0000
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* MOBILE BOTTOM FLOATING STICKY BOOKING BAR */}
            <div className="d-block d-lg-none position-fixed bottom-0 start-0 w-100 bg-white border-top shadow-lg p-3" style={{ zIndex: 9999 }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-3xs text-muted d-block">Starting from</span>
                  <strong className="h5 fw-bold text-danger mb-0">
                    {packageDetails.currency === 'INR' ? '₹' : '$'}{Number(packageDetails.actual_price).toLocaleString('en-IN')}
                  </strong>
                  <span className="text-3xs text-muted d-block">/ person</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setModalType('book'); setIsModalOpen(true); }}
                  className="btn btn-danger px-4 py-2 text-xs fw-bold rounded-pill shadow-sm"
                  style={{ backgroundColor: '#ff5c41' }}
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* INTERACTIVE BOOKING & INQUIRY MODAL (WITH DATE & TRAVELERS SELECTOR) */}
            {isModalOpen && (
              <div
                className="modal-backdrop-custom"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 10000,
                  padding: '16px'
                }}
              >
                <div
                  className="bg-white rounded-4 shadow-lg p-4 position-relative w-100"
                  style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}
                >
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-close position-absolute top-0 end-0 m-3"
                    aria-label="Close"
                  ></button>

                  <h4 className="fw-extrabold text-dark h5 mb-1">
                    {modalType === 'book' ? 'Complete Your Booking Query' : 'Enquire About Package'}
                  </h4>
                  <p className="text-secondary text-xs mb-3">
                    {packageDetails.title} ({packageDetails.duration_days} Days / {packageDetails.duration_nights || (packageDetails.duration_days - 1)} Nights)
                  </p>

                  <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-3">

                    {/* DEPARTURE DATE SELECTOR IN MODAL */}
                    <div>
                      <label className="text-xs fw-bold text-dark mb-1 d-block">
                        <i className="bi bi-calendar-event me-1 text-danger"></i> Departure Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control text-xs py-2 px-3 rounded-3"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        required
                      />
                    </div>

                    {/* TOTAL TRAVELERS SELECTOR IN MODAL */}
                    <div>
                      <label className="text-xs fw-bold text-dark mb-1 d-block">
                        <i className="bi bi-people me-1 text-danger"></i> Total Travelers <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary text-xs px-3"
                          onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          className="form-control text-center text-xs font-bold"
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary text-xs px-3"
                          onClick={() => setGuestsCount(guestsCount + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs fw-bold text-dark mb-1 d-block">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-control text-xs py-2 ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <div className="invalid-feedback text-2xs">{errors.name}</div>}
                    </div>

                    <div>
                      <label className="text-xs fw-bold text-dark mb-1 d-block">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-control text-xs py-2 ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <div className="invalid-feedback text-2xs">{errors.phone}</div>}
                    </div>

                    <div>
                      <label className="text-xs fw-bold text-dark mb-1 d-block">
                        Email Address <span className="text-muted fw-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-control text-xs py-2 ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="yourname@example.com"
                      />
                      {errors.email && <div className="invalid-feedback text-2xs">{errors.email}</div>}
                    </div>

                    <div>
                      <label className="text-xs fw-bold text-dark mb-1 d-block">Special Requests / Comments</label>
                      <textarea
                        name="comment"
                        rows="3"
                        value={formData.comment}
                        onChange={handleInputChange}
                        className="form-control text-xs py-2"
                        placeholder="Any food preferences, pickup points, or travel queries..."
                      ></textarea>
                    </div>

                    <div className="p-3 bg-light rounded-3 border">
                      <div className="d-flex justify-content-between align-items-center text-xs">
                        <span className="text-secondary">Estimated Total ({guestsCount} Travelers):</span>
                        <strong className="text-danger fs-6 fw-bold">
                          {packageDetails.currency === 'INR' ? '₹' : '$'}{(packageDetails.actual_price * guestsCount).toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger w-100 py-3 text-sm fw-bold rounded-3 text-uppercase border-0 shadow-sm"
                      style={{ backgroundColor: '#ff5c41' }}
                    >
                      Submit Reservation Request
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* STYLESHEET OVERRIDES FOR SCOPED UTILITIES */}
            <style jsx global>{`
              .scroll-margin-top {
                scroll-margin-top: 100px;
              }
              .hover-lift {
                transition: transform 0.2s ease, box-shadow 0.2s ease;
              }
              .hover-lift:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
              }
              .text-2xs {
                font-size: 11px;
              }
              .text-3xs {
                font-size: 10px;
              }
              @media print {
                body * {
                  visibility: hidden;
                }
                .emt-package-details-wrapper, .emt-package-details-wrapper * {
                  visibility: visible;
                }
                .emt-package-details-wrapper {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
                .btn, button, .modal-backdrop-custom {
                  display: none !important;
                }
              }
            `}</style>

          </div>
        </>
      )}
    </>
  );
}

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
      // not a base64 encoded id
    }
  }

  return { cleanSlug, pkgId, raw };
}

function getPackageIdFromPath(urlOrSlug) {
  return parsePackageRouteParam(urlOrSlug).pkgId;
}
