"use client"
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, EffectFade } from 'swiper/modules';

// Comprehensive Swiper CSS Imports 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

function PackageBanner({ packageDetails }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const assets = packageDetails?.assets || [];

    return (
        <div className="row mb-3">
            <div className="col-12">
                <div className="gofly-swiper-wrapper">
                    <Swiper
                        style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#ff5c41', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px' }}
                        effect={'fade'}
                        loop={assets.length > 4}
                        spaceBetween={10}
                        navigation={true}
                        pagination={{ clickable: true }}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[Navigation, Pagination, Thumbs, EffectFade]}
                        className="main-gallery-slider"
                    >
                        {assets.map((asset, i) => (
                            <SwiperSlide key={i}>
                                <img 
                                    src={process.env.NEXT_PUBLIC_SERVER_URL + asset?.path} 
                                    alt={`${packageDetails?.title || 'Sundarban Tour Package'} - Photo ${i + 1}`} 
                                    className="package-main-gallery-img" 
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                   {assets.length > 4 && (
                       <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={12}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[Navigation, Thumbs]}
                            className="thumbs-gallery-selector"
                        >
                            {assets.map((asset, i) => (
                                <SwiperSlide key={i} style={{ borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                                    <img 
                                        src={process.env.NEXT_PUBLIC_SERVER_URL + asset?.path} 
                                        alt={`${packageDetails?.title || 'Sundarban Tour Package'} - Thumbnail ${i + 1}`} 
                                        className="gofly-thumb-image package-thumb-gallery-img" 
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .package-main-gallery-img {
                    width: 100%;
                    height: 480px;
                    object-fit: cover;
                    display: block;
                    transition: height 0.3s ease;
                }
                .package-thumb-gallery-img {
                    width: 100%;
                    height: 100px;
                    object-fit: cover;
                    border: 3px solid transparent;
                }
                @media (max-width: 768px) {
                    .package-main-gallery-img {
                        height: 250px !important;
                    }
                    .package-thumb-gallery-img {
                        height: 65px !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default PackageBanner;