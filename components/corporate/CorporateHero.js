'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

export default function CorporateHero({ onRequestCall }) {
  const bgSlides = [
    {
      id: 1,
      image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img1.jpg",
      title: "Sundarban Mangrove Boat Offsite"
    },
    {
      id: 2,
      image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img7.jpg",
      title: "Corporate Luxury Resort Stay"
    },
    {
      id: 3,
      image: "https://sundarbandeltasafari.com/assets/img/home2/destination-img4.jpg",
      title: "Beach & River Cruise Retreat"
    },
    {
      id: 4,
      image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img3.jpg",
      title: "Team Building & Gala Night"
    }
  ];

  return (
    <section className="ds-hero position-relative overflow-hidden py-5" style={{ minHeight: '580px', display: 'flex', alignItems: 'center' }}>
      
      {/* SWIPER BACKGROUND IMAGE SLIDER */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          speed={1200}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          className="w-100 h-100"
        >
          {bgSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="w-100 h-100 position-relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* BRAND COLOR GRADIENT OVERLAY (LOGO BLUE) */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          zIndex: 1,
          background: ' #00000061;',
          backdropFilter: 'blur(2px)'
        }}
      ></div>


      {/* HERO CONTENT */}
      <div className="container ds-container position-relative py-4" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-4">
          
          {/* LEFT CONTENT */}
          <div className="col-lg-6">
            <span className="badge px-3 py-2 rounded-pill text-uppercase text-xs fw-bold mb-3" style={{ backgroundColor: '#00000061;' }}>
              Corporate Tours & Team Offsites
            </span>

            <h1 className="fw-extrabold text-white mb-3" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: '1.2' }}>
              Corporate Tours &amp;<br />Team Offsites
            </h1>

            <p className="lead text-light opacity-90 text-sm mb-4" style={{ lineHeight: '1.7', maxWidth: '540px' }}>
              Redefine your corporate vibe with handcrafted trip itineraries by Sundarban Delta Safari. Customised MICE, offsites, and team bonding retreats tailored for your company.
            </p>

            {/* 3 VERIFICATION CHECK BADGES */}
            <div className="d-flex flex-column gap-2 mb-4">
              <div className="d-flex align-items-center gap-2 text-xs text-light">
                <i className="bi bi-check2-circle text-success fs-5"></i>
                <span><strong>100% Privacy Guaranteed</strong></span>
              </div>
              <div className="d-flex align-items-center gap-2 text-xs text-light">
                <i className="bi bi-check2-circle text-success fs-5"></i>
                <span><strong>No Spam Calls/Messages</strong></span>
              </div>
              <div className="d-flex align-items-center gap-2 text-xs text-light">
                <i className="bi bi-check2-circle text-success fs-5"></i>
                <span><strong>Quick Response within 24 hrs</strong></span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="d-flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onRequestCall}
                className="btn btn-danger px-4 py-3 fw-bold rounded-pill text-uppercase text-xs shadow-lg border-0 d-inline-flex align-items-center gap-2"
                style={{ backgroundColor: '#ff5c41' }}
              >
                <i className="bi bi-telephone-fill"></i> Request Callback
              </button>
              <a href="#corporate-enquiry" className="btn btn-outline-light px-4 py-3 fw-bold rounded-pill text-xs">
                Build Package <i className="bi bi-arrow-down ms-1"></i>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN COLLAGE TILES */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="row gy-3 gx-2 align-items-center">
              <div className="col-6">
                <div className="rounded-4 overflow-hidden mb-3 shadow-lg" style={{ height: '200px', border: '2px solid rgba(255,255,255,0.2)' }}>
                  <img src="https://sundarbandeltasafari.com/assets/img/home9/destination-img1.jpg" alt="Corporate Trip 1" className="w-100 h-100 object-fit-cover" />
                </div>
                <div className="rounded-4 overflow-hidden shadow-lg" style={{ height: '200px', border: '2px solid rgba(255,255,255,0.2)' }}>
                  <img src="https://sundarbandeltasafari.com/assets/img/home9/destination-img7.jpg" alt="Corporate Trip 2" className="w-100 h-100 object-fit-cover" />
                </div>
              </div>
              <div className="col-6">
                <div className="rounded-4 overflow-hidden shadow-lg" style={{ height: '410px', border: '2px solid rgba(255,255,255,0.2)' }}>
                  <img src="https://sundarbandeltasafari.com/assets/img/home2/destination-img4.jpg" alt="Corporate Trip 3" className="w-100 h-100 object-fit-cover" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}


