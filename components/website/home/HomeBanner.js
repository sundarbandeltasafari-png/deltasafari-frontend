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
            title: "All-in-one Travel Booking.",
            isMainHeading: true, // Uses h1 for SEO on the first slide
            description: "Highlights convenience and simplicity, Best for agencies with online & mobile-friendly services.",
            className: "banner-video-area"
        },
        {
            id: 2,
            image: "/assets/images/homebanner/banner2.png",
            title: "Plan Your Trip, Your Way.",
            isMainHeading: false, // Uses h2 for subsequent slides
            description: "Perfect for customized travel experiences — tailored flights, stays, and tours just for you.",
            className: "banner-img-area"
        },
        {
            id: 3,
            image: "/assets/images/homebanner/banner3.png",
            title: "Your Gateway To The World.",
            isMainHeading: false,
            description: "Ideal for explorers seeking seamless booking and expert travel support every step of the way.",
            className: "banner-img-area"
        },
        {
            id: 4,
            image: "/assets/images/homebanner/banner4.png",
            title: "Your Gateway To The World.",
            isMainHeading: false,
            description: "Ideal for explorers seeking seamless booking and expert travel support every step of the way.",
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
                                    <img src={process.env.NEXT_PUBLIC_PUBLIC_URL + slide.image} alt={slide.title} style={{width: "100%", objectFit: "fill"}} />
                                </div>
                                <div className="banner-content-wrap">
                                    <div className="container">
                                        <div className="banner-content">
                                            {slide.isMainHeading ? (
                                                <h1>{slide.title}</h1>
                                            ) : (
                                                <h2>{slide.title}</h2>
                                            )}
                                            <p>{slide.description}</p>
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