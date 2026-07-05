import axios from 'axios';
import Link from 'next/link'
import React from 'react'

function Footer({ siteSettings }) {
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-menu-wrap pb-0">
            <div className="row gy-md-4 gy-5">

              {/* Column 1: Info & Logo */}
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="footer-logo-and-addition-info">
                  <Link href="/" className="footer-logo">
                    <img
                      src={siteSettings?.site_dark_logo ? process.env.NEXT_PUBLIC_SERVER_URL + siteSettings?.site_dark_logo : process.env.NEXT_PUBLIC_PUBLIC_URL + "assets/img/logo_DS.png"}
                      alt=""
                    />
                  </Link>
                  <div className="address-area">
                    <span>{siteSettings?.site_title}</span>
                    <a href={siteSettings?.offices?.map_direction_link}>{siteSettings?.offices?.address}</a>
                  </div>
                  <ul className="social-list">
                    <li><a href="https://www.facebook.com/"><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="https://www.youtube.com/"><i className="fa-brands fa-youtube"></i></a></li>
                    <li><a href="https://www.linkedin.com/"><i className="fa-brands fa-linkedin-in"></i></a></li>
                  </ul>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-md-end">
                <div className="footer-widget mobile-accordion">
                  <details className="w-100" open>
                    <summary className="widget-title">
                      <h5>Quick Links</h5>
                    </summary>
                    <ul className="widget-list">
                      <li><Link href="/login">Login or Signup</Link></li>
                      <li><Link href="/corporate">Corporate Package</Link></li>
                      <li><Link href="/referal">Refer & Earn</Link></li>
                      <li><a>B2B Enquiries</a></li>
                      <li><Link href="/activities">Activities</Link></li>
                      <li><Link href="/hotel">Hotels</Link></li>
                    </ul>
                  </details>
                </div>
              </div>

              {/* Column 3: Information */}
              <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-md-end">
                <div className="footer-widget mobile-accordion">
                  <details className="w-100">
                    <summary className="widget-title">
                      <h5>Information</h5>
                    </summary>
                    <ul className="widget-list">
                      <li><Link href="/faq">FAQ's</Link></li>
                      <li><Link href="/pages/cancelation-policy">Cancellation Policy</Link></li>
                      <li><Link href="/pages/terms-condition">Terms & Condition</Link></li>
                      <li><Link href="/pages/privacy-policy">Privacy Policy</Link></li>
                      <li><Link href="/blogs">Blogs</Link></li>
                    </ul>
                  </details>
                </div>
              </div>

              {/* Column 4: Popular Destinations */}
              <div className="col-lg-3 col-sm-6 d-flex justify-content-lg-end">
                <div className="footer-widget mobile-accordion">
                  <details className="w-100">
                    <summary className="widget-title">
                      <h5>Popular Destination</h5>
                    </summary>
                    <ul className="widget-list">
                      <li><Link href="/packages/group-packages">Group Packages</Link></li>
                      <li><Link href="/packages/domestic-packages">Domestic Packages</Link></li>
                      <li><Link href="/packages/international-packages">International Packages</Link></li>
                      <li><Link href="/packages/foreigners-corner">Foreigner's Packages</Link></li>
                      <li><a>Customized Packages</a></li>
                    </ul>
                  </details>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom mt-5">
          <div className="container">
            <div className="copyright-and-payment-method-area">
              <p>Copyright 2026 <a href="/">Delta Safari</a> | All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer