'use client';

import React, { useEffect, useState } from 'react';
import { getDestinationsUrl } from '@/routes/serviceRoutes';
import { axiosNormalPost } from '@/libs/axiosHelper';
import Link from 'next/link';

export default function PackageDestinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axiosNormalPost(getDestinationsUrl, { condition: { package: 1 } })
      .then((res) => {
        if (res?.status && Array.isArray(res.destinations)) {
          setDestinations(res.destinations);
        }
      })
      .catch((error) => {
        console.error('Error fetching package destinations:', error);
      });
  }, []);

  if (!destinations || destinations.length === 0) return null;

  return (
    <div className="destination-page package-head-card pt-50 mb-50">
      <div className="container">
        <div className="row package-dest gy-md-5 gy-4">
          {destinations.map((dest, index) => {
            const imgSrc = dest?.image
              ? (dest.image.startsWith('http') || dest.image.startsWith('/') ? dest.image : `${process.env.NEXT_PUBLIC_SERVER_URL}${dest.image.replace(/\\/g, '/')}`)
              : `${process.env.NEXT_PUBLIC_PUBLIC_URL || ''}assets/images/noimage.jpg`;

            return (
              <div
                key={dest.id || index}
                className="col-lg-3 col-md-4 col-6 wow animate fadeInDown"
                data-wow-delay="200ms"
                data-wow-duration="1500ms"
                style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}
              >
                <Link href={`/packages/destination-${dest.slug}`} className="destination-card2 position-relative">
                  <div className="destination-img">
                    <img 
                      src={imgSrc} 
                      alt={dest?.name || 'Destination'} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/noimage.jpg';
                      }}
                    />
                  </div>
                  <div className="destination-content position-absolute bottom-0">
                    <h5 className="text-left text-white">{dest?.name}</h5>
                    <p className="text-start" style={{ fontSize: '14px' }}>{dest?.showing_text}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}