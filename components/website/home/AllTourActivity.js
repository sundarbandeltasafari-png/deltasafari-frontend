import React from 'react'
import SwipperWrapperBenifits from './swiper/SwipperWrapperBenifits'

function AllTourActivity() {
    return (
        <>
            <div className="about-why-choose-section mb-100">
                <div className="container">
                    <div className="row justify-content-start mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                        <div className="col-lg-8">
                            <div className="section-title text-start">
                                <h2>Benefits of Booking With Us</h2>
                                <p className='m-0'>Discover the unrivalled benefits that promise memorable journeys all along.</p>
                            </div>
                        </div>
                    </div>
                    <SwipperWrapperBenifits />
                </div>
            </div>
        </>
    )
}

export default AllTourActivity