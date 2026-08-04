"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation'; // Import this

// Import all necessary CSS
import 'swiper/css';
import 'swiper/css/pagination'; // Must include if using Pagination module
import 'swiper/css/autoplay';

import { Autoplay, Pagination } from 'swiper/modules';
import PackageCard from './PackageCard';

function SwiperWrapperPackage({ data }) {
    const pathname = usePathname();

    return (
        <Swiper
            // 1. Unique key forces re-initialization on route change
            key={pathname} 
            
            modules={[Autoplay, Pagination]}

            // 2. Add observers to handle DOM shifts during navigation
            observer={true}
            observeParents={true}

            className="custom-package-swiper pb-5"
            slidesPerView={3}
            speed={1500}
            spaceBetween={24}

            autoplay={{
                delay: 2500,
                disableOnInteraction: false, // Recommended
            }}

            pagination={{
                clickable: true,
            }}

            breakpoints={{
                280: { slidesPerView: 1 },
                386: { slidesPerView: 1 },
                576: { slidesPerView: 1 },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 3 },
                1400: { slidesPerView: 3 },
            }}
        >
            {data?.map((pkg, index) => (
                <SwiperSlide key={pkg.id || index}>
                    <PackageCard pkg={pkg} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperWrapperPackage;