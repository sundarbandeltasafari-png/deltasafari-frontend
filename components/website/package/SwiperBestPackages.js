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
            className="pb-4 custom-swiper-packages"
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
                const detailsUrl = `/package/${pkg.to_destination_slug || 'destination'}/${pkg.slug}-${urlEncode(pkg.id)}`;
                const durationText = pkg.duration_nights
                    ? `${pkg.duration_nights}N / ${pkg.duration_days}D`
                    : `${pkg.duration_days || 1} Days`;
                const priceText = pkg.actual_price ? `₹${Number(pkg.actual_price).toLocaleString('en-IN')}` : '';

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
                                {/* Floating Duration Badge */}
                                <span 
                                    className="position-absolute top-0 end-0 m-2 px-2.5 py-1 text-xs fw-semibold rounded-pill shadow-sm"
                                    style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', color: '#fff' }}
                                >
                                    <i className="fa-solid fa-clock text-warning me-1"></i> {durationText}
                                </span>
                            </div>

                            {/* Body & Details */}
                            <div className="card-body p-3 d-flex flex-column justify-content-between">
                                <div>
                                    <h3 className="h6 fw-bold mb-2 text-dark text-truncate-2" style={{ minHeight: '38px', lineHeight: '1.4' }}>
                                        {pkg.title}
                                    </h3>
                                </div>

                                {/* Footer Price & Action */}
                                <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-2">
                                    <div>
                                        <span className="text-muted text-xs d-block" style={{ fontSize: '11px' }}>Price</span>
                                        <strong className="h6 fw-extrabold text-primary mb-0" style={{ fontWeight: 800 }}>
                                            {priceText || 'Contact Us'}
                                        </strong>
                                    </div>

                                    <Link href={detailsUrl} className="primary-btn1 py-2 px-3 text-xs">
                                        <span>
                                            Book Now
                                            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                            </svg>
                                        </span>
                                        <span>
                                            Book Now
                                            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                            </svg>
                                        </span>
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
