import React from 'react'

function TopTrending() {
    return (
        <>
            <div className="home2-package-slider-section mb-100 pt-5 m-0 mt-3" style={{top: '100px'}}>
                <div className="container">
                    <div className="row justify-content-start mb-30 wow animate fadeInDown" data-wow-delay="200ms"
                        data-wow-duration="1500ms">
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Top Trending Destinations</h2>
                                <p className="m-0">Explore the hottest travel spots around the globe.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-40">
                        <div className="col-lg-12">
                            <div className="swiper home1-trip-slider">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="package-card">
                                            <div className="package-img-wrap">
                                                <a href="travel-package-details.html" className="package-img">
                                                    <img src="assets/img/home2/tour-package-img1.jpg" alt=""/>
                                                </a>
                                                <div className="batch">
                                                    <span>Sale on!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="package-card">
                                            <div className="package-img-wrap">
                                                <div className="swiper package-card-img-slider">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <a href="travel-package-details.html" className="package-img">
                                                                <img src="assets/img/home1/tour-package-img2.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <a href="travel-package-details.html" className="package-img">
                                                                <img src="assets/img/home1/tour-package-img10.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <a href="travel-package-details.html" className="package-img">
                                                                <img src="assets/img/home1/tour-package-img11.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="slider-pagi-wrap">
                                                    <div className="package-card-img-pagi paginations"></div>
                                                </div>
                                                <div className="batch">
                                                    <span>Hot Sale!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="package-card">
                                            <div className="package-img-wrap">
                                                <a href="travel-package-details.html" className="package-img">
                                                    <img src="assets/img/home2/tour-package-img2.jpg" alt=""/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="package-card">
                                            <div className="package-img-wrap">
                                                <a href="travel-package-details.html" className="package-img">
                                                    <img src="assets/img/home1/tour-package-img6.jpg" alt=""/>
                                                </a>
                                                <div className="batch">
                                                    <span>Hot Sale!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="package-card">
                                            <div className="package-img-wrap">
                                                <a href="travel-package-details.html" className="package-img">
                                                    <img src="assets/img/home1/tour-package-img4.jpg" alt=""/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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