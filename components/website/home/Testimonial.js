import React from 'react'
import SwiperWraperTesimonial from './swiper/SwiperWraperTesimonial'

function Testimonial() {
    const testimonialData = [
        {
            "title": "Excellent Tourist Place!",
            "description": "Our honeymoon package to the Maldives was beyond amazing! The travel agency took care of every detail.",
            "rating": 5,
            "author": {
                "name": "Robert Kcarery",
                "role": "GoFly Traveler",
                "image": "assets/img/home1/testimonial-author-img1.png"
            }
        },
        {
            "title": "Average Experience",
            "description": "The Thailand tour was flawless! Great hotels, smooth transfers — truly a stress-free and enjoyable experience.",
            "rating": 4,
            "author": {
                "name": "James Bonde",
                "role": "GoFly Traveler",
                "image": "assets/img/home1/testimonial-author-img3.png"
            }
        },
        {
            "title": "Great Experience!",
            "description": "Thanks to their expert planning, our Dubai vacation was seamless. Every detail was handled with care.",
            "rating": 5,
            "ratingType": "trustpilot",
            "author": {
                "name": "Selina Henry",
                "role": "GoFly Traveler",
                "image": "assets/img/home1/testimonial-author-img2.png"
            }
        },
        {
            "title": "Great Visitors Venue!",
            "description": "We had an incredible Europe tour! The itinerary, bookings, and support were all professionally managed.",
            "rating": 5,
            "author": {
                "name": "Michael D Linda",
                "role": "GoFly Traveler",
                "image": "assets/img/home1/testimonial-author-img4.png"
            }
        },
        {
            "title": "Fantastic Service!",
            "description": "Our trip to Bali was unforgettable! Everything was perfectly organized by the agency from start to finish.",
            "rating": 5,
            "ratingType": "trustpilot",
            "author": {
                "name": "Amber Lashley",
                "role": "GoFly Traveler",
                "image": "assets/img/home1/testimonial-author-img5.png"
            }
        }
    ]
    return (
        <>
            <div className="home2-testimonial-section">
                <div className="container">
                    <div className="row justify-content-start mb-50 wow animate fadeInDown" data-wow-delay="200ms"
                        data-wow-duration="1500ms">
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Hear It from Travelers</h2>
                                <p className="m-0">We go beyond just booking trips—we create unforgettable travel experiences that match your
                                    dreams!</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-40">
                        <div className="col-lg-12">
                            <SwiperWraperTesimonial data={testimonialData} />
                        </div>
                    </div>
                    {/* <div className="review-and-slider-btn d-flex justify-content-center wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="slider-btn-grp">
                            <div className="slider-btn testimonial-slider-prev">
                                <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M11.002 13.0005C10.002 10.5005 5.00195 8.00049 2.00195 7.00049C5.00195 6.00049 9.50195 4.50049 11.002 1.00049"
                                            strokeWidth="1.5" strokeLinecap="round" />
                                    </g>
                                </svg>
                            </div>
                            <div className="slider-btn testimonial-slider-next">
                                <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M2.99805 13.0005C3.99805 10.5005 8.99805 8.00049 11.998 7.00049C8.99805 6.00049 4.49805 4.50049 2.99805 1.00049"
                                            strokeWidth="1.5" strokeLinecap="round" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Testimonial