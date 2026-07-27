"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import CustomPackageWizardForm from "./CustomPackageWizardForm";

export default function CustomPackageWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* FIXED FLOATING BUTTON STICKY ON BOTTOM RIGHT */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="custom-package-float-btn"
        aria-label="Open Custom Package Wizard"
      >
        <i className="bi bi-stars custom-pkg-icon" />
        <span>Customized Package</span>
      </button>

      {/* MODAL POPUP CONTAINING CUSTOM PACKAGE WIZARD FORM */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000001,
            padding: "16px"
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="position-relative w-100" style={{ maxWidth: "980px", maxHeight: "92vh", overflowY: "auto" }}>
            <CustomPackageWizardForm isModal={true} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
