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
                return <SwiperSlide key={index} style={{ height: 'stretch' }}>
                    <Link href={'packages/category-' + pkgType?.slug} className="single-counter">
                        <div className="content">
                            <img src={process.env.NEXT_PUBLIC_SERVER_URL+pkgType?.image} style={{ height: "50px", filter: "grayscale(100%)" }} />
                            <h5>{pkgType?.name}</h5>
                            <p style={{fontSize: '12px', lineHeight: '5px'}}>Explore Now</p>
                        </div>
                    </Link>
                </SwiperSlide>
            })}
        </Swiper>
    )
}

export default SwipperWrapperExplore;