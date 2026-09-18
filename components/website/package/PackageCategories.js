'use client';

import React from 'react';
import Link from 'next/link';

export default function PackageCategories() {
  const categories = [
    {
      title: "Wildlife & Tiger Safaris",
      subtitle: "Mangrove Boat Trips & Watchtowers",
      count: "12 Packages",
      icon: "fa-solid fa-paw",
      image: "/assets/images/travel-style/wildlife-tiger-safaris.jpg",
      color: "#ef6614",
      tag: "Most Popular"
    },
    {
      title: "Luxury Eco Resort Stays",
      subtitle: "Riverfront Lodges & Swimming Pools",
      count: "8 Packages",
      icon: "fa-solid fa-hotel",
      image: "/assets/images/travel-style/luxury-eco-resorts.jpg",
      color: "#174385",
      tag: "Premium Stay"
    },
    {
      title: "Weekend Quick Getaways",
      subtitle: "1N/2D & 2N/3D Short Trips",
      count: "15 Packages",
      icon: "fa-solid fa-bolt",
      image: "/assets/images/travel-style/weekend-quick-getaways.jpg",
      color: "#059669",
      tag: "Fast Selling"
    },
    {
      title: "Corporate & Team Outings",
      subtitle: "DJ Gala Dinner & Team Games",
      count: "6 Packages",
      icon: "fa-solid fa-people-group",
      image: "/assets/images/travel-style/corporate-team-outings.jpg",
      color: "#7c3aed",
      tag: "Group Events"
    },
    {
      title: "Family Vacation Specials",
      subtitle: "All-Inclusive Guided Sightseeing",
      count: "10 Packages",
      icon: "fa-solid fa-users-between-lines",
      image: "/assets/images/travel-style/family-vacation-specials.jpg",
      color: "#d97706",
      tag: "Family Friendly"
    },
    {
      title: "Couples & Honeymoon Tours",
      subtitle: "Private Boat & Candlelight Meals",
      count: "5 Packages",
      icon: "fa-solid fa-heart",
      image: "/assets/images/travel-style/couples-honeymoon-tours.jpg",
      color: "#e11d48",
      tag: "Romantic"
    }
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container ds-container">
        <div className="d-flex flex-wrap align-items-end justify-content-between mb-4">
          <div>
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1.5 rounded-pill text-xs fw-bold text-uppercase">
              Explore Experiences
            </span>
            <h2 className="fw-extrabold text-dark mt-2 mb-0" style={{ fontSize: '28px', fontFamily: "'Poppins', sans-serif" }}>
              Explore Packages By Travel Style
            </h2>
          </div>
          <div className="text-muted text-xs d-none d-md-block">
            Tailored itineraries designed for every traveler type and mood
          </div>
        </div>

        <div className="row g-4">
          {categories.map((cat, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <Link href="/packages/sundarban-tours-packages" className="text-decoration-none d-block travel-style-card-link">
                <div 
                  className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative travel-style-card" 
                  style={{ height: '235px' }}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-100 h-100 object-fit-cover travel-style-img" 
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 p-4 d-flex flex-column justify-content-between text-white travel-style-overlay"
                    style={{ 
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(15, 23, 42, 0.2) 100%)' 
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge bg-white text-dark text-2xs rounded-pill px-3 py-1.5 fw-bold shadow-sm d-inline-flex align-items-center gap-1.5">
                        <i className={`${cat.icon} text-primary`}></i> {cat.count}
                      </span>
                      {cat.tag && (
                        <span 
                          className="badge rounded-pill px-2.5 py-1 text-3xs fw-bold text-uppercase shadow-sm"
                          style={{ backgroundColor: cat.color, color: '#ffffff', letterSpacing: '0.4px' }}
                        >
                          {cat.tag}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="h5 fw-bold text-white mb-1.5" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem' }}>
                        {cat.title}
                      </h3>
                      <p className="text-white-75 text-xs mb-0 d-flex align-items-center justify-content-between">
                        <span>{cat.subtitle}</span>
                        <span className="travel-style-arrow-circle rounded-circle d-inline-flex align-items-center justify-content-center bg-white bg-opacity-20 text-white">
                          <i className="fa-solid fa-arrow-right text-3xs"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .travel-style-card {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .travel-style-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .travel-style-arrow-circle {
          width: 26px;
          height: 26px;
          min-width: 26px;
          transition: all 0.3s ease;
        }
        .travel-style-card-link:hover .travel-style-card {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(15, 23, 42, 0.16) !important;
        }
        .travel-style-card-link:hover .travel-style-img {
          transform: scale(1.08);
        }
        .travel-style-card-link:hover .travel-style-arrow-circle {
          background-color: #ef6614 !important;
          color: #ffffff !important;
          transform: translateX(3px);
        }
        .travel-style-card-link:hover .travel-style-overlay {
          background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.5) 50%, rgba(15, 23, 42, 0.25) 100%) !important;
        }
      `}</style>
    </section>
  );
}
