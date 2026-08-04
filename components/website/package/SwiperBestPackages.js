"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { urlEncode } from '@/libs/urlHelper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';

export default function SwiperBestPackages({ packagesList }) {
    if (!packagesList || packagesList.length === 0) return null;

    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            className="pb-5 custom-swiper-packages"
            slidesPerView={1.15}
            spaceBetween={14}
            speed={1000}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
                480: { slidesPerView: 1.4, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 18 },
            }}
        >
            {packagesList.map((pkg, index) => {
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
                    <SwiperSlide key={pkg.id || index}>
                        <div className="card h-100 border-0 shadow-sm bg-white rounded-4 overflow-hidden position-relative">
                            {/* Media Banner */}
                            <div className="position-relative overflow-hidden" style={{ height: '170px' }}>
                                <img 
                                    src={imgUrl} 
                                    alt={pkg.title || 'Travel Package'} 
                                    className="w-100 h-100 object-fit-cover"
                                />

                                {/* Location Badge (Top Start) */}
                                <span className="position-absolute top-0 start-0 m-2 bg-dark bg-opacity-75 text-white px-2 py-0.5 text-3xs rounded-3 d-flex align-items-center gap-1 shadow-xs fw-semibold" style={{ zIndex: 10 }}>
                                    <i className="fa-solid fa-location-dot text-danger me-0.5"></i>
                                    {destinationName}
                                </span>

                                {/* Category Badge (Top End) */}
                                <span className="position-absolute top-0 end-0 m-2 badge text-white text-uppercase text-3xs px-2 py-0.5 rounded-2 shadow-xs fw-bold" style={{ backgroundColor: '#ef6614', zIndex: 10 }}>
                                    {categoryName}
                                </span>

                                {/* Duration & Discount Overlay Banner */}
                                <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white px-2.5 py-1 text-2xs fw-semibold d-flex align-items-center justify-content-between" style={{ zIndex: 10 }}>
                                    <span><i className="fa-solid fa-clock text-warning me-1"></i>{durationText}</span>
                                    {discountPercent > 0 && (
                                        <span className="badge bg-danger text-white text-3xs px-1.5 py-0.5 rounded-pill fw-bold">
                                            {discountPercent}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Body & Details */}
                            <div className="card-body p-3 d-flex flex-column justify-content-between">
                                <div>
                                    <h3 className="h6 fw-bold mb-1 text-dark text-truncate-2" style={{ minHeight: '38px', lineHeight: '1.35', fontFamily: "'Poppins', sans-serif" }}>
                                        {pkg.title}
                                    </h3>

                                    <div className="d-flex align-items-center justify-content-between text-3xs text-muted mb-2">
                                        <span><i className="fa-solid fa-map-pin text-primary me-1"></i>{destinationName}</span>
                                        <span className="badge bg-light text-secondary border text-3xs">{categoryName}</span>
                                    </div>
                                </div>

                                {/* Footer Price & Action */}
                                <div className="d-flex align-items-end justify-content-between pt-2 border-top mt-2">
                                    <div>
                                        <span className="text-muted text-3xs d-block" style={{ fontSize: '10px', lineHeight: '12px' }}>Starting From</span>
                                        <div className="d-flex align-items-baseline gap-1.5 flex-wrap">
                                            {mrpText && (
                                                <span className="text-muted text-decoration-line-through text-nowrap" style={{ fontSize: '12px' }}>
                                                    {mrpText}
                                                </span>
                                            )}
                                            <strong className="fw-extrabold mb-0 text-nowrap" style={{ fontSize: '18px', fontWeight: 800, color: '#ef6614' }}>
                                                {priceText || 'Contact Us'}
                                            </strong>
                                        </div>
                                    </div>

                                    <Link href={detailsUrl} className="primary-btn1 py-1.5 px-2.5 text-2xs">
                                        <span>Book Now</span>
                                        <span>Book Now</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
