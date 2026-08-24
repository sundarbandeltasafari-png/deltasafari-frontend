"use client";
import React from "react";
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

function HomeBanner() {
    const sliderData = [
        {
            id: 1,
            image: "/assets/images/homebanner/banner1.png",
            title: "Plan your perfect vacation!",
            isMainHeading: true, // Uses h1 for SEO on the first slide
            description: "Explore Sundarban wildlife safaris, boat cruises & customized holiday packages.",
            className: "banner-video-area"
        },
        {
            id: 2,
            image: "/assets/images/homebanner/banner2.png",
            title: "Plan Your Trip, Your Way.",
            isMainHeading: false, // Uses h2 for subsequent slides
            description: "Customized tour packages, luxury resort stays & personalized travel experiences.",
            className: "banner-img-area"
        },
        {
            id: 3,
            image: "/assets/images/homebanner/banner3.png",
            title: "Unforgettable Wildlife Adventures.",
            isMainHeading: false,
            description: "Experience Royal Bengal Tiger safaris, mangrove cruises & guided watchtower tours.",
            className: "banner-img-area"
        },
        {
            id: 4,
            image: "/assets/images/homebanner/banner4.png",
            title: "Your Gateway To Dream Destinations.",
            isMainHeading: false,
            description: "Book top-rated domestic & international holiday packages with Delta Safari.",
            className: "banner-img-area"
        }
    ];
    return (
        <>
            <div className="home2-banner-section">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    effect={"fade"} // Smooth transition between travel imagery
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        el: '.otp-steps-dots', // Reuses your custom dots class if needed, or omit to use default swiper pagination
                    }}
                    className="home2-banner-slider"
                >
                    {sliderData.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="banner-wrapper h-100">
                                <div className={slide.className+" h-100"}>
                                    {/* Fixed path to point to Next.js public directory securely */}
                                    <img src={process.env.NEXT_PUBLIC_PUBLIC_URL + slide.image} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div className="banner-content-wrap">
                                    <div className="container">
                                        <div className="banner-content text-center">
                                            {slide.isMainHeading ? (
                                                <h1 className="home-banner-title" style={{ fontFamily: "var(--font-courgette), 'Courgette', cursive" }}>{slide.title}</h1>
                                            ) : (
                                                <h2 className="home-banner-title" style={{ fontFamily: "var(--font-courgette), 'Courgette', cursive" }}>{slide.title}</h2>
                                            )}
                                            <p className="banner-sub-tagline text-nowrap" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 auto' }}>
                                                {slide.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default HomeBanner