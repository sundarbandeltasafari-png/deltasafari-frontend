import React from 'react'

function page() {
  return (
    <>

      <div className="page-header">
        <div className="floating-plane"><i className="bi bi-airplane-fill"></i></div>
        <div className="container">
          <div className="header-badge"><i className="bi bi-gift-fill"></i> Exclusive Rewards Program</div>
          <h1 className="mb-3">Refer Friends &amp; <span className="span-accent-color">Earn Rewards</span></h1>
          <p className="mb-0">Share the joy of travel. Invite your friends to GoFly and earn ₹500 credits for every friend who completes a booking. No limits — earn as much as you want!</p>
        </div>
      </div>

      <div className="container margin-top-offset">
        <div className="row g-3">
          <div className="col-6 col-md-3 fade-up">
            <div className="stat-card">
              <div className="icon-wrap bg-primary-light">
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="stat-value text-primary-color">24</div>
              <div className="stat-label">Total Referrals</div>
              <div className="stat-change text-success"><i className="bi bi-arrow-up-short"></i>+3 this month</div>
            </div>
          </div>
          <div className="col-6 col-md-3 fade-up fade-up-d1">
            <div className="stat-card">
              <div className="icon-wrap bg-blue-light">
                <i className="bi bi-bag-check-fill"></i>
              </div>
              <div className="stat-value text-blue-color">18</div>
              <div className="stat-label">Successful Bookings</div>
              <div className="stat-change text-success"><i className="bi bi-arrow-up-short"></i>+2 this week</div>
            </div>
          </div>
          <div className="col-6 col-md-3 fade-up fade-up-d2">
            <div className="stat-card">
              <div className="icon-wrap bg-green-light">
                <i className="bi bi-wallet2"></i>
              </div>
              <div className="stat-value text-green-color">₹9,000</div>
              <div className="stat-label">Total Earned</div>
              <div className="stat-change text-success"><i className="bi bi-arrow-up-short"></i>₹1,000 pending</div>
            </div>
          </div>
          <div className="col-6 col-md-3 fade-up fade-up-d3">
            <div className="stat-card">
              <div className="icon-wrap bg-purple-light">
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="stat-value text-purple-color">Gold</div>
              <div className="stat-label">Current Tier</div>
              <div className="stat-change text-purple-color"><i className="bi bi-chevron-up"></i>6 more → Platinum</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">

          <div className="col-lg-7">

            <div className="referral-hero-card mb-4">
              <div className="row align-items-center hero-inner-z">
                <div className="col-md-7 mb-3 mb-md-0">
                  <p className="mb-1 fw-600 hero-p-sub">Your Personal Referral Code</p>
                  <div className="code-display my-3">
                    <span className="code-text" id="refCode">GOFLY-RAJ500</span>
                    <button className="btn-copy" id="copyCodeBtn">
                      <i className="bi bi-clipboard" id="copyIcon"></i>
                      <span id="copyText">Copy</span>
                    </button>
                  </div>
                  <p className="hero-p-info">
                    <i className="bi bi-info-circle me-1"></i>
                    Share this code with your friends to earn ₹500 per booking
                  </p>
                </div>
                <div className="col-md-5 text-center">
                  <div className="friend-reward-box">
                    <div className="reward-label-sub">You Receive</div>
                    <div className="reward-value-main">₹500</div>
                    <div className="reward-p-text">per successful booking</div>
                    <div className="reward-divider">Friend Gets</div>
                    <div className="reward-value-sub">₹250</div>
                    <div className="reward-p-text">off their first booking</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-section mb-4">
              <h6 className="fw-700 mb-3" style={{fontSize: ".9rem", textTransform: "uppercase", letterSpacing: ".5px", color: "var(--text-muted)"}}>
                <i className="bi bi-link-45deg text-primary me-1"></i> Share Your Referral Link
              </h6>
              <div className="input-group share-input-group mb-3">
                <input type="text" className="form-control" id="referralLink" value="https://gofly.com/ref/GOFLY-RAJ500" readOnly />
                <button className="btn btn-primary-custom" >
                  <i className="bi bi-clipboard2-check"></i> Copy Link
                </button>
              </div>
              <p className="text-muted mb-4" style={{fontSize: ".82rem"}}>
                <i className="bi bi-shield-check text-success me-1"></i>
                Your referral link is unique and tracks all sign-ups automatically.
              </p>

              <p className="fw-700 mb-3" style={{fontSize: ".875rem"}}>Share via Social Media</p>
              <div className="row g-2">
                <div className="col-6 col-sm-3"><a href="#" className="share-btn whatsapp"><i className="bi bi-whatsapp"></i> WhatsApp</a></div>
                <div className="col-6 col-sm-3"><a href="#" className="share-btn facebook"><i className="bi bi-facebook"></i> Facebook</a></div>
                <div className="col-6 col-sm-3"><a href="#" className="share-btn twitter"><i className="bi bi-twitter-x"></i> Twitter</a></div>
                <div className="col-6 col-sm-3"><a href="#" className="share-btn email"><i className="bi bi-envelope-fill"></i> Email</a></div>
              </div>
            </div>

            <div className="level-card mb-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div>
                      <div className="level-badge mb-1"><i className="bi bi-trophy-fill me-1"></i> Gold Referrer</div>
                      <h5 className="mb-0 text-white">6 more referrals to Platinum</h5>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-1" style={{fontSize: ".8rem", color:"rgba(255,255,255,.7)"}}>
                    <span>18 / 24 referrals</span>
                    <span>75%</span>
                  </div>
                  <div className="progress progress-custom">
                    <div className="progress-bar" style={{width: "75%"}}></div>
                  </div>
                  <div className="row g-2 mt-3 text-white-color" style={{opacity: "0.7"}}>
                    <div className="col-4 text-center">
                      <div style={{fontSize: ".7rem", textTransform: "uppercase",letterSpacing: ".4px"}}>Silver</div>
                      <div style={{fontSize: ".8rem", fontWeight: "700"}}>5+ refs</div>
                    </div>
                    <div className="col-4 text-center" style={{borderLeft: "1px solid rgba(255,255,255,.15)", borderRight: "1px solid rgba(255,255,255,.15)"}}>
                      <div style={{fontSize: ".7rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".4px"}}>Gold ✓</div>
                      <div style={{fontSize: ".8rem", fontWeight: 700 , color: "var(--accent)"}}>15+ refs</div>
                    </div>
                    <div className="col-4 text-center">
                      <div style={{fontSize: ".7rem", textTransform: "uppercase",letterSpacing: ".4px"}}>Platinum</div>
                      <div style={{fontSize: ".8rem", fontWeight: "700"}}>24+ refs</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-center mt-4 mt-md-0">
                  <div style={{fontSize: "5rem", lineHeight: 1, filter: "dropShadow(0 4px 12px rgba(0,0,0,.3)"}}>🏆</div>
                  <div style={{color: "var(--accent)", fontWeight: 700, fontSize: ".85rem", marginTop: "8px"}}>Platinum Bonus: ₹1000/ref</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0 section-title-sm">Referral History</h5>
                <a href="#" className="text-decoration-none text-primary-color" style={{fontSize: ".85rem", fontWeight: 600}}>View All <i className="bi bi-arrow-right"></i></a>
              </div>
              <div className="table-card">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr><th>Friend</th><th>Joined</th><th>Status</th><th>Reward</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><div className="d-flex align-items-center gap-2"><div className="avatar-placeholder">PR</div><div><div className="fw-600" style={{fontSize: ".875rem"}}>Priya Raut</div><div style={{fontSize: ".75rem", color: "var(--text-muted)"}}>priya@email.com</div></div></div></td>
                        <td><span style={{fontSize: ".82rem", color: "var(--text-muted)"}}>12 Apr 2025</span></td>
                        <td><span className="badge-status badge-booked">Booked</span></td>
                        <td><span className="fw-700 text-success-color">+₹500</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">

            <div className="card-section mb-4">
              <div className="section-tag">Simple Process</div>
              <h5 className="section-title-md mb-1">How It Works</h5>
              <p className="section-subtitle mb-4">Three easy steps to start earning travel credits</p>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex gap-3 align-items-start p-3 bg-light-soft" style={{background: "var(--bg-soft)", borderRadius: "12px"}}>
                  <div className="step-icon-fixed flex-shrink-0 bg-primary-light" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <i className="bi bi-share-fill"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="step-num-circle" style={{background: "var(--primary)", color: "white"}}>1</span>
                      <h6 className="mb-0 step-title-fixed">Share Your Code</h6>
                    </div>
                    <p className="mb-0 step-p-fixed">Copy your unique referral code or link and share it with friends via WhatsApp, email, or social media.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-section mb-4 wallet-banner">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <div className="section-tag section-tag-success">Wallet Balance</div>
                  <h5 className="mb-0 section-title-md">Available Credits</h5>
                </div>
                <div style={{fontSize: "2.5rem"}}>💰</div>
              </div>
              <div className="row g-3">
                <div className="col-6"><div className="wallet-card-inner"><div className="wallet-amount-main">₹8,000</div><div className="wallet-p-small">Credited</div></div></div>
                <div className="col-6"><div className="wallet-card-inner"><div className="wallet-amount-pending">₹1,000</div><div className="wallet-p-small">Pending</div></div></div>
              </div>
              <a href="#" className="btn-primary-custom mt-3 w-100 justify-content-center" style={{background: "var(--success)"}}>
                <i className="bi bi-credit-card-2-front"></i> Redeem Now
              </a>
            </div>

          </div>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="copyToast" className="toast align-items-center text-white bg-success border-0" role="alert">
          <div className="d-flex">
            <div className="toast-body fw-600"><i className="bi bi-check-circle me-2"></i> Copied to clipboard!</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

    </>
  )
}

export default page