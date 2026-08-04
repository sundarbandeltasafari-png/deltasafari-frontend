import SwiperSlideWrapper from '@/components/website/common/SwiperSlideWrapper'
import SwiperWrapper from '@/components/website/common/SwiperWrapper'
import Faq from '@/components/website/home/Faq';
import HomeBanner from '@/components/website/home/HomeBanner';
import SwiperWrapperPackage from '@/components/website/package/SwiperWrapperPackage';
import SwiperCities from '@/components/website/package/SwiperCities';
import SwiperBestPackages from '@/components/website/package/SwiperBestPackages';
import Filter from '@/components/website/home/Filter';
import FilterBottomCard from '@/components/website/packages/FilterBottomCard';
import PackageDestinations from '@/components/website/packages/PackageDestinations';
import BookYourDestinations from '@/components/website/package/BookYourDestinations';
import PackageCategories from '@/components/website/package/PackageCategories';
import Testimonial from '@/components/website/home/Testimonial';
import PackageOfferBanner from '@/components/website/package/PackageOfferBanner';
import PackageJourneyPriority from '@/components/website/package/PackageJourneyPriority';
import { getCitiesUrl, getFilterPackages, getDiscountedPackagesUrl, getAllCitiesUrl } from '@/routes/packageRoutes';
import { urlEncode } from '@/libs/urlHelper';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import './package.css'
import { fetchPageSeo } from '@/libs/seoHelper';

export async function generateMetadata() {
  return await fetchPageSeo('package');
}

async function page() {
    let cities = null;
    let packagesList = [];
    try {
        const response = await axios.post(getAllCitiesUrl, {});
        if (response.data?.status && Array.isArray(response.data?.cities) && response.data.cities.length > 0) {
            cities = response.data.cities;
        } else {
            const fallbackRes = await axios.post(getCitiesUrl, { condition: { status: 1 } });
            if (fallbackRes.data?.status) {
                cities = fallbackRes.data?.cities;
            }
        }
    } catch (error) {
        try {
            const fallbackRes = await axios.post(getCitiesUrl, { condition: { status: 1 } });
            if (fallbackRes.data?.status) {
                cities = fallbackRes.data?.cities;
            }
        } catch (err) {
            cities = null;
        }
    }

    try {
        const discountedRes = await axios.get(getDiscountedPackagesUrl);
        if (discountedRes.data?.status && Array.isArray(discountedRes.data?.packages) && discountedRes.data.packages.length > 0) {
            packagesList = discountedRes.data.packages;
        } else {
            const packageRes = await axios.post(getFilterPackages, {});
            if (packageRes.data?.status && Array.isArray(packageRes.data?.packages)) {
                packagesList = packageRes.data.packages;
            }
        }
    } catch (error) {
        try {
            const packageRes = await axios.post(getFilterPackages, {});
            if (packageRes.data?.status && Array.isArray(packageRes.data?.packages)) {
                packagesList = packageRes.data.packages;
            }
        } catch (err) {
            packagesList = [];
        }
    }

    return (
        <>
            <HomeBanner />
            <Filter />
            <FilterBottomCard />
            <PackageDestinations />
            <BookYourDestinations cities={cities} />
            <div className="destination-dt-travel-season-section mb-100" id="scroll-section">
                <div className="container">
                    <div className="section-title mb-30 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                        <h2>Get Your Discounted Package</h2>
                        <p className='m-0'>A curated list of top discounted holiday packages tailored for your dream destination.</p>
                    </div>

                    {/* Desktop View: Multi-column Grid */}
                    <div className="d-none d-md-flex row g-4">
                        {packagesList && packagesList.length > 0 ? (
                            packagesList.slice(0, 6).map((pkg, index) => {
                                const imgUrl = pkg.path
                                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}${pkg.path.replace(/\\/g, '/')}`
                                    : '/assets/images/noimage.jpg';
                                const detailsUrl = `/package/${pkg.slug}`;
                                const durationText = pkg.duration_nights
                                    ? `${pkg.duration_nights}N / ${pkg.duration_days}D`
                                    : `${pkg.duration_days || 1} Days`;
                                
                                const actualPrice = pkg.actual_price ? Number(pkg.actual_price) : null;
                                const mrpPrice = pkg.mrp_price ? Number(pkg.mrp_price) : (actualPrice ? Math.round(actualPrice * 1.25) : null);
                                const priceText = actualPrice ? `₹${actualPrice.toLocaleString('en-IN')}` : null;
                                const mrpText = mrpPrice && mrpPrice > (actualPrice || 0) ? `₹${mrpPrice.toLocaleString('en-IN')}` : null;
                                const discountPercent = (mrpPrice && actualPrice && mrpPrice > actualPrice) 
                                    ? Math.round(((mrpPrice - actualPrice) / mrpPrice) * 100)
                                    : 0;

                                const destinationName = pkg.to_destination_name || pkg.destination_name || 'Sundarban';
                                const categoryName = pkg.package_type_name || pkg.category_name || 'Holiday Tour';

                                return (
                                    <div key={pkg.id || index} className="col-12 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay={`${((index % 3) + 1) * 200}ms`} data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms" }}>
                                        <div className="card h-100 border-0 shadow-sm bg-white rounded-4 overflow-hidden position-relative hover-lift transition-all">
                                            {/* Media Banner */}
                                            <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                                                <img 
                                                    src={imgUrl} 
                                                    alt={pkg.title || 'Travel Package'} 
                                                    className="w-100 h-100 object-fit-cover"
                                                />

                                                {/* Location Badge (Top Start) */}
                                                <span className="position-absolute top-0 start-0 m-2.5 bg-dark bg-opacity-75 text-white px-2.5 py-1 text-2xs rounded-3 d-flex align-items-center gap-1 shadow-xs fw-semibold" style={{ zIndex: 10 }}>
                                                    <i className="fa-solid fa-location-dot text-danger me-0.5"></i>
                                                    {destinationName}
                                                </span>

                                                {/* Category Badge (Top End) */}
                                                <span className="position-absolute top-0 end-0 m-2.5 badge text-white text-uppercase text-3xs px-2.5 py-1 rounded-2 shadow-xs fw-bold" style={{ backgroundColor: '#ef6614', zIndex: 10 }}>
                                                    {categoryName}
                                                </span>

                                                {/* Duration & Discount Overlay Banner */}
                                                <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white px-3 py-1.5 text-xs fw-semibold d-flex align-items-center justify-content-between" style={{ zIndex: 10 }}>
                                                    <span><i className="fa-solid fa-clock text-warning me-1"></i>{durationText}</span>
                                                    {discountPercent > 0 && (
                                                        <span className="badge bg-danger text-white text-3xs px-2 py-0.5 rounded-pill fw-bold">
                                                            {discountPercent}% OFF
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Body & Details */}
                                            <div className="card-body p-3.5 d-flex flex-column justify-content-between">
                                                <div>
                                                    <h3 className="h6 fw-bold mb-1.5 text-dark text-truncate-2" style={{lineHeight: '1.35', fontFamily: "'Poppins', sans-serif" }}>
                                                        {pkg.title}
                                                    </h3>

                                                    <div className="d-flex align-items-center justify-content-between text-2xs text-muted mb-2">
                                                        <span><i className="fa-solid fa-map-pin text-primary me-1"></i>{destinationName}</span>
                                                        <span className="badge bg-light text-secondary border text-2xs">{categoryName}</span>
                                                    </div>
                                                </div>

                                                {/* Footer Price & Action */}
                                                <div className="d-flex align-items-end justify-content-between pt-2.5 border-top mt-2">
                                                    <div>
                                                        <span className="text-muted text-3xs d-block" style={{ fontSize: '11px', lineHeight: '14px' }}>Starting From</span>
                                                        <div className="d-flex align-items-baseline gap-2">
                                                            {mrpText && (
                                                                <span className="text-muted text-decoration-line-through text-nowrap" style={{ fontSize: '13px' }}>
                                                                    {mrpText}
                                                                </span>
                                                            )}
                                                            <strong className="fw-extrabold mb-0 text-nowrap" style={{ fontSize: '20px', fontWeight: 800, color: '#ef6614' }}>
                                                                {priceText || 'Contact Us'}
                                                            </strong>
                                                        </div>
                                                    </div>

                                                    <Link href={detailsUrl} className="primary-btn1 py-1.5 px-3 text-xs">
                                                        <span>Book Now</span>
                                                        <span>Book Now</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-12 text-center py-4">
                                <p className="text-muted">No packages available at the moment.</p>
                            </div>
                        )}
                    </div>

                    {/* Mobile View: Swiper Carousel */}
                    <div className="d-block d-md-none">
                        <SwiperBestPackages packagesList={packagesList.slice(0, 6)} />
                    </div>
                </div>
            </div>
            
            {/* Delta Safari – Your Journey, Our Priority! */}
            <PackageJourneyPriority />

            {/* NEW SECTION 1: Explore Packages By Travel Style */}
            <PackageCategories />


            {/* Special Holiday Offer & Newsletter Discount */}
            <PackageOfferBanner />

            {/* Trending & Featured Discounted Packages Carousel */}
            <div className="destination-dt-trip-slider-section mb-5">
                <div className="container">
                    <div className="row justify-content-start mb-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Popular Holiday Destinations</h2>
                                <p className='m-0'>Handpicked trending departures and special weekend packages.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <SwiperWrapperPackage data={packagesList} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Guest Testimonials Carousel Matching Home Page */}
            <Testimonial />

            {/* Frequently Asked Questions */}
            <Faq />
        </>
    )
}

export default page