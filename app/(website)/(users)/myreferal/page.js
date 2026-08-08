'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosPost } from '@/libs/axiosHelper';
import { getReferralStatsURL } from '@/routes/authRoutes';
import { showMessage } from '@/libs/commonHelper';

export default function MyReferralPage() {
  const authState = useSelector((state) => state?.userAuth);
  const token = authState?.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    referralCode: '',
    referralUrl: '',
    walletBalance: 0,
    stats: {
      totalReferredCount: 0,
      totalSuccessfulBookings: 0,
      totalCommissionEarned: 0
    },
    referredUsers: [],
    referralTransactions: []
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, [token]);

  const fetchReferralData = () => {
    setLoading(true);
    axiosPost(getReferralStatsURL, {}, token)
      .then((res) => {
        setLoading(false);
        if (res?.status) {
          setData({
            referralCode: res.referralCode || '',
            referralUrl: res.referralUrl || '',
            walletBalance: res.walletBalance || 0,
            stats: res.stats || { totalReferredCount: 0, totalSuccessfulBookings: 0, totalCommissionEarned: 0 },
            referredUsers: res.referredUsers || [],
            referralTransactions: res.referralTransactions || []
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching referral stats:", err);
      });
  };

  const handleCopyCode = () => {
    if (!data.referralCode) return;
    navigator.clipboard.writeText(data.referralCode);
    setCopiedCode(true);
    showMessage('success', 'Referral Code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleCopyUrl = () => {
    if (!data.referralUrl) return;
    navigator.clipboard.writeText(data.referralUrl);
    setCopiedUrl(true);
    showMessage('success', 'Referral Link copied to clipboard!');
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  const userType = Number(authState?.user?.user_type) || 1;

  if (userType !== 1) {
    return (
      <div className="col-lg-8 col-xl-9">
        <div className="bg-white p-5 rounded-4 shadow-sm border text-center my-4">
          <i className="fa-solid fa-user-lock text-warning display-4 mb-3"></i>
          <h4 className="fw-bold text-dark mb-2">Customer Exclusive Feature</h4>
          <p className="text-secondary small mb-0">
            The Refer & Earn rewards program is available exclusively for Customer User accounts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-8 col-xl-9">
      <div className="tab-content" id="v-pills-tabContent">
        <div className="tab-pane fade show active">
          
          {/* Header Card */}
          <div className="gofly-card mb-4 border-0 shadow-sm rounded-4 overflow-hidden position-relative" 
               style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff' }}>
            <div className="row align-items-center p-4">
              <div className="col-lg-12">
                <span className="badge bg-warning text-dark mb-2 px-3 py-2 fw-bold text-uppercase rounded-pill" style={{ fontSize: '0.75rem' }}>
                  <i className="fa-solid fa-gift me-1"></i> Refer & Earn Program
                </span>
                <h2 className="fw-bold mb-2 text-white" style={{ fontSize: '1.75rem' }}>
                  Invite Friends & <span style={{ color: '#fb923c' }}>Earn Package Commissions</span>
                </h2>
                <p className="text-slate-300 small mb-4" style={{ opacity: 0.9 }}>
                  Share your personal referral link or referral code. When a friend signs up using your link/code and books any tour package, you earn the user commission set for that package credited directly to your wallet balance!
                </p>

                {/* Referral Link & Code Copy Boxes */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="text-xs text-uppercase fw-bold text-light opacity-75 mb-1 d-block">Your Referral Code</label>
                    <div className="d-flex align-items-center bg-white bg-opacity-10 border border-white border-opacity-25 rounded-3 p-2">
                      <span className="fw-bold text-warning text-truncate me-2 ms-1 fs-6">{data.referralCode || 'LOADING...'}</span>
                      <button onClick={handleCopyCode} className="btn btn-sm btn-warning ms-auto rounded-2 px-3 fw-bold">
                        {copiedCode ? <><i className="fa-solid fa-check me-1"></i> Copied</> : <><i className="fa-regular fa-copy me-1"></i> Copy Code</>}
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-xs text-uppercase fw-bold text-light opacity-75 mb-1 d-block">Your Referral Link</label>
                    <div className="d-flex align-items-center bg-white bg-opacity-10 border border-white border-opacity-25 rounded-3 p-2">
                      <span className="text-truncate text-white-50 me-2 ms-1 small" style={{ maxWidth: '140px' }}>{data.referralUrl || 'Loading...'}</span>
                      <button onClick={handleCopyUrl} className="btn btn-sm btn-light ms-auto rounded-2 px-3 fw-bold text-dark">
                        {copiedUrl ? <><i className="fa-solid fa-check me-1"></i> Copied</> : <><i className="fa-solid fa-link me-1"></i> Copy Link</>}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-lg-12 pt-2 text-center mt-4 mt-lg-0">
                <div className="p-4 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-4 shadow-sm">
                  <div className="display-4 text-warning mb-1"><i className="fa-solid fa-sack-dollar"></i></div>
                  <div className="text-uppercase text-light opacity-75 text-xs fw-bold tracking-wider">Total Earned Rewards</div>
                  <div className="display-6 fw-bold text-white my-1">₹{data.stats.totalCommissionEarned.toLocaleString('en-IN')}</div>
                  <div className="text-success small fw-semibold mt-2">
                    <i className="fa-solid fa-wallet me-1"></i> Wallet Balance: ₹{data.walletBalance.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="bg-white p-3 rounded-4 shadow-sm mb-4 border">
            <label className="fw-bold text-dark small mb-2 d-block text-uppercase" style={{ letterSpacing: '0.5px' }}>
              <i className="fa-solid fa-share-nodes text-primary me-1"></i> Share Instantly via Social Media:
            </label>
            <div className="row g-2">
              <div className="col-6 col-sm-3">
                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! Sign up on Delta Safari using my referral code ${data.referralCode} and explore amazing tour packages! ${data.referralUrl}`)}`}
                   target="_blank" rel="noopener noreferrer" className="btn btn-outline-success w-100 btn-sm fw-bold rounded-3">
                  <i className="fa-brands fa-whatsapp me-1"></i> WhatsApp
                </a>
              </div>
              <div className="col-6 col-sm-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.referralUrl)}`}
                   target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary w-100 btn-sm fw-bold rounded-3">
                  <i className="fa-brands fa-facebook me-1"></i> Facebook
                </a>
              </div>
              <div className="col-6 col-sm-3">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Sign up on Delta Safari using code ${data.referralCode} for exclusive travel packages! ${data.referralUrl}`)}`}
                   target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark w-100 btn-sm fw-bold rounded-3">
                  <i className="fa-brands fa-x-twitter me-1"></i> Twitter
                </a>
              </div>
              <div className="col-6 col-sm-3">
                <a href={`mailto:?subject=${encodeURIComponent('Join Delta Safari')}&body=${encodeURIComponent(`Sign up using my referral link ${data.referralUrl} or referral code ${data.referralCode}`)}`}
                   className="btn btn-outline-danger w-100 btn-sm fw-bold rounded-3">
                  <i className="fa-solid fa-envelope me-1"></i> Email
                </a>
              </div>
            </div>
          </div>

          {/* 3 Stats Overview */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="p-3 bg-white border rounded-4 shadow-sm d-flex align-items-center">
                <div className="rounded-3 p-3 bg-primary bg-opacity-10 text-primary me-3 fs-3">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <div className="text-muted small fw-bold text-uppercase">Friends Referred</div>
                  <div className="fs-4 fw-bold text-dark">{data.stats.totalReferredCount}</div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-white border rounded-4 shadow-sm d-flex align-items-center">
                <div className="rounded-3 p-3 bg-success bg-opacity-10 text-success me-3 fs-3">
                  <i className="fa-solid fa-plane-departure"></i>
                </div>
                <div>
                  <div className="text-muted small fw-bold text-uppercase">Successful Bookings</div>
                  <div className="fs-4 fw-bold text-dark">{data.stats.totalSuccessfulBookings}</div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-white border rounded-4 shadow-sm d-flex align-items-center">
                <div className="rounded-3 p-3 bg-warning bg-opacity-10 text-warning me-3 fs-3">
                  <i className="fa-solid fa-coins"></i>
                </div>
                <div>
                  <div className="text-muted small fw-bold text-uppercase">Total Earned</div>
                  <div className="fs-4 fw-bold text-dark">₹{data.stats.totalCommissionEarned.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Referred Friends Table */}
          <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
            <h5 className="fw-bold text-dark mb-3">
              <i className="fa-solid fa-user-plus text-primary me-2"></i> Referred Friends ({data.referredUsers.length})
            </h5>
            
            {loading ? (
              <div className="text-center py-4 text-muted">
                <div className="spinner-border spinner-border-sm me-2 text-primary" role="status"></div>
                Loading referral data...
              </div>
            ) : data.referredUsers.length === 0 ? (
              <div className="text-center py-4 bg-light rounded-3">
                <i className="fa-solid fa-user-group text-muted fs-2 mb-2"></i>
                <p className="text-secondary small mb-0">No friends have registered using your referral code yet.</p>
                <p className="text-muted text-xs">Share your code or link above to start earning rewards!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light text-uppercase small text-muted">
                    <tr>
                      <th>Friend Name</th>
                      <th>Email / Contact</th>
                      <th>Joined Date</th>
                      <th>Bookings Made</th>
                      <th>Commission Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.referredUsers.map((friend) => (
                      <tr key={friend.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-2"
                                 style={{ width: '36px', height: '36px', fontSize: '0.85rem' }}>
                              {(friend.first_name?.[0] || 'U').toUpperCase()}
                            </div>
                            <div>
                              <div className="fw-bold text-dark small">{friend.first_name} {friend.last_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="small text-secondary">{friend.email || friend.phone || 'N/A'}</td>
                        <td className="small text-muted">{new Date(friend.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td>
                          <span className="badge bg-info text-dark px-2.5 py-1.5 rounded-pill fw-bold">
                            {friend.total_bookings} Bookings
                          </span>
                        </td>
                        <td className="fw-bold text-success">
                          +₹{Number(friend.commission_earned).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Referral Reward Transactions History */}
          <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
            <h5 className="fw-bold text-dark mb-3">
              <i className="fa-solid fa-receipt text-success me-2"></i> Referral Commission Transactions
            </h5>

            {data.referralTransactions.length === 0 ? (
              <div className="text-center py-4 bg-light rounded-3">
                <i className="fa-solid fa-wallet text-muted fs-2 mb-2"></i>
                <p className="text-secondary small mb-0">No referral commission payouts logged yet.</p>
                <p className="text-muted text-xs">When your referred friends book a tour package, your cash rewards will appear here instantly!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light text-uppercase small text-muted">
                    <tr>
                      <th>Booking ID</th>
                      <th>Package Booked</th>
                      <th>Friend Name</th>
                      <th>Date</th>
                      <th>Commission</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.referralTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="fw-bold text-primary small">#{tx.booking_id}</td>
                        <td className="fw-bold text-dark small">{tx.package_title || 'Tour Package'}</td>
                        <td className="small text-secondary">{tx.friend_first_name} {tx.friend_last_name}</td>
                        <td className="small text-muted">{new Date(tx.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td className="fw-bold text-success">+₹{Number(tx.commission_amount).toLocaleString('en-IN')}</td>
                        <td>
                          <span className="badge bg-success text-white px-2 py-1 rounded-pill">
                            <i className="fa-solid fa-circle-check me-1"></i> {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* How It Works Guide */}
          <div className="bg-light p-4 rounded-4 border">
            <h6 className="fw-bold text-uppercase text-secondary small mb-3">How The Referral Program Works</h6>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 bg-white rounded-3 border h-100">
                  <div className="fw-bold text-primary mb-1">1. Share Code or Link</div>
                  <p className="text-muted small mb-0">Copy your unique referral code or link and send it to your friends or family.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-white rounded-3 border h-100">
                  <div className="fw-bold text-primary mb-1">2. Friend Registers</div>
                  <p className="text-muted small mb-0">Your friend signs up on Delta Safari using your link or code during registration.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-white rounded-3 border h-100">
                  <div className="fw-bold text-primary mb-1">3. Earn Cash Reward</div>
                  <p className="text-muted small mb-0">When your friend books any tour package, the referral commission is credited to your wallet!</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}