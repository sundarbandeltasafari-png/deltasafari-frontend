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
                                <div className="location w-100 mb-2">
                                    <svg width="20" height="20" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.83615 0C3.77766 0 1.28891 2.48879 1.28891 5.54892C1.28891 7.93837 4.6241 11.8351 6.05811 13.3994C6.25669 13.6175 6.54154 13.7411 6.83615 13.7411C7.13076 13.7411 7.41561 13.6175 7.6142 13.3994C9.04821 11.8351 12.3834 7.93833 12.3834 5.54892C12.3834 2.48879 9.89464 0 6.83615 0ZM7.31469 13.1243C7.18936 13.2594 7.02008 13.3342 6.83615 13.3342C6.65222 13.3342 6.48295 13.2594 6.35761 13.1243C4.95614 11.5959 1.69584 7.79515 1.69584 5.54896C1.69584 2.7134 4.00067 0.406933 6.83615 0.406933C9.67164 0.406933 11.9765 2.7134 11.9765 5.54896C11.9765 7.79515 8.71617 11.5959 7.31469 13.1243Z"></path>
                                        <path d="M6.83618 8.54554C8.4624 8.54554 9.7807 7.22723 9.7807 5.60102C9.7807 3.9748 8.4624 2.65649 6.83618 2.65649C5.20997 2.65649 3.89166 3.9748 3.89166 5.60102C3.89166 7.22723 5.20997 8.54554 6.83618 8.54554Z"></path>
                                    </svg>
                                    <Link href={"/packages/" + 'city-' + city.slug} style={{ fontSize: "16px" }} className="fw-bold text-dark">{city.name}</Link>
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
