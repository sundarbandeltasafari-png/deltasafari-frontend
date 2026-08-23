'use client';
import React from 'react';

const PACKAGES = [
  {
    title: "Sundarban Team Offsite & Safari",
    location: "Sundarban, West Bengal",
    duration: "2N / 3D",
    teamSize: "Best for 20–80 Members",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Luxury Eco-Resort & Houseboat Stay",
      "Mangrove Boat Safari & Watchtower Tour",
      "Team Building Games & Gala DJ Dinner"
    ]
  },
  {
    title: "Darjeeling Leadership Retreat",
    location: "Darjeeling, West Bengal",
    duration: "3N / 4D",
    teamSize: "Best for 15–50 Members",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Heritage Tea Estate Stay & Breakfast",
      "AV Equipped Conference & Workshop Venue",
      "Kanchenjunga Sunrise at Tiger Hill"
    ]
  },
  {
    title: "Digha Coastal Beach Conference",
    location: "Digha, West Bengal",
    duration: "2N / 3D",
    teamSize: "Best for 50–300 Delegates",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Seafront Resort & Grand Banquet Hall",
      "Beach Volleyball & Evening Bonfire Party",
      "Full Sound System & Projector Setup"
    ]
  },
  {
    title: "Gangtok Incentive & Adventure Trip",
    location: "Gangtok, Sikkim",
    duration: "4N / 5D",
    teamSize: "Best for Top-Performer Groups",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Reward Travel & Luxury Mountain Stays",
      "Cable Car Ride & Monastery Sightseeing",
      "Scenic Banquet Night with Local Culture"
    ]
  },
  {
    title: "Kolkata Corporate Client Summit",
    location: "Kolkata, West Bengal",
    duration: "1N / 2D",
    teamSize: "Best for Client & Partner Visits",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "5-Star Hotel Accommodation & Breakfast",
      "Private Airport Chauffeur AC Transfers",
      "Boardrooms & Fine Dining Experience"
    ]
  },
  {
    title: "Assam Tea Trail Nature Retreat",
    location: "Assam & Kaziranga",
    duration: "5N / 6D",
    teamSize: "Best for 20–60 Members",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Heritage Tea Planter Bungalow Stay",
      "Kaziranga Wildlife Jeep Safari",
      "Team Wellness & Cultural Performance"
    ]
  }
];

export default function PackagesGrid({ onRequestCall }) {
  return (
    <section id="packages" className="py-5 ds-bg-sand">
      <div className="container ds-container">
        <div className="row justify-content-between align-items-end mb-4">
          <div className="col-lg-7">
            <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1.5 rounded-pill text-xs fw-bold text-uppercase mb-2">
              Popular Offsites
            </span>
            <h2 className="fw-extrabold text-dark m-0" style={{ fontSize: '28px', fontFamily: "'Poppins', sans-serif" }}>
              Starting Frameworks For Your Itinerary
            </h2>
          </div>
          <div className="col-lg-5">
            <p className="text-muted text-xs mb-0 mt-2 mt-lg-0" style={{ lineHeight: '1.6' }}>
              These are starting frameworks — every route, stay category, and inclusion is tailored to your team size and dates. Personal proposals are sent within 24 hours.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {PACKAGES.map((pkg, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 border-0 shadow-sm bg-white rounded-4 overflow-hidden position-relative hover-lift transition-all">

                {/* Top Media Window */}
                <div className="position-relative overflow-hidden" style={{ height: '210px' }}>
                  <img src={pkg.image} alt={pkg.title} className="w-100 h-100 object-fit-cover package-img" />

                  {/* Location Badge */}
                  <span className="position-absolute  m-2.5 bg-dark bg-opacity-75 text-white px-2.5 py-1 text-2xs rounded-3 d-flex align-items-center gap-1 shadow-xs fw-semibold" style={{ zIndex: 10, top: '0px', left: '0px', padding: '5px' }}>
                    <i className="fa-solid fa-location-dot text-danger me-0.5"></i>
                    {pkg.location}
                  </span>

                  {/* Corporate Badge */}
                  <span className="position-absolute  m-2.5 badge text-white text-uppercase text-3xs px-2.5 py-1 rounded-2 shadow-xs fw-bold" style={{ backgroundColor: '#ef6614', zIndex: 10, top: '0px', right: '0px', }}>
                    Corporate
                  </span>

                  {/* Duration Overlay Banner */}
                  <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white px-3 py-1.5 text-xs fw-semibold d-flex align-items-center justify-content-between" style={{ zIndex: 10 }}>
                    <span><i className="fa-solid fa-clock text-warning me-1"></i>{pkg.duration}</span>
                    <span className="text-3xs text-white-50">Customizable Offsite</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="card-body p-3.5 d-flex flex-column justify-content-between">
                  <div>
                    {/* Title */}
                    <h3 className="h6 fw-bold mb-1 text-dark text-truncate-2" style={{ minHeight: '38px', lineHeight: '1.35', fontFamily: "'Poppins', sans-serif" }}>
                      {pkg.title}
                    </h3>

                    {/* Team Capacity */}
                    <div className="text-xs text-primary fw-semibold mb-2">
                      <i className="fa-solid fa-users text-danger me-1"></i>
                      {pkg.teamSize}
                    </div>

                    {/* Centered Inclusion Icons Bar */}
                    <div className="d-flex gap-2 align-items-center justify-content-center my-2.5 text-muted text-center bg-light rounded-3 py-2 px-2 border">
                      <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
                        <i className="fa-solid fa-hotel fs-5 text-primary mb-1"></i>
                        <span className="text-2xs fw-semibold text-dark">Hotel</span>
                      </div>
                      <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
                        <i className="fa-solid fa-people-group fs-5 text-primary mb-1"></i>
                        <span className="text-2xs fw-semibold text-dark">Events</span>
                      </div>
                      <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
                        <i className="fa-solid fa-bus fs-5 text-primary mb-1"></i>
                        <span className="text-2xs fw-semibold text-dark">Transfer</span>
                      </div>
                      <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
                        <i className="fa-solid fa-utensils fs-5 text-primary mb-1"></i>
                        <span className="text-2xs fw-semibold text-dark">Meals</span>
                      </div>
                    </div>

                    {/* Inclusions Checkmark List */}
                    <ul className="list-unstyled d-flex flex-column gap-1.5 mb-2 text-xs text-secondary ms-1">
                      {pkg.highlights.map((item, idx) => (
                        <li key={idx} className="text-truncate d-flex align-items-center gap-1.5 text-xs">
                          <i className="fa-solid fa-circle-check text-success"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Rates & Action Block */}
                  <div className="border-top pt-2.5 d-flex align-items-end justify-content-between mt-2">
                    <div>
                      <span className="text-3xs text-muted d-block" style={{ lineHeight: '14px' }}>Starting Proposal</span>
                      <span className="h6 fw-extrabold mb-0 d-block text-nowrap" style={{ fontWeight: 800, color: '#ef6614' }}>
                        Personalised
                      </span>
                      <span className="text-3xs text-muted d-block text-nowrap" style={{ lineHeight: '14px' }}>Custom Rate</span>
                    </div>

                    <div>
                      <button 
                        type="button"
                        onClick={onRequestCall}
                        className="btn btn-orange text-white fw-bold px-3 py-2 rounded-3 text-xs shadow-xs text-decoration-none d-flex align-items-center gap-1 border-0"
                        style={{ backgroundColor: '#ef6614', fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span>Custom Quote</span>
                        <i className="fa-solid fa-chevron-right text-3xs ms-1"></i>
                      </button>
                    </div>
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
