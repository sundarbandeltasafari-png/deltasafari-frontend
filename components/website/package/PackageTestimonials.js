'use client';

import React from 'react';

export default function PackageTestimonials() {
  const reviews = [
    {
      name: "Amitabh Banerjee",
      location: "Kolkata, WB",
      rating: 5,
      date: "Travelled July 2026",
      packageTitle: "3D/2N Sundarban Royal Bengal Safari",
      review: "The boat safari was incredibly well managed! We saw spotted deer, estuarine crocodiles, and visited Dobanki watchtower. The resort stay and Bengali fish curry were top notch!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Priyanka Roy & Family",
      location: "Howrah, WB",
      rating: 5,
      date: "Travelled June 2026",
      packageTitle: "2D/1N Quick Weekend Mangrove Cruise",
      review: "Clean AC rooms, polite boat crew, and knowledgeable forest naturalist guide. Instant custom package booking via WhatsApp made planning so effortless!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Subhashis Mukherjee",
      location: "Durgapur, WB",
      rating: 5,
      date: "Travelled May 2026",
      packageTitle: "4D/3N Premium Luxury Houseboat Experience",
      review: "The private AC houseboat stay was surreal! Quiet early morning mangrove cruises, sunrise bird watching, and fresh catch prawns cooked onboard.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="py-5 bg-light border-top border-bottom">
      <div className="container ds-container">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge bg-warning bg-opacity-15 text-dark px-3 py-1.5 rounded-pill text-xs fw-bold text-uppercase mb-2">
            Guest Testimonials
          </span>
          <h2 className="fw-extrabold text-dark m-0" style={{ fontSize: '28px', fontFamily: "'Poppins', sans-serif" }}>
            Real Stories From Real Safari Travelers
          </h2>
          <p className="text-muted text-xs mt-2 mb-0">Over 10,000+ happy guests have explored Sundarban with Delta Safari.</p>
        </div>

        <div className="row g-4">
          {reviews.map((rev, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="card h-100 border-0 shadow-sm bg-white rounded-4 p-4 hover-lift transition-all d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex gap-1 text-warning">
                      {[...Array(rev.rating)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-xs"></i>
                      ))}
                    </div>
                    <span className="badge bg-success bg-opacity-10 text-success text-3xs px-2.5 py-1 rounded-pill fw-bold">
                      <i className="fa-solid fa-circle-check me-1"></i> Verified Stay
                    </span>
                  </div>

                  <h6 className="fw-bold text-primary text-xs mb-2">{rev.packageTitle}</h6>
                  <p className="text-secondary text-xs mb-3" style={{ lineHeight: '1.6', fontStyle: 'italic' }}>
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                <div className="border-top pt-3 d-flex align-items-center gap-3 mt-3">
                  <img src={rev.avatar} alt={rev.name} className="rounded-circle object-fit-cover shadow-xs" style={{ width: '42px', height: '42px' }} />
                  <div>
                    <h6 className="fw-bold text-dark text-xs mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>{rev.name}</h6>
                    <small className="text-muted text-3xs">{rev.location} &bull; {rev.date}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
