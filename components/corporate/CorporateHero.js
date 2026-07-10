'use client'
import React from "react";
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";


export default function CorporateHero() {
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
    <section className="ds-hero">
      <div className="container ds-container position-relative">
        <div className="row align-items-center">
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
                <div className={slide.className + " h-100 position-absolute"} style={{width: '100%', height: '100%', zIndex: '-1'}}>
                  {/* Fixed path to point to Next.js public directory securely */}
                  <img src={process.env.NEXT_PUBLIC_PUBLIC_URL + slide.image} alt={slide.title} style={{ width: "100%", objectFit: "fill" }} />
                </div>
                <div className="col-lg-8">
                  <span className="ds-eyebrow" style={{ color: "#ffd9a3" }}>
                    Corporate &amp; MICE Travel
                  </span>
                  <h1 className="mt-3 mb-3">
                    Offsites, conferences and team tours — built around your headcount, not a price list.
                  </h1>
                  <p className="lead">
                    From a 15-person team retreat in the Sundarbans to a 300-delegate annual conference,
                    our corporate desk designs the itinerary first. Tell us your team size, dates and
                    goals — we&apos;ll come back with a plan and a quote made for you.
                  </p>
                  <div className="d-flex flex-wrap gap-3 mt-4">
                    <a href="#enquiry-form" className="btn btn-ds-primary">
                      Build Your Custom Package
                    </a>
                    <a href="#packages" className="btn btn-ds-ghost-light">
                      Browse Package Ideas
                    </a>
                  </div>

                  <div className="ds-hero-stats">
                    <div>
                      <div className="stat-num">120+</div>
                      <div className="stat-label">Corporate groups hosted</div>
                    </div>
                    <div>
                      <div className="stat-num">18</div>
                      <div className="stat-label">Destinations covered</div>
                    </div>
                    <div>
                      <div className="stat-num">24/7</div>
                      <div className="stat-label">On-ground trip desk</div>
                    </div>
                    <div>
                      <div className="stat-num">48 hrs</div>
                      <div className="stat-label">Avg. proposal turnaround</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
