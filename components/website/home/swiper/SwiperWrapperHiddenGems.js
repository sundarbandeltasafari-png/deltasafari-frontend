"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation'; // Import this

// Import all necessary CSS
import 'swiper/css';
import 'swiper/css/pagination'; // Must include if using Pagination module
import 'swiper/css/autoplay';

import { Autoplay, EffectCoverflow, Keyboard, Pagination, Navigation } from 'swiper/modules';
import HiddenGemsCard from './HiddenGemsCard';

function SwiperWrapperHiddenGems({ data }) {
    const pathname = usePathname();

    return (
        <Swiper
            // Forces re-initialization on page change to prevent "stuck" sliders
            key={pathname}

            modules={[EffectCoverflow, Autoplay, Keyboard]}
            loop={true}
            effect="coverflow"
            autoHeight={true}
            speed={1500}
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={true}
            grabCursor={true}
            loopslides={3}
            keyboard={{ enabled: true }}
            autoplay={{
                delay: 1500,
                disableOnInteraction: false,
            }}
            coverflowEffect={{
                rotate: 42,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            }}
            breakpoints={{
                350: { slidesPerView: 1 },
                577: { slidesPerView: 1 },
                768: { slidesPerView: 3 },
                991: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
                1400: { slidesPerView: 4 },
            }}

            // Fix for Next.js navigation issues
            observer={true}
            observeParents={true}
            className="home9-destination-slider"
        >
            {data?.map((pkg, index) => (
                <SwiperSlide key={pkg.id || index}>
                    <HiddenGemsCard pkg={pkg} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperWrapperHiddenGems;