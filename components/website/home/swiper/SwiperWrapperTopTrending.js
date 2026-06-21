"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation'; // Import this

// Import all necessary CSS
import 'swiper/css';
import 'swiper/css/pagination'; // Must include if using Pagination module
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';
import PackageCard from './PackageCardTopTrending';

function SwiperWrapperTopTrending({ data }) {
    const pathname = usePathname();

    return (
        <Swiper
            // Forces re-initialization on page change to prevent "stuck" sliders
            key={pathname}

            // Modules must be defined here
            modules={[Autoplay, Pagination]}

            // Settings from your JS snippet
            slidesPerView={5}
            speed={1500}
            spaceBetween={24}
            loop={data.lngth > 4} // Usually recommended for autoplay sliders

            // Autoplay Configuration
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Matches your JS setting
            }}

            // Pagination Configuration
            pagination={{
                clickable: true,
                // If you have a specific class for the dots:
                // el: '.swiper-pagination2', 
            }}

            // Responsive Breakpoints (Updated to match your JS counts)
            breakpoints={{
                280: { slidesPerView: 1 },
                386: { slidesPerView: 1 },
                576: { slidesPerView: 1 },
                768: {
                    slidesPerView: 3, // Matches your JS
                    spaceBetween: 15,
                },
                992: { slidesPerView: 4 },
                1200: { slidesPerView: 4 },
                1400: { slidesPerView: 5 }, // Matches your JS
            }}

            // Fix for Next.js navigation issues
            observer={true}
            observeParents={true}
            className="home1-trip-slider"
            observeSlideChildren={true}
        >
            {[...data, ...data]?.map((pkg, index) => (
                <SwiperSlide key={index}>
                    <PackageCard pkg={pkg} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperWrapperTopTrending;