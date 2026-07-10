import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ds-footer">
      <div className="container ds-container">
        <div className="row gy-5">
          <div className="col-lg-4">
            <Link href="/" className="d-inline-flex align-items-center mb-3">
              <strong style={{ fontFamily: "var(--ds-font-display)", fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>
                Delta<span style={{ color: "var(--ds-orange-500)" }}>Safari</span>
              </strong>
            </Link>
            <p style={{ fontSize: "0.88rem", maxWidth: 320 }}>
              Domestic &amp; international tour packages, hotels and corporate travel booking. Canning
              Town, South 24 Parganas, West Bengal – 743329, India.
            </p>
            <div className="ds-social mt-3">
              <a href="https://www.facebook.com/" aria-label="Facebook"><i className="bi bi-facebook" /></a>
              <a href="https://www.instagram.com/" aria-label="Instagram"><i className="bi bi-instagram" /></a>
              <a href="https://www.youtube.com/" aria-label="YouTube"><i className="bi bi-youtube" /></a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Quick Links</h6>
            <ul>
              <li><Link href="/login">Login or Signup</Link></li>
              <li><Link href="/corporate-package">Corporate Package</Link></li>
              <li><Link href="/referal">Refer &amp; Earn</Link></li>
              <li><Link href="/b2b">B2B Enquiries</Link></li>
              <li><Link href="/activities">Activities</Link></li>
              <li><Link href="/hotel">Hotels</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6>Information</h6>
            <ul>
              <li><Link href="/faq">FAQ&apos;s</Link></li>
              <li><Link href="/pages/cancelation-policy">Cancellation Policy</Link></li>
              <li><Link href="/pages/terms-condition">Terms &amp; Condition</Link></li>
              <li><Link href="/pages/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6>Popular Destination</h6>
            <ul>
              <li><Link href="/packages/group-packages">Group Packages</Link></li>
              <li><Link href="/packages/domestic-packages">Domestic Packages</Link></li>
              <li><Link href="/packages/international-packages">International Packages</Link></li>
              <li><Link href="/packages/foreigners-corner">Foreigner&apos;s Packages</Link></li>
              <li><span>Customized Packages</span></li>
            </ul>
          </div>
        </div>

        <div className="ds-footer-bottom d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>Copyright 2026 <Link href="/">Delta Safari</Link> | All Rights Reserved.</span>
          <span>Corporate Travel Desk: +91 82081 59654</span>
        </div>
      </div>
    </footer>
  );
}
