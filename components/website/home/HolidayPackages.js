import React from 'react'

function HolidayPackages() {
  return (
    <>
    <div className="home1-destination-section mb-100">
        <div className="container">
            <div className="row justify-content-start mb-60 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                <div className="col-lg-10">
                    <div className="section-title text-start">
                        <h2>Handpicked Holiday Packages</h2>
                        <p className="m-0">Indulge in unforgettable adventure with special tour plans.</p>
                    </div>
                    <ul className="nav nav-pills justify-content-start" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-europe-tab" data-bs-toggle="pill" data-bs-target="#pills-europe" type="button" role="tab" aria-controls="pills-europe" aria-selected="true">Europe</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-asia-tab" data-bs-toggle="pill" data-bs-target="#pills-asia" type="button" role="tab" aria-controls="pills-asia" aria-selected="false">Asia</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-middle-east-tab" data-bs-toggle="pill" data-bs-target="#pills-middle-east" type="button" role="tab" aria-controls="pills-middle-east" aria-selected="false">Middle East</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-africa-tab" data-bs-toggle="pill" data-bs-target="#pills-africa" type="button" role="tab" aria-controls="pills-africa" aria-selected="false">Africa</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-north-america-tab" data-bs-toggle="pill" data-bs-target="#pills-north-america" type="button" role="tab" aria-controls="pills-north-america" aria-selected="false">North America</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-oceania-tab" data-bs-toggle="pill" data-bs-target="#pills-oceania" type="button" role="tab" aria-controls="pills-oceania" aria-selected="false">Oceania</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-europe" role="tabpanel" aria-labelledby="pills-europe-tab">
                    <div className="swiper home1-destination-slider mb-40">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img1.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Rome, Italy
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img2.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Paris, France
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img3.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Switzerland
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 250 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img4.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Scotland, UK
                                        </a>
                                        <div className="content">
                                            <p>110 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img5.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Athens, Greece
                                        </a>
                                        <div className="content">
                                            <p>70 tours | 150 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img6.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Istanbul, Turkey
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-pagi-wrap">
                        <div className="home1-destination-pagi paginations"></div>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-asia" role="tabpanel" aria-labelledby="pills-asia-tab">
                    <div className="swiper home1-destination-slider mb-40">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img1.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Rome, Italy
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img2.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Paris, France
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img3.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Switzerland
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 250 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img4.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Scotland, UK
                                        </a>
                                        <div className="content">
                                            <p>110 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img5.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Athens, Greece
                                        </a>
                                        <div className="content">
                                            <p>70 tours | 150 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img6.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Istanbul, Turkey
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-pagi-wrap">
                        <div className="home1-destination-pagi paginations"></div>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-middle-east" role="tabpanel" aria-labelledby="pills-middle-east-tab">
                    <div className="swiper home1-destination-slider mb-40">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img1.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Rome, Italy
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img2.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Paris, France
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img3.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Switzerland
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 250 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img4.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Scotland, UK
                                        </a>
                                        <div className="content">
                                            <p>110 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img5.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Athens, Greece
                                        </a>
                                        <div className="content">
                                            <p>70 tours | 150 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img6.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Istanbul, Turkey
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-pagi-wrap">
                        <div className="home1-destination-pagi paginations"></div>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-africa" role="tabpanel" aria-labelledby="pills-africa-tab">
                    <div className="swiper home1-destination-slider mb-40">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img1.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Rome, Italy
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img2.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Paris, France
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img3.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Switzerland
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 250 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img4.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Scotland, UK
                                        </a>
                                        <div className="content">
                                            <p>110 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img5.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Athens, Greece
                                        </a>
                                        <div className="content">
                                            <p>70 tours | 150 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img6.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Istanbul, Turkey
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-pagi-wrap">
                        <div className="home1-destination-pagi paginations"></div>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-north-america" role="tabpanel" aria-labelledby="pills-north-america-tab">
                    <div className="swiper home1-destination-slider mb-40">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img1.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Rome, Italy
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img2.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Paris, France
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img3.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Switzerland
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 250 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img4.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Scotland, UK
                                        </a>
                                        <div className="content">
                                            <p>110 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img5.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Athens, Greece
                                        </a>
                                        <div className="content">
                                            <p>70 tours | 150 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img6.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Istanbul, Turkey
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-pagi-wrap">
                        <div className="home1-destination-pagi paginations"></div>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-oceania" role="tabpanel" aria-labelledby="pills-oceania-tab">
                    <div className="swiper home1-destination-slider mb-40">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img1.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Rome, Italy
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img2.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Paris, France
                                        </a>
                                        <div className="content">
                                            <p>140 tours | 240 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img3.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Switzerland
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 250 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img4.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Scotland, UK
                                        </a>
                                        <div className="content">
                                            <p>110 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img5.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Athens, Greece
                                        </a>
                                        <div className="content">
                                            <p>70 tours | 150 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="destination-card">
                                    <a href="destination-details.html" className="destination-img">
                                        <img src="assets/img/home1/destination-img6.jpg" alt=""/>
                                    </a>
                                    <div className="destination-content">
                                        <a href="destination-details.html" className="title-area">
                                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.81276 0C4.31734 0 1.47305 2.84433 1.47305 6.34163C1.47305 9.07242 5.2847 13.5258 6.92356 15.3136C7.15052 15.5628 7.47606 15.7042 7.81276 15.7042C8.14946 15.7042 8.475 15.5628 8.70196 15.3136C10.3408 13.5258 14.1525 9.07238 14.1525 6.34163C14.1525 2.84433 11.3082 0 7.81276 0ZM8.35966 14.9991C8.21642 15.1535 8.02297 15.2391 7.81276 15.2391C7.60255 15.2391 7.4091 15.1536 7.26586 14.9991C5.66417 13.2525 1.93812 8.90875 1.93812 6.34167C1.93812 3.10103 4.57221 0.465067 7.81276 0.465067C11.0533 0.465067 13.6874 3.10103 13.6874 6.34167C13.6874 8.90875 9.96135 13.2524 8.35966 14.9991Z"/>
                                                <path
                                                    d="M7.81277 9.76634C9.6713 9.76634 11.1779 8.25971 11.1779 6.40118C11.1779 4.54265 9.6713 3.03601 7.81277 3.03601C5.95424 3.03601 4.4476 4.54265 4.4476 6.40118C4.4476 8.25971 5.95424 9.76634 7.81277 9.76634Z"/>
                                            </svg>
                                            Istanbul, Turkey
                                        </a>
                                        <div className="content">
                                            <p>120 tours | 230 departure 15,786 guest travelled.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-pagi-wrap">
                        <div className="home1-destination-pagi paginations"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default HolidayPackages