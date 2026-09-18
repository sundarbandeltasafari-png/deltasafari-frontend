"use client";

import React, { useState } from 'react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'bi-info-circle' },
  { id: 'itinerary', label: 'Day wise Itinerary', icon: 'bi-calendar3' },
  { id: 'inclusions', label: 'Inclusions & Exclusions', icon: 'bi-check2-circle' },
  { id: 'hotels', label: 'Hotels & Stay', icon: 'bi-house-door' },
  { id: 'policies', label: 'Policies & FAQs', icon: 'bi-file-text' },
];

export default function PackageStickyNav() {
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -90;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="card border-0 shadow-sm bg-white rounded-4 mb-4 position-sticky" style={{ top: '80px', zIndex: 100 }}>
      <div className="d-flex overflow-auto text-nowrap px-3 py-2 gap-2 border-bottom">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => scrollToSection(tab.id)}
            className={`btn btn-sm rounded-pill px-3 py-2 text-xs fw-bold transition-all border-0 ${
              activeTab === tab.id ? 'text-white' : 'text-secondary hover-bg-light'
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? '#ff5c41' : 'transparent',
            }}
          >
            <i className={`bi ${tab.icon} me-1`}></i>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
