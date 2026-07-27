'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CorporateDestinations({ onRequestCall }) {
  const destinations = [
    { title: "Sundarban", image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img1.jpg", tag: "Jungle & Boat Safari" },
    { title: "Darjeeling", image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img7.jpg", tag: "Tea Gardens & Hills" },
    { title: "Digha", image: "https://sundarbandeltasafari.com/assets/img/home2/destination-img4.jpg", tag: "Beach & Sea Resorts" },
    { title: "Gangtok", image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img3.jpg", tag: "Mountain Offsite" },
    { title: "Bali", image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img6.jpg", tag: "International MICE" },
    { title: "Thailand", image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img8.jpg", tag: "Beach & Nightlife" },
    { title: "Jim Corbett", image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img1.jpg", tag: "Wildlife Retreat" },
    { title: "Rishikesh", image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img3.jpg", tag: "Adventure & Camping" },
  ];

  return (
    <section className="py-4" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="container ds-container">

        <div className="d-flex flex-wrap align-items-end justify-content-between mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10  px-3 py-1.5 rounded-pill text-xs fw-bold text-uppercase">
              Popular Offsites
            </span>
            <h2 className="fw-extrabold text-dark mt-2 mb-0" style={{ fontSize: '26px' }}>
              Popular Corporate Destinations
            </h2>
          <p className="text-muted text-xs mb-0 d-none d-md-block">
            Handpicked destinations equipped with premium conference facilities, team adventure, and luxury resorts.
          </p>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-2"
        >
          {destinations.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={onRequestCall}
                className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative hover-lift transition-all"
                style={{ height: '260px', cursor: 'pointer' }}
              >
                <img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 p-3 d-flex flex-column justify-content-between text-white"
                  style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)' }}
                >
                  <span className="badge bg-white text-dark text-2xs rounded-pill align-self-start shadow-sm">{item.tag}</span>
                  <div>
                    <h4 className="fw-bold h5 mb-1 text-white">{item.title}</h4>
                    <span className="text-warning text-xs font-bold">Request Call <i className="bi bi-arrow-right"></i></span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
