import SwiperSlideWrapper from '@/components/website/common/SwiperSlideWrapper'
import SwiperWrapper from '@/components/website/common/SwiperWrapper'
import Faq from '@/components/website/home/Faq';
import HomeBanner from '@/components/website/home/HomeBanner';
import SwiperWrapperPackage from '@/components/website/package/SwiperWrapperPackage';
import Filter from '@/components/website/packages/Filter';
import FilterBottomCard from '@/components/website/packages/FilterBottomCard';
import PackageDestinations from '@/components/website/packages/PackageDestinations';
import React from 'react'

function page() {
    const packageData = [
        {
            "id": 1,
            "badge": "Hot Sale!",
            "gallery": [
                "assets/img/home1/tour-package-img2.jpg",
                "assets/img/home1/tour-package-img10.jpg",
                "assets/img/home1/tour-package-img11.jpg"
            ],
            "title": "Mystic Mountains Retreat",
            "detailsUrl": "travel-package-details.html",
            "location": {
                "name": "Montmartre",
                "url": "travel-package-01.html"
            },
            "duration": "07 Days",
            "price": "599",
            "priceLabel": "Per Person"
        },
        {
            "id": 2,
            "badge": "Trending",
            "gallery": [
                "assets/img/home1/tour-package-img3.jpg"
            ],
            "title": "Azure Coast Adventure",
            "detailsUrl": "travel-package-details.html",
            "location": {
                "name": "Portofino",
                "url": "travel-package-02.html"
            },
            "duration": "05 Days",
            "price": "450",
            "priceLabel": "Per Person"
        },
        {
            "id": 3,
            "badge": "Best Seller",
            "gallery": [
                "assets/img/home1/tour-package-img6.jpg",
                "assets/img/home1/tour-package-img15.jpg",
                "assets/img/home1/tour-package-img16.jpg"
            ],
            "title": "Golden Sands Expedition",
            "detailsUrl": "travel-package-details.html",
            "location": {
                "name": "Dubai",
                "url": "travel-package-03.html"
            },
            "duration": "10 Days",
            "price": "1200",
            "priceLabel": "Per Person"
        }
    ];
    const hotelCities = [
        {
            "name": "Delhi",
            "image": "https://images.emtcontent.com/hotel-img/del-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Goa",
            "image": "https://images.emtcontent.com/hotel-img/goa-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Mumbai",
            "image": "https://images.emtcontent.com/hotel-img/mumb-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Shimla",
            "image": "https://images.emtcontent.com/hotel-img/shimla-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Manali",
            "image": "https://images.emtcontent.com/hotel-img/manali-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Hyderabad",
            "image": "https://images.emtcontent.com/hotel-img/hyd-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Chennai",
            "image": "https://images.emtcontent.com/hotel-img/chennai-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Kolkata",
            "image": "https://images.emtcontent.com/hotel-img/kolkata-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Jaipur",
            "image": "https://images.emtcontent.com/hotel-img/jaipur-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Pune",
            "image": "https://images.emtcontent.com/hotel-img/pune-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Gurugram",
            "image": "https://images.emtcontent.com/hotel-img/gurgrm-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        },
        {
            "name": "Ahmedabad",
            "image": "https://images.emtcontent.com/hotel-img/ahmd-sm.webp",
            "categories": [
                "Hotels",
                "Budget Hotels",
                "3 Star Hotels",
                "4 Star Hotels",
                "5 Star Hotels"
            ]
        }
    ]
    return (
        <>
            <HomeBanner />
            <Filter />
            <FilterBottomCard />
            <PackageDestinations/>
            <div className="destination-dt-travel-season-section mb-100 mt-5" id="scroll-section">
                <div className="container">
                    <h2 className='mt-4 mb-3'>Book your Destinations</h2>
                    <div className="row g-1">
                        {hotelCities.map((city, index) => {
                            return <div key={index} className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                                <div className="hotel-card row m-2">
                                    <div className="hotel-img-wrap p-0 col-md-5">
                                        <a href="/" className="hotel-img">
                                            <img src={city.image} alt={city.name} style={{ height: "90px", width: "100%" }} />
                                        </a>
                                    </div>
                                    <div className="hotel-content col-md-7 pb-0 pt-2">
                                        <div className="location-area flex-column mb-0 gap-1">
                                            <div className="location w-100 mb-2">
                                                <svg width="25" height="25" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.83615 0C3.77766 0 1.28891 2.48879 1.28891 5.54892C1.28891 7.93837 4.6241 11.8351 6.05811 13.3994C6.25669 13.6175 6.54154 13.7411 6.83615 13.7411C7.13076 13.7411 7.41561 13.6175 7.6142 13.3994C9.04821 11.8351 12.3834 7.93833 12.3834 5.54892C12.3834 2.48879 9.89464 0 6.83615 0ZM7.31469 13.1243C7.18936 13.2594 7.02008 13.3342 6.83615 13.3342C6.65222 13.3342 6.48295 13.2594 6.35761 13.1243C4.95614 11.5959 1.69584 7.79515 1.69584 5.54896C1.69584 2.7134 4.00067 0.406933 6.83615 0.406933C9.67164 0.406933 11.9765 2.7134 11.9765 5.54896C11.9765 7.79515 8.71617 11.5959 7.31469 13.1243Z"></path>
                                                    <path d="M6.83618 8.54554C8.4624 8.54554 9.7807 7.22723 9.7807 5.60102C9.7807 3.9748 8.4624 2.65649 6.83618 2.65649C5.20997 2.65649 3.89166 3.9748 3.89166 5.60102C3.89166 7.22723 5.20997 8.54554 6.83618 8.54554Z"></path>
                                                </svg>
                                                <a style={{ fontSize: "19px" }} href="/">{city.name}</a>
                                            </div>
                                            <ul className="hotel-feature-list mb-0">
                                                {/* {city.categories.map((cat, index) => {
                                                    return <li key={index}>
                                                        <a>{cat}</a>
                                                    </li>
                                                })} */}
                                                <li>
                                                    <span>Best Packages</span>
                                                </li>
                                                <li>
                                                    <span>Affortable Packages</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })};
                    </div>
                    <div className="btn-and-price-area mt-0 d-flex justify-content-center">
                        <a href="hotel-details.html" className="primary-btn1">
                            <span>
                                View More
                                <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                </svg>
                            </span>
                            <span>
                                View More
                                <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="destination-dt-travel-season-section mb-100" id="scroll-section">
                <div className="container">
                    <div className="section-title mb-30 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                        <h2>Best Package For You</h2>
                        <p className='m-0'>A curated list of the most popular travel packages based on different destinations.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                            <div className="travel-season-card">
                                <div className="travel-season-top-area gap-3 position-relative">
                                    <div className="travel-season-img">
                                        <img src="assets/img/innerpages/travel-season-img1.jpg" alt="" />
                                    </div>
                                    <div className="travel-season-content">
                                        <h6>Spring (March–May)</h6>
                                        <span style={{ fontSize: '14px' }}>Weather: 12–20°C / 53–68°F</span>
                                        <button className='btn btn-primary pacBookBtn'>
                                            Book Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "400ms" }}>
                            <div className="travel-season-card">
                                <div className="travel-season-top-area gap-3 position-relative">
                                    <div className="travel-season-img">
                                        <img src="assets/img/innerpages/travel-season-img2.jpg" alt="" />
                                    </div>
                                    <div className="travel-season-content">
                                        <h6>Summer (June–August)</h6>
                                        <span style={{ fontSize: '14px' }}>Weather: 20–30°C / 68–86°F</span>
                                        <button className='btn btn-primary pacBookBtn'>
                                            Book Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "600ms" }}>
                            <div className="travel-season-card">
                                <div className="travel-season-top-area gap-3 position-relative">
                                    <div className="travel-season-img">
                                        <img src="assets/img/innerpages/travel-season-img3.jpg" alt="" />
                                    </div>
                                    <div className="travel-season-content">
                                        <h6>Autumn (Sep to Nov)</h6>
                                        <span style={{ fontSize: '14px' }}>Weather: 0–18°C / 50–64°F</span>
                                        <button className='btn btn-primary pacBookBtn'>
                                            Book Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "600ms" }}>
                            <div className="travel-season-card">
                                <div className="travel-season-top-area gap-3 position-relative">
                                    <div className="travel-season-img">
                                        <img src="assets/img/innerpages/travel-season-img4.jpg" alt="" />
                                    </div>
                                    <div className="travel-season-content">
                                        <h6>Winter (Dec to Feb)</h6>
                                        <span style={{ fontSize: '14px' }}>Weather: 3–8°C / 37–46°F</span>
                                        <button className='btn btn-primary pacBookBtn'>
                                            Book Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                            <div className="travel-season-card">
                                <div className="travel-season-top-area gap-3 position-relative">
                                    <div className="travel-season-img">
                                        <img src="assets/img/innerpages/travel-season-img1.jpg" alt="" />
                                    </div>
                                    <div className="travel-season-content">
                                        <h6>Spring (March–May)</h6>
                                        <span style={{ fontSize: '14px' }}>Weather: 12–20°C / 53–68°F</span>
                                        <button className='btn btn-primary pacBookBtn'>
                                            Book Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "400ms" }}>
                            <div className="travel-season-card">
                                <div className="travel-season-top-area gap-3 position-relative">
                                    <div className="travel-season-img">
                                        <img src="assets/img/innerpages/travel-season-img2.jpg" alt="" />
                                    </div>
                                    <div className="travel-season-content">
                                        <h6>Summer (June–August)</h6>
                                        <span style={{ fontSize: '14px' }}>Weather: 20–30°C / 68–86°F</span>
                                        <button className='btn btn-primary pacBookBtn'>
                                            Book Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home2-service-section mb-100">
                <div className="container">
                    <div className="service-wrapper two">
                        <div className="row justify-content-center wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                            <div className="col-lg-9">
                                <div className="section-title">
                                    <h2>Delta Safari – Your Journey, Our Priority!</h2>
                                    <svg height="6" viewBox="0 0 872 6" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM867 3.5L872 5.88675V0.113249L867 2.5V3.5ZM4.5 3.5H867.5V2.5H4.5V3.5Z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <ul className="service-list wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                            <li className="single-service">
                                <div className="icon">
                                    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M27.2713 21.3914L13.5213 10.1414C13.4297 10.0664 13.3187 10.0188 13.2012 10.0044C13.0836 9.98999 12.9644 10.0092 12.8574 10.0599C12.7504 10.1106 12.66 10.1906 12.5968 10.2907C12.5335 10.3908 12.4999 10.5068 12.5 10.6252V29.3752C12.5001 29.5093 12.5433 29.6398 12.6233 29.7474C12.7033 29.8551 12.8157 29.9341 12.9441 29.9729C13.0724 30.0117 13.2099 30.0083 13.3361 29.963C13.4623 29.9177 13.5706 29.833 13.645 29.7214L18.46 22.5002H26.875C27.004 22.5003 27.1298 22.4605 27.2353 22.3862C27.3407 22.312 27.4207 22.207 27.4641 22.0855C27.5075 21.9641 27.5122 21.8322 27.4777 21.7079C27.4432 21.5836 27.3711 21.4731 27.2713 21.3914Z"></path>
                                            <path d="M9.75999 19.3751C4.93499 17.5201 2.51999 12.0851 4.37499 7.26008C6.22999 2.43508 11.665 0.020083 16.49 1.87508C21.315 3.73008 23.73 9.16633 21.875 13.9901C21.8203 14.1437 21.8278 14.3126 21.8958 14.4607C21.9639 14.6089 22.0871 14.7246 22.2393 14.7831C22.3915 14.8417 22.5605 14.8384 22.7103 14.7741C22.8601 14.7098 22.9789 14.5895 23.0412 14.4388C25.1437 8.97008 22.4062 2.81008 16.9387 0.707583C11.4712 -1.39492 5.31124 1.34258 3.20874 6.81008C1.10624 12.2788 3.84374 18.4388 9.31124 20.5413C9.46607 20.6008 9.63819 20.5965 9.78981 20.5292C9.94143 20.462 10.0602 20.3373 10.12 20.1826C10.1787 20.0277 10.1738 19.8559 10.1064 19.7047C10.0389 19.5534 9.91442 19.4349 9.75999 19.3751Z"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="content">
                                    <h4>One Click Booking</h4>
                                    <p>You can hassle-free and fast tour &amp; travel package booking by GoFly.</p>
                                </div>
                            </li>
                            <li className="single-service">
                                <div className="icon">
                                    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.4896 4.14404C19.8384 3.81275 19.0419 4.07233 18.7107 4.72379L8.87091 24.0772C8.53971 24.7285 8.79929 25.5249 9.45066 25.8561C9.63601 25.9507 9.84112 26 10.0492 26C10.5313 26 10.996 25.7356 11.2296 25.2763L21.0694 5.92297C21.4006 5.27161 21.141 4.47523 20.4896 4.14404ZM13.4243 10.5172C13.4243 7.75042 11.1733 5.49943 8.40653 5.49943C5.63991 5.49943 3.38892 7.75042 3.38892 10.5172C3.38892 13.2839 5.63991 15.5349 8.40662 15.5349C11.1734 15.5349 13.4243 13.2839 13.4243 10.5172ZM8.40662 12.8889C7.09894 12.8889 6.03496 11.8249 6.03496 10.5172C6.03496 9.20945 7.09894 8.14548 8.40662 8.14548C9.71438 8.14548 10.7784 9.20937 10.7784 10.5172C10.7783 11.8249 9.71438 12.8889 8.40662 12.8889ZM21.5934 14.4653C18.8266 14.4653 16.5756 16.7163 16.5756 19.483C16.5756 22.2497 18.8265 24.5007 21.5934 24.5007C24.3601 24.5007 26.6111 22.2498 26.6111 19.483C26.6111 16.7162 24.3602 14.4653 21.5934 14.4653ZM21.5934 21.8546C20.2856 21.8546 19.2216 20.7906 19.2216 19.4829C19.2216 18.1752 20.2856 17.1113 21.5934 17.1113C22.901 17.1113 23.965 18.1752 23.965 19.4829C23.965 20.7906 22.9011 21.8546 21.5934 21.8546Z"></path>
                                    </svg>
                                </div>
                                <div className="content">
                                    <h4>Deals &amp; Discounts</h4>
                                    <p>Agencies have special discounts on flights, hotels, &amp; packages.</p>
                                </div>
                            </li>
                            <li className="single-service">
                                <div className="icon">
                                    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15 0C21.4662 0 26.7081 5.24194 26.7081 11.7081C26.7081 18.1743 21.4662 23.4163 15 23.4163C8.53375 23.4163 3.29187 18.1743 3.29187 11.7081C3.29187 5.24194 8.53375 0 15 0ZM23.7899 20.886C22.1639 22.4438 20.1246 23.5736 17.8531 24.0947L19.8539 28.7401L22.0141 25.2591L26.0274 26.081L23.7899 20.886ZM12.758 24.2191C10.4637 23.8108 8.38243 22.7867 6.69112 21.324L3.97262 27.1631L8.00831 26.4579L10.0666 30L12.758 24.2191ZM15.1981 7.58544C15.1294 7.40431 14.8707 7.40431 14.8019 7.58544L13.7848 10.2644C13.7706 10.3033 13.7451 10.337 13.7117 10.3613C13.6782 10.3856 13.6383 10.3994 13.597 10.4009L10.7348 10.5404C10.5401 10.5498 10.4604 10.7951 10.6124 10.9172L12.8459 12.7124C12.8785 12.7379 12.9027 12.7726 12.9154 12.8119C12.9282 12.8512 12.929 12.8934 12.9177 12.9332L12.1659 15.6984C12.1147 15.8865 12.3233 16.0381 12.4864 15.9313L14.8839 14.3618C14.9182 14.3387 14.9586 14.3264 15 14.3264C15.0413 14.3264 15.0817 14.3387 15.116 14.3618L17.5136 15.9313C17.6767 16.0381 17.8853 15.8865 17.8341 15.6984L17.0823 12.9333C17.071 12.8935 17.0717 12.8513 17.0845 12.8119C17.0973 12.7726 17.1215 12.738 17.154 12.7125L19.3876 10.9172C19.5395 10.7951 19.4598 10.5499 19.2652 10.5404L16.403 10.4009C16.3617 10.3994 16.3218 10.3856 16.2883 10.3613C16.2549 10.337 16.2294 10.3033 16.2152 10.2645L15.1981 7.58544ZM16.1065 3.43C15.4404 2.93137 14.5596 2.93137 13.8935 3.43C12.1593 4.72812 12.5526 4.58494 10.3897 4.70525C9.55893 4.75144 8.88418 5.31763 8.69443 6.12775C8.20037 8.23687 8.40962 7.87438 6.83012 9.35688C6.22343 9.92631 6.0705 10.7937 6.44587 11.5363C7.42312 13.4695 7.35043 13.0574 7.09337 15.2083C6.99462 16.0344 7.43506 16.7972 8.19987 17.1248C10.1912 17.9776 9.87056 17.7085 11.0562 19.5215C11.5116 20.2179 12.3392 20.5191 13.1357 20.2784C15.2093 19.6517 14.7908 19.6517 16.8644 20.2784C17.6609 20.5191 18.4886 20.2178 18.9439 19.5215C20.1296 17.7086 19.809 17.9776 21.8002 17.1248C22.5651 16.7972 23.0055 16.0344 22.9067 15.2083C22.6497 13.0573 22.577 13.4695 23.5542 11.5363C23.9296 10.7937 23.7766 9.92631 23.17 9.35688C21.5904 7.87444 21.7997 8.23687 21.3057 6.12775C21.1159 5.31763 20.4412 4.7515 19.6104 4.70525C17.4474 4.58494 17.8407 4.72806 16.1065 3.43Z"></path>
                                    </svg>
                                </div>
                                <div className="content">
                                    <h4>Local Guidance</h4>
                                    <p>Travel agencies have experienced professionals guidance.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="destination-dt-trip-slider-section mb-100">
                <div className="container">
                    <div className="row justify-content-start mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Get Your Discounted Package</h2>
                                <p className='m-0'>A curated list of the most popular travel packages based on different destinations.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <SwiperWrapperPackage data={packageData} />
                        </div>
                    </div>
                </div>
            </div>
            <Faq />
        </>
    )
}

export default page