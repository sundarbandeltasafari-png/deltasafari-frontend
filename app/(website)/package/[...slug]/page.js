import React from 'react';
import Link from 'next/link';
import PackageBanner from '@/components/website/packages/PackageBanner';
import ReferenceHotelsSection from '@/components/website/package/ReferenceHotelsSection';
import PackageHeaderActions from '@/components/website/package/PackageHeaderActions';
import PackageStickyNav from '@/components/website/package/PackageStickyNav';
import PackagePoliciesSection from '@/components/website/package/PackagePoliciesSection';
import PackageBookingSidebar from '@/components/website/package/PackageBookingSidebar';
import { 
  fetchPackageDetails, 
  getOgImageUrl, 
  getFormattedDescription, 
  getItineraryDays, 
  parseSafeJSON 
} from '@/libs/packageHelper';

export default async function PackageDetailsPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const packageDetails = await fetchPackageDetails(slug);

  const siteUrl = (process.env.NEXT_PUBLIC_PUBLIC_URL || 'https://deltasafari.in')
    .replace(/https?:\/\/(www\.)?sundarbandeltasafari\.com/gi, 'https://deltasafari.in')
    .replace(/\/+$/, '');

  let serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || '')
    .replace(/https?:\/\/serverds\.deltasafari\.in/gi, 'https://serverds.sundarbandeltasafari.com')
    .replace(/\/+$/, '');

  if (!serverUrl) {
    serverUrl = 'https://serverds.sundarbandeltasafari.com';
  }

  // Handle case where package does not exist
  if (!packageDetails) {
    return (
      <div className="container py-5 my-5 text-center">
        <div className="card border-0 shadow-sm rounded-4 p-5 mx-auto" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <i className="bi bi-compass text-danger display-1"></i>
          </div>
          <h2 className="h4 fw-bold text-dark mb-2">Tour Package Not Found</h2>
          <p className="text-secondary text-sm mb-4">
            The package you are looking for may have been moved, updated, or is temporarily unavailable.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link href="/package" className="btn btn-danger rounded-pill px-4 py-2 text-xs fw-bold" style={{ backgroundColor: '#ff5c41' }}>
              Explore All Packages
            </Link>
            <Link href="/" className="btn btn-outline-secondary rounded-pill px-4 py-2 text-xs fw-bold">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ogImageUrl = getOgImageUrl(packageDetails, serverUrl, siteUrl);
  const formattedDescription = getFormattedDescription(packageDetails.description);
  const itineraryDays = getItineraryDays(packageDetails);
  const inclusions = parseSafeJSON(packageDetails.inclusions);
  const exclusions = parseSafeJSON(packageDetails.exclusions);

  const jsonLdTrip = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: packageDetails.title,
    description: packageDetails.meta_description || packageDetails.description?.substring(0, 250),
    touristType: [packageDetails.package_type_name || 'Holiday Package', 'Wildlife Tour', 'Eco Tourism'],
    offers: {
      '@type': 'Offer',
      price: packageDetails.actual_price || packageDetails.price || 0,
      priceCurrency: packageDetails.currency || 'INR',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/package/${packageDetails.slug}`
    },
    provider: {
      '@type': 'Organization',
      name: 'Sundarban Delta Safari',
      url: siteUrl,
      logo: `${siteUrl}/assets/img/logo_DS.png`
    },
    itinerary: itineraryDays.map((day, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: day.title || `Day ${day.dayNumber || idx + 1}`,
      description: day.description || day.itinararyDescription || ''
    }))
  };

  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Holidays',
        item: `${siteUrl}/package`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: packageDetails.title,
        item: `${siteUrl}/package/${packageDetails.slug}`
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTrip) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      <div className="emt-package-details-wrapper bg-light pb-5 pt-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="container">

          {/* TITLE & QUICK ACTIONS HEADER */}
          <div className="card border-0 shadow-sm bg-white px-3.5 py-3 rounded-4 mb-3">
            <div className="row align-items-center g-3">
              <div className="col-lg-7">
                <div className="d-flex flex-wrap align-items-center gap-2 mb-1.5">
                  <span className="badge px-2.5 py-1 rounded-pill text-uppercase text-2xs fw-bold" style={{ backgroundColor: '#ef6614', color: '#fff' }}>
                    {packageDetails.package_type_name || 'Group Special'}
                  </span>
                  <span className="badge bg-light text-dark border px-2.5 py-1 rounded-pill text-2xs fw-semibold">
                    <i className="bi bi-clock text-danger me-1"></i>
                    {packageDetails.duration_nights || (packageDetails.duration_days - 1)} Nights / {packageDetails.duration_days} Days
                  </span>
                  <span className="badge bg-warning bg-opacity-10 text-dark border border-warning border-opacity-25 px-2.5 py-1 rounded-pill text-2xs fw-bold">
                    <i className="bi bi-star-fill text-warning me-1"></i> 4.9 Superb (340+ reviews)
                  </span>
                </div>

                <h1 className="mb-0 text-dark" style={{ fontWeight: 600, fontSize: '24px', color: '#1c2b46', lineHeight: '1.3', fontFamily: "'Poppins', sans-serif" }}>
                  {packageDetails.title}
                </h1>
              </div>

              <div className="col-lg-5 text-lg-end">
                <PackageHeaderActions packageDetails={packageDetails} siteUrl={siteUrl} />
              </div>
            </div>
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="row g-4">

            {/* LEFT CONTENT COLUMN: PACKAGE DETAILS SIDE (SSR) */}
            <div className="col-lg-8">
              {/* Image Gallery Banner */}
              <PackageBanner packageDetails={packageDetails} />

              {/* Sticky Navigation Tabs */}
              <PackageStickyNav />

              {/* SECTION 1: OVERVIEW */}
              <div id="overview" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">
                <h3 className="h5 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-card-text text-danger"></i> Package Overview
                </h3>
                <div
                  className="text-secondary text-sm leading-relaxed mb-4 package-description-content"
                  style={{ lineHeight: '1.8' }}
                  dangerouslySetInnerHTML={{ __html: formattedDescription }}
                />

                {packageDetails.tags && (
                  <div className="border-top pt-3">
                    <h4 className="text-xs text-uppercase text-muted fw-bold mb-2">Package Highlights &amp; Themes:</h4>
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
                  <div>
                    <h3 className="h5 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                      <i className="bi bi-calendar-range-fill text-danger"></i> Day Wise Itinerary
                    </h3>
                    <p className="text-secondary text-xs mb-0">Carefully curated schedule to maximize your wildlife sightings &amp; comfort</p>
                  </div>
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-2 rounded-pill text-xs fw-bold">
                    {packageDetails.duration_days} Days / {packageDetails.duration_nights || (packageDetails.duration_days - 1)} Nights
                  </span>
                </div>

                <div className="package-itinerary-timeline">
                  {itineraryDays && itineraryDays.length > 0 ? (
                    itineraryDays.map((itinerary, index) => {
                      let detailsHtml = '';
                      if (itinerary?.details) {
                        if (typeof itinerary.details === 'object' && itinerary.details?.type === 'Buffer' && Array.isArray(itinerary.details?.data)) {
                          detailsHtml = Buffer.from(itinerary.details.data).toString('utf8');
                        } else if (Buffer.isBuffer(itinerary.details)) {
                          detailsHtml = itinerary.details.toString('utf8');
                        } else {
                          detailsHtml = String(itinerary.details);
                        }
                      } else {
                        detailsHtml = itinerary?.description || itinerary?.itinararyDescription || '';
                      }

                      const roadmap = Array.isArray(itinerary?.roadmap)
                        ? itinerary.roadmap
                        : (itinerary?.roadmap ? parseSafeJSON(itinerary.roadmap) : []);

                      return (
                        <div key={index} className="timeline-item mb-4 pb-2 border-bottom position-relative">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="badge bg-primary text-white rounded-pill px-3 py-1 text-xs fw-bold">
                              Day {itinerary.dayNumber || index + 1}
                            </span>
                            <h4 className="h6 fw-bold text-dark mb-0">{itinerary.title}</h4>
                          </div>

                          {roadmap && roadmap.length > 0 && (
                            <div className="d-flex flex-wrap gap-2 my-2 py-1">
                              {roadmap.map((point, rIdx) => (
                                <span key={rIdx} className="badge bg-light text-secondary border px-2 py-1 text-2xs rounded-pill">
                                  <i className="bi bi-geo-alt me-1 text-primary"></i>{point}
                                </span>
                              ))}
                            </div>
                          )}

                          <div
                            className="text-secondary text-xs mt-2 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: detailsHtml }}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-secondary text-xs">Standard daily wildlife safari schedule with boat cruise, jungle watchtowers and village cultural tours.</p>
                  )}
                </div>
              </div>

              {/* SECTION 3: INCLUSIONS & EXCLUSIONS */}
              <div id="inclusions" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">
                <h3 className="h5 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                  <i className="bi bi-card-checklist text-danger"></i> Inclusions &amp; Exclusions
                </h3>

                <div className="row g-4">
                  {/* Inclusions Column */}
                  <div className="col-md-6">
                    <div className="p-3 bg-success bg-opacity-10 rounded-3 border border-success border-opacity-25 h-100">
                      <h4 className="h6 fw-bold text-success mb-3 d-flex align-items-center gap-2">
                        <i className="bi bi-check-circle-fill"></i> What is Included
                      </h4>
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0 text-xs text-dark">
                        {inclusions && inclusions.length > 0 ? (
                          inclusions.map((inc, i) => (
                            <li key={i} className="d-flex align-items-start gap-2">
                              <i className="bi bi-check-lg text-success fw-bold fs-6"></i>
                              <span>{inc}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="d-flex align-items-start gap-2"><i className="bi bi-check-lg text-success fw-bold fs-6"></i> AC accommodation in Eco Resort / Cottage</li>
                            <li className="d-flex align-items-start gap-2"><i className="bi bi-check-lg text-success fw-bold fs-6"></i> All meals (Breakfast, Lunch, Dinner, Evening Snacks)</li>
                            <li className="d-flex align-items-start gap-2"><i className="bi bi-check-lg text-success fw-bold fs-6"></i> Guided Jungle Boat Safari with Govt. Forest Guide</li>
                            <li className="d-flex align-items-start gap-2"><i className="bi bi-check-lg text-success fw-bold fs-6"></i> Watchtower entries and Forest Department entry permits</li>
                            <li className="d-flex align-items-start gap-2"><i className="bi bi-check-lg text-success fw-bold fs-6"></i> Evening Baul folk dance and cultural show</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Exclusions Column */}
                  <div className="col-md-6">
                    <div className="p-3 bg-danger bg-opacity-10 rounded-3 border border-danger border-opacity-25 h-100">
                      <h4 className="h6 fw-bold text-danger mb-3 d-flex align-items-center gap-2">
                        <i className="bi bi-x-circle-fill"></i> What is Not Included
                      </h4>
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0 text-xs text-dark">
                        {exclusions && exclusions.length > 0 ? (
                          exclusions.map((exc, i) => (
                            <li key={i} className="d-flex align-items-start gap-2">
                              <i className="bi bi-x text-danger fw-bold fs-6"></i>
                              <span>{exc}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="d-flex align-items-start gap-2"><i className="bi bi-x text-danger fw-bold fs-6"></i> Any transport not mentioned in itinerary</li>
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

              {/* SECTION 4: REFERENCE HOTELS & STAYS */}
              <ReferenceHotelsSection
                referenceHotels={packageDetails.reference_hotels}
                destinationName={packageDetails.to_destination_name || packageDetails.from_destination_name || 'Sundarban'}
              />

              {/* SECTION 5: POLICIES & ACCORDION FAQS */}
              <PackagePoliciesSection policies={packageDetails.policies} />

            </div>

            {/* RIGHT COLUMN: BOOKING SIDE (CSR) */}
            <div className="col-lg-4">
              <PackageBookingSidebar
                packageDetails={packageDetails}
                ogImageUrl={ogImageUrl}
                siteUrl={siteUrl}
              />
            </div>

          </div>

        </div>

        {/* STYLESHEET OVERRIDES FOR SCOPED UTILITIES */}
        <style dangerouslySetInnerHTML={{ __html: `
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
        `}} />

      </div>
    </>
  );
}
