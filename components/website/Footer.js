import React from 'react'

function Footer() {
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-menu-wrap">
            <div className="row gy-md-4 gy-5">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="footer-logo-and-addition-info">
                  <a href="index.html" className="footer-logo">
                    <img src="assets/img/footer-logo.svg" alt="" />
                  </a>
                  <div className="address-area">
                    <span>GoFly Travel Agency</span>
                    <a href="#">Skyline Plaza, 5th Floor, 123 Main Street Los Angeles, CA 90001, USA</a>
                  </div>
                  <ul className="social-list">
                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook"></i></a></li>
                    <li><a href="https://www.linkedin.com/"><i className="bx bxl-linkedin"></i></a></li>
                    <li><a href="https://www.youtube.com/"><i className="bx bxl-youtube"></i></a></li>
                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram-alt"></i></a></li>
                  </ul>
                  <div className="language-area">
                    <div className="language-btn">
                      <div className="icon-and-content">
                        <svg width="14" height="14" viewBox="0 0 14 14"
                          xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                              d="M7 14C5.13023 14 3.37239 13.2719 2.05023 11.9498C0.728137 10.6276 0 8.86977 0 7C0 5.13023 0.728137 3.37239 2.05023 2.05023C3.37239 0.728137 5.13023 0 7 0C8.86977 0 10.6276 0.728137 11.9498 2.05023C13.2719 3.37239 14 5.13023 14 7C14 8.86977 13.2719 10.6276 11.9498 11.9498C10.6276 13.2719 8.86977 14 7 14ZM7 0.583324C3.46183 0.583324 0.583324 3.46183 0.583324 7C0.583324 10.5382 3.46183 13.4166 7 13.4166C10.5382 13.4166 13.4166 10.5382 13.4166 7C13.4166 3.46183 10.5382 0.583324 7 0.583324Z" />
                            <path
                              d="M7 14C5.90297 14 4.8854 13.2486 4.13468 11.8841C3.41431 10.5747 3.01758 8.84018 3.01758 7C3.01758 5.15982 3.41431 3.42527 4.13468 2.11589C4.8854 0.751433 5.90297 0 7 0C8.09704 0 9.11461 0.751433 9.8653 2.11589C10.5857 3.42527 10.9824 5.15982 10.9824 7C10.9824 8.84018 10.5857 10.5747 9.8653 11.8841C9.11461 13.2486 8.09704 14 7 14ZM7 0.583324C6.12536 0.583324 5.2893 1.22746 4.64579 2.39709C3.97198 3.62179 3.6009 5.25645 3.6009 7C3.6009 8.74355 3.97198 10.3782 4.64576 11.6029C5.28927 12.7725 6.12533 13.4166 6.99998 13.4166C7.87462 13.4166 8.71068 12.7725 9.35419 11.6029C10.028 10.3782 10.3991 8.74355 10.3991 7C10.3991 5.25645 10.028 3.62179 9.35419 2.39709C8.71071 1.22746 7.87462 0.583324 7 0.583324Z" />
                            <path
                              d="M6.99968 13.9573C6.8386 13.9573 6.70801 13.8267 6.70801 13.6657V0.334156C6.70801 0.173074 6.83857 0.0424805 6.99968 0.0424805C7.16077 0.0424805 7.29136 0.173074 7.29136 0.334156V13.6657C7.29136 13.8267 7.16077 13.9573 6.99968 13.9573Z" />
                            <path
                              d="M13.6661 7.29147H0.334644C0.173562 7.29147 0.0429688 7.16088 0.0429688 6.99979C0.0429688 6.83871 0.173562 6.70812 0.334644 6.70812H13.6661C13.8272 6.70812 13.9578 6.83868 13.9578 6.99979C13.9578 7.16088 13.8272 7.29147 13.6661 7.29147ZM12.7022 3.81187H1.29862C1.13754 3.81187 1.00695 3.6813 1.00695 3.52019C1.00695 3.35908 1.13751 3.22852 1.29862 3.22852H12.7022C12.8633 3.22852 12.9939 3.35908 12.9939 3.52019C12.9939 3.6813 12.8632 3.81187 12.7022 3.81187ZM12.7022 10.771H1.29862C1.13754 10.771 1.00695 10.6404 1.00695 10.4794C1.00695 10.3183 1.13751 10.1877 1.29862 10.1877H12.7022C12.8633 10.1877 12.9939 10.3183 12.9939 10.4794C12.9939 10.6404 12.8632 10.771 12.7022 10.771Z" />
                          </g>
                        </svg>
                        <span>EN</span>
                      </div>
                      <i className="bi bi-caret-down-fill"></i>
                    </div>
                    <ul className="language-list">
                      <li><a href="#"><img src="assets/img/home1/england-flag.png" alt="" />English</a></li>
                      <li><a href="#"><img src="assets/img/home1/netherlands-flag.png" alt="" />Dutch</a>
                      </li>
                      <li><a href="#"><img src="assets/img/home1/japan-flag.png" alt="" />Japanese</a></li>
                      <li><a href="#"><img src="assets/img/home1/korea-flag.png" alt="" />Korean</a></li>
                      <li><a href="#"><img src="assets/img/home1/china-flag.png" alt="" />Chinese</a></li>
                    </ul>
                  </div>
                  <a href="#"><img src="assets/img/home1/icon/google-play.svg" alt="" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-md-end">
                <div className="footer-widget">
                  <div className="widget-title">
                    <h5>Top Destination</h5>
                  </div>
                  <ul className="widget-list">
                    <li><a href="travel-package-01.html">Maldives Tour</a></li>
                    <li><a href="travel-package-01.html">Bali, Indonesia Tour</a></li>
                    <li><a href="travel-package-01.html">Thailand Tour</a></li>
                    <li><a href="travel-package-01.html">Philippines Tour</a></li>
                    <li><a href="travel-package-01.html">Hawaii, USA Tour</a></li>
                    <li><a href="travel-package-01.html">Switzerland Tour</a></li>
                    <li><a href="travel-package-01.html">New Zealand Tour </a></li>
                    <li><a href="travel-package-01.html">Costa Rica Tour</a></li>
                    <li><a href="travel-package-01.html">Peru (Machu Picchu)</a></li>
                    <li><a href="travel-package-01.html">Paris, France Tour</a></li>
                    <li><a href="travel-package-01.html">Rome, Italy Tour</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-md-end">
                <div className="footer-widget">
                  <div className="widget-title">
                    <h5>Popular Search</h5>
                  </div>
                  <ul className="widget-list">
                    <li><a href="travel-package-02.html">Adventure</a></li>
                    <li><a href="travel-package-02.html">Hiking & Stiking</a></li>
                    <li><a href="travel-package-02.html">Holiday Packages</a></li>
                    <li><a href="travel-package-02.html">Flights And Hotels</a></li>
                    <li><a href="travel-package-02.html">Honeymoon Trip</a></li>
                    <li><a href="travel-package-02.html">Bali Vacation Package</a></li>
                    <li><a href="travel-package-02.html">Desert Safari</a></li>
                    <li><a href="travel-package-02.html">Last-Minute Deals</a></li>
                    <li><a href="travel-package-02.html">Summer Vacation</a></li>
                    <li><a href="travel-package-02.html">Wildlife Safari</a></li>
                    <li><a href="travel-package-02.html"> Dubai Luxury Tours</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 d-flex justify-content-lg-end">
                <div className="footer-widget">
                  <div className="widget-title">
                    <h5>Resources</h5>
                  </div>
                  <ul className="widget-list">
                    <li><a href="about.html">About GoFly</a></li>
                    <li><a href="#">Health & Safety Measure</a></li>
                    <li><a href="visa.html">Visa Processing</a></li>
                    <li><a href="contact.html">Customize Tour</a></li>
                    <li><a href="travel-inspiration-01.html">Travel Inspirations</a></li>
                    <li><a href="#">Traveler Reviews</a></li>
                    <li><a href="#">Terms & Condition</a></li>
                    <li><a href="https://www.google.com/maps">Sitemap</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="copyright-and-payment-method-area">
              <p>Copyright 2025 <a href="https://www.egenslab.com/">Egens Lab</a> | All Right Reserved.</p>
              <div className="payment-method-area">
                <span>Accepted Payment Methods :</span>
                <ul>
                  <li><img src="assets/img/home1/icon/mastar-card-icon.svg" alt="" /></li>
                  <li><img src="assets/img/home1/icon/visa-icon.svg" alt="" /></li>
                  <li><img src="assets/img/home1/icon/paypal-icon.svg" alt="" /></li>
                  <li><img src="assets/img/home1/icon/gpay-icon.svg" alt="" /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer