import Link from 'next/link'
import React from 'react'

function PackageCard({ pkg }) {
    const destinationUrl = `/packages/destination-${pkg?.slug}`;
    const imageUrl = pkg?.image
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}${pkg.image.replace(/\\/g, '/')}`
        : `${process.env.NEXT_PUBLIC_PUBLIC_URL}assets/images/noimage.jpg`;

    return (
        <div className="destination-trending-item">
            <Link 
                href={destinationUrl} 
                className="d-block position-relative rounded-4 overflow-hidden shadow-sm hover-lift text-decoration-none"
                style={{ height: '220px', background: '#f1f5f9' }}
            >
                <img
                    src={imageUrl}
                    alt={pkg?.name || 'Destination'}
                    className="w-100 h-100 object-fit-cover transition-all"
                    style={{ transition: 'transform 0.4s ease' }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${process.env.NEXT_PUBLIC_PUBLIC_URL}assets/images/noimage.jpg`;
                    }}
                />
                <div 
                    className="position-absolute bottom-0 start-0 w-100 p-3 d-flex flex-column justify-content-end"
                    style={{ 
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)',
                        height: '65%' 
                    }}
                >
                    <h5 className="text-white m-0 text-truncate fw-bold" style={{ fontSize: '18px', fontWeight: 700 }}>
                        {pkg?.name}
                    </h5>
                    <span className="text-white-50" style={{ fontSize: '12px' }}>
                        {pkg?.showing_text || pkg?.show_text || 'Explore Packages ➔'}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default PackageCard