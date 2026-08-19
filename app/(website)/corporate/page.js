"use client";

import React, { useState } from "react";
import CorporateHero from "@/components/corporate/CorporateHero";
import CorporateServices from "@/components/corporate/CorporateServices";
import CorporateDestinations from "@/components/corporate/CorporateDestinations";
import WhyCorporate from "@/components/corporate/WhyCorporate";
import PackagesGrid from "@/components/corporate/PackagesGrid";
import ProcessRoute from "@/components/corporate/ProcessRoute";
import CorporateWizardForm from "@/components/corporate/CorporateWizardForm";
import CorporateFaq from "@/components/corporate/CorporateFaq";
import CtaBand from "@/components/corporate/CtaBand";
import './page.css';

export default function CorporatePackagePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialDestination, setInitialDestination] = useState("");

  const openModal = (destName) => {
    if (typeof destName === "string" && destName.trim()) {
      setInitialDestination(destName.trim());
    } else {
      setInitialDestination("");
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setInitialDestination("");
  };

  return (
    <>
      {/* 1. HERO BANNER WITH SWIPER BACKGROUND SLIDER & REQUEST CALLBACK CTA */}
      <CorporateHero onRequestCall={openModal} />

      {/* 2. CORPORATE SERVICES OFFERED */}
      <CorporateServices onRequestCall={openModal} />

      {/* 3. POPULAR CORPORATE DESTINATIONS SLIDER */}
      <CorporateDestinations onRequestCall={openModal} />

      {/* 4. WHY CHOOSE SUNDARBAN DELTA SAFARI */}
      <WhyCorporate onRequestCall={openModal} />

      {/* 5. STARTING FRAMEWORKS & PACKAGES GRID */}
      <PackagesGrid onRequestCall={openModal} />

      {/* 6. 5-STEP CUSTOMIZATION PROCESS ROUTE */}
      <ProcessRoute />

      {/* 7. EMBEDDED 5-STEP CORPORATE WIZARD FORM */}
      <section id="corporate-enquiry" className="ds-section ds-bg-sand">
        <div className="container ds-container">
          <div className="text-center mb-5">
            <span className="ds-eyebrow justify-content-center">Build Your Package</span>
            <h2 className="mt-2">Get a custom corporate quote in 5 steps</h2>
            <p className="ds-lead mx-auto" style={{ maxWidth: 640 }}>
              No fixed prices to compare — tell us about your company and your team, and
              we&apos;ll come back with an itinerary and quote made specifically for you.
            </p>
          </div>
          <CorporateWizardForm />
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <CorporateFaq />

      {/* 9. CTA BAND */}
      <CtaBand onRequestCall={openModal} />

      {/* 10. REQUEST CALLBACK CORPORATE WIZARD MODAL POPUP */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '16px'
          }}
        >
          <div className="position-relative w-100" style={{ maxWidth: '980px', maxHeight: '92vh', overflowY: 'auto' }}>
            <CorporateWizardForm isModal={true} initialDestination={initialDestination} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}


