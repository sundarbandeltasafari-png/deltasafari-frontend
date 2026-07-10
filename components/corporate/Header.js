"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Package", href: "/package" },
  { label: "Corporate", href: "/corporate-package", active: true },
  { label: "Hotel", href: "/hotel" },
  { label: "Cab", href: "/cab" },
  { label: "Referral", href: "/referal" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  return (
    <>
      <div className="ds-topbar d-none d-md-block">
        <div className="container ds-container d-flex justify-content-between align-items-center py-2">
          <div className="d-flex align-items-center gap-4">
            <span>
              <i className="bi bi-geo-alt me-1" /> Canning Town, South 24 Parganas, West Bengal
            </span>
            <span>
              <i className="bi bi-envelope me-1" /> contact@sundarbanbubaitravels.com
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <a href="tel:+918208159654">
              <i className="bi bi-telephone-fill me-1" /> +91 82081 59654
            </a>
            <Link href="/login">Login or Signup</Link>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg ds-navbar sticky-top py-3">
        <div className="container ds-container">
          <Link className="navbar-brand" href="/">
            <strong>
              Delta<span>Safari</span>
            </strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#dsNavbar"
            aria-controls="dsNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="dsNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {NAV_LINKS.map((link) => (
                <li className="nav-item" key={link.href}>
                  <Link
                    className={`nav-link ds-nav-link ${link.active ? "active" : ""}`}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/corporate-package#enquiry-form" className="btn btn-ds-primary btn-sm ms-lg-3">
              Get Corporate Quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
