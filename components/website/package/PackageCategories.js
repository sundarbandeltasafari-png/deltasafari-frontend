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
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
      color: "#ef6614"
    },
    {
      title: "Luxury Eco Resort Stays",
      subtitle: "Riverfront Lodges & Swimming Pools",
      count: "8 Packages",
      icon: "fa-solid fa-hotel",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      color: "#174385"
    },
    {
      title: "Weekend Quick Getaways",
      subtitle: "1N/2D & 2N/3D Short Trips",
      count: "15 Packages",
      icon: "fa-solid fa-bolt",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      color: "#059669"
    },
    {
      title: "Corporate & Team Outings",
      subtitle: "DJ Gala Dinner & Team Games",
      count: "6 Packages",
      icon: "fa-solid fa-people-group",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      color: "#7c3aed"
    },
    {
      title: "Family Vacation Specials",
      subtitle: "All-Inclusive Guided Sightseeing",
      count: "10 Packages",
      icon: "fa-solid fa-users-between-lines",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80",
      color: "#d97706"
    },
    {
      title: "Couples & Honeymoon Tours",
      subtitle: "Private Boat & Candlelight Meals",
      count: "5 Packages",
      icon: "fa-solid fa-heart",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
      color: "#e11d48"
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
        </div>

        <div className="row g-4">
          {categories.map((cat, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <Link href="/packages/destination-sundarban" className="text-decoration-none d-block">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative hover-lift transition-all" style={{ height: '220px' }}>
                  <img src={cat.image} alt={cat.title} className="w-100 h-100 object-fit-cover package-img" />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 p-4 d-flex flex-column justify-content-between text-white"
                    style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.25) 100%)' }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="badge bg-white text-dark text-2xs rounded-pill px-2.5 py-1 fw-bold shadow-xs d-inline-flex align-items-center gap-1">
                        <i className={`${cat.icon} text-primary me-0.5`}></i> {cat.count}
                      </span>
                    </div>

                    <div>
                      <h3 className="h5 fw-bold text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {cat.title}
                      </h3>
                      <p className="text-white-50 text-xs mb-0 d-flex align-items-center gap-1">
                        <span>{cat.subtitle}</span>
                        <i className="fa-solid fa-chevron-right text-3xs ms-1"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
