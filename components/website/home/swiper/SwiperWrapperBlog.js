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

function SwiperWrapperBlog({ data }) {
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
            loop={data.lngth > 5} // Usually recommended for autoplay sliders

            // Autoplay Configuration
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Matches your JS setting
            }}

            // Responsive Breakpoints (Updated to match your JS counts)
            breakpoints={{
                280: { slidesPerView: 1 },
                386: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                768: {
                    slidesPerView: 3, // Matches your JS
                    spaceBetween: 15,
                },
                992: { slidesPerView: 4 },
                1200: { slidesPerView: 4 },
                1400: { slidesPerView: 4 }, // Matches your JS
            }}

            // Fix for Next.js navigation issues
            observer={true}
            observeParents={true}
            className="home1-trip-slider"
            observeSlideChildren={true}
        >
            {data?.map((post, index) => (
                <SwiperSlide key={index}>
                    <BlogCard post={post} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperWrapperBlog;