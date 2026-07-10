"use client"
import React from 'react'
import dynamic from 'next/dynamic';
const SwiperWrapperTopTrending = dynamic(
  () => import('./swiper/SwiperWrapperTopTrending'),
  { ssr: false }
);

function TopTrending({ topTrending }) {
    return (
        <>
            <div className="home2-package-slider-section mb-0 pb-0 pt-5 m-0 mt-5">
                <div className="container">
                    <div className="row justify-content-start mb-3 wow animate fadeInDown" data-wow-delay="200ms"
                        data-wow-duration="1500ms">
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Top Trending Destinations</h2>
                                <p className="m-0">Explore the hottest travel spots around the globe.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-lg-12">
                            <SwiperWrapperTopTrending data={topTrending} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="swiper-pagination2 paginations"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopTrending