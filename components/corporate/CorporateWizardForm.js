"use client";

import { useMemo, useState } from "react";
import { axiosNormalPost } from "@/libs/axiosHelper";
import { createCorporateLeadEnquiryUrl } from "@/routes/serviceRoutes";

const STEP_META = [
  { key: "contact", label: "Contact & Info", hint: "Name, phone, email & city" },
  { key: "destination", label: "Destination & Dates", hint: "Where & when you plan to travel" },
  { key: "travelers", label: "Travelers & Stay", hint: "Adults, kids & hotel preferences" },
  { key: "transport", label: "Cab & Budget", hint: "Transport, flights & budget band" },
  { key: "review", label: "Review & Submit", hint: "Confirm & get custom quote" },
];

const DESTINATIONS = [
  "Sundarban, West Bengal",
  "Darjeeling, West Bengal",
  "Digha, West Bengal",
  "Gangtok, Sikkim",
  "Himachal Pradesh (Manali / Shimla)",
  "Kashmir Valley",
  "Goa Beach Retreat",
  "Rishikesh / Jim Corbett",
  "Bali, Indonesia (International)",
  "Thailand (Phuket / Bangkok)",
  "Other / Multi-destination"
];

const HOTEL_CATEGORIES = [
  "3 Star / Standard Hotel",
  "4 Star / Premium Resort",
  "5 Star Luxury Hotel",
  "Heritage / Boutique Stay",
  "Eco-Resort / Boat Cabin"
];

const CAB_TYPES = [
  "AC Sedan (Dzire / Etios)",
  "AC SUV (Innova Crysta)",
  "AC Tempo Traveller (12-26 Seater)",
  "Luxury Coach / Bus (35+ Seater)",
  "Not Required / Local Transport"
];

const MEAL_PLANS = [
  "All Meals Included (Breakfast, Lunch, Dinner)",
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
  "Flexible / To be discussed on call"
];

const TRIP_TYPES = [
  "Corporate Offsite",
  "Team Incentive Tour",
  "MICE & Conference",
  "Family & Group Holiday",
  "Honeymoon / Couple Trip",
  "Friends / Adventure Trip"
];

const initialForm = {
  // Step 1: Contact
  fullName: "",
  phone: "",
  email: "",
  city: "",
  companyName: "",
  tripType: "Corporate Offsite",

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
  cabType: CAB_TYPES[2],
  includeFlights: false,
  includeTrain: false,
  budgetBand: BUDGET_BANDS[1],
  specialNotes: ""
};

function Counter({ label, sublabel, value, onChange, min = 0, max = 5000 }) {
  const step = (delta) => onChange(Math.min(max, Math.max(min, value + delta)));
  return (
    <div>
      <label className="ds-form-label d-block mb-1">
        {label} {sublabel && <small className="text-muted fw-normal">({sublabel})</small>}
      </label>
      <div className="ds-counter">
        <button type="button" onClick={() => step(-1)} aria-label={`Decrease ${label}`}>
          −
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
          inputMode="numeric"
        />
        <button type="button" onClick={() => step(1)} aria-label={`Increase ${label}`}>
          +
        </button>
      </div>
    </div>
  );
}

function Pill({ label, selected, onClick }) {
  return (
    <label className={`ds-choice-pill ${selected ? "is-selected" : ""}`}>
      <input type="checkbox" checked={selected} onChange={onClick} />
      {selected && <i className="bi bi-check2 me-1" />}
      {label}
    </label>
  );
}

export default function CorporateWizardForm({ isModal = false, onClose = null, onSubmit = null }) {
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

  // Build the clean JSON payload for backend API (createCorporateLeadEnquiry)
  const buildBackendPayload = () => {
    return {
      company_name: form.companyName || "N/A",
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      destination: form.destination,
      group_size: `${totalTravelersCount} members`,
      travel_date: form.departureDate,
      budget: form.budgetBand,
      message: form.specialNotes
        ? `${form.specialNotes} (Duration: ${form.durationDays} Days, Stay: ${form.hotelCategory}, Transport: ${form.cabType})`
        : `Interested in ${form.durationDays}-day ${form.tripType} package to ${form.destination}. Stay: ${form.hotelCategory}, Cab: ${form.cabType}.`
    };
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateStep()) return;
    
    setLoading(true);
    setSubmitError(null);

    const jsonPayload = buildBackendPayload();

    try {
      const response = await axiosNormalPost(createCorporateLeadEnquiryUrl, jsonPayload);

      if (response && !(response instanceof Error)) {
        setSubmittedJson(jsonPayload);
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(jsonPayload, response);
        }
        console.log("Submitted Corporate Lead Enquiry to Backend API:", JSON.stringify(jsonPayload, null, 2));
        setSubmitted(true);
      } else {
        const errMsg = (response && response.message) ? response.message : "Failed to submit enquiry. Please try again.";
        setSubmitError(errMsg);
      }
    } catch (err) {
      console.error("Error submitting corporate lead enquiry:", err);
      setSubmitError("Failed to submit enquiry. Please try again later.");
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
      <div id="enquiry-form" className="ds-wizard-shell position-relative bg-white rounded-4 shadow-lg overflow-hidden">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="btn-close position-absolute top-0 end-0 m-3 z-3 bg-white p-2 rounded-circle shadow-sm"
            aria-label="Close"
          />
        )}
        <div className="ds-wizard-main text-center py-5 px-4">
          <div className="ds-success-badge mx-auto mb-3">
            <i className="bi bi-check2 fs-1 text-success" />
          </div>
          <h4 className="fw-bold mb-2">Quote Request Generated Successfully!</h4>
          <p className="ds-lead mx-auto mb-4" style={{ maxWidth: 520, fontSize: '14px' }}>
            Thank you <strong>{form.fullName}</strong>. Your custom inquiry for <strong>{form.destination}</strong> ({totalTravelersCount} Travelers, {form.durationDays} Days) has been formatted into a backend JSON payload.
          </p>

          {/* DISPLAY BACKEND SUBMISSION JSON */}
          <div className="text-start bg-dark text-warning p-3 rounded-3 mb-4 text-xs font-monospace overflow-auto" style={{ maxHeight: '220px', fontSize: '11px' }}>
            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
              <span className="text-light fw-bold">Backend Submission Payload (JSON):</span>
              <button onClick={handleCopyJson} type="button" className="btn btn-sm btn-outline-warning text-2xs py-0.5 px-2">
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
              className="btn btn-ds-outline"
              onClick={() => {
                setForm(initialForm);
                setStep(0);
                setSubmitted(false);
                setSubmittedJson(null);
              }}
            >
              Submit Another Inquiry
            </button>
            {onClose && (
              <button type="button" className="btn btn-ds-primary" onClick={onClose}>
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="enquiry-form" className="ds-wizard-shell position-relative bg-white rounded-4 shadow-lg overflow-hidden">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="btn-close position-absolute top-0 end-0 m-3 z-3 bg-white p-2 rounded-circle shadow-sm"
          aria-label="Close"
        />
      )}
      <div className="row g-0">
        <div className="col-lg-4">
          <div className="ds-wizard-side p-4 h-100 text-white" style={{ background: 'linear-gradient(165deg, #0b1d3a, #174385)' }}>

            <span className="badge px-3 py-1 rounded-pill text-uppercase text-2xs fw-bold mb-2" style={{ backgroundColor: 'rgba(255,92,65,0.2)', color: '#ff5c41' }}>
              TravelTriangle Customize & Quote
            </span>
            <h4 className="fw-bold mt-2 text-white">Customize Your Trip</h4>
            <p className="text-light opacity-80 text-xs mb-4">
              5 quick steps to build your custom itinerary requirement and get instant quotes from verified travel experts.
            </p>
            <ul className="ds-channel">
              {STEP_META.map((s, i) => (
                <li
                  key={s.key}
                  className={i === step ? "is-active" : i < step ? "is-done" : ""}
                >
                  {s.label}
                  <small>{s.hint}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="ds-wizard-main p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="ds-step-tag">
                Step {step + 1} of {STEP_META.length} — {STEP_META[step].label}
              </span>
              <span className="ds-step-tag">{Math.round(progress)}%</span>
            </div>
            <div className="ds-progress-track mb-3">
              <div className="ds-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <form onSubmit={handleSubmit} className="mt-3" noValidate>
              
              {/* STEP 0 — CONTACT & TRAVELER DETAILS */}
              {step === 0 && (
                <div className="row g-3">
                  <div className="col-12">
                    <h5 className="fw-bold text-dark mb-1">Contact & Traveler Info</h5>
                    <p className="text-muted text-xs mb-2">Provide your details so our travel experts can share customized proposals.</p>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="ds-form-label">Full Name *</label>
                    <input
                      className={`form-control ds-form-control ${errors.fullName ? "is-invalid" : ""}`}
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                    />
                    {errors.fullName && <div className="invalid-feedback text-2xs">{errors.fullName}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      className={`form-control ds-form-control ${errors.phone ? "is-invalid" : ""}`}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <div className="invalid-feedback text-2xs">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label">Email Address *</label>
                    <input
                      type="email"
                      className={`form-control ds-form-control ${errors.email ? "is-invalid" : ""}`}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="name@example.com"
                    />
                    {errors.email && <div className="invalid-feedback text-2xs">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label">City of Residence / Departure *</label>
                    <input
                      className={`form-control ds-form-control ${errors.city ? "is-invalid" : ""}`}
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="e.g. Kolkata, Delhi, Mumbai"
                    />
                    {errors.city && <div className="invalid-feedback text-2xs">{errors.city}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label">Company / Group Name (Optional)</label>
                    <input
                      className="form-control ds-form-control"
                      value={form.companyName}
                      onChange={(e) => update("companyName", e.target.value)}
                      placeholder="e.g. Delta Tech / Family Group"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label">Trip Category</label>
                    <select
                      className="form-select ds-form-control text-xs"
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

              {/* STEP 1 — DESTINATION & TRAVEL DATES */}
              {step === 1 && (
                <div className="row g-3">
                  <div className="col-12">
                    <h5 className="fw-bold text-dark mb-1">Destination & Travel Schedule</h5>
                    <p className="text-muted text-xs mb-2">Select your travel destination and preferred dates.</p>
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label">Select Destination *</label>
                    <select
                      className={`form-select ds-form-control text-xs ${errors.destination ? "is-invalid" : ""}`}
                      value={form.destination}
                      onChange={(e) => update("destination", e.target.value)}
                    >
                      {DESTINATIONS.map((dest) => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                    {errors.destination && <div className="invalid-feedback text-2xs">{errors.destination}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label">Departure Date *</label>
                    <input
                      type="date"
                      className={`form-control ds-form-control text-xs ${errors.departureDate ? "is-invalid" : ""}`}
                      value={form.departureDate}
                      onChange={(e) => update("departureDate", e.target.value)}
                    />
                    {errors.departureDate && <div className="invalid-feedback text-2xs">{errors.departureDate}</div>}
                  </div>

                  <div className="col-md-4">
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

                  <div className="col-md-4">
                    <Counter
                      label="Trip Nights"
                      value={form.durationNights}
                      min={0}
                      onChange={(v) => update("durationNights", v)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="ds-form-label">Departure City</label>
                    <input
                      className="form-control ds-form-control text-xs"
                      value={form.departureCity}
                      onChange={(e) => update("departureCity", e.target.value)}
                      placeholder="City of departure"
                    />
                  </div>

                  <div className="col-12">
                    <label className="ds-form-label">Travel Window / Flexible Month (Optional)</label>
                    <input
                      className="form-control ds-form-control text-xs"
                      value={form.travelWindow}
                      onChange={(e) => update("travelWindow", e.target.value)}
                      placeholder="e.g. Mid September 2026 or Puja Vacation"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2 — TRAVELERS & HOTEL STAY PREFERENCES */}
              {step === 2 && (
                <div className="row g-3">
                  <div className="col-12">
                    <h5 className="fw-bold text-dark mb-1">Travelers & Accommodation</h5>
                    <p className="text-muted text-xs mb-2">Traveler age breakdown and hotel preferences matching TravelTriangle standard.</p>
                  </div>

                  <div className="col-md-4">
                    <Counter
                      label="Adults *"
                      sublabel="12+ yrs"
                      value={form.adultsCount}
                      min={1}
                      onChange={(v) => update("adultsCount", v)}
                    />
                  </div>

                  <div className="col-md-4">
                    <Counter
                      label="Children"
                      sublabel="2-11 yrs"
                      value={form.childrenCount}
                      min={0}
                      onChange={(v) => update("childrenCount", v)}
                    />
                  </div>

                  <div className="col-md-4">
                    <Counter
                      label="Infants"
                      sublabel="0-2 yrs"
                      value={form.infantsCount}
                      min={0}
                      onChange={(v) => update("infantsCount", v)}
                    />
                  </div>

                  {errors.adultsCount && (
                    <div className="col-12  text-2xs fw-bold">{errors.adultsCount}</div>
                  )}

                  <div className="col-md-6">
                    <label className="ds-form-label d-block">Hotel Category Preference</label>
                    <div className="d-flex flex-wrap gap-2">
                      {HOTEL_CATEGORIES.map((category) => (
                        <Pill
                          key={category}
                          label={category}
                          selected={form.hotelCategory === category}
                          onClick={() => update("hotelCategory", category)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label d-block">Meal Plan Preference</label>
                    <div className="d-flex flex-wrap gap-2">
                      {MEAL_PLANS.map((meal) => (
                        <Pill
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

              {/* STEP 3 — CAB, FLIGHTS & BUDGET */}
              {step === 3 && (
                <div className="row g-3">
                  <div className="col-12">
                    <h5 className="fw-bold text-dark mb-1">Transport, Flights & Budget Band</h5>
                    <p className="text-muted text-xs mb-2">Specify cab requirements, flight ticketing, and budget expectations.</p>
                  </div>

                  <div className="col-12">
                    <label className="ds-form-label d-block">Cab / Vehicle Type Required</label>
                    <div className="d-flex flex-wrap gap-2">
                      {CAB_TYPES.map((cab) => (
                        <Pill
                          key={cab}
                          label={cab}
                          selected={form.cabType === cab}
                          onClick={() => update("cabType", cab)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label d-block">Need Flights Included?</label>
                    <div className="d-flex gap-2">
                      <Pill
                        label="Yes, Include Flights"
                        selected={form.includeFlights === true}
                        onClick={() => update("includeFlights", true)}
                      />
                      <Pill
                        label="No, Land Package Only"
                        selected={form.includeFlights === false}
                        onClick={() => update("includeFlights", false)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="ds-form-label d-block">Expected Budget Band (per person)</label>
                    <select
                      className="form-select ds-form-control text-xs"
                      value={form.budgetBand}
                      onChange={(e) => update("budgetBand", e.target.value)}
                    >
                      {BUDGET_BANDS.map((budget) => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="ds-form-label">Special Requests / Customized Preferences</label>
                    <textarea
                      className="form-control ds-form-control text-xs"
                      rows={2}
                      value={form.specialNotes}
                      onChange={(e) => update("specialNotes", e.target.value)}
                      placeholder="e.g. Need bonfire, conference hall, specific pickup location or dietary requests..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 4 — REVIEW & SUBMIT (GENERATE BACKEND JSON) */}
              {step === 4 && (
                <div>
                  <h5 className="fw-bold text-dark mb-1">Review Requirement Summary</h5>
                  <p className="text-muted text-xs mb-3">Please verify your details before generating the custom quote request.</p>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <span className="text-2xs text-uppercase fw-bold text-muted d-block">Traveler Information</span>
                        <strong className="d-block text-dark text-xs">{form.fullName} ({form.city})</strong>
                        <small className="text-muted text-xs d-block">{form.phone} | {form.email}</small>
                        {form.companyName && <small className="text-secondary text-2xs d-block">Org: {form.companyName}</small>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <span className="text-2xs text-uppercase fw-bold text-muted d-block">Trip & Destination</span>
                        <strong className="d-block  text-xs">{form.destination}</strong>
                        <small className="text-dark text-xs d-block">
                          Date: {form.departureDate} ({form.durationDays} Days / {form.durationNights} Nights)
                        </small>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <span className="text-2xs text-uppercase fw-bold text-muted d-block">Travelers & Hotel Category</span>
                        <strong className="d-block text-dark text-xs">
                          {totalTravelersCount} Total ({form.adultsCount} Adults, {form.childrenCount} Kids, {form.infantsCount} Infants)
                        </strong>
                        <small className="text-secondary text-xs d-block">{form.hotelCategory} ({form.mealPlan})</small>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <span className="text-2xs text-uppercase fw-bold text-muted d-block">Vehicle & Budget</span>
                        <strong className="d-block text-dark text-xs">{form.cabType}</strong>
                        <small className="text-secondary text-xs d-block">Budget: {form.budgetBand} | Flights: {form.includeFlights ? 'Yes' : 'No'}</small>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted text-2xs mt-3 mb-0">
                    <i className="bi bi-shield-check me-1 text-success"></i> Submitting sends this inquiry payload directly to our desk for a personalized quote.
                  </p>
                </div>
              )}

              {submitError && (
                <div className="alert alert-danger text-xs mt-3 mb-0 py-2 px-3 rounded-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2" />
                  {submitError}
                </div>
              )}

              {/* STEP NAVIGATION BUTTONS */}
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-ds-outline"
                  onClick={goBack}
                  disabled={step === 0 || loading}
                  style={{ visibility: step === 0 ? "hidden" : "visible" }}
                >
                  <i className="bi bi-arrow-left me-1" /> Back
                </button>

                {step < STEP_META.length - 1 ? (
                  <button type="button" className="btn btn-ds-primary" onClick={goNext}>
                    Next Step <i className="bi bi-arrow-right ms-1" />
                  </button>
                ) : (
                  <button type="submit" disabled={loading} className="btn btn-ds-primary" style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit &amp; Get Quote <i className="bi bi-send ms-2" />
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
