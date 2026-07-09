"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation'; // Import this

// Import all necessary CSS
import 'swiper/css';
import 'swiper/css/pagination'; // Must include if using Pagination module
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';
import LoadingComponent from '@/components/common/LoadingComponent';
import { axiosNormalPost } from '@/libs/axiosHelper';
import { getAllPackageTypeUrl } from '@/routes/packageRoutes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function FilterBottomCard() {
    const pathname = usePathname();
    const [packageType, setPackageType] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosNormalPost(getAllPackageTypeUrl, { visible: 2 }).then((res) => {
            if (res?.status) {
                setPackageType(res.packageTypes);
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return (
        <>
            {loading ?
                <div className="filter-wrapper bottom-card">
                    <div className="container">
                        <LoadingComponent />
                    </div>
                </div>
                :
                packageType.length > 0 &&
                <div className="filter-wrapper bottom-card">
                    <div className="container">
                        <div className="filter-input-wrap m-auto d-flex justify-content-evenly flex-wrap"
                            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", maxWidth: "615px", borderRadius: "30px", padding: "10px", gap: '5px' }}>
                            <Swiper
                                // Forces re-initialization on page change to prevent "stuck" sliders
                                key={pathname}

                                // Modules must be defined here
                                modules={[Autoplay]}

                                // Settings from your JS snippet
                                slidesPerView={4}
                                speed={1500}
                                spaceBetween={24}
                                loop={false}

                                // Autoplay Configuration
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true, // Matches your JS setting
                                }}

                                // Responsive Breakpoints (Updated to match your JS counts)
                                breakpoints={{
                                    280: { slidesPerView: 3, spaceBetween: 10 },
                                    386: { slidesPerView: 3, spaceBetween: 10 },
                                    576: { slidesPerView: 3, spaceBetween: 10 },
                                    768: {
                                        slidesPerView: 3, // Matches your JS
                                        spaceBetween: 15,
                                    },
                                    992: { slidesPerView: 5 },
                                    1200: { slidesPerView: 6 },
                                    1400: { slidesPerView: 6 }, // Matches your JS
                                }}

                                // Fix for Next.js navigation issues
                                observer={true}
                                observeParents={true}
                                className="home1-trip-slider"
                                observeSlideChildren={true}
                            >
                                {packageType.map((cat, index) => {
                                    return <SwiperSlide key={index} className='bottom-card-swiper' style={{ height: 'stretch', width: 'max-content' }}>
                                        <Link href={'packages/category-' + cat?.slug} className="d-flex justify-content-between">
                                            <div className="d-flex justify-content-between gap-2 align-items-center">
                                                <img src={process.env.NEXT_PUBLIC_PUBLIC_URL + `assets/images/package/${cat?.name && cat?.name?.split(' ')[0].toLowerCase()}.png`} alt="" />
                                                <p className="m-0">{cat?.name}</p>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default FilterBottomCard