import React from 'react'

function HomeBanner() {
    return (
        <>
            <div className="home2-banner-section">
                <div className="swiper home2-banner-slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="banner-wrapper">
                                <div className="banner-video-area">
                                    <img src="assets/img/home2/banner-img2.jpg" alt="" />
                                </div>
                                <div className="banner-content-wrap">
                                    <div className="container">
                                        <div className="banner-content">
                                            <h1>All-in-one Travel Booking.</h1>
                                            <p>Highlights convenience and simplicity, Best for agencies with online &
                                                mobile-friendly services.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="banner-wrapper">
                                <div className="banner-img-area">
                                    <img src="assets/img/home2/banner-img1.jpg" alt="" />
                                </div>
                                <div className="banner-content-wrap">
                                    <div className="container">
                                        <div className="banner-content">
                                            <h2>Plan Your Trip, Your Way.</h2>
                                            <p>Perfect for customized travel experiences — tailored flights, stays, and tours
                                                just for you.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="banner-wrapper">
                                <div className="banner-img-area">
                                    <img src="assets/img/home2/banner-img2.jpg" alt="" />
                                </div>
                                <div className="banner-content-wrap">
                                    <div className="container">
                                        <div className="banner-content">
                                            <h2>Your Gateway To The World.</h2>
                                            <p>Ideal for explorers seeking seamless booking and expert travel support every step
                                                of the way.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter-wrapper">
                <div className="container">
                    <div className="filter-input-wrap home m-auto p-0">
                        <form className="filter-input show">
                            <div className="single-search-box w-100  p-0 ps-3 m-0 justify-content-between border-0">
                                <div className="form-inner2 p-0">
                                    <i className="bi bi-search"></i>
                                    <input type="text" className="w-100 h-100" placeholder="Enter your dream destination" />
                                </div>
                                <button type="submit" className="primary-btn1 h-100">
                                    <span>
                                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path
                                                    d="M17.7799 16.746L14.6861 13.7226L14.6137 13.6126C14.4774 13.4781 14.2936 13.4028 14.1022 13.4028C13.9107 13.4028 13.7269 13.4781 13.5906 13.6126C10.9613 16.0246 6.91095 16.1554 4.12376 13.9188C1.33658 11.6821 0.680209 7.7696 2.58814 4.77921C4.49607 1.78882 8.37732 0.64519 11.6585 2.10734C14.9396 3.56949 16.5993 7.18566 15.539 10.555C15.5016 10.675 15.4972 10.8029 15.5262 10.9251C15.5552 11.0474 15.6166 11.1597 15.7039 11.2501C15.7921 11.3421 15.9027 11.4097 16.0248 11.4463C16.1469 11.4829 16.2764 11.4872 16.4007 11.4589C16.5243 11.4317 16.6387 11.3725 16.7323 11.2872C16.8258 11.202 16.8954 11.0936 16.934 10.973C18.1996 6.97472 16.2878 2.6716 12.434 0.848041C8.58017 -0.975514 3.94271 0.225775 1.52009 3.67706C-0.902526 7.12835 -0.382565 11.7918 2.74388 14.6518C5.87033 17.5118 10.6646 17.7083 14.0273 15.1173L16.7667 17.7955C16.9042 17.9276 17.0875 18.0014 17.2782 18.0014C17.4689 18.0014 17.6522 17.9276 17.7897 17.7955C17.8568 17.7298 17.9101 17.6513 17.9465 17.5648C17.9829 17.4782 18.0016 17.3852 18.0016 17.2913C18.0016 17.1974 17.9829 17.1045 17.9465 17.0179C17.9101 16.9313 17.8568 16.8529 17.7897 16.7872L17.7799 16.746Z">
                                                </path>
                                            </g>
                                        </svg>
                                        SEARCH
                                    </span>
                                    <span>
                                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path
                                                    d="M17.7799 16.746L14.6861 13.7226L14.6137 13.6126C14.4774 13.4781 14.2936 13.4028 14.1022 13.4028C13.9107 13.4028 13.7269 13.4781 13.5906 13.6126C10.9613 16.0246 6.91095 16.1554 4.12376 13.9188C1.33658 11.6821 0.680209 7.7696 2.58814 4.77921C4.49607 1.78882 8.37732 0.64519 11.6585 2.10734C14.9396 3.56949 16.5993 7.18566 15.539 10.555C15.5016 10.675 15.4972 10.8029 15.5262 10.9251C15.5552 11.0474 15.6166 11.1597 15.7039 11.2501C15.7921 11.3421 15.9027 11.4097 16.0248 11.4463C16.1469 11.4829 16.2764 11.4872 16.4007 11.4589C16.5243 11.4317 16.6387 11.3725 16.7323 11.2872C16.8258 11.202 16.8954 11.0936 16.934 10.973C18.1996 6.97472 16.2878 2.6716 12.434 0.848041C8.58017 -0.975514 3.94271 0.225775 1.52009 3.67706C-0.902526 7.12835 -0.382565 11.7918 2.74388 14.6518C5.87033 17.5118 10.6646 17.7083 14.0273 15.1173L16.7667 17.7955C16.9042 17.9276 17.0875 18.0014 17.2782 18.0014C17.4689 18.0014 17.6522 17.9276 17.7897 17.7955C17.8568 17.7298 17.9101 17.6513 17.9465 17.5648C17.9829 17.4782 18.0016 17.3852 18.0016 17.2913C18.0016 17.1974 17.9829 17.1045 17.9465 17.0179C17.9101 16.9313 17.8568 16.8529 17.7897 16.7872L17.7799 16.746Z">
                                                </path>
                                            </g>
                                        </svg>
                                        SEARCH
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default HomeBanner