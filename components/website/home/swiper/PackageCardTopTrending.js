import Link from 'next/link'
import React from 'react'

function PackageCard({ pkg }) {
    const destinationUrl = `/packages/destination-${pkg?.slug}`;
    const imageUrl = pkg?.image
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}${pkg.image.replace(/\\/g, '/')}`
        : `${process.env.NEXT_PUBLIC_PUBLIC_URL}assets/images/noimage.jpg`;

    return (
        <div>
            <div className="package-card">
                <div className="package-img-wrap">
                    <Link href={destinationUrl} className="package-img">
                        <img
                            src={imageUrl}
                            alt={pkg?.name || 'Destination'}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${process.env.NEXT_PUBLIC_PUBLIC_URL}assets/images/noimage.jpg`;
                            }}
                        />
                    </Link>
                </div>
            </div>
            <h5 className='text-center mt-2'>
                <Link href={destinationUrl} className="text-decoration-none text-dark hover-primary">
                    {pkg?.name}
                </Link>
            </h5>
        </div>
    )
}

export default PackageCard