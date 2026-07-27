'use client';
import React from 'react';

export default function CorporateServices({ onRequestCall }) {
  const services = [
    {
      icon: "bi-people-fill",
      title: "Corporate Trips",
      desc: "Bring your work crew together on a trip to elevate team spirit, collaboration & performances."
    },
    {
      icon: "bi-trophy-fill",
      title: "Team Incentive Travel",
      desc: "Travel experiences designed to foster team bonding & enjoyment outside office boundaries."
    },
    {
      icon: "bi-building-gear",
      title: "MICE",
      desc: "Transform ordinary Meetings, Incentives, Conferences & Events into extraordinary experiences."
    },
    {
      icon: "bi-award-fill",
      title: "Vendor Incentive Plan",
      desc: "Experiences designed to motivate & reward vendors, suppliers or channel partners."
    }
  ];

  return (
    <section className="py-4 bg-white">
      <div className="container ds-container">
        <div className="text-center mb-4">
          <h2 className="fw-extrabold text-dark mt-2" style={{ fontSize: '26px' }}>Corporate Services Offered</h2>
          <p className="text-muted text-xs mx-auto" style={{ maxWidth: '580px' }}>
            Tailor-made itineraries, seamless logistics management, and premium corporate hospitality for teams of all sizes.
          </p>
        </div>

        <div className="row g-4">
          {services.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 text-center hover-lift transition-all" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="p-3 rounded-circle bg-white  mx-auto mb-3 shadow-2xs" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`bi ${item.icon} fs-3`}></i>
                </div>
                <h3 className="h6 fw-bold text-dark mb-2">{item.title}</h3>
                <p className="text-secondary text-xs mb-3" style={{ lineHeight: '1.6' }}>{item.desc}</p>
                <button type="button" onClick={onRequestCall} className="btn btn-link  text-xs fw-bold p-0 text-decoration-none border-0">
                  Request Call <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
