import Link from 'next/link'
import React from 'react'

function PackageCard({ pkg }) {
    return (
        <>
            <div>
                <div className="package-card">
                    <div className="package-img-wrap">
                        <Link href={"/packages/category/"+pkg?.slug} className="package-img">
                            <img src={pkg?.image ? process.env.NEXT_PUBLIC_SERVER_URL+pkg?.image: process.env.NEXT_PUBLIC_PUBLIC_URL + 'assets/images/noimage.jpg'} alt={pkg?.name} />
                        </Link>
                        <div>
                        </div>
                    </div>
                </div>
                <h5 className='text-center mt-2'>{pkg?.name}</h5>
            </div>
        </>
    )
}

export default PackageCard