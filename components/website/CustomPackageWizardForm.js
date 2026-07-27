"use client";

import { useMemo, useState } from "react";
import { axiosNormalPost } from "@/libs/axiosHelper";
import { createHolidayEnquiryUrl } from "@/routes/serviceRoutes";

const STEP_META = [
  { key: "contact", label: "Contact & Info", hint: "Name, phone, email & city", icon: "bi-person-vcard" },
  { key: "destination", label: "Destination & Dates", hint: "Where & when you plan to travel", icon: "bi-geo-alt-fill" },
  { key: "travelers", label: "Travelers & Stay", hint: "Adults, kids & hotel category", icon: "bi-people-fill" },
  { key: "transport", label: "Transport & Budget", hint: "Vehicle, flights & budget band", icon: "bi-car-front-fill" },
  { key: "review", label: "Review & Submit", hint: "Confirm & get custom quote", icon: "bi-clipboard2-check-fill" },
];

const DESTINATIONS = [
  "Sundarban National Park, West Bengal",
  "Darjeeling & Kalimpong, West Bengal",
  "Digha & Mandarmani Beach, West Bengal",
  "Gangtok & North Sikkim",
  "Himachal Pradesh (Manali / Shimla)",
  "Kashmir Valley & Gulmarg",
  "Goa Beach & Heritage Retreat",
  "Kerala (Alleppey Backwaters / Munnar)",
  "Rajasthan (Jaipur / Udaipur / Jaisalmer)",
  "Rishikesh & Jim Corbett Safari",
  "Bali, Indonesia (International)",
  "Thailand (Phuket / Bangkok)",
  "Other / Multi-Destination Custom Trip"
];

const HOTEL_CATEGORIES = [
  "3 Star Standard Hotel",
  "4 Star Premium Resort",
  "5 Star Luxury Hotel",
  "Heritage / Boutique Stay",
  "Eco-Resort / Luxury Houseboat"
];

const CAB_TYPES = [
  "AC Sedan (Dzire / Etios)",
  "AC SUV (Innova Crysta)",
  "AC Tempo Traveller (12-26 Seater)",
  "Luxury Bus / Coach",
  "Not Required / Local Transport"
];

const MEAL_PLANS = [
  "All Meals Included",
  "Breakfast & Dinner Only",
  "Breakfast Only",
  "Mixed (Veg & Non-Veg)",
  "Strict Jain Meals"
];

const BUDGET_BANDS = [
  "Economy (Under ₹5,000 / person)",
  "Standard (₹5,000 - ₹10,000 / person)",
  "Premium (₹10,000 - ₹20,000 / person)",
  "Luxury (₹20,000+ / person)",
  "Flexible / Discuss on Call"
];

const TRIP_TYPES = [
  "Custom Family Holiday",
  "Friends / Group Adventure",
  "Honeymoon / Couple Special",
  "Corporate Offsite / Outing",
  "Solo Explorer / Trekking"
];

const initialForm = {
  // Step 1: Contact
  fullName: "",
  phone: "",
  email: "",
  city: "",
  tripType: "Custom Family Holiday",

  // Step 2: Destination & Dates
  destination: DESTINATIONS[0],
  departureCity: "Kolkata",
  departureDate: "",
  travelWindow: "",
  durationDays: 3,
  durationNights: 2,

  // Step 3: Travelers & Stay
  adultsCount: 2,
  childrenCount: 0,
  infantsCount: 0,
  hotelCategory: HOTEL_CATEGORIES[1],
  roomSharing: "Twin Sharing",
  mealPlan: MEAL_PLANS[0],

  // Step 4: Transport & Budget
  cabType: CAB_TYPES[0],
  includeFlights: false,
  includeTrain: false,
  budgetBand: BUDGET_BANDS[1],
  specialNotes: ""
};

function Counter({ label, sublabel, value, onChange, min = 0, max = 500 }) {
  const step = (delta) => onChange(Math.min(max, Math.max(min, value + delta)));
  return (
    <div className="bg-light p-2 px-3 rounded-3 border">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-1">
        <span className="text-2xs fw-bold text-dark">{label}</span>
        {sublabel && <small className="text-muted text-2xs">({sublabel})</small>}
      </div>
      <div className="d-flex align-items-center justify-content-between bg-white rounded-2 border p-0.5">
        <button
          type="button"
          className="btn btn-sm btn-light py-0 px-2 fw-bold text-dark"
          onClick={() => step(-1)}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          type="number"
          className="form-control form-control-sm text-center border-0 fw-bold py-0 text-dark"
          style={{ width: "48px", background: "transparent", fontSize: "13px" }}
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
          inputMode="numeric"
        />
        <button
          type="button"
          className="btn btn-sm btn-light py-0 px-2 fw-bold text-primary"
          onClick={() => step(1)}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function ChoicePill({ label, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`py-1.5 px-2.5 rounded-2 border cursor-pointer transition-all d-inline-flex align-items-center gap-1.5 ${
        selected
          ? "bg-primary text-white border-primary shadow-sm"
          : "bg-white text-dark border-light-subtle hover-bg-light"
      }`}
      style={{
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: selected ? "600" : "500",
        backgroundColor: selected ? "#ff5c41" : "#ffffff",
        borderColor: selected ? "#ff5c41" : "#cbd5e1",
        color: selected ? "#ffffff" : "#334155"
      }}
    >
      <i className={`bi ${selected ? "bi-check-circle-fill text-white" : "bi-circle text-muted"}`} style={{ fontSize: "11px" }} />
      <span>{label}</span>
    </div>
  );
}

export default function CustomPackageWizardForm({ isModal = false, onClose = null, onSubmit = null }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedJson, setSubmittedJson] = useState(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const progress = useMemo(() => ((step + 1) / STEP_META.length) * 100, [step]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const totalTravelersCount = form.adultsCount + form.childrenCount + form.infantsCount;

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = "Full name is required";
      if (!form.phone.trim()) {
        e.phone = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(form.phone.trim()) && !/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) {
        e.phone = "Enter a valid 10-digit mobile number";
      }
      if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
        e.email = "Enter a valid email address";
      }
      if (!form.city.trim()) e.city = "Departure / residence city is required";
    }
    if (step === 1) {
      if (!form.destination) e.destination = "Destination is required";
      if (!form.departureDate) e.departureDate = "Please select departure date";
      if (form.durationDays < 1) e.durationDays = "Trip duration must be at least 1 day";
    }
    if (step === 2) {
      if (form.adultsCount < 1) e.adultsCount = "At least 1 adult traveler is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(STEP_META.length - 1, s + 1));
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  // Build the clean JSON payload for backend API (createHolidayEnquiry)
  const buildBackendPayload = () => {
    return {
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      destination: form.destination,
      adults: String(form.adultsCount),
      children: String(form.childrenCount),
      travel_date: form.departureDate,
      budget: form.budgetBand,
      message: form.specialNotes
        ? `${form.specialNotes} (Duration: ${form.durationDays} Days, Hotel: ${form.hotelCategory}, Cab: ${form.cabType})`
        : `Looking for ${form.durationDays}-day ${form.tripType} package to ${form.destination}. Stay: ${form.hotelCategory}, Cab: ${form.cabType}.`
    };
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setSubmitError(null);

    const jsonPayload = buildBackendPayload();

    try {
      const response = await axiosNormalPost(createHolidayEnquiryUrl, jsonPayload);

      if (response && !(response instanceof Error) && (response.status === true || response.status === "true" || response.insertId || response.enquiry)) {
        setSubmittedJson(jsonPayload);
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(jsonPayload, response);
        }
        console.log("Submitted Holiday Enquiry to Backend API:", JSON.stringify(jsonPayload, null, 2));
        setSubmitted(true);
      } else if (response && !(response instanceof Error)) {
        setSubmittedJson(jsonPayload);
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(jsonPayload, response);
        }
        setSubmitted(true);
      } else {
        const errMsg = (response && response.msg) || (response && response.message) || "Failed to submit holiday enquiry. Please try again.";
        setSubmitError(errMsg);
      }
    } catch (err) {
      console.error("Error submitting holiday enquiry:", err);
      setSubmitError("An error occurred while submitting your holiday enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (submittedJson) {
      navigator.clipboard.writeText(JSON.stringify(submittedJson, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2500);
    }
  };

  if (submitted) {
    return (
      <div id="custom-package-wizard-form" className="ds-wizard-shell position-relative bg-white rounded-4 shadow-lg overflow-hidden border border-light-subtle">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn-close position-absolute top-0 end-0 m-3 z-3 bg-white p-2 rounded-circle shadow-sm"
            aria-label="Close"
          />
        )}
        <div className="ds-wizard-main text-center py-4 px-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle mb-2 p-2.5" style={{ width: 60, height: 60 }}>
            <i className="bi bi-check-lg fs-2" />
          </div>
          <h4 className="fw-bold mb-1 text-dark">Custom Package Enquiry Received!</h4>
          <p className="ds-lead mx-auto mb-3 text-secondary" style={{ maxWidth: 500, fontSize: '13px' }}>
            Thank you <strong>{form.fullName}</strong>! Your custom package request for <strong>{form.destination}</strong> ({totalTravelersCount} Travelers, {form.durationDays} Days) has been received.
          </p>

          {/* DISPLAY BACKEND SUBMISSION JSON */}
          <div className="text-start bg-dark text-warning p-2.5 rounded-3 mb-3 text-xs font-monospace overflow-auto shadow-inner" style={{ maxHeight: '180px', fontSize: '11px' }}>
            <div className="d-flex justify-content-between align-items-center mb-1.5 pb-1 border-bottom border-secondary">
              <span className="text-light fw-bold"><i className="bi bi-code-square me-1"></i> Backend Submission Payload (JSON):</span>
              <button onClick={handleCopyJson} type="button" className="btn btn-sm btn-outline-warning text-2xs py-0 px-2">
                <i className="bi bi-clipboard me-1"></i> {copiedJson ? 'Copied!' : 'Copy JSON'}
              </button>
            </div>
            <pre className="m-0 text-warning" style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(submittedJson, null, 2)}
            </pre>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary px-3 py-1.5 rounded-pill fw-semibold text-xs"
              onClick={() => {
                setForm(initialForm);
                setStep(0);
                setSubmitted(false);
                setSubmittedJson(null);
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Create Another
            </button>
            {onClose && (
              <button type="button" className="btn btn-primary px-4 py-1.5 rounded-pill fw-semibold text-xs" style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }} onClick={onClose}>
                Done <i className="bi bi-check-circle ms-1"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="custom-package-wizard-form" className="ds-wizard-shell position-relative bg-white rounded-4 shadow-lg overflow-hidden border border-light-subtle">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="btn-close position-absolute top-0 end-0 m-2.5 z-3 bg-white p-2 rounded-circle shadow-sm"
          aria-label="Close"
        />
      )}
      
      {/* MOBILE / TABLET COMPACT TOP HEADER & ONLY ICON PROCESS ROADMAP */}
      <div className="d-lg-none px-3 py-2 text-white d-flex align-items-center justify-content-between border-bottom" style={{ background: 'linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%)' }}>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-warning text-dark text-2xs fw-bold">Custom Tour</span>
          <span className="text-white text-xs fw-bold">{STEP_META[step].label}</span>
        </div>
        
        {/* ONLY ICONS SHOWN ON TABLET & MOBILE VIEW */}
        <div className="d-flex align-items-center gap-1.5">
          {STEP_META.map((s, i) => {
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div
                key={s.key}
                onClick={() => { if (i < step) setStep(i); }}
                className={`rounded-circle d-flex align-items-center justify-content-center transition-all ${
                  isActive
                    ? "bg-warning text-dark fw-bold shadow-sm scale-110"
                    : isDone
                    ? "bg-success text-white opacity-90"
                    : "bg-white bg-opacity-20 text-white opacity-50"
                }`}
                style={{ width: 28, height: 28, fontSize: '11px', cursor: isDone ? 'pointer' : 'default' }}
                title={s.label}
              >
                {isDone ? <i className="bi bi-check-lg" /> : <i className={`bi ${s.icon}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="row g-0">
        {/* DESKTOP LEFT SIDE NAVIGATION PANEL */}
        <div className="col-lg-4 d-none d-lg-flex">
          <div className="ds-wizard-side p-4 h-100 text-white d-flex flex-column justify-content-between" style={{ background: 'linear-gradient(145deg, #0a192f 0%, #112240 50%, #1e3a8a 100%)' }}>
            <div>
              <span className="badge px-3 py-1.5 rounded-pill text-uppercase text-2xs fw-bold mb-3 d-inline-flex align-items-center gap-1" style={{ backgroundColor: 'rgba(255,92,65,0.25)', color: '#ff5c41', border: '1px solid rgba(255,92,65,0.4)' }}>
                <i className="bi bi-magic"></i> Custom Tour Wizard
              </span>
              <h3 className="fw-bold mt-1 text-white fs-4">Build Custom Package</h3>
              <p className="text-light opacity-75 text-xs mb-4">
                Tailor your destination, dates, hotel preference &amp; budget in 5 quick steps for an instant personalized quote.
              </p>

              {/* STEP PROGRESS TIMELINE (DESKTOP FULL LABELS) */}
              <div className="d-flex flex-column gap-3 mb-3">
                {STEP_META.map((s, i) => {
                  const isActive = i === step;
                  const isDone = i < step;
                  return (
                    <div key={s.key} className="d-flex align-items-center gap-3">
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center transition-all ${
                          isActive
                            ? "bg-warning text-dark fw-bold shadow"
                            : isDone
                            ? "bg-success text-white"
                            : "bg-white bg-opacity-10 text-white opacity-50"
                        }`}
                        style={{ width: 34, height: 34, minWidth: 34, fontSize: '13px' }}
                      >
                        {isDone ? <i className="bi bi-check-lg" /> : <i className={`bi ${s.icon}`} />}
                      </div>
                      <div>
                        <span className={`d-block text-xs fw-semibold ${isActive ? "text-white fw-bold fs-6" : isDone ? "text-light opacity-90" : "text-white opacity-50"}`}>
                          {s.label}
                        </span>
                        <small className="text-white opacity-60 text-2xs d-block">{s.hint}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-top border-white border-opacity-10">
              <div className="d-flex align-items-center gap-2 text-2xs text-light opacity-80">
                <i className="bi bi-shield-check text-success fs-6"></i>
                <span>100% Free Customization &amp; Instant Quote</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM CONTENT PANEL (OPTIMIZED COMPACT NO-SCROLL LAYOUT) */}
        <div className="col-lg-8">
          <div className="ds-wizard-main p-3 p-md-4" style={{ maxHeight: "82vh", overflowY: "auto" }}>
            
            {/* DESKTOP PROGRESS BAR */}
            <div className="d-none d-lg-flex justify-content-between align-items-center mb-1">
              <span className="badge bg-light text-dark border px-2.5 py-1 rounded-pill text-2xs fw-semibold">
                Step {step + 1} of {STEP_META.length} — {STEP_META[step].label}
              </span>
              <span className="text-muted fw-bold text-2xs">{Math.round(progress)}% Completed</span>
            </div>
            
            <div className="progress mb-3 d-none d-lg-flex" style={{ height: "4px", backgroundColor: "#e2e8f0" }}>
              <div
                className="progress-bar transition-all"
                role="progressbar"
                style={{ width: `${progress}%`, backgroundColor: "#ff5c41" }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>

            <form onSubmit={handleSubmit} className="mt-2" noValidate>
              
              {/* STEP 0 — CONTACT & TRAVELER DETAILS */}
              {step === 0 && (
                <div className="row g-2">
                  <div className="col-12 mb-1">
                    <h6 className="fw-bold text-dark mb-0.5 d-flex align-items-center gap-1.5">
                      <i className="bi bi-person-badge text-primary" style={{ color: '#ff5c41' }}></i>
                      Your Contact &amp; Travel Profile
                    </h6>
                    <p className="text-muted text-2xs mb-0">Share contact details so our travel expert can share custom itineraries.</p>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">Full Name *</label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light text-muted"><i className="bi bi-person"></i></span>
                      <input
                        className={`form-control text-xs ${errors.fullName ? "is-invalid" : ""}`}
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    {errors.fullName && <div className="invalid-feedback text-2xs d-block mt-0.5">{errors.fullName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">Phone / WhatsApp Number *</label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light text-muted"><i className="bi bi-whatsapp"></i></span>
                      <input
                        type="tel"
                        className={`form-control text-xs ${errors.phone ? "is-invalid" : ""}`}
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.phone && <div className="invalid-feedback text-2xs d-block mt-0.5">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">Email Address *</label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light text-muted"><i className="bi bi-envelope"></i></span>
                      <input
                        type="email"
                        className={`form-control text-xs ${errors.email ? "is-invalid" : ""}`}
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="name@example.com"
                      />
                    </div>
                    {errors.email && <div className="invalid-feedback text-2xs d-block mt-0.5">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">City of Residence / Departure *</label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-light text-muted"><i className="bi bi-building"></i></span>
                      <input
                        className={`form-control text-xs ${errors.city ? "is-invalid" : ""}`}
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="e.g. Kolkata, Delhi, Mumbai"
                      />
                    </div>
                    {errors.city && <div className="invalid-feedback text-2xs d-block mt-0.5">{errors.city}</div>}
                  </div>

                  <div className="col-md-12">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">Trip Type / Travel Occasion</label>
                    <select
                      className="form-select form-select-sm text-xs"
                      value={form.tripType}
                      onChange={(e) => update("tripType", e.target.value)}
                    >
                      {TRIP_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 1 — DESTINATION & SCHEDULE */}
              {step === 1 && (
                <div className="row g-2">
                  <div className="col-12 mb-1">
                    <h6 className="fw-bold text-dark mb-0.5 d-flex align-items-center gap-1.5">
                      <i className="bi bi-compass text-primary" style={{ color: '#ff5c41' }}></i>
                      Destination &amp; Travel Schedule
                    </h6>
                    <p className="text-muted text-2xs mb-0">Choose your destination and preferred departure date.</p>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">Select Destination *</label>
                    <select
                      className={`form-select form-select-sm text-xs ${errors.destination ? "is-invalid" : ""}`}
                      value={form.destination}
                      onChange={(e) => update("destination", e.target.value)}
                    >
                      {DESTINATIONS.map((dest) => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                    {errors.destination && <div className="invalid-feedback text-2xs d-block mt-0.5">{errors.destination}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">Departure Date *</label>
                    <input
                      type="date"
                      className={`form-control form-control-sm text-xs ${errors.departureDate ? "is-invalid" : ""}`}
                      value={form.departureDate}
                      onChange={(e) => update("departureDate", e.target.value)}
                    />
                    {errors.departureDate && <div className="invalid-feedback text-2xs d-block mt-0.5">{errors.departureDate}</div>}
                  </div>

                  <div className="col-4">
                    <Counter
                      label="Trip Days *"
                      value={form.durationDays}
                      min={1}
                      onChange={(v) => {
                        update("durationDays", v);
                        update("durationNights", Math.max(0, v - 1));
                      }}
                    />
                  </div>

                  <div className="col-4">
                    <Counter
                      label="Trip Nights"
                      value={form.durationNights}
                      min={0}
                      onChange={(v) => update("durationNights", v)}
                    />
                  </div>

                  <div className="col-4">
                    <div className="bg-light p-2 px-2.5 rounded-3 border h-100">
                      <label className="form-label text-2xs fw-bold text-dark mb-1">Departure City</label>
                      <input
                        className="form-control form-control-sm text-xs border bg-white"
                        value={form.departureCity}
                        onChange={(e) => update("departureCity", e.target.value)}
                        placeholder="City of departure"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — TRAVELERS & HOTEL STAY */}
              {step === 2 && (
                <div className="row g-2">
                  <div className="col-12 mb-1">
                    <h6 className="fw-bold text-dark mb-0.5 d-flex align-items-center gap-1.5">
                      <i className="bi bi-house-heart text-primary" style={{ color: '#ff5c41' }}></i>
                      Travelers &amp; Hotel Preference
                    </h6>
                    <p className="text-muted text-2xs mb-0">Specify group size and accommodation level.</p>
                  </div>

                  <div className="col-4">
                    <Counter
                      label="Adults *"
                      sublabel="12+ yrs"
                      value={form.adultsCount}
                      min={1}
                      onChange={(v) => update("adultsCount", v)}
                    />
                  </div>

                  <div className="col-4">
                    <Counter
                      label="Children"
                      sublabel="2-11 yrs"
                      value={form.childrenCount}
                      min={0}
                      onChange={(v) => update("childrenCount", v)}
                    />
                  </div>

                  <div className="col-4">
                    <Counter
                      label="Infants"
                      sublabel="0-2 yrs"
                      value={form.infantsCount}
                      min={0}
                      onChange={(v) => update("infantsCount", v)}
                    />
                  </div>

                  {errors.adultsCount && (
                    <div className="col-12 text-danger text-2xs fw-bold">{errors.adultsCount}</div>
                  )}

                  <div className="col-12 mt-2">
                    <label className="form-label text-2xs fw-bold text-dark mb-1.5">Hotel Category Preference</label>
                    <div className="d-flex flex-wrap gap-1.5">
                      {HOTEL_CATEGORIES.map((category) => (
                        <ChoicePill
                          key={category}
                          label={category}
                          selected={form.hotelCategory === category}
                          onClick={() => update("hotelCategory", category)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="col-12 mt-2">
                    <label className="form-label text-2xs fw-bold text-dark mb-1.5">Meal Plan Preference</label>
                    <div className="d-flex flex-wrap gap-1.5">
                      {MEAL_PLANS.map((meal) => (
                        <ChoicePill
                          key={meal}
                          label={meal}
                          selected={form.mealPlan === meal}
                          onClick={() => update("mealPlan", meal)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 — TRANSPORT & BUDGET */}
              {step === 3 && (
                <div className="row g-2">
                  <div className="col-12 mb-1">
                    <h6 className="fw-bold text-dark mb-0.5 d-flex align-items-center gap-1.5">
                      <i className="bi bi-wallet2 text-primary" style={{ color: '#ff5c41' }}></i>
                      Transport &amp; Budget Band
                    </h6>
                    <p className="text-muted text-2xs mb-0">Select cab requirement, flights, and budget target.</p>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-2xs fw-bold text-dark mb-1.5">Cab / Transport Required</label>
                    <div className="d-flex flex-wrap gap-1.5">
                      {CAB_TYPES.map((cab) => (
                        <ChoicePill
                          key={cab}
                          label={cab}
                          selected={form.cabType === cab}
                          onClick={() => update("cabType", cab)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6 mt-2">
                    <label className="form-label text-2xs fw-bold text-dark mb-1.5">Flight Tickets Inclusion?</label>
                    <div className="d-flex gap-1.5">
                      <ChoicePill
                        label="Yes, Flights"
                        selected={form.includeFlights === true}
                        onClick={() => update("includeFlights", true)}
                      />
                      <ChoicePill
                        label="No, Land Only"
                        selected={form.includeFlights === false}
                        onClick={() => update("includeFlights", false)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-2">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">Expected Budget Band (per person)</label>
                    <select
                      className="form-select form-select-sm text-xs"
                      value={form.budgetBand}
                      onChange={(e) => update("budgetBand", e.target.value)}
                    >
                      {BUDGET_BANDS.map((budget) => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 mt-2">
                    <label className="form-label text-2xs fw-bold text-dark mb-1">Custom Notes / Special Requests</label>
                    <textarea
                      className="form-control form-control-sm text-xs"
                      rows={2}
                      value={form.specialNotes}
                      onChange={(e) => update("specialNotes", e.target.value)}
                      placeholder="e.g. Sundarban boat safari, sea-facing resort room, dietary requests..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 4 — REVIEW & SUBMIT */}
              {step === 4 && (
                <div>
                  <h6 className="fw-bold text-dark mb-0.5 d-flex align-items-center gap-1.5">
                    <i className="bi bi-shield-check text-success"></i>
                    Review Summary
                  </h6>
                  <p className="text-muted text-2xs mb-2">Verify your choices before submitting your quote request.</p>

                  <div className="row g-2">
                    <div className="col-6">
                      <div className="p-2.5 bg-light rounded-3 border">
                        <span className="text-2xs text-uppercase fw-bold text-muted d-block">Contact</span>
                        <strong className="d-block text-dark text-xs">{form.fullName} ({form.city})</strong>
                        <small className="text-muted text-2xs d-block">{form.phone} | {form.email}</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-2.5 bg-light rounded-3 border">
                        <span className="text-2xs text-uppercase fw-bold text-muted d-block">Destination</span>
                        <strong className="d-block text-dark text-xs">{form.destination}</strong>
                        <small className="text-muted text-2xs d-block">
                          Date: {form.departureDate} ({form.durationDays}D / {form.durationNights}N)
                        </small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-2.5 bg-light rounded-3 border">
                        <span className="text-2xs text-uppercase fw-bold text-muted d-block">Travelers &amp; Stay</span>
                        <strong className="d-block text-dark text-xs">
                          {totalTravelersCount} Travelers ({form.adultsCount}A, {form.childrenCount}K, {form.infantsCount}I)
                        </strong>
                        <small className="text-secondary text-2xs d-block">{form.hotelCategory} ({form.mealPlan})</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-2.5 bg-light rounded-3 border">
                        <span className="text-2xs text-uppercase fw-bold text-muted d-block">Transport &amp; Budget</span>
                        <strong className="d-block text-dark text-xs">{form.cabType}</strong>
                        <small className="text-secondary text-2xs d-block">Budget: {form.budgetBand}</small>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted text-2xs mt-2 mb-0 d-flex align-items-center gap-1">
                    <i className="bi bi-lock-fill text-success"></i> Submitting sends your inquiry directly to our travel experts.
                  </p>
                </div>
              )}

              {submitError && (
                <div className="alert alert-danger text-2xs mt-2 mb-0 py-1.5 px-2.5 rounded-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-1.5" />
                  {submitError}
                </div>
              )}

              {/* STEP NAVIGATION BUTTONS */}
              <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-3 py-1.5 rounded-pill text-xs fw-semibold"
                  onClick={goBack}
                  disabled={step === 0 || loading}
                  style={{ visibility: step === 0 ? "hidden" : "visible" }}
                >
                  <i className="bi bi-arrow-left me-1" /> Back
                </button>

                {step < STEP_META.length - 1 ? (
                  <button type="button" className="btn btn-primary px-4 py-1.5 rounded-pill text-xs fw-bold" style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }} onClick={goNext}>
                    Next Step <i className="bi bi-arrow-right ms-1" />
                  </button>
                ) : (
                  <button type="submit" disabled={loading} className="btn btn-primary px-4 py-1.5 rounded-pill text-xs fw-bold" style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1.5" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit &amp; Get Quote <i className="bi bi-send ms-1" />
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
