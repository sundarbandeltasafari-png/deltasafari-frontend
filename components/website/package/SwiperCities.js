"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';

export default function SwiperCities({ cities }) {
    if (!cities || cities.length === 0) return null;

    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            className="pb-4 custom-swiper-cities"
            slidesPerView={1.2}
            spaceBetween={12}
            speed={1000}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
                480: { slidesPerView: 1.5, spaceBetween: 14 },
                640: { slidesPerView: 2, spaceBetween: 16 },
            }}
        >
            {cities.map((city, index) => (
                <SwiperSlide key={city.id || index}>
                    <div className="hotel-card row m-1 border rounded-3 p-2 bg-white shadow-sm">
                        <div className="hotel-img-wrap p-0 col-5">
                            <Link href={"/packages/" + 'city-' + city.slug} className="hotel-img d-block h-100">
                                <img src={process.env.NEXT_PUBLIC_SERVER_URL + city.city_image} alt={city.name} style={{ height: "90px", width: "100%", objectFit: "cover" }} />
                            </Link>
                        </div>
                        <div className="hotel-content col-7 pb-0 pt-2">
                            <div className="location-area flex-column mb-0 gap-1">
                                <div className="location w-100 mb-2 d-flex align-items-center gap-1.5">
                                    <i className="fa-solid fa-location-dot text-danger me-1"></i>
                                    <h5 className="m-0 text-truncate">
                                        <Link 
                                            href={"/packages/" + 'city-' + city.slug} 
                                            style={{ fontSize: "18px", fontFamily: "'Poppins', sans-serif", fontWeight: 700 }} 
                                            className="text-dark text-decoration-none fw-bold"
                                        >
                                            {city.name}
                                        </Link>
                                    </h5>
                                </div>
                                <ul className="hotel-feature-list mb-0">
                                    <li><span>Best Packages</span></li>
                                    <li><span>Affordable Packages</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
