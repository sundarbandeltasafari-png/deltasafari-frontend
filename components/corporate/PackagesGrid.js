'use client';
import React from 'react';

const PACKAGES = [
  {
    title: "Sundarban Team Offsite",
    location: "Sundarban, West Bengal",
    duration: "2N / 3D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img1.jpg",
    tags: ["Boat Stay", "Team Building", "Mangrove Safari"],
    note: "Best for teams of 20–80",
  },
  {
    title: "Darjeeling Leadership Retreat",
    location: "Darjeeling, West Bengal",
    duration: "3N / 4D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img7.jpg",
    tags: ["Offsite Venue", "Hill Views", "Workshop Ready"],
    note: "Best for teams of 15–50",
  },
  {
    title: "Digha Coastal Conference",
    location: "Digha, West Bengal",
    duration: "2N / 3D",
    image: "https://sundarbandeltasafari.com/assets/img/home2/destination-img4.jpg",
    tags: ["Banquet Hall", "Beach Evening", "AV Setup"],
    note: "Best for 50–300 delegates",
  },
  {
    title: "Gangtok Incentive Trip",
    location: "Gangtok, Sikkim",
    duration: "4N / 5D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img3.jpg",
    tags: ["Reward Travel", "Adventure Add-ons", "Scenic"],
    note: "Best for top-performer groups",
  },
  {
    title: "Kolkata City Client Visit",
    location: "Kolkata, West Bengal",
    duration: "1N / 2D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img6.jpg",
    tags: ["Airport Transfers", "Fine Dining", "Business Hotels"],
    note: "Best for client & partner visits",
  },
  {
    title: "Assam Tea Trail Offsite",
    location: "Assam",
    duration: "5N / 6D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img8.jpg",
    tags: ["Nature Immersion", "Team Building", "Wellness"],
    note: "Best for teams of 20–60",
  },
];

export default function PackagesGrid({ onRequestCall }) {
  return (
    <section id="packages" className="ds-section ds-bg-sand">
      <div className="container ds-container">
        <div className="row justify-content-between align-items-end mb-5">
          <div className="col-lg-7">
            <span className="ds-eyebrow">Popular Corporate Destinations</span>
            <h2 className="mt-2 mb-0">Starting frameworks for your itinerary</h2>
          </div>
          <div className="col-lg-4">
            <p className="ds-lead mb-0">
              These are starting frameworks — every route, stay category and inclusion is
              adjusted once we know your team size and dates. Pricing is shared in your personal proposal.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {PACKAGES.map((pkg) => (
            <div className="col-md-6 col-lg-4" key={pkg.title}>
              <div className="ds-pkg-card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                <div className="ds-pkg-media position-relative" style={{ height: '200px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pkg.image} alt={pkg.title} loading="lazy" className="w-100 h-100 object-fit-cover" />
                  <span className="ds-pkg-badge">{pkg.location}</span>
                  <span className="ds-pkg-duration">{pkg.duration}</span>
                </div>
                <div className="ds-pkg-body p-4">
                  <h5 className="fw-bold text-dark mb-1">{pkg.title}</h5>
                  <p className="ds-pkg-loc text-muted text-xs mb-3">{pkg.note}</p>
                  <div className="ds-pkg-tags d-flex flex-wrap gap-1.5 mb-3">
                    {pkg.tags.map((t) => (
                      <span key={t} className="badge bg-light text-secondary border rounded-pill text-2xs">{t}</span>
                    ))}
                  </div>
                  <div className="ds-pkg-cta d-flex align-items-center justify-content-between pt-3 border-top">
                    <span className="ds-quote-note text-2xs text-muted">Custom Quote</span>
                    <button type="button" onClick={onRequestCall} className="btn btn-link  text-xs fw-bold p-0 text-decoration-none border-0">
                      Get Quote <i className="bi bi-arrow-up-right ms-1" />
                    </button>
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

