"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation'; // Import this

// Import all necessary CSS
import 'swiper/css';
import 'swiper/css/pagination'; // Must include if using Pagination module
import 'swiper/css/autoplay';

import { Autoplay, Navigation } from 'swiper/modules';
import PackageCard from './PackageCardTopTrending';
import PackageCardHoliday from './PackageCardHoliday';
import TestmonialCard from './TestmonialCard';

function SwiperWraperTesimonial({ data }) {
    const pathname = usePathname();

    return (
        <Swiper
            // Forces re-initialization on page change to prevent "stuck" sliders
            key={pathname}

            modules={[Autoplay, Navigation]}

            // Settings from your JS snippet
            slidesPerView={5}
            speed={1500}
            spaceBetween={24}
            loop={true} // Usually recommended for autoplay sliders

            // Autoplay Configuration
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Matches your JS setting
            }}


            // Responsive Breakpoints (Updated to match your JS counts)
            breakpoints={{
                 0: { 
                    slidesPerView: 1.3, 
                    spaceBetween: 14 
                },
                // Large smartphones viewports
                430: { 
                    slidesPerView: 1.45, 
                    spaceBetween: 16 
                },
                // Small tablets viewports
                576: { 
                    slidesPerView: 2.2, 
                    spaceBetween: 16 
                },
                768: {
                    slidesPerView: 3, // Matches your JS
                    spaceBetween: 15,
                },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 3 },
                1400: { slidesPerView: 3 }, // Matches your JS
            }}

            // Fix for Next.js navigation issues
            observer={true}
            observeParents={true}
            className="home1-destination-slider"

            navigation={{
                nextEl: '.testimonial-slider-next', // CSS selector for next button
                prevEl: '.testimonial-slider-prev', // CSS selector for prev button
            }}
        >
            {data?.map((pkg, index) => (
                <SwiperSlide key={pkg.id || index}>
                    <TestmonialCard pkg={pkg} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperWraperTesimonial;