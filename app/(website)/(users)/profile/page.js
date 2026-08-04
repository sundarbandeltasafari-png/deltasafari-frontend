"use client";
import React, { useEffect, useState } from 'react';
import "../users.css";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { axiosGet } from '@/libs/axiosHelper';
import { getUserDetailsURL } from '@/routes/authRoutes';
import { setUser } from '@/services/reducers/userAuthSlice';

export default function ProfilePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.userAuth || {});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            setLoading(true);
            axiosGet(getUserDetailsURL, token)
                .then((res) => {
                    setLoading(false);
                    if (res?.status && res?.userDetails) {
                        dispatch(setUser({ user: res.userDetails, token }));
                    }
                })
                .catch(() => setLoading(false));
        }
    }, [token, dispatch]);

    const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23e2e8f0'/><circle cx='50' cy='38' r='20' fill='%2394a3b8'/><path d='M 18 86 C 18 64 34 56 50 56 C 66 56 82 64 82 86 Z' fill='%2394a3b8'/></svg>";

    const profilePic = user?.profile_pic 
        ? (user.profile_pic.startsWith('http') ? user.profile_pic : process.env.NEXT_PUBLIC_SERVER_URL + user.profile_pic)
        : DEFAULT_AVATAR;

    const userType = Number(user?.user_type) || 1; // 1 = Customer, 2 = Corporate, 3 = Agent
    const genderName = user?.gender == '1' ? 'Male' : user?.gender == '2' ? 'Female' : user?.gender == '3' ? 'Others' : (user?.gender || 'Not specified');

    // Corporate Dashboard Render
    if (userType === 2) {
        return (
            <div className="col-lg-8 col-xl-9">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="profile-panel" role="tabpanel">
                        
                        {/* Corporate Header Banner */}
                        <div className="gofly-card shadow-sm border-0 rounded-4 p-4 mb-4 bg-dark text-white position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}>
                            <div className="d-flex flex-column flex-md-row align-items-center gap-4 position-relative" style={{ zIndex: 1 }}>
                                <div className="position-relative">
                                    <img 
                                        src={profilePic} 
                                        className="rounded-circle border border-4 border-warning shadow" 
                                        style={{ width: "105px", height: "105px", objectFit: "cover" }} 
                                        alt="Corporate Account" 
                                    />
                                    <span className="position-absolute bottom-0 end-0 bg-warning text-dark rounded-circle px-2 py-1 fs-6 fw-bold" title="Enterprise Account">
                                        <i className="fa-solid fa-building"></i>
                                    </span>
                                </div>
                                <div className="text-center text-md-start flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                                        <span className="badge bg-warning text-dark fw-bold px-3 py-1.5 rounded-pill text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                                            <i className="fa-solid fa-shield-halved me-1"></i> Corporate Enterprise Partner
                                        </span>
                                    </div>
                                    <h3 className="fw-bold text-white mb-1">
                                        {user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : 'Corporate Enterprise'}
                                    </h3>
                                    <p className="text-light text-opacity-75 mb-2 small">
                                        <i className="bi bi-envelope me-1 text-warning"></i> {user?.email || 'corporate@deltasafari.com'}
                                        {user?.phone && <span className="ms-3"><i className="bi bi-telephone me-1 text-warning"></i> {user.phone}</span>}
                                    </p>
                                </div>
                                <div>
                                    <button 
                                        className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark d-flex align-items-center gap-2 shadow"
                                        onClick={() => router.push('/editprofile')}
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i> Corporate Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Corporate Key Metrics */}
                        <div className="row g-3 mb-4">
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle d-flex align-items-center gap-3">
                                    <div className="rounded-3 p-3 text-primary bg-primary-subtle fs-4">
                                        <i className="fa-solid fa-chart-line"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-semibold text-uppercase">Total Spend</div>
                                        <div className="fw-bold text-dark fs-5">$48,250</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle d-flex align-items-center gap-3">
                                    <div className="rounded-3 p-3 text-success bg-success-subtle fs-4">
                                        <i className="fa-solid fa-suitcase-rolling"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-semibold text-uppercase">Active Trips</div>
                                        <div className="fw-bold text-dark fs-5">12 Bookings</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle d-flex align-items-center gap-3">
                                    <div className="rounded-3 p-3 text-warning bg-warning-subtle fs-4">
                                        <i className="fa-solid fa-clock-rotate-left"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-semibold text-uppercase">Requests</div>
                                        <div className="fw-bold text-dark fs-5">3 Pending</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle d-flex align-items-center gap-3">
                                    <div className="rounded-3 p-3 text-danger bg-danger-subtle fs-4">
                                        <i className="fa-solid fa-tags"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-semibold text-uppercase">Tier Discount</div>
                                        <div className="fw-bold text-dark fs-5">15% Off</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Corporate Bookings */}
                        <div className="gofly-card shadow-sm border-0 rounded-4 p-4 mb-4">
                            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                                <h4 className="fw-bold text-dark m-0" style={{ fontSize: '18px' }}>
                                    <i className="fa-solid fa-briefcase me-2 text-primary"></i> Corporate Employee Bookings
                                </h4>
                                <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => router.push('/bookings')}>
                                    View All
                                </button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Ref ID</th>
                                            <th>Employee / Guest</th>
                                            <th>Destination / Tour</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold text-primary">#CORP-8092</td>
                                            <td>David Vance</td>
                                            <td>Serengeti Luxury Safari</td>
                                            <td>12 Aug 2026</td>
                                            <td className="fw-bold">$4,200</td>
                                            <td><span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1">Confirmed</span></td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-primary">#CORP-8041</td>
                                            <td>Sarah Jenkins</td>
                                            <td>Kilimanjaro Summit Trek</td>
                                            <td>28 Aug 2026</td>
                                            <td className="fw-bold">$3,850</td>
                                            <td><span className="badge bg-warning-subtle text-warning rounded-pill px-2.5 py-1">Pending Approval</span></td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-primary">#CORP-7920</td>
                                            <td>Robert Smith</td>
                                            <td>Zanzibar Beach Resort</td>
                                            <td>05 Sep 2026</td>
                                            <td className="fw-bold">$2,900</td>
                                            <td><span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1">Confirmed</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // Agent Dashboard Render
    if (userType === 3) {
        return (
            <div className="col-lg-8 col-xl-9">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="profile-panel" role="tabpanel">
                        
                        {/* Agent Header Banner */}
                        <div className="gofly-card shadow-sm border-0 rounded-4 p-4 mb-4 text-white position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #065f46 0%, #047857 100%)" }}>
                            <div className="d-flex flex-column flex-md-row align-items-center gap-4 position-relative" style={{ zIndex: 1 }}>
                                <div className="position-relative">
                                    <img 
                                        src={profilePic} 
                                        className="rounded-circle border border-4 border-light shadow" 
                                        style={{ width: "105px", height: "105px", objectFit: "cover" }} 
                                        alt="Agent Account" 
                                    />
                                    <span className="position-absolute bottom-0 end-0 bg-light text-success rounded-circle px-2 py-1 fs-6 fw-bold" title="Certified Agent">
                                        <i className="fa-solid fa-award"></i>
                                    </span>
                                </div>
                                <div className="text-center text-md-start flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                                        <span className="badge bg-light text-success fw-bold px-3 py-1.5 rounded-pill text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                                            <i className="fa-solid fa-user-shield me-1"></i> Certified Gold Agent Partner
                                        </span>
                                    </div>
                                    <h3 className="fw-bold text-white mb-1">
                                        {user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : 'Authorized Agent'}
                                    </h3>
                                    <p className="text-light text-opacity-75 mb-2 small">
                                        <i className="bi bi-envelope me-1"></i> {user?.email || 'agent@deltasafari.com'}
                                        {user?.phone && <span className="ms-3"><i className="bi bi-telephone me-1"></i> {user.phone}</span>}
                                    </p>
                                </div>
                                <div>
                                    <button 
                                        className="btn btn-light rounded-pill px-4 py-2 fw-bold text-success d-flex align-items-center gap-2 shadow"
                                        onClick={() => router.push('/editprofile')}
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i> Agent Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Agent Performance Metrics */}
                        <div className="row g-3 mb-4">
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle d-flex align-items-center gap-3">
                                    <div className="rounded-3 p-3 text-success bg-success-subtle fs-4">
                                        <i className="fa-solid fa-wallet"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-semibold text-uppercase">Total Earned</div>
                                        <div className="fw-bold text-dark fs-5">$14,850</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle d-flex align-items-center gap-3">
                                    <div className="rounded-3 p-3 text-warning bg-warning-subtle fs-4">
                                        <i className="fa-solid fa-hourglass-half"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-semibold text-uppercase">Pending Payout</div>
                                        <div className="fw-bold text-dark fs-5">$2,400</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle d-flex align-items-center gap-3">
                                    <div className="rounded-3 p-3 text-primary bg-primary-subtle fs-4">
                                        <i className="fa-solid fa-users"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-semibold text-uppercase">Client Bookings</div>
                                        <div className="fw-bold text-dark fs-5">86 Tours</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle d-flex align-items-center gap-3">
                                    <div className="rounded-3 p-3 text-info bg-info-subtle fs-4">
                                        <i className="fa-solid fa-percent"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-semibold text-uppercase">Commission</div>
                                        <div className="fw-bold text-dark fs-5">12% Margin</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Agent Bookings & Earnings Table */}
                        <div className="gofly-card shadow-sm border-0 rounded-4 p-4 mb-4">
                            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                                <h4 className="fw-bold text-dark m-0" style={{ fontSize: '18px' }}>
                                    <i className="fa-solid fa-handshake me-2 text-success"></i> Client Bookings & Commission Breakdown
                                </h4>
                                <button className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={() => router.push('/bookings')}>
                                    View All
                                </button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Ref ID</th>
                                            <th>Client Name</th>
                                            <th>Package Name</th>
                                            <th>Package Price</th>
                                            <th>Commission (12%)</th>
                                            <th>Payout Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold text-success">#AGT-9421</td>
                                            <td>Michael Brown</td>
                                            <td>5-Day Migration Safari</td>
                                            <td className="fw-bold">$3,500</td>
                                            <td className="fw-bold text-success">+$420.00</td>
                                            <td><span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1">Paid to Wallet</span></td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-success">#AGT-9380</td>
                                            <td>Elena Rostova</td>
                                            <td>Ngorongoro Crater Tour</td>
                                            <td className="fw-bold">$2,800</td>
                                            <td className="fw-bold text-success">+$336.00</td>
                                            <td><span className="badge bg-warning-subtle text-warning rounded-pill px-2.5 py-1">Pending Clearance</span></td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-success">#AGT-9120</td>
                                            <td>James Wilson</td>
                                            <td>Zanzibar Luxury Villa</td>
                                            <td className="fw-bold">$4,600</td>
                                            <td className="fw-bold text-success">+$552.00</td>
                                            <td><span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1">Paid to Wallet</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // Standard Customer Profile / Dashboard Render (userType === 1)
    return (
        <div className="col-lg-8 col-xl-9">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="profile-panel" role="tabpanel">
                    <div className="gofly-card shadow-sm border-0 rounded-4 p-4 mb-4">
                        
                        {/* Profile Header Banner */}
                        <div className="d-flex flex-column flex-md-row align-items-center gap-4 pb-4 border-bottom">
                            <div className="position-relative">
                                <img 
                                    src={profilePic} 
                                    className="rounded-circle border border-4 border-white shadow" 
                                    style={{ width: "110px", height: "110px", objectFit: "cover" }} 
                                    alt="User Profile" 
                                />
                                <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle p-2" title="Active Account"></span>
                            </div>
                            <div className="text-center text-md-start flex-grow-1">
                                <h3 className="fw-bold text-dark mb-1">
                                    {user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : 'Customer Profile'}
                                </h3>
                                <p className="text-muted mb-2">
                                    <i className="bi bi-envelope me-1 text-primary"></i> {user?.email || 'No email provided'}
                                </p>
                                <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
                                    <span className="badge bg-primary-subtle text-primary fw-semibold px-3 py-2 rounded-pill">
                                        <i className="bi bi-shield-check me-1"></i> Customer Member
                                    </span>
                                    {user?.phone && (
                                        <span className="badge bg-light text-dark fw-medium px-3 py-2 rounded-pill border">
                                            <i className="bi bi-telephone me-1"></i> {user.phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button 
                                    className="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
                                    onClick={() => router.push('/editprofile')}
                                >
                                    <i className="fa-regular fa-pen-to-square"></i> Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Profile Information Grid */}
                        <h4 className="fw-bold text-dark mt-4 mb-3" style={{ fontSize: '18px' }}>Personal Details</h4>
                        
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3 border">
                                    <div className="text-muted small fw-semibold text-uppercase mb-1">First Name</div>
                                    <div className="fw-bold text-dark fs-6">{user?.first_name || 'N/A'}</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3 border">
                                    <div className="text-muted small fw-semibold text-uppercase mb-1">Last Name</div>
                                    <div className="fw-bold text-dark fs-6">{user?.last_name || 'N/A'}</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3 border">
                                    <div className="text-muted small fw-semibold text-uppercase mb-1">Email Address</div>
                                    <div className="fw-bold text-dark fs-6">{user?.email || 'N/A'}</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3 border">
                                    <div className="text-muted small fw-semibold text-uppercase mb-1">Phone Number</div>
                                    <div className="fw-bold text-dark fs-6">{user?.phone || 'N/A'}</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3 border">
                                    <div className="text-muted small fw-semibold text-uppercase mb-1">Gender</div>
                                    <div className="fw-bold text-dark fs-6">{genderName}</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="p-3 bg-light rounded-3 border">
                                    <div className="text-muted small fw-semibold text-uppercase mb-1">City / Location</div>
                                    <div className="fw-bold text-dark fs-6">{user?.city || user?.address || 'N/A'}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}