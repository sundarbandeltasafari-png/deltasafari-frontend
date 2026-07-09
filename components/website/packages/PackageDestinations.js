import { getDestinationsUrl } from '@/routes/serviceRoutes';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

async function PackageDestinations() {
    let desination = null;
    try {
        const response = await axios.post(getDestinationsUrl, {
            condition: {
                package: 1
            }
        });
        if (response.data?.status) {
            desination = response.data?.destinations
        }
    } catch (error) {
        desination = null
    }
    return (
        <>
            {desination && desination.length > 0 && <div className="destination-page package-head-card pt-50 mb-50 ">
                <div className="container">
                    <div className="row gy-md-5 gy-4">
                        {
                            desination.map((dest, index) => {
                                return <div key={index} className="col-lg-3 col-md-4 col-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                                    <Link href={"/packages/"+'destination-'+dest.slug} className="destination-card2 position-relative">
                                        <div className="destination-img">
                                            <img src={dest?.image ? process.env.NEXT_PUBLIC_SERVER_URL + dest?.image : process.env.NEXT_PUBLIC_PUBLIC_URL + 'assets/images/noimage.jpg'} alt={dest?.name} />
                                        </div>
                                        <div className="destination-content position-absolute bottom-0">
                                            <h5 className='text-left text-white'>{dest?.name}</h5>
                                            <p className='text-start' style={{ fontSize: '14px' }}>View More <i className="fa-solid fa-arrow-right"></i></p>
                                        </div>
                                    </Link>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>}
        </>
    )
}

export default PackageDestinations