import React from 'react'
import SwiperWrapperHiddenGems from './swiper/SwiperWrapperHiddenGems'

function HiddenGems() {
    const hiddenGems = [
        {
            "title": "Goa",
            "image": "assets/img/home9/destination-goa.jpg",
            "link": "/packages/goa-tours-packages",
            "price": 8999,
            "currency": "₹"
        },
        {
            "title": "Rajasthan",
            "image": "assets/img/home9/destination-rajasthan.jpg",
            "link": "/packages/rajasthan-tours-packages",
            "price": 12999,
            "currency": "₹"
        },
        {
            "title": "Mumbai",
            "image": "assets/img/home9/destination-mumbai.jpg",
            "link": "/packages/mumbai-tours-packages",
            "price": 10999,
            "currency": "₹"
        },
        {
            "title": "Uttarakhand",
            "image": "assets/img/home9/destination-uttarakhand.jpg",
            "link": "/packages/uttarakhand-tours-packages",
            "price": 14999,
            "currency": "₹"
        },
        {
            "title": "Assam",
            "image": "assets/img/home9/destination-assam.jpg",
            "link": "/packages/assam-tours-packages",
            "price": 12999,
            "currency": "₹"
        },
        {
            "title": "Darjeeling",
            "image": "assets/img/home9/destination-darjeeling.jpg",
            "link": "/packages/darjeeling-tours-packages",
            "price": 7999,
            "currency": "₹"
        },
        {
            "title": "Gujarat",
            "image": "assets/img/home9/destination-gujarat.jpg",
            "link": "/packages/gujarat-tours-packages",
            "price": 11999,
            "currency": "₹"
        },
        {
            "title": "Kerala",
            "image": "assets/img/home9/destination-kerala.jpg",
            "link": "/packages/kerala-tours-packages",
            "price": 13999,
            "currency": "₹"
        }
    ]
    return (
        <>
            <div className="home9-destination-section mb-100">
                <div className="container">
                    <div className="section-title text-start mb-40">
                        <h2>Discover Hidden Destinations</h2>
                        <p className="m-0">Uncover less-crowded places for your next perfect holiday.</p>
                    </div>
                    <div className="destination-slider-wrapper">
                        <div className="row">
                            <div className="col-lg-12">
                                <SwiperWrapperHiddenGems data={hiddenGems} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HiddenGems