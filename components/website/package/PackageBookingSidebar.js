"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { axiosNormalPost } from '@/libs/axiosHelper';
import { 
  createBookingsUrl, 
  createRazorpayOrderUrl, 
  verifyRazorpayPaymentUrl 
} from '@/routes/serviceRoutes';
import { showMessage } from '@/libs/commonHelper';
import AgentBookingModal from '@/components/website/package/AgentBookingModal';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PackageBookingSidebar({ packageDetails, ogImageUrl, siteUrl }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.userAuth || {});
  const isAgent = Number(user?.user_type) === 3;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState('pay'); // 'pay' or 'enquiry'
  const [activeAction, setActiveAction] = useState(null); // 'razorpay' or 'inquiry'
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  const [departure, setDeparture] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [formData, setFormData] = useState(() => {
    let name = '';
    let email = '';
    let phone = '';
    const u = user;
    if (u) {
      name = [u.first_name, u.last_name].filter(Boolean).join(' ').trim() || u.name || u.full_name || '';
      email = u.email || '';
      phone = u.phone || u.mobile || u.phone_number || '';
    } else if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('user') || localStorage.getItem('user_details') || localStorage.getItem('userAuth');
        if (stored) {
          const parsed = JSON.parse(stored);
          name = [parsed.first_name, parsed.last_name].filter(Boolean).join(' ').trim() || parsed.name || parsed.full_name || '';
          email = parsed.email || '';
          phone = parsed.phone || parsed.mobile || parsed.phone_number || '';
        }
      } catch (e) {}
    }
    return { name, phone, email, comment: '' };
  });

  const [travelers, setTravelers] = useState([
    { name: '', age: '', gender: 'Male' }
  ]);
  const [errors, setErrors] = useState({});

  const sidebarRef = useRef(null);

  const handleGuestsCountChange = (newCount) => {
    const count = Math.max(1, parseInt(newCount) || 1);
    setGuestsCount(count);
    setTravelers((prev) => {
      const list = [...prev];
      if (list.length < count) {
        for (let i = list.length; i < count; i++) {
          list.push({ name: '', age: '', gender: 'Male' });
        }
      } else if (list.length > count) {
        return list.slice(0, count);
      }
      return list;
    });
  };

  const openBookingModal = (intent) => {
    setBookingIntent(intent);
    setFormData((prev) => {
      let u = user;
      if (!u && typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('user') || localStorage.getItem('user_details') || localStorage.getItem('userAuth');
          if (stored) u = JSON.parse(stored);
        } catch (e) {}
      }
      if (u) {
        const name = [u.first_name, u.last_name].filter(Boolean).join(' ').trim() || u.name || u.full_name || '';
        const email = u.email || '';
        const phone = u.phone || u.mobile || u.phone_number || '';
        return {
          ...prev,
          name: prev.name || name,
          email: prev.email || email,
          phone: prev.phone || phone
        };
      }
      return prev;
    });
    setIsModalOpen(true);
  };

  const handleTravelerChange = (index, field, value) => {
    setTravelers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    if (errors[`traveler_${index}_${field}`]) {
      setErrors((prev) => ({ ...prev, [`traveler_${index}_${field}`]: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateBookingInputs = (isPayment = false) => {
    const newErrors = {};

    if (!departure) {
      newErrors.departure = 'Please select a departure travel date';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Contact person full name is required';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (isPayment || formData.email.trim()) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required for payment receipt & invoice';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          newErrors.email = 'Please enter a valid email address';
        }
      }
    }

    if (isPayment) {
      travelers.forEach((traveler, index) => {
        const tName = (traveler.name || (index === 0 ? formData.name : '')).trim();
        if (!tName) {
          newErrors[`traveler_${index}_name`] = `Traveler ${index + 1} name is required`;
        }
        if (!traveler.age || isNaN(traveler.age) || Number(traveler.age) < 1 || Number(traveler.age) > 120) {
          newErrors[`traveler_${index}_age`] = `Enter age (1-120)`;
        }
        if (!traveler.gender) {
          newErrors[`traveler_${index}_gender`] = `Select gender`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 1. Direct Instant Booking via Razorpay
  const handleRazorpayDirectBooking = async (e) => {
    if (e) e.preventDefault();
    if (!validateBookingInputs(true)) return;

    setActiveAction('razorpay');
    setPaymentLoading(true);
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        showMessage('error', 'Razorpay SDK failed to load. Please check your internet connection.');
        setPaymentLoading(false);
        setActiveAction(null);
        return;
      }

      const preparedTravelers = travelers.map((t, idx) => ({
        name: (t.name || (idx === 0 ? formData.name : '')).trim(),
        age: parseInt(t.age) || null,
        gender: t.gender || 'Male'
      }));

      const orderPayload = {
        package_id: packageDetails.id,
        total_travelers: guestsCount,
        departure_date: departure,
        customer_name: formData.name.trim(),
        customer_email: formData.email.trim() || user?.email,
        customer_phone: formData.phone.trim() || user?.phone,
        customer_comment: formData.comment?.trim() || null,
        travelers: preparedTravelers,
        user_id: user?.id || null
      };

      const orderRes = await axiosNormalPost(createRazorpayOrderUrl, orderPayload);
      if (!orderRes?.status || !orderRes?.order?.id) {
        showMessage('error', orderRes?.msg || 'Could not initialize online payment order. Please try again.');
        setPaymentLoading(false);
        setActiveAction(null);
        return;
      }

      const options = {
        key: orderRes.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_RQWjJm9q5lEiA8',
        amount: orderRes.order.amount,
        currency: orderRes.order.currency || 'INR',
        name: 'Delta Safari',
        description: `${packageDetails.title} (${guestsCount} Travelers)`,
        image: ogImageUrl || `${siteUrl}/assets/img/logo_DS.png`,
        order_id: orderRes.order.id,
        handler: async function (response) {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: orderRes.booking_id
            };

            const verifyRes = await axiosNormalPost(verifyRazorpayPaymentUrl, verifyPayload);
            if (verifyRes?.status) {
              showMessage('success', 'Payment verified! Invoice & booking confirmation dispatched to your email and admin.');
              setBookingSuccessData({
                booking_id: orderRes.booking_id || verifyRes.booking_id,
                invoice_number: verifyRes.invoice_number,
                total_amount: orderRes.total_amount || (packageDetails.actual_price * guestsCount),
                package_title: packageDetails.title,
                departure_date: departure,
                travelers_count: guestsCount,
                customer_name: formData.name,
                customer_email: formData.email || user?.email,
                customer_phone: formData.phone || user?.phone,
                travelers: preparedTravelers,
                payment_id: response.razorpay_payment_id
              });
              setIsModalOpen(false);
            } else {
              showMessage('error', verifyRes?.msg || 'Payment verification failed on server.');
            }
          } catch (verErr) {
            console.error('Verification error:', verErr);
            showMessage('error', 'Payment processed, verifying on server...');
          } finally {
            setPaymentLoading(false);
            setActiveAction(null);
          }
        },
        prefill: {
          name: formData.name || (user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : ''),
          email: formData.email || user?.email || '',
          contact: formData.phone || user?.phone || ''
        },
        theme: {
          color: '#ff5c41'
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
            setActiveAction(null);
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (response) {
        showMessage('error', response.error?.description || 'Payment failed. Please try another method.');
        setPaymentLoading(false);
        setActiveAction(null);
      });
      rzpInstance.open();
    } catch (error) {
      console.error('handleRazorpayDirectBooking error:', error);
      showMessage('error', error.message || 'Payment initiation failed. Please try again.');
      setPaymentLoading(false);
      setActiveAction(null);
    }
  };

  // 2. Booking Enquiry Form Submission
  const handleBookingFormSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateBookingInputs(false)) return;

    setActiveAction('inquiry');
    setPaymentLoading(true);
    try {
      const res = await axiosNormalPost(createBookingsUrl, {
        package_id: packageDetails.id,
        total_travelers: guestsCount,
        actual_price: packageDetails.actual_price,
        total_cost: packageDetails.actual_price * guestsCount,
        customer_name: formData.name.trim(),
        customer_email: formData.email?.trim() || null,
        customer_phone: formData.phone?.trim() || null,
        customer_comment: formData.comment?.trim() || null,
        departure_date: departure,
        booking_type: 'ENQUIRY_FORM',
        payment_method: 'INQUIRY',
        user_id: user?.id || null
      });

      if (res?.status) {
        setFormData({ name: '', phone: '', email: '', comment: '' });
        showMessage('success', 'Booking inquiry registered successfully! Our tour coordinator will call you shortly.');
        setIsModalOpen(false);
      } else {
        showMessage('error', res?.msg || 'Could not submit booking inquiry.');
      }
    } catch (err) {
      showMessage('error', 'Something went wrong! Please try again later.');
    } finally {
      setPaymentLoading(false);
      setActiveAction(null);
    }
  };

  if (!packageDetails) return null;

  return (
    <>
      <div ref={sidebarRef} className="position-sticky sticky-top-sidebar" style={{ top: '80px', zIndex: 10 }}>

        {/* PRICING CARD */}
        <div className="card border-0 shadow-sm bg-white rounded-4 overflow-hidden mb-4">

          {/* HEADER PRICE BLOCK */}
          <div
            className="p-4 border-bottom text-white position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2e266d 0%, #17123d 100%)'
            }}
          >
            {isAgent ? (
              <>
                <span className="badge bg-warning text-dark text-uppercase px-2.5 py-1 fw-bold rounded-pill mb-2" style={{ fontSize: '10px' }}>
                  <i className="fa-solid fa-user-shield me-1"></i> Certified Agent B2B Rate
                </span>
                <span className="text-uppercase text-xs text-light opacity-75 fw-bold d-block mb-1">Agent Net Rate</span>
                <div className="d-flex align-items-baseline gap-2">
                  <h2 className="h2 fw-extrabold text-warning mb-0 package-price" style={{ fontWeight: 800 }}>
                    ₹{Number(packageDetails.agent_actual_price || packageDetails.actual_price).toLocaleString('en-IN')}
                  </h2>
                  <del className="text-light opacity-50 text-sm fw-normal">
                    ₹{Number(packageDetails.base_price || packageDetails.actual_price).toLocaleString('en-IN')}
                  </del>
                </div>
                <div className="mt-2 p-2 rounded-3 bg-white bg-opacity-20 border border-white border-opacity-25 d-flex align-items-center justify-content-between">
                  <span className="text-white text-2xs fw-bold">
                    <i className="fa-solid fa-gift text-warning me-1"></i> Your Commission:
                  </span>
                  <span className="badge bg-warning text-dark fw-bold px-2 py-0.5" style={{ fontSize: '12px' }}>
                    ₹{Math.max(0, (packageDetails.base_price || 0) - (packageDetails.agent_actual_price || packageDetails.actual_price || 0)).toLocaleString('en-IN')} / pax
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="text-uppercase text-xs text-light opacity-75 fw-bold d-block mb-1">Starting From</span>
                <div className="d-flex align-items-baseline gap-2">
                  <h2 className="h2 fw-extrabold text-warning mb-0 package-price" style={{ fontWeight: 800 }}>
                    {packageDetails.currency === 'INR' ? '₹' : '$'}{Number(packageDetails.actual_price).toLocaleString('en-IN')}
                  </h2>
                  {packageDetails.base_price && (
                    <del className="text-light opacity-50 text-sm fw-normal">
                      {packageDetails.currency === 'INR' ? '₹' : '$'}{Number(packageDetails.base_price).toLocaleString('en-IN')}
                    </del>
                  )}
                </div>
                <small className="text-light opacity-75 text-3xs d-block mt-1">
                  Per Person on twin sharing basis (Taxes included)
                </small>
              </>
            )}
          </div>

          {/* BOOKING ACTION BLOCK */}
          <div className="card-body p-4">
            <div className="d-flex flex-column gap-3">

              {/* PACKAGE INCLUDES ICON MATRIX & ROUTE DETAILS */}
              <div>
                <small className="text-2xs text-uppercase text-muted fw-bold d-block mb-2">Package Includes:</small>
                <div className="d-flex justify-content-between text-center text-muted border-top border-bottom py-2.5 mb-2.5" style={{ fontSize: '11px' }}>
                  <div><i className="fa-solid fa-hotel fs-5 text-primary d-block mb-1"></i>Hotel</div>
                  <div><i className="fa-solid fa-camera fs-5 text-primary d-block mb-1"></i>Sightseeing</div>
                  <div><i className="fa-solid fa-bus fs-5 text-primary d-block mb-1"></i>Transfer</div>
                  <div><i className="fa-solid fa-utensils fs-5 text-primary d-block mb-1"></i>Meals</div>
                </div>

                {/* ROUTE & INSTANT CONFIRMATION INFO */}
                <div className="bg-light p-2.5 rounded-3 border mb-1">
                  <div className="text-2xs text-dark fw-semibold mb-1">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    <strong>Route:</strong> {packageDetails.from_destination_name || 'Kolkata'} ➔ {packageDetails.to_destination_name || 'Sundarban'} ➔ {packageDetails.from_destination_name || 'Kolkata'}
                  </div>
                  <div className="text-3xs text-success fw-bold">
                    <i className="bi bi-check-circle-fill me-1"></i> Instant Booking Confirmation Available
                  </div>
                </div>
              </div>

              {/* CTA BUTTONS */}
              {isAgent ? (
                <button
                  type="button"
                  onClick={() => setIsAgentModalOpen(true)}
                  className="btn btn-primary w-100 py-3 text-sm fw-bold rounded-3 shadow-sm hover-lift text-uppercase tracking-wider border-0 d-flex align-items-center justify-content-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #2e266d 0%, #1d184f 100%)' }}
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>Book for Client (B2B Multi-Traveler)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openBookingModal('pay')}
                  className="btn btn-danger w-100 py-3 text-sm fw-bold rounded-3 shadow-sm hover-lift text-uppercase tracking-wider border-0"
                  style={{ backgroundColor: '#ff5c41' }}
                >
                  <i className="bi bi-lightning-charge-fill me-1"></i> Book Now
                </button>
              )}

              <button
                type="button"
                onClick={() => openBookingModal('enquiry')}
                className="btn btn-outline-dark w-100 py-2.5 text-xs fw-bold rounded-3"
              >
                <i className="bi bi-envelope me-1"></i> Send Free Inquiry
              </button>

            </div>
          </div>

        </div>

        {/* HELP & SUPPORT BOX */}
        <div className="card border-0 shadow-sm bg-white rounded-4 p-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger">
              <i className="bi bi-headset fs-3"></i>
            </div>
            <div>
              <h5 className="fw-bold text-dark text-xs mb-1">Need Expert Assistance?</h5>
              <p className="text-secondary text-2xs mb-1">Speak directly with our Sundarban Tour Specialist.</p>
              <a href="tel:+919876543210" className="text-danger fw-bold text-xs text-decoration-none d-block">
                <i className="bi bi-telephone-fill me-1"></i> +91 98765 43210 / 033-2410-0000
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE BOTTOM FLOATING STICKY BOOKING BAR */}
      <div className="d-block d-lg-none position-fixed bottom-0 start-0 w-100 bg-white border-top shadow-lg p-3" style={{ zIndex: 9999 }}>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span className="text-3xs text-muted d-block">Starting from</span>
            <strong className="h5 fw-bold text-danger mb-0 package-price" style={{ fontWeight: 700 }}>
              {packageDetails.currency === 'INR' ? '₹' : '$'}{Number(packageDetails.actual_price).toLocaleString('en-IN')}
            </strong>
            <span className="text-3xs text-muted d-block">/ person</span>
          </div>
          <button
            type="button"
            onClick={() => openBookingModal('pay')}
            className="btn btn-danger px-4 py-2 text-xs fw-bold rounded-pill shadow-sm"
            style={{ backgroundColor: '#ff5c41' }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* INTERACTIVE BOOKING & INQUIRY MODAL */}
      {isModalOpen && (
        <div
          className="modal-backdrop-custom"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '16px'
          }}
        >
          <div
            className="bg-white rounded-4 shadow-2xl position-relative w-100"
            style={{
              maxWidth: '580px',
              maxHeight: '94vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(226, 232, 240, 0.8)'
            }}
          >
            {/* MODAL HEADER */}
            <div className="p-4 pb-3 border-bottom position-relative" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-close position-absolute top-0 end-0 m-3"
                aria-label="Close"
              ></button>

              <div className="d-flex align-items-center gap-2 mb-1.5">
                <span className="badge bg-danger-subtle text-danger fw-extrabold px-2.5 py-1 rounded-pill" style={{ fontSize: '11px' }}>
                  <i className="bi bi-clock-history me-1"></i>
                  {packageDetails.duration_days} Days / {packageDetails.duration_nights || Math.max(1, packageDetails.duration_days - 1)} Nights
                </span>
                <span className="badge bg-primary-subtle text-primary fw-bold px-2.5 py-1 rounded-pill" style={{ fontSize: '11px' }}>
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {packageDetails.from_destination_name || 'Kolkata'} ➔ {packageDetails.to_destination_name || 'Sundarban'}
                </span>
              </div>

              <h4 className="fw-extrabold text-dark h5 mb-1 text-truncate pe-4" title={packageDetails.title}>
                {packageDetails.title}
              </h4>

              {/* SWITCHER PILL: PAY & BOOK VS BOOK AN ENQUIRY */}
              <div className="d-flex p-1 bg-light rounded-pill mt-3 border shadow-2xs">
                <button
                  type="button"
                  onClick={() => setBookingIntent('pay')}
                  className={`btn btn-sm w-50 py-2 rounded-pill fw-bold text-xs d-flex align-items-center justify-content-center gap-1.5 transition-all ${
                    bookingIntent === 'pay'
                      ? 'btn-danger text-white shadow-sm'
                      : 'btn-light text-secondary border-0 bg-transparent'
                  }`}
                  style={bookingIntent === 'pay' ? { backgroundColor: '#ff5c41', borderColor: '#ff5c41' } : {}}
                >
                  <i className="bi bi-credit-card-2-front-fill text-warning"></i>
                  <span>Pay &amp; Book Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingIntent('enquiry')}
                  className={`btn btn-sm w-50 py-2 rounded-pill fw-bold text-xs d-flex align-items-center justify-content-center gap-1.5 transition-all ${
                    bookingIntent === 'enquiry'
                      ? 'btn-dark text-white shadow-sm'
                      : 'btn-light text-secondary border-0 bg-transparent'
                  }`}
                >
                  <i className="bi bi-chat-left-text-fill"></i>
                  <span>Book an Enquiry</span>
                </button>
              </div>
            </div>

            {/* MODAL SCROLLABLE BODY */}
            <div className="p-4 pt-3 overflow-y-auto" style={{ maxHeight: 'calc(94vh - 140px)' }}>
              <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3">

                {/* STEP 1: TRAVEL SCHEDULE & GUESTS COUNT */}
                <div className="row g-2">
                  <div className="col-12 col-md-6">
                    <label className="text-xs fw-bold text-dark mb-1 d-block">
                      <i className="bi bi-calendar-event me-1 text-danger"></i> Departure Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className={`form-control text-xs py-2 px-3 rounded-3 ${errors.departure ? 'is-invalid' : ''}`}
                      value={departure}
                      onChange={(e) => {
                        setDeparture(e.target.value);
                        if (errors.departure) setErrors((prev) => ({ ...prev, departure: '' }));
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    {errors.departure && <div className="invalid-feedback text-2xs">{errors.departure}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-xs fw-bold text-dark mb-1 d-block">
                      <i className="bi bi-people me-1 text-danger"></i> Total Travelers <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary text-xs px-3"
                        onClick={() => handleGuestsCountChange(guestsCount - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        className="form-control text-center text-xs font-bold"
                        value={guestsCount}
                        onChange={(e) => handleGuestsCountChange(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary text-xs px-3"
                        onClick={() => handleGuestsCountChange(guestsCount + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* STEP 2: PRIMARY CONTACT DETAILS */}
                <div className="p-3 bg-light bg-opacity-75 rounded-3 border">
                  <div className="text-2xs fw-extrabold text-uppercase text-muted tracking-wider mb-2.5 d-flex align-items-center gap-1.5">
                    <i className="bi bi-person-badge-fill text-primary"></i> Primary Contact Information
                  </div>

                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <label className="text-xs fw-bold text-dark mb-1 d-block">
                        Contact Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-control text-xs py-2 ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Primary contact name"
                        required
                      />
                      {errors.name && <div className="invalid-feedback text-2xs">{errors.name}</div>}
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="text-xs fw-bold text-dark mb-1 d-block">
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-control text-xs py-2 ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="10-digit mobile number"
                        required
                      />
                      {errors.phone && <div className="invalid-feedback text-2xs">{errors.phone}</div>}
                    </div>

                    <div className="col-12">
                      <label className="text-xs fw-bold text-dark mb-1 d-block">
                        Email Address <span className={bookingIntent === 'pay' ? 'text-danger' : 'text-muted fw-normal'}>
                          {bookingIntent === 'pay' ? '*' : '(For quotation & booking updates)'}
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-control text-xs py-2 ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="yourname@example.com"
                        required={bookingIntent === 'pay'}
                      />
                      {errors.email && <div className="invalid-feedback text-2xs">{errors.email}</div>}
                    </div>
                  </div>
                </div>

                {/* STEP 3: DYNAMIC TRAVELERS DETAILS (ONLY WHEN BOOKING INTENT === 'pay') */}
                {bookingIntent === 'pay' && (
                  <div className="d-flex flex-column gap-2.5">
                    <div className="d-flex align-items-center justify-content-between pt-1">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center bg-danger-subtle text-danger" style={{ width: '26px', height: '26px', fontSize: '13px' }}>
                          <i className="bi bi-person-lines-fill"></i>
                        </div>
                        <h6 className="fw-bold text-dark mb-0 text-xs text-uppercase tracking-wider">
                          Travelers Details ({guestsCount} Guest{guestsCount > 1 ? 's' : ''})
                        </h6>
                      </div>
                      <span className="badge bg-danger-subtle text-danger text-3xs font-semibold px-2 py-0.5 rounded-pill">
                        Name, Age &amp; Gender Required
                      </span>
                    </div>

                    {travelers.map((traveler, index) => (
                      <div key={index} className="p-3 bg-white rounded-3 border shadow-2xs position-relative">
                        <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                          <span className="text-xs fw-bold text-dark d-flex align-items-center gap-1.5">
                            <i className="bi bi-person-circle text-danger"></i>
                            {index === 0 ? 'Traveler 1 (Primary / Lead)' : `Traveler ${index + 1}`}
                          </span>
                          {index === 0 && (
                            <span className="badge bg-light text-secondary text-3xs border">Lead Guest</span>
                          )}
                        </div>

                        <div className="row g-2">
                          {/* Traveler Full Name */}
                          <div className="col-12 col-md-6">
                            <label className="text-3xs fw-bold text-muted mb-1 d-block">
                              Full Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              value={traveler.name}
                              onChange={(e) => handleTravelerChange(index, 'name', e.target.value)}
                              placeholder={`Traveler ${index + 1} Full Name`}
                              className={`form-control text-xs py-1.5 rounded-2 ${errors[`traveler_${index}_name`] ? 'is-invalid' : ''}`}
                            />
                            {errors[`traveler_${index}_name`] && (
                              <div className="invalid-feedback text-3xs">{errors[`traveler_${index}_name`]}</div>
                            )}
                          </div>

                          {/* Traveler Age */}
                          <div className="col-6 col-md-3">
                            <label className="text-3xs fw-bold text-muted mb-1 d-block">
                              Age <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="120"
                              value={traveler.age}
                              onChange={(e) => handleTravelerChange(index, 'age', e.target.value)}
                              placeholder="Age"
                              className={`form-control text-xs py-1.5 text-center rounded-2 ${errors[`traveler_${index}_age`] ? 'is-invalid' : ''}`}
                            />
                            {errors[`traveler_${index}_age`] && (
                              <div className="invalid-feedback text-3xs">{errors[`traveler_${index}_age`]}</div>
                            )}
                          </div>

                          {/* Traveler Gender */}
                          <div className="col-6 col-md-3">
                            <label className="text-3xs fw-bold text-muted mb-1 d-block">
                              Gender <span className="text-danger">*</span>
                            </label>
                            <select
                              value={traveler.gender || 'Male'}
                              onChange={(e) => handleTravelerChange(index, 'gender', e.target.value)}
                              className="form-select text-xs py-1.5 rounded-2"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SPECIAL REQUESTS / COMMENTS */}
                <div>
                  <label className="text-xs fw-bold text-dark mb-1 d-block">Special Requests / Tour Notes (Optional)</label>
                  <textarea
                    name="comment"
                    rows="2"
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="form-control text-xs py-2"
                    placeholder="Any food preferences, pickup points, or special requirements..."
                  ></textarea>
                </div>

                {/* PRICE CALCULATION SUMMARY CARD */}
                <div className="p-3 rounded-3 border" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
                  <div className="d-flex justify-content-between align-items-center text-xs mb-1.5">
                    <span className="text-secondary">Package Rate:</span>
                    <strong className="text-dark fw-bold package-price" style={{ fontWeight: 700 }}>₹{Number(packageDetails.actual_price).toLocaleString('en-IN')} / person</strong>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-xs mb-1.5">
                    <span className="text-secondary">Travelers:</span>
                    <span className="fw-semibold text-dark">{guestsCount} Person(s)</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-xs pt-2 border-top">
                    <span className="fw-extrabold text-dark">{bookingIntent === 'pay' ? 'Total Payable Now:' : 'Estimated Package Total:'}</span>
                    <strong className="text-danger fs-5 fw-extrabold package-price" style={{ fontWeight: 800 }}>
                      ₹{(packageDetails.actual_price * guestsCount).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="text-3xs text-muted mt-1 d-flex align-items-center gap-1">
                    <i className="bi bi-shield-check text-success"></i> Includes Sightseeing, Safari Boat, Forest Permits &amp; Taxes
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                {bookingIntent === 'pay' ? (
                  <div className="d-flex flex-column gap-2 mt-1">
                    <button
                      type="button"
                      onClick={handleRazorpayDirectBooking}
                      disabled={paymentLoading}
                      className="btn btn-danger w-100 py-3 text-sm fw-bold rounded-3 text-uppercase border-0 shadow-sm d-flex align-items-center justify-content-center gap-2 hover-lift"
                      style={{ backgroundColor: '#ff5c41', boxShadow: '0 4px 14px rgba(255, 92, 65, 0.4)' }}
                    >
                      {paymentLoading && activeAction === 'razorpay' ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                          <span>Connecting Razorpay Gateway...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-credit-card-2-front-fill fs-6"></i>
                          <span>Pay ₹{(packageDetails.actual_price * guestsCount).toLocaleString('en-IN')} &amp; Book Now</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingIntent('enquiry')}
                      className="btn btn-link text-decoration-none text-secondary text-xs fw-semibold py-1 text-center"
                    >
                      Need assistance first? <span className="text-primary text-decoration-underline">Book an Enquiry instead</span>
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2 mt-1">
                    <button
                      type="button"
                      onClick={handleBookingFormSubmit}
                      disabled={paymentLoading}
                      className="btn btn-dark w-100 py-3 text-sm fw-bold rounded-3 text-uppercase border-0 shadow-sm d-flex align-items-center justify-content-center gap-2 hover-lift"
                    >
                      {paymentLoading && activeAction === 'inquiry' ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-fill fs-6"></i>
                          <span>Submit Tour Enquiry</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingIntent('pay')}
                      className="btn btn-link text-decoration-none text-secondary text-xs fw-semibold py-1 text-center"
                    >
                      Ready for instant confirmation? <span className="text-danger text-decoration-underline">Pay &amp; Book Online Now</span>
                    </button>
                  </div>
                )}

                <div className="text-center text-muted text-3xs">
                  <i className="bi bi-lock-fill text-success me-1"></i>
                  {bookingIntent === 'pay' 
                    ? 'Secured 256-bit SSL Razorpay Gateway • Instant GST Tax Invoice' 
                    : 'Free quote • No payment required • 24/7 Delta Safari tour support'}
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

      {/* CELEBRATORY RAZORPAY BOOKING CONFIRMATION & INVOICE POPUP */}
      {bookingSuccessData && (
        <div
          className="modal-backdrop-custom"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10050,
            padding: '16px'
          }}
        >
          <div
            className="bg-white rounded-4 shadow-2xl p-4 p-md-5 position-relative w-100 text-center"
            style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div
              className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
              style={{ width: '64px', height: '64px', backgroundColor: '#dcfce7', color: '#16a34a', fontSize: '32px' }}
            >
              <i className="bi bi-check-lg"></i>
            </div>

            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill fw-bold mb-2">
              Payment &amp; Booking Confirmed
            </span>

            <h4 className="fw-extrabold text-dark h4 mb-1">
              Your Safari is Booked!
            </h4>
            <p className="text-secondary text-xs mb-4">
              Invoice and booking confirmation has been emailed to <strong>{bookingSuccessData.customer_email}</strong> and Delta Safari Operations.
            </p>

            <div className="p-3.5 bg-light rounded-4 border text-start mb-4">
              <div className="d-flex justify-content-between py-1 border-bottom text-xs">
                <span className="text-muted">Invoice Number:</span>
                <span className="fw-bold font-monospace text-primary">{bookingSuccessData.invoice_number}</span>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom text-xs">
                <span className="text-muted">Booking Reference:</span>
                <span className="fw-bold text-dark">#{bookingSuccessData.booking_id}</span>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom text-xs">
                <span className="text-muted">Tour Package:</span>
                <span className="fw-bold text-dark text-truncate" style={{ maxWidth: '240px' }}>{bookingSuccessData.package_title}</span>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom text-xs">
                <span className="text-muted">Departure Date:</span>
                <span className="fw-semibold text-dark">{bookingSuccessData.departure_date}</span>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom text-xs">
                <span className="text-muted">Total Travelers:</span>
                <span className="fw-semibold text-dark">{bookingSuccessData.travelers_count} Guest(s)</span>
              </div>
              {bookingSuccessData.travelers?.length > 0 && (
                <div className="py-2 border-bottom text-xs">
                  <span className="text-muted d-block mb-1">Registered Travelers:</span>
                  <div className="d-flex flex-wrap gap-1">
                    {bookingSuccessData.travelers.map((t, i) => (
                      <span key={i} className="badge bg-white text-dark border px-2 py-1 text-2xs">
                        {t.name} ({t.age} yrs, {t.gender})
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-between py-1.5 text-xs">
                <span className="fw-bold text-dark">Total Paid (Razorpay):</span>
                <strong className="text-success fs-6 fw-bold">₹{Number(bookingSuccessData.total_amount).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => { if (typeof window !== 'undefined') window.print(); }}
                className="btn btn-outline-dark w-50 py-2.5 rounded-pill text-xs fw-bold"
              >
                <i className="bi bi-printer me-1"></i> Print Receipt
              </button>
              <button
                type="button"
                onClick={() => setBookingSuccessData(null)}
                className="btn btn-danger w-50 py-2.5 rounded-pill text-xs fw-bold text-white border-0"
                style={{ backgroundColor: '#ff5c41' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent B2B Client Booking Modal */}
      {isAgentModalOpen && packageDetails && (
        <AgentBookingModal
          pkg={packageDetails}
          isOpen={isAgentModalOpen}
          onClose={() => setIsAgentModalOpen(false)}
          onSuccess={() => {}}
        />
      )}
    </>
  );
}
