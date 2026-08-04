'use client';

import React, { useState } from 'react';

export default function PackageOfferBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-5">
      <div className="container ds-container">
        <div 
          className="rounded-4 overflow-hidden shadow-lg position-relative p-4 p-md-5 text-white"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(11, 29, 58, 0.92) 0%, rgba(23, 67, 133, 0.85) 50%, rgba(239, 102, 20, 0.80) 100%), url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="row align-items-center gy-4 position-relative" style={{ zIndex: 2 }}>
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark text-2xs fw-bold px-3 py-1.5 rounded-pill mb-3 d-inline-flex align-items-center gap-1 shadow-xs">
                <i className="fa-solid fa-gift text-danger"></i> Special Holiday Offer
              </span>
              <h2 className="fw-extrabold h3 mb-2 text-white" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.5px' }}>
                Get Up To 25% Off Your First Safari Trip!
              </h2>
              <p className="text-white-50 text-xs mb-0 max-w-xl" style={{ lineHeight: '1.6' }}>
                Subscribe to Delta Safari secret newsletter deals. Get instant discount coupon code and seasonal watchtower tiger sighting updates directly in your inbox.
              </p>
            </div>

            <div className="col-lg-5">
              {subscribed ? (
                <div className="bg-white bg-opacity-20 backdrop-blur rounded-4 p-4 text-center border border-white border-opacity-30">
                  <i className="fa-solid fa-circle-check text-warning fs-2 mb-2"></i>
                  <h6 className="fw-bold text-white text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Coupon Code Sent!</h6>
                  <p className="text-white-50 text-xs mb-0">Use code <strong className="text-warning">SAFARI25</strong> at checkout for 25% discount.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 bg-dark bg-opacity-40 backdrop-blur p-4 rounded-4 border border-white border-opacity-20">
                  <div className="position-relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control rounded-3 px-3.5 py-3 text-sm bg-white text-dark border-0 shadow-sm"
                      style={{ height: '52px', fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="primary-btn1 w-100 py-3 text-center justify-content-center border-0 rounded-3"
                    style={{ height: '52px' }}
                  >
                    <span>
                      Claim Discount
                      <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                      </svg>
                    </span>
                    <span>
                      Claim Discount
                      <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                      </svg>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
