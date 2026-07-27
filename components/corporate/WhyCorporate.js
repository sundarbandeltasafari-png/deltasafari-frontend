'use client';
import React from 'react';

export default function WhyCorporate({ onRequestCall }) {
  const whyPoints = [
    {
      icon: "bi-people-fill",
      title: "Group Bonding Activities",
      desc: "Fun-filled team engaging games & ice-breaking sessions, improving team's strength & productivity."
    },
    {
      icon: "bi-journal-check",
      title: "All Inclusive Itineraries",
      desc: "From meals to explorations, we plan all-inclusive travel packages with handpicked stays & transportation."
    },
    {
      icon: "bi-trophy-fill",
      title: "Team Award & Recognitions",
      desc: "Acknowledging team's achievements, celebrating efforts, improves retention & boosts morale."
    },
    {
      icon: "bi-music-note-beamed",
      title: "DJ Night & Gala Dinner",
      desc: "An unforgettable evening of entertainment, team celebrations & networking with dine & dance."
    },
    {
      icon: "bi-globe-americas",
      title: "International & Domestic Summits",
      desc: "Your one-stop corporate travel assistance for VISA, flights, hotels, local transfers & sightseeings."
    },
    {
      icon: "bi-journal-check",
      title: "All Inclusive Itineraries",
      desc: "From meals to explorations, we plan all-inclusive travel packages with handpicked stays & transportation."
    }
  ];

  return (
    <section className="py-4 bg-white">
      <div className="container ds-container">

        {/* CENTERED SECTION HEADER (GO4EXPLORE STYLE) */}
        <div className="sec-title mb-4 text-center">
          <h2 className="fw-extrabold text-dark m-0" style={{ fontSize: '26px' }}>
            Why Choose Sundarban Delta Safari?
          </h2>
        </div>

        <div className="row align-items-center gy-4">

          {/* LEFT FEATURE IMAGE */}
          <div className="col-xl-5 col-lg-5 col-md-5 col-12" style={{ height: 'stretch' }}>
            <div className="rounded-4 overflow-hidden shadow-lg position-relative" >
              <img
                src="https://sundarbandeltasafari.com/assets/img/home9/destination-img1.jpg"
                alt="Why Choose Us"
                className="w-100 h-100 object-fit-cover"
              />
              <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: 'linear-gradient(to top, rgba(11,29,58,0.9), transparent)' }}>
                <span className="badge bg-warning text-dark text-2xs mb-1">100+ Corporate Trips Hosted</span>
                <h4 className="fw-bold h5 mb-0 text-white">Unforgettable Team Experiences</h4>
              </div>
            </div>
          </div>

          {/* RIGHT CARDS LIST */}
          <div className="col-xl-6 col-lg-7 col-md-7 col-12">
            <div className="row">
              {whyPoints.map((point, i) => (
                <div key={i} className='col-md-6 mb-1 p-1'>
                  <div className="corpo-y-card p-3 mb-2 h-100 rounded-3 border bg-light shadow-2xs d-flex align-items-start gap-3 hover-lift transition-all">
                    <div
                      className="p-2.5 rounded-circle text-white flex-shrink-0 d-flex align-items-center justify-content-center shadow-xs"
                      style={{ width: '46px', height: '46px', backgroundColor: i % 2 === 0 ? '#ff5c41' : '#1781fe' }}
                    >
                      <i className={`bi ${point.icon} fs-5`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark text-sm mb-1">{point.title}</h5>
                      <p className="text-secondary text-xs mb-0" style={{ lineHeight: '1.6' }}>{point.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-0 pt-2">
              <button
                type="button"
                onClick={onRequestCall}
                className="btn btn-danger px-4 py-2.5 text-xs fw-bold rounded-pill border-0 shadow-sm"
                style={{ backgroundColor: '#ff5c41' }}
              >
                <i className="bi bi-telephone-fill me-1"></i> Request Callback Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


