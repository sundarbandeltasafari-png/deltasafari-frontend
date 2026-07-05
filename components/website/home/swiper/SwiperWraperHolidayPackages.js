"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation'; // Import this

// Import all necessary CSS
import 'swiper/css';
import 'swiper/css/pagination'; // Must include if using Pagination module
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';
import PackageCard from './PackageCardTopTrending';
import PackageCardHoliday from './PackageCardHoliday';

function SwiperWraperHolidayPackages({ data }) {
    const pathname = usePathname();

    return (
        <Swiper
            // Forces re-initialization on page change to prevent "stuck" sliders
            key={pathname}

            // Modules must be defined here
            modules={[Autoplay]}

            // Settings from your JS snippet
            slidesPerView={5}
            speed={1500}
            spaceBetween={24}
            loop={data.length > 4} // Usually recommended for autoplay sliders

            // Autoplay Configuration
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Matches your JS setting
            }}
            // Responsive Breakpoints (Updated to match your JS counts)
            breakpoints={{
                // Base Mobile layout: shows 1 full card and a 30% preview peek of the next slide
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
                // Tablets layout
                768: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                },
                // Desktop viewports
                992: { 
                    slidesPerView: 4, 
                    spaceBetween: 20 
                },
                1400: { 
                    slidesPerView: 4, 
                    spaceBetween: 24 
                },
            }}
            // Fix for Next.js navigation issues
            observer={true}
            observeParents={true}
            className="home1-destination-slider"
        >
            {data?.map((pkg, index) => (
                <SwiperSlide key={pkg.id || index}>
                    <PackageCardHoliday pkg={pkg} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperWraperHolidayPackages;