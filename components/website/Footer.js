import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-menu-wrap pb-0">
            <div className="row gy-md-4 gy-5">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="footer-logo-and-addition-info">
                  <a href="index.html" className="footer-logo">
                    <img src="assets/img/logo_DS.png" alt="" style={{filter: "brightness(0) invert(1)"}} />
                  </a>
                  <div className="address-area">
                    <span>Delta Safari Travel Agency</span>
                    <a href="#">Skyline Plaza, 5th Floor, 123 Main Street Los Angeles, CA 90001, USA</a>
                  </div>
                  <ul className="social-list">
                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook"></i></a></li>
                    <li><a href="https://www.linkedin.com/"><i className="bx bxl-linkedin"></i></a></li>
                    <li><a href="https://www.youtube.com/"><i className="bx bxl-youtube"></i></a></li>
                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram-alt"></i></a></li>
                  </ul>
                  {/* <a href="#"><img src="assets/img/home1/icon/google-play.svg" alt="" /></a> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-md-end">
                <div className="footer-widget">
                  <div className="widget-title">
                    <h5>Quick Links</h5>
                  </div>
                  <ul className="widget-list">
                    <li><Link href="/login">Login or Signup</Link></li>
                    <li><Link href="/corporate">Corporate Package</Link></li>
                    <li><Link href="/referal">Refer & Earn</Link></li>
                    <li><a>B2B Enquries</a></li>
                    <li><Link href="/activities">Activities</Link></li>
                    <li><Link href="/hotel">Hotels</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-md-end">
                <div className="footer-widget">
                  <div className="widget-title">
                    <h5>Information</h5>
                  </div>
                  <ul className="widget-list">
                    <li><Link href="/faq">FAQ's</Link></li>
                    <li><Link href="/cancelation-policy">Cancelation Policy</Link></li>
                    <li><Link href="/terms-condition">Terms Condition</Link></li>
                    <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link href="/terms-condition">Terms Condition</Link></li>
                    <li><Link href="/blogs">Blogs</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 d-flex justify-content-lg-end">
                <div className="footer-widget">
                  <div className="widget-title">
                    <h5>Popular Detination</h5>
                  </div>
                  <ul className="widget-list">
                    <li><a href="about.html">Group Packages</a></li>
                    <li><a href="#">Domestic Packages</a></li>
                    <li><a href="visa.html">Internation Packages</a></li>
                    <li><a href="contact.html">Foreigner's Packages</a></li>
                    <li><a href="travel-inspiration-01.html">Customizes Packages</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="copyright-and-payment-method-area">
              <p>Copyright 2026 <a href="/">Delta Safari</a> | All Right Reserved.</p>
              {/* <div className="payment-method-area">
                <span>Accepted Payment Methods :</span>
                <ul>
                  <li><img src="assets/img/home1/icon/mastar-card-icon.svg" alt="" /></li>
                  <li><img src="assets/img/home1/icon/visa-icon.svg" alt="" /></li>
                  <li><img src="assets/img/home1/icon/paypal-icon.svg" alt="" /></li>
                  <li><img src="assets/img/home1/icon/gpay-icon.svg" alt="" /></li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer