'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SwiperCities from './SwiperCities';

export default function BookYourDestinations({ cities }) {
  const [showAll, setShowAll] = useState(false);

  if (!cities || cities.length === 0) return null;

  const displayedCities = showAll ? cities : cities.slice(0, 6);

  return (
    <div className="destination-dt-travel-season-section mb-5" id="scroll-section">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="fw-extrabold text-dark m-0" style={{ fontSize: '26px', fontFamily: "'Poppins', sans-serif" }}>
              Book Your Destinations
            </h2>
            <p className="text-muted text-xs mb-0 mt-1">Explore top destination packages and tour circuits across popular cities.</p>
          </div>
          {cities.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll(prev => !prev)}
              className="btn btn-outline-primary text-xs fw-bold rounded-pill px-3.5 py-1.5 d-none d-md-inline-flex align-items-center gap-1.5 border-primary"
            >
              <span>{showAll ? 'Show Less' : `View All (${cities.length})`}</span>
              <i className={`fa-solid ${showAll ? 'fa-chevron-up' : 'fa-chevron-down'} text-3xs`}></i>
            </button>
          )}
        </div>

        {/* Desktop View: Expandable Grid */}
        <div className="d-none d-md-flex row g-3">
          {displayedCities.map((city, index) => {
            const imgSrc = city.city_image 
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}${city.city_image.replace(/\\/g, '/')}`
              : '/assets/images/noimage.jpg';

            return (
              <div key={city.id || index} className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm bg-white rounded-4 overflow-hidden position-relative hover-lift transition-all p-2.5">
                  <div className="row g-2 align-items-center">
                    <div className="col-5">
                      <Link href={`/packages/city-${city.slug}`} className="d-block overflow-hidden rounded-3" style={{ height: '110px' }}>
                        <img
                          src={imgSrc}
                          alt={city.name}
                          className="w-100 h-100 object-fit-cover transition-all package-img"
                        />
                      </Link>
                    </div>
                    <div className="col-7 p-2">
                      <div className="d-flex align-items-center gap-1.5 mb-2">
                        <i className="fa-solid fa-location-dot text-danger fs-5 me-0.5"></i>
                        <Link 
                          href={`/packages/city-${city.slug}`} 
                          className="fw-bold text-dark text-decoration-none text-truncate hover-text-primary"
                          style={{ fontSize: '22px', lineHeight: '1.25', fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
                        >
                          {city.name}
                        </Link>
                      </div>
                      <ul className="list-unstyled mb-0 d-flex flex-column gap-1 text-2xs text-secondary ms-1">
                        <li className="d-flex align-items-center gap-1">
                          <i className="fa-solid fa-circle-check text-success"></i>
                          <span>Best Packages</span>
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <i className="fa-solid fa-circle-check text-success"></i>
                          <span>Affordable Rates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Swiper Carousel */}
        <div className="d-block d-md-none">
          <SwiperCities cities={cities} />
        </div>

        {/* Mobile / Centered Expand Button */}
        {cities.length > 6 && (
          <div className="mt-3.5 d-flex justify-content-center">
            <button
              type="button"
              onClick={() => setShowAll(prev => !prev)}
              className="btn btn-orange text-white fw-bold px-4 py-2 rounded-pill text-xs shadow-xs border-0 d-inline-flex align-items-center gap-2"
              style={{ backgroundColor: '#ef6614', fontFamily: "'Poppins', sans-serif" }}
            >
              <span>{showAll ? 'Show Less Destinations' : `View All ${cities.length} Destinations`}</span>
              <i className={`fa-solid ${showAll ? 'fa-chevron-up' : 'fa-chevron-down'} text-2xs`}></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
