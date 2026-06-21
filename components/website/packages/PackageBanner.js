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
    return (
        <div className="row mb-5">
            <div className="col-12">
                <div className="gofly-swiper-wrapper">
                    <Swiper
                        style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#ff5c41', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px' }}
                        effect={'fade'}
                        loop={packageDetails?.assets?.length > 4}
                        spaceBetween={10}
                        navigation={true}
                        pagination={{ clickable: true }}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[Navigation, Pagination, Thumbs, EffectFade]}
                        className="main-gallery-slider"
                    >
                        {packageDetails.assets.map((asset, i) => (
                            <SwiperSlide key={i}>
                                <img src={process.env.NEXT_PUBLIC_SERVER_URL + asset?.path} alt={`Slide ${i}`} style={{ width: '100%', height: '480px', objectFit: 'cover' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                   {packageDetails.assets.length > 4 && <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={12}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Navigation, Thumbs]}
                        className="thumbs-gallery-selector"
                    >
                        {packageDetails.assets.map((asset, i) => (
                            <SwiperSlide key={i} style={{ borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                                <img src={process.env.NEXT_PUBLIC_SERVER_URL + asset?.path} alt={`Thumb ${i}`} style={{ width: '100%', height: '100px', objectFit: 'cover', border: '3px solid transparent' }} className="gofly-thumb-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>}
                </div>
            </div>
        </div>
    )
}

export default PackageBanner