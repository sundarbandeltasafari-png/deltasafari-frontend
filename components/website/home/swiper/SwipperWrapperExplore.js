"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation'; // Import this

// Import all necessary CSS
import 'swiper/css';
import 'swiper/css/pagination'; // Must include if using Pagination module
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';
import PackageCard from './PackageCardTopTrending';
import BlogCard from './BlogCard';
import Link from 'next/link';

function SwipperWrapperExplore({ packageType }) {
    const pathname = usePathname();

    return (
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

            {packageType.map((pkgType, index) => {
                return (
                    <SwiperSlide key={index} style={{ height: 'stretch' }}>
                        <Link 
                            href={'/packages/category-' + pkgType?.slug} 
                            className="d-flex flex-column align-items-center justify-content-center p-3 rounded-4 bg-white border text-decoration-none shadow-xs hover-lift h-100 text-center"
                            style={{ borderColor: '#eef2f6', transition: 'all 0.2s ease', minHeight: '140px' }}
                        >
                            <div 
                                className="d-flex align-items-center justify-content-center rounded-circle mb-2"
                                style={{ width: '60px', height: '60px', backgroundColor: '#f0f7ff' }}
                            >
                                <img 
                                    src={process.env.NEXT_PUBLIC_SERVER_URL + pkgType?.image} 
                                    alt={pkgType?.name ? `${pkgType.name} Tour Category - Delta Safari` : "Tour Category Icon"} 
                                    style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                            <h5 className="text-dark mb-1 mt-1 text-truncate w-100" style={{ fontSize: '14px', lineHeight: '1.3' }}>
                                {pkgType?.name}
                            </h5>
                            <span className="text-primary d-inline-flex align-items-center gap-1" style={{ fontSize: '11px', color: '#0066cc' }}>
                                Explore ➔
                            </span>
                        </Link>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    )
}

export default SwipperWrapperExplore;