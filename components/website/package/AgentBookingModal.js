"use client";

import React, { useState } from 'react';
import { axiosPost } from '@/libs/axiosHelper';
import { showMessage } from '@/libs/commonHelper';
import { useSelector } from 'react-redux';
import { createAgentBookingURL } from '@/routes/authRoutes';

export default function AgentBookingModal({ pkg, isOpen, onClose, onSuccess }) {
  const token = useSelector((state) => state.userAuth?.token);
  const { user } = useSelector((state) => state.userAuth || {});

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [customerComment, setCustomerComment] = useState('');

  const [travelers, setTravelers] = useState([
    { name: '', age: '', gender: 'Male' }
  ]);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !pkg) return null;

  const basePrice = Number(pkg.base_price) || 0;
  const agentNetPrice = Number(pkg.agent_actual_price || pkg.actual_price || basePrice);
  const commPerPerson = Math.max(0, basePrice - agentNetPrice);
  const totalTravelers = travelers.length || 1;
  const totalCost = agentNetPrice * totalTravelers;
  const totalCommission = commPerPerson * totalTravelers;

  const addTraveler = () => {
    setTravelers([...travelers, { name: '', age: '', gender: 'Male' }]);
  };

  const removeTraveler = (index) => {
    if (travelers.length <= 1) {
      showMessage('At least one traveler is required.', 'error');
      return;
    }
    const updated = travelers.filter((_, i) => i !== index);
    setTravelers(updated);
  };

  const handleTravelerChange = (index, field, value) => {
    const updated = [...travelers];
    updated[index][field] = value;
    setTravelers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showMessage('Please provide primary client name and phone number.', 'error');
      return;
    }

    if (!departureDate) {
      showMessage('Please select a tour departure date.', 'error');
      return;
    }

    // Validate traveler names
    const invalidTraveler = travelers.find(t => !t.name || !t.age);
    if (invalidTraveler) {
      showMessage('Please fill in name and age for all registered travelers.', 'error');
      return;
    }

    // Extract Bearer token with fallbacks
    let authToken = token;
    if (!authToken && typeof window !== 'undefined') {
      try {
        const storedToken = localStorage.getItem('token') || localStorage.getItem('user_token');
        if (storedToken) {
          authToken = storedToken;
        } else {
          const persistedState = localStorage.getItem('persist:root');
          if (persistedState) {
            const parsedRoot = JSON.parse(persistedState);
            const userAuth = parsedRoot?.userAuth ? JSON.parse(parsedRoot.userAuth) : null;
            if (userAuth?.token) authToken = userAuth.token;
          }
        }
      } catch (e) {}
    }

    if (!authToken) {
      showMessage('Session expired or authentication token missing. Please sign in again as Agent.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        package_id: pkg.id,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        departure_date: departureDate,
        total_travelers: totalTravelers,
        travelers: travelers,
        customer_comment: customerComment
      };

      const res = await axiosPost(createAgentBookingURL, payload, authToken);

      if (res?.status) {
        showMessage('B2B Client Booking submitted to Admin! Commission will be credited once confirmed.', 'success');
        if (onSuccess) onSuccess(res);
        onClose();
      } else {
        showMessage(res?.msg || 'Failed to submit booking request.', 'error');
      }
    } catch (err) {
      showMessage(err?.response?.data?.msg || err.message || 'Server connection error.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 text-white d-flex align-items-center justify-content-between border-bottom" style={{ background: 'linear-gradient(135deg, #2e266d 0%, #17123d 100%)' }}>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-warning text-dark px-2.5 py-1 rounded-pill fw-bold text-uppercase" style={{ fontSize: '10px' }}>
                <i className="fa-solid fa-user-shield me-1"></i> Agent B2B Client Booking
              </span>
              <span className="badge bg-white bg-opacity-20 text-white px-2.5 py-1 rounded-pill fw-bold" style={{ fontSize: '10px' }}>
                Guaranteed Commission
              </span>
            </div>
            <h5 className="modal-title fw-bold text-white mb-0">{pkg.title}</h5>
            <small className="text-light text-opacity-75">
              {pkg.duration_nights || 0}N / {pkg.duration_days || 1}D | {pkg.from_destination_name || 'Kolkata'} ➔ {pkg.to_destination_name || 'Sundarban'}
            </small>
          </div>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
          ></button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto" style={{ flex: 1 }}>
          <form onSubmit={handleSubmit}>
            {/* Live Pricing & Commission Strip (Theme Blue) */}
            <div className="row g-3 p-3 bg-primary-subtle rounded-4 border border-primary-subtle mb-4">
              <div className="col-sm-3">
                <small className="text-muted d-block text-uppercase" style={{ fontSize: '11px' }}>Travelers Count</small>
                <strong className="text-dark fs-6">{totalTravelers} Person(s)</strong>
              </div>
              <div className="col-sm-3">
                <small className="text-muted d-block text-uppercase" style={{ fontSize: '11px' }}>Agent B2B Net / Pax</small>
                <strong className="text-dark fs-6">₹{agentNetPrice.toLocaleString('en-IN')}</strong>
              </div>
              <div className="col-sm-3">
                <small className="text-muted d-block text-uppercase" style={{ fontSize: '11px' }}>Total Client Cost</small>
                <strong className="text-primary fs-6">₹{totalCost.toLocaleString('en-IN')}</strong>
              </div>
              <div className="col-sm-3">
                <small className="text-primary fw-bold d-block text-uppercase" style={{ fontSize: '11px' }}>Your Commission (₹)</small>
                <strong className="text-primary fs-5 fw-extrabold" style={{ color: '#2e266d' }}>₹{totalCommission.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Primary Client Contact Details */}
            <h6 className="fw-bold text-dark text-uppercase mb-3 d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
              <i className="fa-solid fa-address-card text-primary"></i> 1. Primary Client Contact Information
            </h6>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label text-muted small fw-semibold">Client Full Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Rajesh Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label text-muted small fw-semibold">Client Phone Number <span className="text-danger">*</span></label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="e.g. 9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label text-muted small fw-semibold">Client Email (Optional)</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="client@email.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small fw-semibold">Tour Departure Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  className="form-control"
                  value={departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small fw-semibold">Special Instructions / Requests</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. AC Boat Safari, Veg Meals, etc."
                  value={customerComment}
                  onChange={(e) => setCustomerComment(e.target.value)}
                />
              </div>
            </div>

            {/* Multiple Travelers Dynamic List */}
            <div className="d-flex align-items-center justify-content-between mb-3 border-top pt-4">
              <h6 className="fw-bold text-dark text-uppercase mb-0 d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
                <i className="fa-solid fa-users text-primary"></i> 2. Registered Tour Travelers ({travelers.length})
              </h6>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-bold d-flex align-items-center gap-1"
                onClick={addTraveler}
              >
                <i className="fa-solid fa-plus"></i> Add Another Traveler
              </button>
            </div>

            <div className="d-flex flex-column gap-2 mb-4">
              {travelers.map((traveler, index) => (
                <div key={index} className="p-3 bg-light rounded-3 border d-flex flex-column flex-md-row align-items-md-center gap-2">
                  <span className="badge bg-secondary rounded-circle px-2 py-1" style={{ width: '26px', height: '26px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {index + 1}
                  </span>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder={`Traveler ${index + 1} Full Name`}
                      value={traveler.name}
                      onChange={(e) => handleTravelerChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ width: '100px' }}>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Age (yrs)"
                      min="1"
                      max="110"
                      value={traveler.age}
                      onChange={(e) => handleTravelerChange(index, 'age', e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ width: '130px' }}>
                    <select
                      className="form-select form-select-sm"
                      value={traveler.gender}
                      onChange={(e) => handleTravelerChange(index, 'gender', e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {travelers.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger px-2.5 py-1 rounded-2"
                      onClick={() => removeTraveler(index)}
                      title="Remove Traveler"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Terms & Submission Notice */}
            <div className="alert alert-info border-0 rounded-3 small p-3 mb-0">
              <i className="fa-solid fa-circle-info me-1.5"></i>
              <strong>B2B Agent Settlement Policy:</strong> This booking request will be instantly dispatched to the Delta Safari reservation desk. Upon confirmation and settlement, your commission of <strong>₹{totalCommission.toLocaleString('en-IN')}</strong> will be credited directly to your Agent Wallet balance.
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
              <button
                type="button"
                className="btn btn-light rounded-pill px-4 py-2"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-5 py-2.5 fw-bold shadow d-flex align-items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #2e266d 0%, #1d184f 100%)', border: 'none' }}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Submit B2B Booking (₹{totalCost.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
