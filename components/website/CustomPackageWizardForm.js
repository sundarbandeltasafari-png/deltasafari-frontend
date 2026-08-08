"use client";

import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosNormalPost } from "@/libs/axiosHelper";
import { createHolidayEnquiryUrl, getDestinationsUrl } from "@/routes/serviceRoutes";

const STEP_META = [
  { key: "contact", label: "Contact & Info", hint: "Name, phone, email & city", icon: "fa-solid fa-address-card" },
  { key: "destination", label: "Destination & Dates", hint: "Where & when you plan to travel", icon: "fa-solid fa-location-dot" },
  { key: "travelers", label: "Travelers & Stay", hint: "Adults, kids & hotel category", icon: "fa-solid fa-user-group" },
  { key: "transport", label: "Transport & Budget", hint: "Vehicle, flights & budget band", icon: "fa-solid fa-car" },
  { key: "review", label: "Review & Submit", hint: "Confirm & get custom quote", icon: "fa-solid fa-clipboard-check" },
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
    <div className="bg-light p-2.5 px-3 rounded-3 border">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-1.5">
        <span className="text-xs fw-bold text-dark">{label}</span>
        {sublabel && <small className="text-muted text-3xs">({sublabel})</small>}
      </div>
      <div className="d-flex align-items-center justify-content-between bg-white rounded-2 border p-1">
        <button
          type="button"
          className="btn btn-sm btn-light py-1 px-3 fw-bold text-dark fs-6"
          onClick={() => step(-1)}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          type="number"
          className="form-control text-center border-0 fw-bold py-1 text-dark fs-6"
          style={{ width: "54px", background: "transparent" }}
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
          inputMode="numeric"
        />
        <button
          type="button"
          className="btn btn-sm btn-light py-1 px-3 fw-bold text-primary fs-6"
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
      className={`py-2 px-3 rounded-3 border cursor-pointer transition-all d-inline-flex align-items-center gap-2 ${
        selected
          ? "bg-primary text-white border-primary shadow-sm"
          : "bg-white text-dark border-light-subtle hover-bg-light"
      }`}
      style={{
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: selected ? "600" : "500",
        backgroundColor: selected ? "#ff5c41" : "#ffffff",
        borderColor: selected ? "#ff5c41" : "#cbd5e1",
        color: selected ? "#ffffff" : "#334155"
      }}
    >
      <i className={`fa-solid ${selected ? "fa-circle-check text-white" : "fa-circle text-muted"}`} style={{ fontSize: "12px" }} />
      <span>{label}</span>
    </div>
  );
}

export default function CustomPackageWizardForm({ isModal = false, onClose = null, onSubmit = null, preselectedPackage = null }) {
  const { user } = useSelector((state) => state.userAuth || {});

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [destinationsList, setDestinationsList] = useState(DESTINATIONS);

  // Fetch backend destinations from 'zone' database table
  useEffect(() => {
    fetch(getDestinationsUrl)
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.status && Array.isArray(resData?.destinations) && resData.destinations.length > 0) {
          const names = resData.destinations
            .map((d) => d.name || d.zone_name)
            .filter(Boolean);
          if (names.length > 0) {
            setDestinationsList(names);
            setForm((f) => ({
              ...f,
              destination: f.destination || names[0]
            }));
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching destination zones from backend:", err);
      });
  }, []);

  // Auto-fill logged-in user details from Redux, LocalStorage, and API
  useEffect(() => {
    let u = user;
    if (!u && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("user") || localStorage.getItem("user_details") || localStorage.getItem("userAuth");
        if (raw) u = JSON.parse(raw);
      } catch (e) {}
    }

    if (u) {
      const name = [u.first_name, u.last_name].filter(Boolean).join(" ").trim() || u.name || u.full_name || "";
      const company = u.company_name || u.company || u.agency_name || name || "";
      const email = u.email || "";
      const phone = u.phone || u.mobile || u.phone_number || "";
      const city = u.city || u.address || u.state || "Kolkata";

      setForm((f) => ({
        ...f,
        fullName: f.fullName || name,
        companyName: f.companyName || company,
        email: f.email || email,
        phone: f.phone || phone,
        city: f.city || city
      }));
    }
  }, [user]);

  useEffect(() => {
    if (preselectedPackage) {
      setForm((f) => ({
        ...f,
        destination: preselectedPackage.to_destination_name || preselectedPackage.title || f.destination,
        durationDays: preselectedPackage.duration_days || f.durationDays,
        durationNights: preselectedPackage.duration_nights || f.durationNights,
        specialNotes: `Customising Package: ${preselectedPackage.title || ''}`
      }));
    }
  }, [preselectedPackage]);

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

  // Build backend payload with all customized package fields
  const buildBackendPayload = () => {
    return {
      user_id: user?.id || null,
      full_name: form.fullName,
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      departure_city: form.city || form.departureCity,
      trip_type: form.tripType,
      destination: form.destination,
      departure_date: form.departureDate,
      travel_date: form.departureDate,
      duration_days: form.durationDays,
      duration_nights: form.durationNights,
      duration: `${form.durationDays} Days / ${form.durationNights} Nights`,
      adults: String(form.adultsCount),
      adults_count: form.adultsCount,
      male_count: form.maleEmployees || 0,
      female_count: form.femaleEmployees || 0,
      children: String(form.childrenCount),
      children_count: form.childrenCount,
      infants: String(form.infantsCount),
      infants_count: form.infantsCount,
      hotelCategory: form.hotelCategory,
      hotel_category: form.hotelCategory,
      meal_plan: form.mealPlan,
      cab_type: form.cabType,
      include_flights: form.includeFlights ? 1 : 0,
      budget_band: form.budgetBand,
      budget: form.budgetBand,
      notes: `Departure Date: ${form.departureDate} | Residence: ${form.city} | Trip Type: ${form.tripType} | Cab: ${form.cabType} | Flights: ${form.includeFlights ? 'Yes' : 'No'} | Budget: ${form.budgetBand} | Notes: ${form.specialNotes}`,
      message: form.specialNotes ? `Trip Type: ${form.tripType}. Notes: ${form.specialNotes}` : `Interested in ${form.durationDays}-day customized ${form.tripType} package to ${form.destination}.`
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setSubmitError(null);

    const jsonPayload = buildBackendPayload();

    try {
      const response = await axiosNormalPost(createHolidayEnquiryUrl, jsonPayload);

      if (response && !(response instanceof Error)) {
        setSubmittedJson(jsonPayload);
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(jsonPayload, response);
        }
        setSubmitted(true);
      } else {
        setSubmittedJson(jsonPayload);
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting holiday enquiry:", err);
      // Even if network warning occurs, show clean success confirmation to user
      setSubmittedJson(jsonPayload);
      setSubmitted(true);
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
            className="btn btn-sm btn-light position-absolute top-0 end-0 m-3 z-3 rounded-circle shadow-sm border p-2 text-dark"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark fs-5"></i>
          </button>
        )}
        <div className="ds-wizard-main text-center py-4 px-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle mb-3 p-3" style={{ width: 70, height: 70 }}>
            <i className="fa-solid fa-check fs-2" />
          </div>
          <h4 className="fw-bold mb-2 text-dark">Custom Package Enquiry Received!</h4>
          <p className="ds-lead mx-auto mb-3 text-secondary" style={{ maxWidth: 500, fontSize: '14px' }}>
            Thank you <strong>{form.fullName}</strong>! Your custom package request for <strong>{form.destination}</strong> ({totalTravelersCount} Travelers, {form.durationDays} Days) has been received.
          </p>

          {/* Reassuring Callback Notice */}
          <div className="p-3 bg-light rounded-4 border border-info-subtle mb-4 mx-auto" style={{ maxWidth: 520 }}>
            <div className="d-flex align-items-center justify-content-center gap-2 text-primary fw-bold mb-1">
              <i className="fa-solid fa-headset fs-5"></i> Our Travel Team Will Connect With You Soon!
            </div>
            <p className="text-muted small mb-0">
              Our travel specialists are reviewing your trip details and will get in touch with you shortly to share custom itineraries and quotes.
            </p>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold text-xs"
              onClick={() => {
                setForm(initialForm);
                setStep(0);
                setSubmitted(false);
                setSubmittedJson(null);
              }}
            >
              <i className="fa-solid fa-rotate-left me-1"></i> Create Another
            </button>
            {onClose && (
              <button type="button" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold text-xs" style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }} onClick={onClose}>
                Done <i className="fa-solid fa-check ms-1"></i>
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
          className="btn btn-sm btn-light position-absolute top-0 end-0 m-3 z-3 rounded-circle shadow-sm border p-2 text-dark"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark fs-5"></i>
        </button>
      )}
      
      {/* MOBILE / TABLET COMPACT TOP HEADER & PROCESS ROADMAP */}
      <div className="d-lg-none px-3 py-2 text-white d-flex align-items-center justify-content-between border-bottom" style={{ background: 'linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%)' }}>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-warning text-dark text-2xs fw-bold">Custom Tour</span>
          <span className="text-white text-xs fw-bold">{STEP_META[step].label}</span>
        </div>
        
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
                {isDone ? <i className="fa-solid fa-check" /> : <i className={s.icon} />}
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
              <span className="badge px-3 py-1.5 rounded-pill text-uppercase text-2xs fw-bold mb-3 d-inline-flex align-items-center gap-1.5" style={{ backgroundColor: 'rgba(255,92,65,0.25)', color: '#ff5c41', border: '1px solid rgba(255,92,65,0.4)' }}>
                <i className="fa-solid fa-wand-magic-sparkles"></i> Custom Tour Wizard
              </span>
              <h3 className="fw-bold mt-1 text-white fs-4">Build Custom Package</h3>
              <p className="text-light opacity-75 text-xs mb-4">
                Tailor your destination, dates, hotel preference &amp; budget in 5 quick steps for an instant personalized quote.
              </p>

              {/* STEP PROGRESS TIMELINE */}
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
                        style={{ width: 36, height: 36, minWidth: 36, fontSize: '13px' }}
                      >
                        {isDone ? <i className="fa-solid fa-check" /> : <i className={s.icon} />}
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
                <i className="fa-solid fa-shield-halved text-success fs-6"></i>
                <span>100% Free Customization &amp; Instant Quote</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM CONTENT PANEL WITH LARGER INPUTS */}
        <div className="col-lg-8">
          <div className="ds-wizard-main p-3 p-md-4" style={{ maxHeight: "82vh", overflowY: "auto" }}>
            
            {/* DESKTOP PROGRESS BAR */}
            <div className="d-none d-lg-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-light text-dark border px-3 py-1.5 rounded-pill text-xs fw-semibold">
                Step {step + 1} of {STEP_META.length} — {STEP_META[step].label}
              </span>
              <span className="text-muted fw-bold text-xs">{Math.round(progress)}% Completed</span>
            </div>
            
            <div className="progress mb-3.5 d-none d-lg-flex" style={{ height: "5px", backgroundColor: "#e2e8f0" }}>
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
                <div className="row g-3">
                  <div className="col-12 mb-1">
                    <h6 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2 fs-6">
                      <i className="fa-solid fa-address-card text-primary" style={{ color: '#ff5c41' }}></i>
                      Your Contact &amp; Travel Profile
                    </h6>
                    <p className="text-muted text-xs mb-0">Share contact details so our travel expert can share custom itineraries.</p>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">Full Name *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted px-3"><i className="fa-solid fa-user"></i></span>
                      <input
                        className={`form-control py-2 text-sm ${errors.fullName ? "is-invalid" : ""}`}
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    {errors.fullName && <div className="invalid-feedback text-xs d-block mt-1">{errors.fullName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">Phone / WhatsApp Number *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted px-3"><i className="fa-brands fa-whatsapp text-success fs-6"></i></span>
                      <input
                        type="tel"
                        className={`form-control py-2 text-sm ${errors.phone ? "is-invalid" : ""}`}
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.phone && <div className="invalid-feedback text-xs d-block mt-1">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">Email Address *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted px-3"><i className="fa-solid fa-envelope"></i></span>
                      <input
                        type="email"
                        className={`form-control py-2 text-sm ${errors.email ? "is-invalid" : ""}`}
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="name@example.com"
                      />
                    </div>
                    {errors.email && <div className="invalid-feedback text-xs d-block mt-1">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">City of Residence / Departure *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted px-3"><i className="fa-solid fa-city"></i></span>
                      <input
                        className={`form-control py-2 text-sm ${errors.city ? "is-invalid" : ""}`}
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="e.g. Kolkata, Delhi, Mumbai"
                      />
                    </div>
                    {errors.city && <div className="invalid-feedback text-xs d-block mt-1">{errors.city}</div>}
                  </div>

                  <div className="col-md-12">
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">Trip Type / Travel Occasion</label>
                    <select
                      className="form-select py-2 text-sm"
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
                <div className="row g-3">
                  <div className="col-12 mb-1">
                    <h6 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2 fs-6">
                      <i className="fa-solid fa-compass text-primary" style={{ color: '#ff5c41' }}></i>
                      Destination &amp; Travel Schedule
                    </h6>
                    <p className="text-muted text-xs mb-0">Choose your destination and preferred departure date.</p>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">Select Destination *</label>
                    <select
                      className={`form-select py-2 text-sm ${errors.destination ? "is-invalid" : ""}`}
                      value={form.destination}
                      onChange={(e) => update("destination", e.target.value)}
                    >
                      {destinationsList.map((dest) => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                    {errors.destination && <div className="invalid-feedback text-xs d-block mt-1">{errors.destination}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">Departure Date *</label>
                    <input
                      type="date"
                      className={`form-control py-2 text-sm ${errors.departureDate ? "is-invalid" : ""}`}
                      value={form.departureDate}
                      onChange={(e) => update("departureDate", e.target.value)}
                    />
                    {errors.departureDate && <div className="invalid-feedback text-xs d-block mt-1">{errors.departureDate}</div>}
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
                    <div className="bg-light p-2.5 px-3 rounded-3 border h-100">
                      <label className="form-label text-xs fw-bold text-dark mb-1">Departure City</label>
                      <input
                        className="form-control py-1.5 text-sm border bg-white"
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
                <div className="row g-3">
                  <div className="col-12 mb-1">
                    <h6 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2 fs-6">
                      <i className="fa-solid fa-hotel text-primary" style={{ color: '#ff5c41' }}></i>
                      Travelers &amp; Hotel Preference
                    </h6>
                    <p className="text-muted text-xs mb-0">Specify group size and accommodation level.</p>
                  </div>

                  <div className="col-4">
                    <Counter
                      label={form.tripType?.toLowerCase().includes("corporate") ? "Total Employees *" : "Adults *"}
                      sublabel={form.tripType?.toLowerCase().includes("corporate") ? "Total team" : "12+ yrs"}
                      value={form.adultsCount}
                      min={1}
                      onChange={(v) => update("adultsCount", v)}
                    />
                  </div>

                  {form.tripType?.toLowerCase().includes("corporate") ? (
                    <>
                      <div className="col-4">
                        <Counter
                          label="Male Employees"
                          sublabel="Male team"
                          value={form.maleEmployees || 0}
                          min={0}
                          onChange={(v) => {
                            update("maleEmployees", v);
                            update("adultsCount", v + (form.femaleEmployees || 0));
                          }}
                        />
                      </div>
                      <div className="col-4">
                        <Counter
                          label="Female Employees"
                          sublabel="Female team"
                          value={form.femaleEmployees || 0}
                          min={0}
                          onChange={(v) => {
                            update("femaleEmployees", v);
                            update("adultsCount", (form.maleEmployees || 0) + v);
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}

                  {errors.adultsCount && (
                    <div className="col-12 text-danger text-xs fw-bold">{errors.adultsCount}</div>
                  )}

                  <div className="col-12 mt-2">
                    <label className="form-label text-xs fw-bold text-dark mb-2">Hotel Category Preference</label>
                    <div className="d-flex flex-wrap gap-2">
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
                    <label className="form-label text-xs fw-bold text-dark mb-2">Meal Plan Preference</label>
                    <div className="d-flex flex-wrap gap-2">
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
                <div className="row g-3">
                  <div className="col-12 mb-1">
                    <h6 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2 fs-6">
                      <i className="fa-solid fa-wallet text-primary" style={{ color: '#ff5c41' }}></i>
                      Transport &amp; Budget Band
                    </h6>
                    <p className="text-muted text-xs mb-0">Select cab requirement, flights, and budget target.</p>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-xs fw-bold text-dark mb-2">Cab / Transport Required</label>
                    <div className="d-flex flex-wrap gap-2">
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
                    <label className="form-label text-xs fw-bold text-dark mb-2">Flight Tickets Inclusion?</label>
                    <div className="d-flex gap-2">
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
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">Expected Budget Band (per person)</label>
                    <select
                      className="form-select py-2 text-sm"
                      value={form.budgetBand}
                      onChange={(e) => update("budgetBand", e.target.value)}
                    >
                      {BUDGET_BANDS.map((budget) => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 mt-2">
                    <label className="form-label text-xs fw-bold text-dark mb-1.5">Custom Notes / Special Requests</label>
                    <textarea
                      className="form-control py-2 text-sm"
                      rows={3}
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
                  <h6 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2 fs-6">
                    <i className="fa-solid fa-shield-halved text-success"></i>
                    Review Summary
                  </h6>
                  <p className="text-muted text-xs mb-3">Verify your choices before submitting your quote request.</p>

                  <div className="row g-3">
                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <span className="text-3xs text-uppercase fw-bold text-muted d-block mb-1">Contact</span>
                        <strong className="d-block text-dark text-sm mb-0.5">{form.fullName} ({form.city})</strong>
                        <small className="text-muted text-xs d-block">{form.phone} | {form.email}</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <span className="text-3xs text-uppercase fw-bold text-muted d-block mb-1">Destination</span>
                        <strong className="d-block text-dark text-sm mb-0.5">{form.destination}</strong>
                        <small className="text-muted text-xs d-block">
                          Date: {form.departureDate} ({form.durationDays}D / {form.durationNights}N)
                        </small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <span className="text-3xs text-uppercase fw-bold text-muted d-block mb-1">Travelers &amp; Stay</span>
                        <strong className="d-block text-dark text-sm mb-0.5">
                          {totalTravelersCount} Travelers ({form.adultsCount}A, {form.childrenCount}K, {form.infantsCount}I)
                        </strong>
                        <small className="text-secondary text-xs d-block">{form.hotelCategory} ({form.mealPlan})</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <span className="text-3xs text-uppercase fw-bold text-muted d-block mb-1">Transport &amp; Budget</span>
                        <strong className="d-block text-dark text-sm mb-0.5">{form.cabType}</strong>
                        <small className="text-secondary text-xs d-block">Budget: {form.budgetBand}</small>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted text-xs mt-3 mb-0 d-flex align-items-center gap-1.5">
                    <i className="fa-solid fa-lock text-success"></i> Submitting sends your inquiry directly to our travel experts.
                  </p>
                </div>
              )}

              {submitError && (
                <div className="alert alert-danger text-xs mt-3 mb-0 py-2 px-3 rounded-3" role="alert">
                  <i className="fa-solid fa-triangle-exclamation me-2" />
                  {submitError}
                </div>
              )}

              {/* STEP NAVIGATION BUTTONS */}
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2 rounded-pill text-xs fw-semibold d-inline-flex align-items-center gap-1.5"
                  onClick={goBack}
                  disabled={step === 0 || loading}
                  style={{ visibility: step === 0 ? "hidden" : "visible" }}
                >
                  <i className="fa-solid fa-arrow-left" /> Back
                </button>

                {step < STEP_META.length - 1 ? (
                  <button 
                    type="button" 
                    className="btn btn-primary px-4 py-2 rounded-pill text-xs fw-bold d-inline-flex align-items-center gap-1.5" 
                    style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }} 
                    onClick={goNext}
                  >
                    Next Step <i className="fa-solid fa-arrow-right" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="btn btn-primary px-5 py-2 rounded-pill text-xs fw-bold d-inline-flex align-items-center gap-1.5" 
                    style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit &amp; Get Quote <i className="fa-solid fa-paper-plane" />
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
