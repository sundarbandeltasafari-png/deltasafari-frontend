'use client';
import React from 'react';

export default function WhyCorporate({ onRequestCall }) {
  const whyPoints = [
    {
      icon: "fa-solid fa-users",
      title: "Group Bonding Activities",
      desc: "Fun-filled team engaging games & ice-breaking sessions, improving team's strength & productivity."
    },
    {
      icon: "fa-solid fa-clipboard-check",
      title: "All Inclusive Itineraries",
      desc: "From meals to explorations, we plan all-inclusive travel packages with handpicked stays & transportation."
    },
    {
      icon: "fa-solid fa-trophy",
      title: "Team Award & Recognitions",
      desc: "Acknowledging team's achievements, celebrating efforts, improves retention & boosts morale."
    },
    {
      icon: "fa-solid fa-music",
      title: "DJ Night & Gala Dinner",
      desc: "An unforgettable evening of entertainment, team celebrations & networking with dine & dance."
    },
    {
      icon: "fa-solid fa-globe",
      title: "International & Domestic Summits",
      desc: "Your one-stop corporate travel assistance for VISA, flights, hotels, local transfers & sightseeings."
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Dedicated Trip Manager",
      desc: "Single point of contact from planning to execution ensuring 100% smooth corporate execution."
    }
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container ds-container">

        {/* CENTERED SECTION HEADER */}
        <div className="sec-title mb-4 text-center">
          <h2 className="fw-extrabold text-dark m-0" style={{ fontSize: '28px', fontFamily: "'Poppins', sans-serif" }}>
            Why Choose Sundarban Delta Safari?
          </h2>
        </div>

        <div className="row align-items-stretch gy-4">

          {/* LEFT FEATURE IMAGE CONTAINER (100% ROW HEIGHT) */}
          <div className="col-xl-5 col-lg-5 col-12 d-flex">
            <div className="rounded-4 overflow-hidden shadow-lg position-relative w-100 h-100" style={{ minHeight: '340px' }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Why Choose Sundarban Delta Safari"
                className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
              />
              <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: 'linear-gradient(to top, rgba(11, 29, 58, 0.92) 0%, transparent 100%)', zIndex: 2 }}>
                <span className="badge text-white text-2xs mb-2 px-3 py-1.5 rounded-pill shadow-xs d-inline-flex align-items-center gap-1" style={{ backgroundColor: '#0066cc', fontWeight: 500 }}>
                  <i className="fa-solid fa-trophy"></i> 100+ Corporate Trips Hosted
                </span>
                <h4 className="fw-bold h5 mb-1 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Unforgettable Team Experiences</h4>
                <small className="text-white-50 text-2xs d-block">End-to-end trip management with dedicated event specialist.</small>
              </div>
            </div>
          </div>

          {/* RIGHT CARDS LIST */}
          <div className="col-xl-7 col-lg-7 col-md-7 col-12">
            <div className="row">
              {whyPoints.map((point, i) => (
                <div key={i} className='col-md-6 mb-1 p-1'>
                  <div className="corpo-y-card p-3 mb-2 h-100 rounded-3 border bg-light shadow-2xs d-flex align-items-start gap-3 hover-lift transition-all">
                    <div
                      className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                      style={{ width: '44px', height: '44px', backgroundColor: '#eff6ff', color: '#0066cc' }}
                    >
                      <i className={`${point.icon} fs-6`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{point.title}</h5>
                      <p className="text-secondary text-xs mb-0" style={{ lineHeight: '1.6' }}>{point.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-2">
              <button
                type="button"
                onClick={onRequestCall}
                className="btn text-white px-4 py-2.5 text-xs rounded-pill border-0 shadow-sm d-inline-flex align-items-center gap-1.5"
                style={{ backgroundColor: '#0066cc', fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
              >
                <i className="fa-solid fa-phone me-1"></i> Request Callback Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


