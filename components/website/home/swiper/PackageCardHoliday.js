import { urlEncode } from '@/libs/urlHelper'
import React from 'react'

function PackageCardHoliday({ pkg }) {
    return (
        <>
            <div className="destination-card position-relative">
                <p className='badge  text-bg-primary' style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>{pkg?.duration_nights}N/{pkg?.duration_days}D</p>
                <a href={"/packages/details/" + pkg?.slug + "-" + urlEncode(pkg?.id)} className="destination-img">
                    <img src={pkg?.path ? process.env.NEXT_PUBLIC_SERVER_URL + pkg?.path : process.env.NEXT_PUBLIC_PUBLIC_URL + 'assets/images/noimage.jpg'} alt={pkg?.title} />
                </a>
                <div className="destination-content text-start">
                    <a href={"/packages/details/" + pkg?.slug + "-" + urlEncode(pkg?.id)} className="title-area">
                        {pkg?.title}
                    </a>
                    <div className="content m-0">
                        {
                            <>
                                <p>₹<span className='me-2 custom-strike'>{pkg?.base_price}</span> <span className='fs-3'>₹{pkg?.actual_price}</span></p>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PackageCardHoliday