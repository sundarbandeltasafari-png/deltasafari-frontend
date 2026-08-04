'use client';

import React from 'react';

export default function PackageJourneyPriority() {
  const pillars = [
    {
      icon: "fa-solid fa-shield-halved",
      title: "100% Safety & Forest Permits",
      desc: "Instant watchtower entry permits, licensed forest department naturalists, and GPS-equipped safety boats.",
      color: "#ef6614"
    },
    {
      icon: "fa-solid fa-ship",
      title: "Luxury AC Houseboats & Fleet",
      desc: "Panoramic upper lounge decks, climate-controlled cabins, and twin-engine quiet navigation for tiger sightings.",
      color: "#174385"
    },
    {
      icon: "fa-solid fa-utensils",
      title: "Authentic Fresh Gastronomy",
      desc: "Scrumptious traditional Bengali seafood, fresh prawn delicacies, and customized vegetarian menu choices.",
      color: "#d97706"
    },
    {
      icon: "fa-solid fa-headset",
      title: "24/7 Dedicated Concierge",
      desc: "Personal travel coordinator assigned from Kolkata pickup to your final destination drop-off.",
      color: "#059669"
    }
  ];

  return (
    <section className="py-5 position-relative overflow-hidden bg-white">
      <div className="container ds-container">
        <div 
          className="rounded-4 p-4 p-md-5 position-relative overflow-hidden shadow-sm border"
          style={{
            backgroundColor: '#f8fafc',
            borderColor: '#e2e8f0'
          }}
        >
          {/* Subtle Light Accent Glow */}
          <div 
            className="position-absolute rounded-circle opacity-30 pointer-events-none"
            style={{
              width: '350px',
              height: '350px',
              top: '-120px',
              right: '-100px',
              background: 'radial-gradient(circle, rgba(239, 102, 20, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />

          <div className="text-center max-w-3xl mx-auto mb-5 position-relative" style={{ zIndex: 2 }}>
            <span 
              className="badge text-uppercase text-2xs fw-extrabold px-3.5 py-1.5 rounded-pill mb-2 shadow-2xs"
              style={{ backgroundColor: '#ef6614', color: '#ffffff', letterSpacing: '0.5px' }}
            >
              <i className="fa-solid fa-award me-1"></i> Delta Safari Promise
            </span>

            <h2 className="fw-extrabold text-dark h2 mt-2 mb-3" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.5px', color: '#0b1d3a' }}>
              Delta Safari – Your Journey, Our Priority!
            </h2>

            <p className="text-secondary text-xs mb-0" style={{ lineHeight: '1.7', fontSize: '15px' }}>
              We go beyond basic tour packages. From handcrafted mangrove itineraries to luxury eco-resorts and certified watchtower permits, every detail is engineered for your ultimate peace of mind.
            </p>
          </div>

          <div className="row g-4 position-relative" style={{ zIndex: 2 }}>
            {pillars.map((item, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <div 
                  className="card h-100 border-0 rounded-4 p-4 bg-white transition-all hover-lift shadow-xs"
                  style={{
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div 
                    className="rounded-3 d-flex align-items-center justify-content-center mb-3 shadow-2xs"
                    style={{
                      width: '52px',
                      height: '52px',
                      backgroundColor: `${item.color}15`,
                      border: `1px solid ${item.color}30`
                    }}
                  >
                    <i className={`${item.icon} fs-4`} style={{ color: item.color }}></i>
                  </div>

                  <h5 className="fw-bold text-dark text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif", color: '#0b1d3a' }}>
                    {item.title}
                  </h5>

                  <p className="text-secondary text-xs mb-0" style={{ lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
