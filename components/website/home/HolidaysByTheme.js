"use client"
import React, { useEffect, useState } from 'react'
import SwipperWrapperExplore from './swiper/SwipperWrapperExplore'
import { getAllPackageTypeUrl } from '@/routes/packageRoutes';
import { axiosNormalPost } from '@/libs/axiosHelper';
import LoadingComponent from '@/components/common/LoadingComponent';

function HolidaysByTheme() {
    const [packageType, setPackageType] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosNormalPost(getAllPackageTypeUrl).then((res) => {
            if (res?.status) {
                setPackageType(res.packageTypes);
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return (
        <>
            <div className="home4-counter-section style-2 mb-100">
                <div className="container">
                    <div className="row justify-content-start mb-50 wow animate fadeInDown" data-wow-delay="200ms"
                        data-wow-duration="1500ms">
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Explore Holidays By Theme</h2>
                                <p className="m-0">Find your perfect getaway, tailored to your interests.</p>
                            </div>
                        </div>
                    </div>
                    <div className="counter-wrapper row justify-content-evenly">
                        {loading ? <LoadingComponent /> : <SwipperWrapperExplore packageType={packageType} />}
                    </div>
                </div>
            </div>

        </>
    )
}

export default HolidaysByTheme