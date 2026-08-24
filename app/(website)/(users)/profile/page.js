"use client";

import React, { useEffect, useState } from 'react';
import "../users.css";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { axiosGet, axiosPost, axiosNormalPost } from '@/libs/axiosHelper';
import { getUserDetailsURL, getAgentDashboardStatsURL, updateAgentBankDetailsURL, requestAgentWithdrawalURL } from '@/routes/authRoutes';
import { setUser } from '@/services/reducers/userAuthSlice';
import { showMessage } from '@/libs/commonHelper';
import { getSavedPackagesUrl, toggleSavePackageUrl } from '@/routes/serviceRoutes';
import CorporateWizardForm from '@/components/corporate/CorporateWizardForm';

export default function ProfilePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.userAuth || {});

    const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard', 'bookings', 'bank', 'wallet', 'settings'
    const [loading, setLoading] = useState(false);
    const [statsData, setStatsData] = useState(null);
    const [corporateWizardOpen, setCorporateWizardOpen] = useState(false);

    // Bank Details Form State
    const [bankForm, setBankForm] = useState({
        bank_name: '',
        account_number: '',
        ifsc_code: '',
        account_holder: '',
        upi_id: ''
    });
    const [savingBank, setSavingBank] = useState(false);

    // Withdraw Form State
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [payoutMethod, setPayoutMethod] = useState('BANK'); // 'BANK' or 'UPI'
    const [submittingWithdraw, setSubmittingWithdraw] = useState(false);

    // Selected booking detail modal
    const [viewBookingModal, setViewBookingModal] = useState(null);

    // Password State
    const [passForm, setPassForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [updatingPass, setUpdatingPass] = useState(false);

    // Saved Packages / Wishlist State
    const [savedPackages, setSavedPackages] = useState([]);
    const [savedLoading, setSavedLoading] = useState(false);

    const fetchSavedPackages = () => {
        let uid = user?.id;
        if (!uid && typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem("user") || localStorage.getItem("user_details") || localStorage.getItem("userAuth");
                if (stored) uid = JSON.parse(stored)?.id;
            } catch (e) {}
        }
        if (!uid) return;
        setSavedLoading(true);
        axiosNormalPost(getSavedPackagesUrl, { user_id: uid })
            .then((res) => {
                if (res && res.status) {
                    setSavedPackages(Array.isArray(res.packages) ? res.packages : []);
                }
            })
            .catch(() => {})
            .finally(() => setSavedLoading(false));
    };

    useEffect(() => {
        fetchSavedPackages();
    }, [user, token]);

    const handleRemoveSavedPackage = async (packageId, e) => {
        e.preventDefault();
        e.stopPropagation();
        let uid = user?.id;
        if (!uid && typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem("user") || localStorage.getItem("user_details") || localStorage.getItem("userAuth");
                if (stored) uid = JSON.parse(stored)?.id;
            } catch (e) {}
        }
        if (!uid) return;
        try {
            const res = await axiosNormalPost(toggleSavePackageUrl, { user_id: uid, package_id: packageId });
            if (res && res.status) {
                setSavedPackages((prev) => prev.filter((p) => p.id !== packageId));
                showMessage("Package removed from saved wishlist.", "info");
            }
        } catch (err) {
            showMessage("Error removing saved package.", "error");
        }
    };

    const fetchAgentData = () => {
        if (!token) return;
        setLoading(true);
        axiosGet(getAgentDashboardStatsURL, token)
            .then((res) => {
                setLoading(false);
                if (res?.status) {
                    setStatsData(res);
                    if (res?.agent) {
                        setBankForm({
                            bank_name: res.agent.bank_name || '',
                            account_number: res.agent.account_number || '',
                            ifsc_code: res.agent.ifsc_code || '',
                            account_holder: res.agent.account_holder || `${res.agent.first_name} ${res.agent.last_name || ''}`.trim(),
                            upi_id: res.agent.upi_id || ''
                        });
                    }
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (token) {
            axiosGet(getUserDetailsURL, token)
                .then((res) => {
                    if (res?.status && res?.userDetails) {
                        dispatch(setUser({ user: res.userDetails, token }));
                    }
                })
                .catch(() => {});
            
            if (Number(user?.user_type) === 3) {
                fetchAgentData();
            }
        }
    }, [token, dispatch, user?.user_type]);

    const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23e2e8f0'/><circle cx='50' cy='38' r='20' fill='%2394a3b8'/><path d='M 18 86 C 18 64 34 56 50 56 C 66 56 82 64 82 86 Z' fill='%2394a3b8'/></svg>";

    const profilePic = user?.profile_pic 
        ? (user.profile_pic.startsWith('http') ? user.profile_pic : process.env.NEXT_PUBLIC_SERVER_URL + user.profile_pic)
        : DEFAULT_AVATAR;

    const userType = Number(user?.user_type) || 1; // 1 = Customer, 2 = Corporate, 3 = Agent
    const genderName = user?.gender == '1' ? 'Male' : user?.gender == '2' ? 'Female' : user?.gender == '3' ? 'Others' : (user?.gender || 'Not specified');

    // Save Bank Details
    const handleSaveBank = async (e) => {
        e.preventDefault();
        setSavingBank(true);
        try {
            const res = await axiosPost(updateAgentBankDetailsURL, bankForm, token);
            if (res.status) {
                showMessage('Indian Bank Account & UPI details saved successfully!', 'success');
                fetchAgentData();
            } else {
                showMessage(res.msg || 'Failed to save bank details.', 'error');
            }
        } catch (err) {
            showMessage(err?.response?.data?.msg || err.message || 'Error updating bank details.', 'error');
        } finally {
            setSavingBank(false);
        }
    };

    // Request Payout / Withdrawal
    const handleRequestWithdrawal = async (e) => {
        e.preventDefault();
        const amt = Number(withdrawAmount);
        const walletBal = Number(statsData?.stats?.walletBalance || user?.wallet_balance || 0);

        if (!amt || amt <= 0) {
            showMessage('Please enter a valid withdrawal amount in ₹.', 'error');
            return;
        }
        if (amt < 500) {
            showMessage('Minimum withdrawal amount is ₹500.', 'error');
            return;
        }
        if (amt > walletBal) {
            showMessage(`Insufficient balance! Your current wallet balance is ₹${walletBal.toLocaleString('en-IN')}.`, 'error');
            return;
        }

        setSubmittingWithdraw(true);
        try {
            const payload = {
                amount: amt,
                bank_name: bankForm.bank_name,
                account_number: bankForm.account_number,
                ifsc_code: bankForm.ifsc_code,
                account_holder: bankForm.account_holder,
                upi_id: bankForm.upi_id
            };
            const res = await axiosPost(requestAgentWithdrawalURL, payload, token);
            if (res.status) {
                showMessage(`Withdrawal of ₹${amt.toLocaleString('en-IN')} requested successfully!`, 'success');
                setWithdrawAmount('');
                fetchAgentData();
            } else {
                showMessage(res.msg || 'Withdrawal failed.', 'error');
            }
        } catch (err) {
            showMessage(err?.response?.data?.msg || err.message || 'Server error during withdrawal.', 'error');
        } finally {
            setSubmittingWithdraw(false);
        }
    };

    // Change Password
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passForm.newPassword !== passForm.confirmPassword) {
            showMessage('New password and confirm password do not match!', 'error');
            return;
        }
        setUpdatingPass(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/user/changePassword`;
            const res = await axiosNormalPost(url, passForm, token);
            if (res.status) {
                showMessage('Account password changed successfully!', 'success');
                setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                showMessage(res.msg || 'Failed to update password.', 'error');
            }
        } catch (err) {
            showMessage(err?.response?.data?.msg || err.message || 'Error updating password.', 'error');
        } finally {
            setUpdatingPass(false);
        }
    };

    const safeParseTravelers = (jsonStr) => {
        if (!jsonStr) return [];
        try {
            return typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
        } catch (e) {
            return [];
        }
    };

    // =========================================================================
    // 1. AGENT DASHBOARD RENDER (userType === 3)
    // =========================================================================
    if (userType === 3) {
        const stats = statsData?.stats || {
            walletBalance: Number(user?.wallet_balance) || 0,
            totalCommissionEarned: 0,
            pendingCommission: 0,
            totalBookings: 0,
            confirmedBookings: 0,
            pendingBookings: 0,
            monthlyStats: []
        };
        const bookingsList = statsData?.bookings || [];
        const transactionsList = statsData?.transactions || [];
        const withdrawalsList = statsData?.withdrawals || [];

        // Trajectory chart calculation
        const maxCommission = Math.max(...(stats.monthlyStats?.map(m => m.commission) || [1000]), 5000);

        return (
            <div className="col-lg-8 col-xl-9">
                {/* Hero Glassmorphic Header */}
                <div 
                    className="card border-0 shadow-lg rounded-4 p-4 mb-4 text-white position-relative overflow-hidden" 
                    style={{ background: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #0f766e 100%)" }}
                >
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 position-relative" style={{ zIndex: 2 }}>
                        <div className="d-flex flex-column flex-md-row align-items-center gap-3.5 text-center text-md-start">
                            <div className="position-relative">
                                <img 
                                    src={profilePic} 
                                    className="rounded-circle border border-4 border-warning shadow" 
                                    style={{ width: "95px", height: "95px", objectFit: "cover" }} 
                                    alt="Certified Agent" 
                                />
                                <span className="position-absolute bottom-0 end-0 bg-warning text-dark rounded-circle px-2 py-1 fs-6 fw-bold shadow-sm" title="Certified Gold Agent">
                                    <i className="fa-solid fa-award"></i>
                                </span>
                            </div>
                            <div>
                                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                                    <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill text-uppercase" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                                        <i className="fa-solid fa-shield-check me-1"></i> Authorized Agent Partner (B2B)
                                    </span>
                                    <span className="badge bg-white bg-opacity-20 text-white px-2.5 py-1 rounded-pill" style={{ fontSize: "10px" }}>
                                        Agent ID: #AGT-{user?.id || '23'}
                                    </span>
                                </div>
                                <h3 className="fw-bold text-white mb-0">
                                    {user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : 'Certified Travel Agent'}
                                </h3>
                                <p className="text-light text-opacity-75 mb-0 small mt-1">
                                    <i className="bi bi-envelope me-1 text-warning"></i> {user?.email || 'agent@deltasafari.com'}
                                    {user?.phone && <span className="ms-3"><i className="bi bi-telephone me-1 text-warning"></i> {user.phone}</span>}
                                </p>
                            </div>
                        </div>

                        {/* Navigation Pills */}
                        <div className="d-flex flex-wrap gap-2">
                            <button 
                                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${activeTab === 'dashboard' ? 'btn-warning text-dark shadow' : 'btn-outline-light'}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <i className="fa-solid fa-chart-line me-1"></i> Overview
                            </button>
                            <button 
                                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${activeTab === 'bookings' ? 'btn-warning text-dark shadow' : 'btn-outline-light'}`}
                                onClick={() => setActiveTab('bookings')}
                            >
                                <i className="fa-solid fa-suitcase me-1"></i> Bookings ({bookingsList.length})
                            </button>
                            <button 
                                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${activeTab === 'bank' ? 'btn-warning text-dark shadow' : 'btn-outline-light'}`}
                                onClick={() => setActiveTab('bank')}
                            >
                                <i className="fa-solid fa-building-columns me-1"></i> Bank A/C
                            </button>
                            <button 
                                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${activeTab === 'wallet' ? 'btn-warning text-dark shadow' : 'btn-outline-light'}`}
                                onClick={() => setActiveTab('wallet')}
                            >
                                <i className="fa-solid fa-wallet me-1"></i> Wallet (₹{stats.walletBalance.toLocaleString('en-IN')})
                            </button>
                        </div>
                    </div>
                </div>

                {/* TAB 1: OVERVIEW & PERFORMANCE DASHBOARD */}
                {activeTab === 'dashboard' && (
                    <>
                        {/* 4 Animated KPI Metrics Cards */}
                        <div className="row g-3 mb-4">
                            {/* Wallet Balance Card */}
                            <div className="col-sm-6 col-xl-3">
                                <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle position-relative overflow-hidden hover-lift transition-all">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Wallet Balance</span>
                                        <div className="rounded-3 p-2 bg-success-subtle text-success fs-5">
                                            <i className="fa-solid fa-wallet"></i>
                                        </div>
                                    </div>
                                    <div className="fw-extrabold text-success fs-4 mb-1">
                                        ₹{stats.walletBalance.toLocaleString('en-IN')}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top">
                                        <small className="text-muted" style={{ fontSize: '11px' }}>Ready for Payout</small>
                                        <button 
                                            className="btn btn-xs btn-outline-success rounded-pill px-2.5 py-0.5" 
                                            style={{ fontSize: '11px' }}
                                            onClick={() => setActiveTab('wallet')}
                                        >
                                            Withdraw ₹
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Total Commission Earned */}
                            <div className="col-sm-6 col-xl-3">
                                <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all p-2">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Total Commission</span>
                                        <div className="rounded-3 p-2 bg-primary-subtle text-primary fs-5">
                                            <i className="fa-solid fa-gift"></i>
                                        </div>
                                    </div>
                                    <div className="fw-extrabold text-primary fs-4 mb-1">
                                        ₹{stats.totalCommissionEarned.toLocaleString('en-IN')}
                                    </div>
                                    <div className="d-flex align-items-center gap-1 mt-2 pt-2 border-top text-muted" style={{ fontSize: '11px' }}>
                                        <i className="fa-solid fa-circle-check text-success"></i> {stats.confirmedBookings} Confirmed Tours
                                    </div>
                                </div>
                            </div>

                            {/* Pending Commission */}
                            <div className="col-sm-6 col-xl-3">
                                <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all p-2">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Pending Settle</span>
                                        <div className="rounded-3 p-2 bg-warning-subtle text-warning fs-5">
                                            <i className="fa-solid fa-hourglass-half"></i>
                                        </div>
                                    </div>
                                    <div className="fw-extrabold text-warning fs-4 mb-1">
                                        ₹{stats.pendingCommission.toLocaleString('en-IN')}
                                    </div>
                                    <div className="d-flex align-items-center gap-1 mt-2 pt-2 border-top text-muted" style={{ fontSize: '11px' }}>
                                        <i className="fa-solid fa-clock text-warning"></i> {stats.pendingBookings} Tours in Review
                                    </div>
                                </div>
                            </div>

                            {/* Total Client Bookings */}
                            <div className="col-sm-6 col-xl-3">
                                <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all p-2">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Total Bookings</span>
                                        <div className="rounded-3 p-2 bg-info-subtle text-info fs-5">
                                            <i className="fa-solid fa-users"></i>
                                        </div>
                                    </div>
                                    <div className="fw-extrabold text-dark fs-4 mb-1">
                                        {stats.totalBookings} Tours
                                    </div>
                                    <div className="d-flex align-items-center gap-1 mt-2 pt-2 border-top text-muted" style={{ fontSize: '11px' }}>
                                        <i className="fa-solid fa-indian-rupee-sign text-info"></i> ₹{(stats.totalBookingVolume || 0).toLocaleString('en-IN')} Volume
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Animated SVG Monthly Trajectory Graph */}
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
                                <div>
                                    <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                        <i className="fa-solid fa-chart-area text-success"></i> 6-Month Agent Commission & Revenue Trajectory
                                    </h5>
                                    <p className="text-muted small mb-0">Monthly commission payouts in INR (₹) and tour volume trend</p>
                                </div>
                                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1.5 rounded-pill fw-bold">
                                    Live Performance Curve
                                </span>
                            </div>

                            {/* Animated SVG Chart */}
                            <div className="p-3 bg-light rounded-4 border">
                                <div className="d-flex justify-content-between align-items-end gap-2" style={{ height: '160px' }}>
                                    {stats.monthlyStats?.map((m, idx) => {
                                        const comm = Number(m.commission) || 0;
                                        const heightPct = Math.max(12, Math.min(100, Math.round((comm / maxCommission) * 100)));

                                        return (
                                            <div key={idx} className="flex-fill d-flex flex-column align-items-center h-100 justify-content-end group position-relative">
                                                <div 
                                                    className="w-100 rounded-3 shadow-xs position-relative transition-all"
                                                    style={{
                                                        height: `${heightPct}%`,
                                                        background: 'linear-gradient(180deg, #10b981 0%, #047857 100%)',
                                                        maxWidth: '48px',
                                                        cursor: 'pointer'
                                                    }}
                                                    title={`${m.month}: ₹${comm.toLocaleString('en-IN')} (${m.bookingsCount} Tours)`}
                                                >
                                                    <span className="position-absolute top-0 start-50 translate-middle-x badge bg-dark text-white text-3xs px-1.5 py-0.5 rounded-pill opacity-0 hover-opacity-100" style={{ fontSize: '9px', transform: 'translateY(-120%)' }}>
                                                        ₹{comm.toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                                <span className="small text-muted fw-bold mt-2" style={{ fontSize: '11px' }}>
                                                    {m.shortMonth}
                                                </span>
                                                <span className="text-3xs text-secondary" style={{ fontSize: '10px' }}>
                                                    ₹{comm >= 1000 ? `${(comm / 1000).toFixed(1)}k` : comm}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Recent Client Bookings Table Preview */}
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                                <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-handshake text-success"></i> Recent Client Bookings & Commission Ledger
                                </h5>
                                <button className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={() => setActiveTab('bookings')}>
                                    View All Bookings ({bookingsList.length})
                                </button>
                            </div>

                            <div className="table-responsive">
                                {bookingsList.length === 0 ? (
                                    <div className="p-4 text-center text-muted">
                                        <i className="fa-solid fa-suitcase-rolling fs-1 text-muted opacity-50 mb-2"></i>
                                        <p className="mb-0">No client bookings yet. Book any package on behalf of your clients to start earning commissions!</p>
                                    </div>
                                ) : (
                                    <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                                        <thead className="table-light">
                                            <tr>
                                                <th>Booking ID</th>
                                                <th>Client / Travelers</th>
                                                <th>Tour Package</th>
                                                <th>Travel Date</th>
                                                <th>Total Cost (₹)</th>
                                                <th>Your Commission (₹)</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookingsList.slice(0, 5).map((b) => {
                                                const comm = Number(b.commission_amount) || 0;
                                                const total = Number(b.total_cost) || 0;
                                                const travelers = safeParseTravelers(b.travelers);

                                                return (
                                                    <tr key={b.bookings_id || b.id}>
                                                        <td className="fw-bold text-primary">#{b.bookings_id || b.id}</td>
                                                        <td>
                                                            <div className="d-flex flex-column">
                                                                <span className="fw-bold text-dark">{b.customer_name}</span>
                                                                <span className="text-muted small">{b.customer_phone}</span>
                                                                <span className="badge bg-light text-secondary border mt-0.5 w-auto d-inline-block" style={{ fontSize: '10px' }}>
                                                                    {b.total_travelers || travelers.length || 1} Travelers
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="fw-semibold text-dark">{b.package_title || 'Safari Package'}</span>
                                                        </td>
                                                        <td>{b.departure_date ? new Date(b.departure_date).toLocaleDateString('en-IN') : 'N/A'}</td>
                                                        <td className="fw-bold text-dark">₹{total.toLocaleString('en-IN')}</td>
                                                        <td>
                                                            <span className="badge bg-success-subtle text-success border border-success-subtle fw-bold px-2.5 py-1">
                                                                +₹{comm.toLocaleString('en-IN')}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {Number(b.booking_status) === 2 ? (
                                                                <span className="badge bg-success rounded-pill px-2.5 py-1">Confirmed & Credited</span>
                                                            ) : Number(b.booking_status) === 1 ? (
                                                                <span className="badge bg-warning text-dark rounded-pill px-2.5 py-1">Pending Clearance</span>
                                                            ) : (
                                                                <span className="badge bg-danger rounded-pill px-2.5 py-1">Cancelled</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <button 
                                                                className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                                                                onClick={() => setViewBookingModal(b)}
                                                            >
                                                                <i className="bi bi-eye"></i> Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* TAB 2: CLIENT BOOKINGS LEDGER */}
                {activeTab === 'bookings' && (
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                            <div>
                                <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-suitcase text-primary"></i> All Client Bookings & Travelers Ledger
                                </h5>
                                <p className="text-muted small mb-0">Complete record of your client reservations, departures, and commissions in INR (₹)</p>
                            </div>
                            <button className="btn btn-sm btn-primary rounded-pill px-3" onClick={() => router.push('/packages/destination-sundarban')}>
                                <i className="fa-solid fa-plus me-1"></i> New Client Booking
                            </button>
                        </div>

                        <div className="table-responsive">
                            {bookingsList.length === 0 ? (
                                <div className="p-5 text-center text-muted">
                                    <i className="fa-solid fa-folder-open fs-1 text-muted opacity-50 mb-2"></i>
                                    <p className="mb-0">No client bookings recorded yet.</p>
                                </div>
                            ) : (
                                <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Booking ID</th>
                                            <th>Client Name</th>
                                            <th>Travelers</th>
                                            <th>Tour Package</th>
                                            <th>Departure Date</th>
                                            <th>Total (₹)</th>
                                            <th>Commission (₹)</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookingsList.map((b) => {
                                            const comm = Number(b.commission_amount) || 0;
                                            const total = Number(b.total_cost) || 0;
                                            const travelers = safeParseTravelers(b.travelers);

                                            return (
                                                <tr key={b.bookings_id || b.id}>
                                                    <td className="fw-bold text-primary">#{b.bookings_id || b.id}</td>
                                                    <td>
                                                        <div className="d-flex flex-column">
                                                            <span className="fw-bold text-dark">{b.customer_name}</span>
                                                            <span className="text-muted small">{b.customer_phone}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-light text-dark border">
                                                            <i className="fa-solid fa-users me-1 text-primary"></i> {b.total_travelers || travelers.length || 1} Pax
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fw-semibold text-dark">{b.package_title || 'Safari Package'}</span>
                                                    </td>
                                                    <td>{b.departure_date ? new Date(b.departure_date).toLocaleDateString('en-IN') : 'N/A'}</td>
                                                    <td className="fw-bold text-dark">₹{total.toLocaleString('en-IN')}</td>
                                                    <td>
                                                        <span className="badge bg-success-subtle text-success border border-success-subtle fw-bold px-2.5 py-1">
                                                            +₹{comm.toLocaleString('en-IN')}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {Number(b.booking_status) === 2 ? (
                                                            <span className="badge bg-success rounded-pill px-2.5 py-1">Confirmed & Credited</span>
                                                        ) : Number(b.booking_status) === 1 ? (
                                                            <span className="badge bg-warning text-dark rounded-pill px-2.5 py-1">Pending Clearance</span>
                                                        ) : (
                                                            <span className="badge bg-danger rounded-pill px-2.5 py-1">Cancelled</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                                                            onClick={() => setViewBookingModal(b)}
                                                        >
                                                            <i className="bi bi-eye"></i> Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {/* TAB 3: INDIAN BANK ACCOUNT MANAGEMENT */}
                {activeTab === 'bank' && (
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-4">
                            <div>
                                <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-building-columns text-success"></i> Indian Bank Account & UPI Management
                                </h5>
                                <p className="text-muted small mb-0">Register your official bank account or UPI ID to receive instant commission payouts in INR (₹)</p>
                            </div>
                            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1.5 rounded-pill fw-bold">
                                <i className="fa-solid fa-shield-halved me-1"></i> RBI Compliant
                            </span>
                        </div>

                        <form onSubmit={handleSaveBank}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Account Holder Name <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5" 
                                        placeholder="e.g. Kaushik Mahata" 
                                        value={bankForm.account_holder} 
                                        onChange={(e) => setBankForm({ ...bankForm, account_holder: e.target.value })}
                                        required 
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Indian Bank Name <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5" 
                                        placeholder="e.g. State Bank of India / HDFC Bank / ICICI Bank" 
                                        value={bankForm.bank_name} 
                                        onChange={(e) => setBankForm({ ...bankForm, bank_name: e.target.value })}
                                        required 
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">Account Number <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5" 
                                        placeholder="e.g. 50100234567890" 
                                        value={bankForm.account_number} 
                                        onChange={(e) => setBankForm({ ...bankForm, account_number: e.target.value })}
                                        required 
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase">IFSC Code <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5 text-uppercase" 
                                        placeholder="e.g. SBIN0001234 / HDFC0001234" 
                                        value={bankForm.ifsc_code} 
                                        onChange={(e) => setBankForm({ ...bankForm, ifsc_code: e.target.value.toUpperCase() })}
                                        required 
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label text-muted small fw-bold text-uppercase">UPI ID / VPA (For Instant Payouts)</label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5" 
                                        placeholder="e.g. 9876543210@upi / agent@okhdfcbank" 
                                        value={bankForm.upi_id} 
                                        onChange={(e) => setBankForm({ ...bankForm, upi_id: e.target.value })}
                                    />
                                    <small className="text-muted">Optional: You can provide a UPI ID for expedited payouts.</small>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-top d-flex justify-content-end">
                                <button 
                                    type="submit" 
                                    className="btn btn-success rounded-pill px-5 py-2.5 fw-bold shadow d-flex align-items-center gap-2"
                                    disabled={savingBank}
                                >
                                    {savingBank ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                            <span>Saving Details...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-check-circle"></i>
                                            <span>Save Indian Bank & UPI Details</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* TAB 4: WALLET, WITHDRAWAL & COMMISSION LEDGER */}
                {activeTab === 'wallet' && (
                    <>
                        <div className="row g-4 mb-4">
                            {/* Available Balance Box */}
                            <div className="col-lg-5">
                                <div className="card border-0 shadow-sm rounded-4 p-4 text-white h-100" style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill">
                                            Agent Commission Wallet
                                        </span>
                                        <i className="fa-solid fa-wallet fs-3 text-warning"></i>
                                    </div>
                                    <small className="text-light text-opacity-75 text-uppercase fw-bold" style={{ fontSize: '11px' }}>Available Balance</small>
                                    <h2 className="fw-extrabold text-warning my-2 display-6">
                                        ₹{stats.walletBalance.toLocaleString('en-IN')}
                                    </h2>
                                    <div className="d-flex justify-content-between pt-3 mt-3 border-top border-secondary text-light text-opacity-75 small">
                                        <span>Total Earned:</span>
                                        <strong className="text-white">₹{stats.totalCommissionEarned.toLocaleString('en-IN')}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Payout Withdrawal Request Form */}
                            <div className="col-lg-7">
                                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                                    <h5 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                                        <i className="fa-solid fa-money-bill-transfer text-success"></i> Withdraw Commission to Bank
                                    </h5>
                                    <p className="text-muted small mb-3">Transfer your earned commission directly to your registered bank account or UPI in INR (₹)</p>

                                    <form onSubmit={handleRequestWithdrawal}>
                                        <div className="mb-3">
                                            <label className="form-label text-muted small fw-bold text-uppercase">Withdrawal Amount (₹) <span className="text-danger">*</span></label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light fw-bold">₹</span>
                                                <input 
                                                    type="number" 
                                                    className="form-control p-2.5" 
                                                    placeholder="e.g. 5000 (Min ₹500)" 
                                                    value={withdrawAmount} 
                                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                                    min="500"
                                                    max={stats.walletBalance}
                                                    required 
                                                />
                                            </div>
                                            <small className="text-muted">Min: ₹500 | Max: ₹{stats.walletBalance.toLocaleString('en-IN')}</small>
                                        </div>

                                        <div className="p-3 bg-light rounded-3 border mb-3">
                                            <small className="text-muted d-block fw-bold mb-1">Target Payout Destination:</small>
                                            <div className="small text-dark">
                                                <strong>{bankForm.bank_name || 'Bank Name Pending'}</strong> - A/C: {bankForm.account_number || 'Pending'} ({bankForm.ifsc_code || 'IFSC'})
                                                {bankForm.upi_id && <span className="d-block text-success mt-0.5">UPI: {bankForm.upi_id}</span>}
                                            </div>
                                            {(!bankForm.account_number && !bankForm.upi_id) && (
                                                <button 
                                                    type="button" 
                                                    className="btn btn-xs btn-outline-danger mt-2 rounded-pill px-2.5 py-0.5" 
                                                    onClick={() => setActiveTab('bank')}
                                                >
                                                    Add Bank Details First
                                                </button>
                                            )}
                                        </div>

                                        <button 
                                            type="submit" 
                                            className="btn btn-success w-100 py-2.5 rounded-pill fw-bold shadow d-flex align-items-center justify-content-center gap-2"
                                            disabled={submittingWithdraw || stats.walletBalance < 500}
                                        >
                                            {submittingWithdraw ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                                    <span>Processing Payout Request...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-paper-plane"></i>
                                                    <span>Submit Withdrawal Request</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Ledger & Withdrawal History */}
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                            <h5 className="fw-bold text-dark pb-3 border-bottom mb-3 d-flex align-items-center gap-2">
                                <i className="fa-solid fa-receipt text-primary"></i> Wallet Transactions & Commission History
                            </h5>
                            <div className="table-responsive">
                                {transactionsList.length === 0 ? (
                                    <div className="p-4 text-center text-muted">
                                        <p className="mb-0">No wallet transactions recorded yet.</p>
                                    </div>
                                ) : (
                                    <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                                        <thead className="table-light">
                                            <tr>
                                                <th>Txn ID</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                                <th>Date</th>
                                                <th>Amount (₹)</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactionsList.map((tx) => (
                                                <tr key={tx.id}>
                                                    <td className="fw-bold">#TXN-{tx.id}</td>
                                                    <td>
                                                        <span className={`badge ${tx.type === 'CREDIT' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'} rounded-pill px-2.5 py-1 fw-bold`}>
                                                            {tx.type === 'CREDIT' ? 'Credit (+)' : 'Debit (-)'}
                                                        </span>
                                                    </td>
                                                    <td className="text-dark small">{tx.description || tx.source}</td>
                                                    <td>{new Date(tx.created_at).toLocaleDateString('en-IN')}</td>
                                                    <td className={`fw-bold ${tx.type === 'CREDIT' ? 'text-success' : 'text-danger'}`}>
                                                        {tx.type === 'CREDIT' ? '+' : '-'}₹{Number(tx.amount).toLocaleString('en-IN')}
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-light text-dark border rounded-pill px-2.5 py-1">
                                                            {tx.status || 'COMPLETED'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* View Selected Booking Dossier Modal */}
                {viewBookingModal && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 999999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setViewBookingModal(null)}
                    >
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '24px',
                                maxWidth: '650px',
                                width: '100%',
                                padding: '30px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                                <div>
                                    <h5 className="fw-bold text-dark mb-0">Booking #{viewBookingModal.bookings_id || viewBookingModal.id} Details</h5>
                                    <small className="text-muted">{viewBookingModal.package_title}</small>
                                </div>
                                <button type="button" className="btn-close" onClick={() => setViewBookingModal(null)}></button>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Primary Client</small>
                                    <strong className="text-dark">{viewBookingModal.customer_name}</strong>
                                </div>
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Phone Number</small>
                                    <strong className="text-dark">{viewBookingModal.customer_phone}</strong>
                                </div>
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Departure Date</small>
                                    <strong className="text-primary">{viewBookingModal.departure_date ? new Date(viewBookingModal.departure_date).toLocaleDateString('en-IN') : 'N/A'}</strong>
                                </div>
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Your Commission</small>
                                    <strong className="text-success fs-6">+₹{Number(viewBookingModal.commission_amount || 0).toLocaleString('en-IN')}</strong>
                                </div>
                            </div>

                            <h6 className="fw-bold text-dark text-uppercase mb-2 pt-2 border-top" style={{ fontSize: '12px' }}>
                                Registered Travelers ({safeParseTravelers(viewBookingModal.travelers).length || viewBookingModal.total_travelers || 1})
                            </h6>
                            <div className="table-responsive mb-3">
                                <table className="table table-sm table-bordered align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Age</th>
                                            <th>Gender</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {safeParseTravelers(viewBookingModal.travelers).map((t, idx) => (
                                            <tr key={idx}>
                                                <td className="fw-bold">{idx + 1}</td>
                                                <td>{t.name || 'Traveler'}</td>
                                                <td>{t.age || '—'} yrs</td>
                                                <td><span className="badge bg-light text-dark border">{t.gender || 'Male'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <button type="button" className="btn btn-primary w-100 rounded-pill py-2 fw-bold" onClick={() => setViewBookingModal(null)}>
                                Close Details
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // =========================================================================
    // 2. CORPORATE DASHBOARD RENDER (userType === 2)
    // =========================================================================
    if (userType === 2) {
        const bookingsList = statsData?.bookings || [];
        const totalCorporateBookings = bookingsList.length || 0;
        let totalTravelersCount = 0;
        let totalSpend = 0;

        bookingsList.forEach((b) => {
            totalSpend += Number(b.total_cost) || 0;
            const tList = safeParseTravelers(b.travelers);
            totalTravelersCount += Number(b.total_travelers) || tList.length || 1;
        });

        return (
            <div className="col-lg-8 col-xl-9">
                {/* Hero Header */}
                <div 
                    className="card border-0 shadow-lg rounded-4 p-4 mb-4 text-white position-relative overflow-hidden" 
                    style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e1b4b 100%)" }}
                >
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 position-relative" style={{ zIndex: 2 }}>
                        <div className="d-flex flex-column flex-md-row align-items-center gap-3.5 text-center text-md-start">
                            <div className="position-relative">
                                <img 
                                    src={profilePic} 
                                    className="rounded-circle border border-4 border-warning shadow" 
                                    style={{ width: "95px", height: "95px", objectFit: "cover" }} 
                                    alt="Corporate Account" 
                                />
                                <span className="position-absolute bottom-0 end-0 bg-warning text-dark rounded-circle px-2 py-1 fs-6 fw-bold shadow-sm" title="Corporate Enterprise">
                                    <i className="fa-solid fa-building"></i>
                                </span>
                            </div>
                            <div>
                                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                                    <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill text-uppercase" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                                        <i className="fa-solid fa-shield-halved me-1"></i> Corporate Enterprise Partner
                                    </span>
                                    <span className="badge bg-white bg-opacity-20 text-white px-2.5 py-1 rounded-pill" style={{ fontSize: "10px" }}>
                                        Corporate ID: #CORP-{user?.id || '88'}
                                    </span>
                                </div>
                                <h3 className="fw-bold text-white mb-0">
                                    {user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : 'Corporate Enterprise'}
                                </h3>
                                <p className="text-light text-opacity-75 mb-0 small mt-1">
                                    <i className="bi bi-envelope me-1 text-warning"></i> {user?.email || 'corporate@deltasafari.com'}
                                    {user?.phone && <span className="ms-3"><i className="bi bi-telephone me-1 text-warning"></i> {user.phone}</span>}
                                </p>
                            </div>
                        </div>

                        {/* Quick CTA Actions */}
                        <div className="d-flex flex-wrap gap-2">
                            <button 
                                className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark d-flex align-items-center gap-2 shadow"
                                onClick={() => setCorporateWizardOpen(true)}
                            >
                                <i className="fa-solid fa-wand-magic-sparkles"></i> Custom Tour Wizard
                            </button>
                            <button 
                                className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2"
                                onClick={() => router.push('/editprofile')}
                            >
                                <i className="fa-regular fa-pen-to-square"></i> Company Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4 Corporate KPI Metric Cards */}
                <div className="row g-3 mb-4">
                    <div className="col-sm-6 col-xl-3">
                        <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all p-2">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Team Safaris Booked</span>
                                <div className="rounded-3 p-2 bg-primary-subtle text-primary fs-5">
                                    <i className="fa-solid fa-suitcase"></i>
                                </div>
                            </div>
                            <div className="fw-extrabold text-dark fs-4 mb-1">
                                {totalCorporateBookings} Tours
                            </div>
                            <div className="text-muted small mt-2 pt-2 border-top" style={{ fontSize: '11px' }}>
                                Corporate Retreats
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all p-2">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Employees Hosted</span>
                                <div className="rounded-3 p-2 bg-success-subtle text-success fs-5">
                                    <i className="fa-solid fa-users"></i>
                                </div>
                            </div>
                            <div className="fw-extrabold text-success fs-4 mb-1">
                                {totalTravelersCount} Members
                            </div>
                            <div className="text-muted small mt-2 pt-2 border-top" style={{ fontSize: '11px' }}>
                                Total Team Travelers
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all p-2">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Total Spend (₹)</span>
                                <div className="rounded-3 p-2 bg-warning-subtle text-warning fs-5">
                                    <i className="fa-solid fa-receipt"></i>
                                </div>
                            </div>
                            <div className="fw-extrabold text-warning fs-4 mb-1">
                                ₹{totalSpend.toLocaleString('en-IN')}
                            </div>
                            <div className="text-muted small mt-2 pt-2 border-top" style={{ fontSize: '11px' }}>
                                GST Invoiced Spend
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all p-2">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Account Status</span>
                                <div className="rounded-3 p-2 bg-info-subtle text-info fs-5">
                                    <i className="fa-solid fa-award"></i>
                                </div>
                            </div>
                            <div className="fw-extrabold text-info fs-4 mb-1">
                                Active Gold
                            </div>
                            <div className="text-muted small mt-2 pt-2 border-top" style={{ fontSize: '11px' }}>
                                Verified Enterprise
                            </div>
                        </div>
                    </div>
                </div>

                {/* Corporate Team Bookings Table */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                    <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                        <div>
                            <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                                <i className="fa-solid fa-suitcase-rolling text-primary"></i> Company Team Bookings & Itineraries
                            </h5>
                            <p className="text-muted small mb-0">Record of your corporate group reservations, employee rosters, and invoice details</p>
                        </div>
                        <button className="btn btn-sm btn-primary rounded-pill px-3" onClick={() => router.push('/bookings')}>
                            View All ({bookingsList.length})
                        </button>
                    </div>

                    <div className="table-responsive">
                        {bookingsList.length === 0 ? (
                            <div className="p-5 text-center text-muted">
                                <i className="fa-solid fa-building-circle-check fs-1 text-muted opacity-50 mb-2"></i>
                                <p className="mb-0">No corporate team bookings recorded yet. Browse safari packages to book your next team offsite or corporate retreat!</p>
                            </div>
                        ) : (
                            <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                                <thead className="table-light">
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Company Contact</th>
                                        <th>Tour Package</th>
                                        <th>Team Size</th>
                                        <th>Departure Date</th>
                                        <th>Invoice Total (₹)</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingsList.slice(0, 5).map((b) => {
                                        const total = Number(b.total_cost) || 0;
                                        const travelers = safeParseTravelers(b.travelers);

                                        return (
                                            <tr key={b.bookings_id || b.id}>
                                                <td className="fw-bold text-primary">#{b.bookings_id || b.id}</td>
                                                <td>
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-bold text-dark">{b.customer_name || 'Corporate Team'}</span>
                                                        <span className="text-muted small">{b.customer_phone}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="fw-semibold text-dark">{b.package_title || 'Sundarban Corporate Safari'}</span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-light text-dark border">
                                                        <i className="fa-solid fa-people-group me-1 text-primary"></i>
                                                        {b.total_travelers || travelers.length || 1} Employees
                                                    </span>
                                                </td>
                                                <td>{b.departure_date ? new Date(b.departure_date).toLocaleDateString('en-IN') : 'N/A'}</td>
                                                <td className="fw-bold text-dark">₹{total.toLocaleString('en-IN')}</td>
                                                <td>
                                                    {Number(b.booking_status) === 2 ? (
                                                        <span className="badge bg-success rounded-pill px-2.5 py-1">Confirmed & Booked</span>
                                                    ) : Number(b.booking_status) === 1 ? (
                                                        <span className="badge bg-warning text-dark rounded-pill px-2.5 py-1">Under Processing</span>
                                                    ) : (
                                                        <span className="badge bg-danger rounded-pill px-2.5 py-1">Cancelled</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <button 
                                                        className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                                                        onClick={() => setViewBookingModal(b)}
                                                    >
                                                        <i className="bi bi-eye"></i> Details
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Company Information & Billing Profile Card */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                    <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-building-user text-primary"></i> Company Information & Registered Profile
                    </h5>
                    
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="p-3 bg-light rounded-3 border">
                                <div className="text-muted small fw-semibold text-uppercase mb-1">Company / Enterprise Name</div>
                                <div className="fw-bold text-dark fs-6">{user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : 'Corporate Enterprise'}</div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="p-3 bg-light rounded-3 border">
                                <div className="text-muted small fw-semibold text-uppercase mb-1">Official Corporate Email</div>
                                <div className="fw-bold text-dark fs-6">{user?.email || 'corporate@deltasafari.com'}</div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="p-3 bg-light rounded-3 border">
                                <div className="text-muted small fw-semibold text-uppercase mb-1">Corporate Phone / Hotline</div>
                                <div className="fw-bold text-dark fs-6">{user?.phone || 'N/A'}</div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="p-3 bg-light rounded-3 border">
                                <div className="text-muted small fw-semibold text-uppercase mb-1">Registered City & Address</div>
                                <div className="fw-bold text-dark fs-6">{user?.city || user?.address || 'Kolkata, West Bengal'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Corporate Safari Privileges Card */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                    <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-crown text-warning"></i> Enterprise Safari Benefits & Privileges
                    </h5>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 border bg-light h-100">
                                <div className="text-primary fs-4 mb-2"><i className="fa-solid fa-ship"></i></div>
                                <h6 className="fw-bold text-dark mb-1">Private Luxury Boat Charters</h6>
                                <p className="text-muted small mb-0">Exclusive AC boat safari with customized dining and team viewing decks.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 border bg-light h-100">
                                <div className="text-primary fs-4 mb-2"><i className="fa-solid fa-file-invoice-dollar"></i></div>
                                <h6 className="fw-bold text-dark mb-1">Corporate GST Invoicing</h6>
                                <p className="text-muted small mb-0">Direct GST-compliant business invoicing and streamlined corporate billing.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 rounded-3 border bg-light h-100">
                                <div className="text-primary fs-4 mb-2"><i className="fa-solid fa-headset"></i></div>
                                <h6 className="fw-bold text-dark mb-1">24/7 Dedicated Tour Manager</h6>
                                <p className="text-muted small mb-0">Personalized on-ground coordinator for all team logistics and safaris.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected Booking Detail Modal */}
                {viewBookingModal && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 999999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setViewBookingModal(null)}
                    >
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '24px',
                                maxWidth: '650px',
                                width: '100%',
                                padding: '30px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                                <div>
                                    <h5 className="fw-bold text-dark mb-0">Corporate Booking #{viewBookingModal.bookings_id || viewBookingModal.id}</h5>
                                    <small className="text-muted">{viewBookingModal.package_title}</small>
                                </div>
                                <button type="button" className="btn-close" onClick={() => setViewBookingModal(null)}></button>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Company Coordinator</small>
                                    <strong className="text-dark">{viewBookingModal.customer_name}</strong>
                                </div>
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Contact Phone</small>
                                    <strong className="text-dark">{viewBookingModal.customer_phone}</strong>
                                </div>
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Departure Date</small>
                                    <strong className="text-primary">{viewBookingModal.departure_date ? new Date(viewBookingModal.departure_date).toLocaleDateString('en-IN') : 'N/A'}</strong>
                                </div>
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Total Invoice Amount</small>
                                    <strong className="text-dark fs-6">₹{Number(viewBookingModal.total_cost || 0).toLocaleString('en-IN')}</strong>
                                </div>
                            </div>

                            <h6 className="fw-bold text-dark text-uppercase mb-2 pt-2 border-top" style={{ fontSize: '12px' }}>
                                Registered Team Travelers ({safeParseTravelers(viewBookingModal.travelers).length || viewBookingModal.total_travelers || 1})
                            </h6>
                            <div className="table-responsive mb-3">
                                <table className="table table-sm table-bordered align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Employee Name</th>
                                            <th>Age</th>
                                            <th>Gender</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {safeParseTravelers(viewBookingModal.travelers).map((t, idx) => (
                                            <tr key={idx}>
                                                <td className="fw-bold">{idx + 1}</td>
                                                <td>{t.name || 'Team Member'}</td>
                                                <td>{t.age || '—'} yrs</td>
                                                <td><span className="badge bg-light text-dark border">{t.gender || 'Male'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <button type="button" className="btn btn-primary w-100 rounded-pill py-2 fw-bold" onClick={() => setViewBookingModal(null)}>
                                Close Details
                            </button>
                        </div>
                    </div>
                )}

                {/* Custom Corporate Tour Wizard Modal (Employee Attendance Roster) */}
                {corporateWizardOpen && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(6px)',
                            zIndex: 999999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setCorporateWizardOpen(false)}
                    >
                        <div
                            style={{
                                maxWidth: '780px',
                                width: '100%',
                                maxHeight: '92vh',
                                overflowY: 'auto',
                                borderRadius: '24px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CorporateWizardForm 
                                isModal={true} 
                                onClose={() => setCorporateWizardOpen(false)} 
                                onSubmit={() => {
                                    setCorporateWizardOpen(false);
                                    fetchAgentData();
                                }} 
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // =========================================================================
    // 3. STANDARD CUSTOMER USER DASHBOARD (userType === 1)
    // =========================================================================
    const customerBookings = statsData?.bookings || [];
    let totalCustomerSpend = 0;
    let totalCustomerTravelers = 0;

    customerBookings.forEach((b) => {
        totalCustomerSpend += Number(b.total_cost) || 0;
        const tList = safeParseTravelers(b.travelers);
        totalCustomerTravelers += Number(b.total_travelers) || tList.length || 1;
    });

    const userWalletBalance = statsData?.wallet_balance || (user?.wallet_balance ? Number(user.wallet_balance) : 0);

    return (
        <div className="col-lg-8 col-xl-9">
            {/* 1. HERO PROFILE & MEMBERSHIP HEADER */}
            <div 
                className="card border-0 shadow-lg rounded-4 p-4 mb-4 text-white position-relative overflow-hidden" 
                style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #1e1b4b 100%)" }}
            >
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 position-relative" style={{ zIndex: 2 }}>
                    <div className="d-flex flex-column flex-md-row align-items-center gap-3.5 text-center text-md-start">
                        <div className="position-relative">
                            <img 
                                src={profilePic} 
                                className="rounded-circle border border-4 border-primary shadow" 
                                style={{ width: "95px", height: "95px", objectFit: "cover" }} 
                                alt="User Profile" 
                            />
                            <span className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle px-2 py-1 fs-6 fw-bold shadow-sm" title="Active Traveler">
                                <i className="fa-solid fa-compass"></i>
                            </span>
                        </div>
                        <div>
                            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                                <span className="badge bg-primary text-white fw-bold px-3 py-1 rounded-pill text-uppercase" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                                    <i className="fa-solid fa-award me-1"></i> Delta Explorer Member
                                </span>
                                <span className="badge bg-white bg-opacity-20 text-white px-2.5 py-1 rounded-pill" style={{ fontSize: "10px" }}>
                                    Member ID: #DS-MEM-{user?.id || '101'}
                                </span>
                            </div>
                            <h3 className="fw-bold text-white mb-0">
                                {user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : 'Safari Explorer'}
                            </h3>
                            <p className="text-light text-opacity-75 mb-0 small mt-1">
                                <i className="bi bi-envelope me-1 text-primary"></i> {user?.email || 'customer@deltasafari.com'}
                                {user?.phone && <span className="ms-3"><i className="bi bi-telephone me-1 text-primary"></i> {user.phone}</span>}
                            </p>
                        </div>
                    </div>

                    {/* Action Shortcuts */}
                    <div className="d-flex flex-wrap gap-2">
                        <button 
                            className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-white d-flex align-items-center gap-2 shadow"
                            style={{ background: 'linear-gradient(135deg, #2e266d 0%, #1d184f 100%)', border: 'none' }}
                            onClick={() => router.push('/packages/destination-sundarban')}
                        >
                            <i className="fa-solid fa-compass"></i> Explore Safaris
                        </button>
                        <button 
                            className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2"
                            onClick={() => router.push('/editprofile')}
                        >
                            <i className="fa-regular fa-pen-to-square"></i> Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. 4 CUSTOMER TRAVEL KPI METRIC CARDS */}
            <div className="row g-3 mb-4">
                <div className="col-sm-6 col-xl-3">
                    <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Safaris Booked</span>
                            <div className="rounded-3 p-2 bg-primary-subtle text-primary fs-5">
                                <i className="fa-solid fa-suitcase"></i>
                            </div>
                        </div>
                        <div className="fw-extrabold text-dark fs-4 mb-1">
                            {customerBookings.length} Tours
                        </div>
                        <div className="text-muted small mt-2 pt-2 border-top" style={{ fontSize: '11px' }}>
                            Completed & Active Trips
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Travelers Hosted</span>
                            <div className="rounded-3 p-2 bg-success-subtle text-success fs-5">
                                <i className="fa-solid fa-users"></i>
                            </div>
                        </div>
                        <div className="fw-extrabold text-success fs-4 mb-1">
                            {totalCustomerTravelers} Persons
                        </div>
                        <div className="text-muted small mt-2 pt-2 border-top" style={{ fontSize: '11px' }}>
                            Family & Group Members
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Total Safari Spend</span>
                            <div className="rounded-3 p-2 bg-warning-subtle text-warning fs-5">
                                <i className="fa-solid fa-receipt"></i>
                            </div>
                        </div>
                        <div className="fw-extrabold text-warning fs-4 mb-1">
                            ₹{totalCustomerSpend.toLocaleString('en-IN')}
                        </div>
                        <div className="text-muted small mt-2 pt-2 border-top" style={{ fontSize: '11px' }}>
                            Lifetime Travel Investment
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card h-100 p-3.5 rounded-4 bg-white shadow-sm border border-light-subtle hover-lift transition-all">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="text-muted small fw-bold text-uppercase" style={{ fontSize: '11px' }}>Wallet / Cashback</span>
                            <div className="rounded-3 p-2 bg-info-subtle text-info fs-5">
                                <i className="fa-solid fa-wallet"></i>
                            </div>
                        </div>
                        <div className="fw-extrabold text-info fs-4 mb-1">
                            ₹{userWalletBalance.toLocaleString('en-IN')}
                        </div>
                        <div className="text-muted small mt-2 pt-2 border-top" style={{ fontSize: '11px' }}>
                            Available for Bookings
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. RECENT SAFARI BOOKINGS & LIVE ITINERARIES TABLE */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                    <div>
                        <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                            <i className="fa-solid fa-suitcase-rolling text-primary"></i> My Safari Bookings & Itineraries
                        </h5>
                        <p className="text-muted small mb-0">Record of your booked packages, travel dates, family attendees, and invoice details</p>
                    </div>
                    <button className="btn btn-sm btn-primary rounded-pill px-3" onClick={() => router.push('/bookings')}>
                        View All ({customerBookings.length})
                    </button>
                </div>

                <div className="table-responsive">
                    {customerBookings.length === 0 ? (
                        <div className="p-5 text-center text-muted">
                            <i className="fa-solid fa-compass fs-1 text-muted opacity-50 mb-2"></i>
                            <h6 className="fw-bold text-dark mt-2 mb-1">No Safari Bookings Yet</h6>
                            <p className="mb-3 small">You haven&apos;t booked any safari trips yet. Discover our curated wilderness packages to plan your next getaway!</p>
                            <button 
                                className="btn btn-primary rounded-pill px-4 py-2 fw-bold"
                                onClick={() => router.push('/packages/destination-sundarban')}
                            >
                                <i className="fa-solid fa-compass me-1"></i> Browse Safari Packages
                            </button>
                        </div>
                    ) : (
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                            <thead className="table-light">
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Tour Package</th>
                                    <th>Travelers</th>
                                    <th>Travel Date</th>
                                    <th>Total Cost (₹)</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerBookings.slice(0, 5).map((b) => {
                                    const total = Number(b.total_cost) || 0;
                                    const travelers = safeParseTravelers(b.travelers);

                                    return (
                                        <tr key={b.bookings_id || b.id}>
                                            <td className="fw-bold text-primary">#{b.bookings_id || b.id}</td>
                                            <td>
                                                <span className="fw-semibold text-dark">{b.package_title || 'Sundarban Safari Experience'}</span>
                                            </td>
                                            <td>
                                                <span className="badge bg-light text-dark border">
                                                    <i className="fa-solid fa-users me-1 text-primary"></i>
                                                    {b.total_travelers || travelers.length || 1} Travelers
                                                </span>
                                            </td>
                                            <td>{b.departure_date ? new Date(b.departure_date).toLocaleDateString('en-IN') : 'N/A'}</td>
                                            <td className="fw-bold text-dark">₹{total.toLocaleString('en-IN')}</td>
                                            <td>
                                                {Number(b.booking_status) === 2 ? (
                                                    <span className="badge bg-success rounded-pill px-2.5 py-1">Confirmed & Booked</span>
                                                ) : Number(b.booking_status) === 1 ? (
                                                    <span className="badge bg-warning text-dark rounded-pill px-2.5 py-1">Under Processing</span>
                                                ) : (
                                                    <span className="badge bg-danger rounded-pill px-2.5 py-1">Cancelled</span>
                                                )}
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                                                    onClick={() => setViewBookingModal(b)}
                                                >
                                                    <i className="bi bi-eye"></i> Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* 4. SAVED PACKAGES & WISHLIST PREVIEW */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                    <div>
                        <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                            <i className="fa-solid fa-heart text-danger"></i> Saved Packages &amp; Wishlist ({savedPackages.length})
                        </h5>
                        <p className="text-muted small mb-0">Tour packages you have saved to customize, review, or book</p>
                    </div>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => router.push('/savedtour')}>
                        Manage Wishlist ({savedPackages.length})
                    </button>
                </div>

                {savedLoading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border spinner-border-sm text-danger" role="status"></div>
                    </div>
                ) : savedPackages.length === 0 ? (
                    <div className="p-4 text-center text-muted bg-light rounded-3">
                        <i className="fa-regular fa-heart fs-3 text-muted opacity-50 mb-1"></i>
                        <p className="mb-2 small">You have no saved safari packages yet. Click &apos;Save Package&apos; on any tour to bookmark it here!</p>
                        <button 
                            className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 fw-bold"
                            onClick={() => router.push('/packages/destination-sundarban')}
                        >
                            Browse Safari Packages
                        </button>
                    </div>
                ) : (
                    <div className="row g-3">
                        {savedPackages.slice(0, 3).map((pkg) => {
                            const imgUrl = pkg.banner_path || pkg.path
                                ? process.env.NEXT_PUBLIC_SERVER_URL + (pkg.banner_path || pkg.path).replace(/\\/g, '/')
                                : '/assets/images/noimage.jpg';
                            const price = Number(pkg.actual_price || pkg.base_price || 0);

                            return (
                                <div key={pkg.id} className="col-md-4">
                                    <div className="card h-100 border rounded-3 overflow-hidden shadow-xs hover-lift transition-all">
                                        <div className="position-relative" style={{ height: '120px' }}>
                                            <img src={imgUrl} alt={pkg.title} className="w-100 h-100 object-fit-cover" />
                                            <span className="position-absolute top-0 start-0 m-1.5 badge text-white px-2 py-0.5 rounded-2 shadow-xs fw-bold" style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', fontSize: '10px' }}>
                                                {pkg.duration_nights || (pkg.duration_days - 1 || 1)}N / {pkg.duration_days || 2}D
                                            </span>
                                            <button 
                                                className="position-absolute top-0 end-0 m-1.5 btn btn-sm btn-light rounded-circle shadow-xs"
                                                style={{ width: '26px', height: '26px', padding: 0, color: '#dc2626' }}
                                                title="Remove from saved"
                                                onClick={(e) => handleRemoveSavedPackage(pkg.id, e)}
                                            >
                                                <i className="fa-solid fa-trash-can" style={{ fontSize: '11px' }}></i>
                                            </button>
                                        </div>
                                        <div className="p-2.5 d-flex flex-column justify-content-between flex-grow-1">
                                            <h6 className="fw-bold text-dark text-truncate mb-1" style={{ fontSize: '13px' }}>
                                                {pkg.title}
                                            </h6>
                                            <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-2">
                                                <span className="fw-extrabold text-danger package-price" style={{ fontSize: '14px', fontWeight: 800 }}>
                                                    ₹{price.toLocaleString('en-IN')}
                                                </span>
                                                <button 
                                                    className="btn btn-xs btn-primary rounded-pill px-2.5 py-1 fw-bold"
                                                    style={{ fontSize: '11px' }}
                                                    onClick={() => router.push(`/package/${pkg.slug}`)}
                                                >
                                                    Book Safari
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 5. PERSONAL DETAILS & PROFILE INFORMATION */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-user-shield text-primary"></i> Personal Details & Account Preferences
                    </h5>
                    <button 
                        className="btn btn-sm btn-outline-primary rounded-pill px-3"
                        onClick={() => router.push('/editprofile')}
                    >
                        <i className="fa-regular fa-pen-to-square me-1"></i> Edit
                    </button>
                </div>
                
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
                            <div className="fw-bold text-dark fs-6">{user?.city || user?.address || 'Kolkata, West Bengal'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. DELTA SAFARI TRAVELER PRIVILEGES & INCLUSIONS */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-crown text-warning"></i> Delta Safari Member Privileges
                </h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="p-3 rounded-3 border bg-light h-100">
                            <div className="text-primary fs-4 mb-2"><i className="fa-solid fa-ship"></i></div>
                            <h6 className="fw-bold text-dark mb-1">Guaranteed AC Houseboats</h6>
                            <p className="text-muted small mb-0">Panoramic observation upper decks and clean private washrooms on all safaris.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 rounded-3 border bg-light h-100">
                            <div className="text-primary fs-4 mb-2"><i className="fa-solid fa-utensils"></i></div>
                            <h6 className="fw-bold text-dark mb-1">Fresh Bengali Gastronomy</h6>
                            <p className="text-muted small mb-0">Authentic local prawn, fish & vegetarian gourmet delicacies prepared fresh onboard.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 rounded-3 border bg-light h-100">
                            <div className="text-primary fs-4 mb-2"><i className="fa-solid fa-shield-halved"></i></div>
                            <h6 className="fw-bold text-dark mb-1">100% Forest Safety & Permits</h6>
                            <p className="text-muted small mb-0">Government-licensed wildlife naturalists and GPS-tracked safety river vessels.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. SELECTED BOOKING DETAIL MODAL */}
            {viewBookingModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 999999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={() => setViewBookingModal(null)}
                >
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '24px',
                            maxWidth: '650px',
                            width: '100%',
                            padding: '30px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                            <div>
                                <h5 className="fw-bold text-dark mb-0">Booking #{viewBookingModal.bookings_id || viewBookingModal.id} Details</h5>
                                <small className="text-muted">{viewBookingModal.package_title}</small>
                            </div>
                            <button type="button" className="btn-close" onClick={() => setViewBookingModal(null)}></button>
                        </div>

                        <div className="row g-3 mb-3">
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Primary Traveler</small>
                                <strong className="text-dark">{viewBookingModal.customer_name || `${user?.first_name} ${user?.last_name || ''}`}</strong>
                            </div>
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Contact Phone</small>
                                <strong className="text-dark">{viewBookingModal.customer_phone || user?.phone || 'N/A'}</strong>
                            </div>
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Departure Date</small>
                                <strong className="text-primary">{viewBookingModal.departure_date ? new Date(viewBookingModal.departure_date).toLocaleDateString('en-IN') : 'N/A'}</strong>
                            </div>
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Total Invoice Cost</small>
                                <strong className="text-dark fs-6">₹{Number(viewBookingModal.total_cost || 0).toLocaleString('en-IN')}</strong>
                            </div>
                        </div>

                        <h6 className="fw-bold text-dark text-uppercase mb-2 pt-2 border-top" style={{ fontSize: '12px' }}>
                            Registered Travelers ({safeParseTravelers(viewBookingModal.travelers).length || viewBookingModal.total_travelers || 1})
                        </h6>
                        <div className="table-responsive mb-3">
                            <table className="table table-sm table-bordered align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Traveler Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {safeParseTravelers(viewBookingModal.travelers).map((t, idx) => (
                                        <tr key={idx}>
                                            <td className="fw-bold">{idx + 1}</td>
                                            <td>{t.name || 'Traveler'}</td>
                                            <td>{t.age || '—'} yrs</td>
                                            <td><span className="badge bg-light text-dark border">{t.gender || 'Male'}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button type="button" className="btn btn-primary w-100 rounded-pill py-2 fw-bold" onClick={() => setViewBookingModal(null)}>
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}