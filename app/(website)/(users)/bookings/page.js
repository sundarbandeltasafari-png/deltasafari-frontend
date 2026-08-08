"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { axiosGet } from '@/libs/axiosHelper';
import { getAgentBookingsURL, getAgentDashboardStatsURL } from '@/routes/authRoutes';

export default function BookingsPage() {
    const router = useRouter();
    const token = useSelector((state) => state.userAuth?.token);
    const { user } = useSelector((state) => state.userAuth || {});
    const isAgent = Number(user?.user_type) === 3;

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        if (token) {
            setLoading(true);
            const url = isAgent ? getAgentBookingsURL : getAgentDashboardStatsURL;

            axiosGet(url, token)
                .then((res) => {
                    setLoading(false);
                    if (res?.bookings && Array.isArray(res.bookings)) {
                        setBookings(res.bookings);
                    } else if (res?.status && res?.bookings) {
                        setBookings(res.bookings);
                    }
                })
                .catch(() => setLoading(false));
        }
    }, [token, isAgent]);

    const safeParseTravelers = (jsonStr) => {
        if (!jsonStr) return [];
        try {
            return typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
        } catch (e) {
            return [];
        }
    };

    return (
        <div className="col-lg-8 col-xl-9">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom mb-4">
                    <div>
                        <h4 className="fw-bold text-dark mb-1">
                            <i className="fa-solid fa-suitcase-rolling text-primary me-2"></i>
                            {isAgent ? 'Client Bookings & Commission Ledger' : 'My Tour Reservations'}
                        </h4>
                        <p className="text-muted small mb-0">
                            {isAgent 
                                ? 'Track all client tour reservations, departure dates, multiple traveler lists, and commission payouts in INR (₹)'
                                : 'View your confirmed travel packages, booking itineraries, and trip status'
                            }
                        </p>
                    </div>
                    {isAgent && (
                        <button 
                            className="btn btn-primary rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm"
                            onClick={() => router.push('/packages/destination-sundarban')}
                        >
                            <i className="fa-solid fa-plus"></i> New Client Booking
                        </button>
                    )}
                </div>

                <div className="table-responsive">
                    {loading ? (
                        <div className="p-5 text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="p-5 text-center text-muted">
                            <i className="fa-solid fa-folder-open fs-1 text-muted opacity-50 mb-2"></i>
                            <p className="mb-0">No booking records found.</p>
                        </div>
                    ) : (
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                            <thead className="table-light">
                                <tr>
                                    <th>Booking ID</th>
                                    <th>{isAgent ? 'Client Details' : 'Package'}</th>
                                    <th>Travelers</th>
                                    <th>Departure Date</th>
                                    <th>Total Cost</th>
                                    {isAgent && <th>Commission (₹)</th>}
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b) => {
                                    const total = Number(b.total_cost) || 0;
                                    const comm = Number(b.commission_amount) || 0;
                                    const travelers = safeParseTravelers(b.travelers);

                                    return (
                                        <tr key={b.bookings_id || b.id}>
                                            <td className="fw-bold text-primary">#{b.bookings_id || b.id}</td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <span className="fw-bold text-dark">{b.customer_name || 'Valued Client'}</span>
                                                    <span className="text-muted small">{b.package_title || 'Sundarban Safari Tour'}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge bg-light text-dark border">
                                                    <i className="fa-solid fa-people-group me-1 text-primary"></i>
                                                    {b.total_travelers || travelers.length || 1} Pax
                                                </span>
                                            </td>
                                            <td>
                                                {b.departure_date ? new Date(b.departure_date).toLocaleDateString('en-IN') : 'N/A'}
                                            </td>
                                            <td className="fw-bold text-dark">
                                                ₹{total.toLocaleString('en-IN')}
                                            </td>
                                            {isAgent && (
                                                <td>
                                                    <span className="badge bg-success-subtle text-success border border-success-subtle fw-bold px-2.5 py-1">
                                                        +₹{comm.toLocaleString('en-IN')}
                                                    </span>
                                                </td>
                                            )}
                                            <td>
                                                {Number(b.booking_status) === 2 ? (
                                                    <span className="badge bg-success rounded-pill px-2.5 py-1">Confirmed & Booked</span>
                                                ) : Number(b.booking_status) === 1 ? (
                                                    <span className="badge bg-warning text-dark rounded-pill px-2.5 py-1">Pending Review</span>
                                                ) : (
                                                    <span className="badge bg-danger rounded-pill px-2.5 py-1">Cancelled</span>
                                                )}
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                                                    onClick={() => setSelectedBooking(b)}
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

            {/* Selected Booking Detail Modal */}
            {selectedBooking && (
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
                    onClick={() => setSelectedBooking(null)}
                >
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '24px',
                            maxWidth: '680px',
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
                                <h5 className="fw-bold text-dark mb-0">Booking #{selectedBooking.bookings_id || selectedBooking.id} Dossier</h5>
                                <small className="text-muted">{selectedBooking.package_title}</small>
                            </div>
                            <button type="button" className="btn-close" onClick={() => setSelectedBooking(null)}></button>
                        </div>

                        <div className="row g-3 mb-3">
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Primary Contact Name</small>
                                <strong className="text-dark">{selectedBooking.customer_name}</strong>
                            </div>
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Phone Number</small>
                                <strong className="text-dark">{selectedBooking.customer_phone}</strong>
                            </div>
                            <div className="col-sm-6">
                                <small className="text-muted d-block">Departure Date</small>
                                <strong className="text-primary">{selectedBooking.departure_date ? new Date(selectedBooking.departure_date).toLocaleDateString('en-IN') : 'N/A'}</strong>
                            </div>
                            {isAgent && (
                                <div className="col-sm-6">
                                    <small className="text-muted d-block">Your Commission</small>
                                    <strong className="text-success fs-6">+₹{Number(selectedBooking.commission_amount || 0).toLocaleString('en-IN')}</strong>
                                </div>
                            )}
                        </div>

                        <h6 className="fw-bold text-dark text-uppercase mb-2 pt-2 border-top" style={{ fontSize: '12px' }}>
                            Registered Travelers ({safeParseTravelers(selectedBooking.travelers).length || selectedBooking.total_travelers || 1})
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
                                    {safeParseTravelers(selectedBooking.travelers).map((t, idx) => (
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

                        <button type="button" className="btn btn-primary w-100 rounded-pill py-2 fw-bold" onClick={() => setSelectedBooking(null)}>
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}