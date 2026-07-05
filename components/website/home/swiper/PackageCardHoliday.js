import { urlEncode } from '@/libs/urlHelper'
import React from 'react'

export default function PackageCardHoliday({ pkg }) {
  // Image URL path structure matching your configuration
  const imageUrl = pkg?.path 
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}${pkg.path.replace(/\\/g, '/')}` 
    : `${process.env.NEXT_PUBLIC_PUBLIC_URL}assets/images/noimage.jpg`;

  const detailsUrl = "/package/"+pkg?.to_destination_slug+'/'+pkg?.slug+'-'+urlEncode(pkg?.id);

  return (
    <div className="home-scroll-card">
      <a href={detailsUrl} className="card-link-wrapper">
        
        {/* Main Card Media */}
        <div className="image-container">
          <img 
            src={imageUrl} 
            alt={pkg?.title || 'Holiday Package'} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${process.env.NEXT_PUBLIC_PUBLIC_URL}assets/images/noimage.jpg`;
            }}
          />
          {/* Smooth dark gradient scrim for text readability */}
          <div className="card-gradient-scrim"></div>
        </div>

        {/* Floating Top-Right Duration Tag */}
        <span className="duration-tag">
          {pkg?.duration_nights}N/{pkg?.duration_days}D
        </span>

        {/* Text Content Overlay (Matches image_ad362b.jpg style) */}
        <div className="card-overlay-content">
          <h3 className="card-title-text" title={pkg?.title}>
            {pkg?.title}
          </h3>
          
          <div className="card-price-row">
            {Number(pkg?.base_price) > Number(pkg?.actual_price) && (
              <span className="price-strike">
                ₹{pkg?.base_price}
              </span>
            )}
            <span className="price-actual">
              ₹{pkg?.actual_price}
            </span>
          </div>
        </div>

      </a>
    </div>
  );
}
