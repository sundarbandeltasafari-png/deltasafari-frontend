"use client";

import { useMemo, useState } from "react";

const STEP_META = [
  { key: "company", label: "Company Details", hint: "Who we're planning for" },
  { key: "team", label: "Team Size", hint: "Headcount & gender split" },
  { key: "trip", label: "Trip Details", hint: "Days, nights & purpose" },
  { key: "preferences", label: "Preferences", hint: "Stay, meals & activities" },
  { key: "review", label: "Review & Submit", hint: "Confirm your requirement" },
];

const DESTINATIONS = [
  "Not sure yet — suggest options",
  "Sundarban, West Bengal",
  "Darjeeling, West Bengal",
  "Digha, West Bengal",
  "Gangtok, Sikkim",
  "Assam",
  "Kolkata, West Bengal",
  "Other / Multi-city",
];

const TRIP_PURPOSES = [
  "Team Offsite",
  "Conference / MICE",
  "Incentive Trip",
  "Client Visit",
  "Annual Meet",
  "Team Building",
];

const STAY_TYPES = ["Budget", "Standard", "Premium", "Luxury"];
const MEAL_PREFS = ["Vegetarian", "Non-Vegetarian", "Mixed", "Jain"];
const ACTIVITIES = [
  "Team-building games",
  "Adventure activities",
  "Cultural sightseeing",
  "Bonfire & evening entertainment",
  "Conference / meeting hall",
  "Spa & wellness",
];
const BUDGET_BANDS = [
  "Prefer to discuss on call",
  "Economy-friendly",
  "Mid-range / Standard",
  "Premium",
  "No fixed range — flexible",
];

const initialForm = {
  companyName: "",
  companyAddress: "",
  gstin: "",
  contactName: "",
  designation: "",
  email: "",
  phone: "",
  totalMembers: 20,
  maleCount: 12,
  femaleCount: 8,
  days: 3,
  nights: 2,
  destination: DESTINATIONS[0],
  travelWindow: "",
  purposes: [],
  stayType: "Standard",
  mealPref: "Mixed",
  activities: [],
  budgetBand: BUDGET_BANDS[0],
  notes: "",
};

function Counter({ label, value, onChange, min = 0, max = 5000 }) {
  const step = (delta) => onChange(Math.min(max, Math.max(min, value + delta)));
  return (
    <div>
      <label className="ds-form-label d-block">{label}</label>
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

export default function CorporateWizardForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => ((step + 1) / STEP_META.length) * 100, [step]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleInArray = (key, value) => {
    setForm((f) => {
      const arr = f[key];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...f, [key]: next };
    });
  };

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.companyName.trim()) e.companyName = "Company name is required";
      if (!form.companyAddress.trim()) e.companyAddress = "Office address is required";
      if (!form.contactName.trim()) e.contactName = "Contact person name is required";
      if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
      if (!form.phone.trim() || !/^[0-9+\-\s]{8,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    }
    if (step === 1) {
      if (form.totalMembers < 1) e.totalMembers = "Add at least 1 member";
      if (form.maleCount + form.femaleCount !== form.totalMembers) {
        e.split = "Male + Female count should add up to total members";
      }
    }
    if (step === 2) {
      if (form.days < 1) e.days = "Add at least 1 day";
      if (form.purposes.length === 0) e.purposes = "Pick at least one trip purpose";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(STEP_META.length - 1, s + 1));
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validateStep()) return;
    // Wire this up to your booking API / CRM endpoint.
    // e.g. fetch('/api/corporate-enquiry', { method: 'POST', body: JSON.stringify(form) })
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div id="enquiry-form" className="ds-wizard-shell">
        <div className="ds-wizard-main text-center py-5">
          <div className="ds-success-badge">
            <i className="bi bi-check2" />
          </div>
          <h4 className="mb-2">Request received, {form.contactName.split(" ")[0] || "there"}!</h4>
          <p className="ds-lead mx-auto" style={{ maxWidth: 480 }}>
            Our corporate travel desk will review the requirement for{" "}
            <strong>{form.companyName}</strong> and get back within 48 working hours with an
            itinerary and a private quote for {form.totalMembers} travellers.
          </p>
          <button
            className="btn btn-ds-outline mt-3"
            onClick={() => {
              setForm(initialForm);
              setStep(0);
              setSubmitted(false);
            }}
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="enquiry-form" className="ds-wizard-shell">
      <div className="row g-0">
        <div className="col-lg-4">
          <div className="ds-wizard-side">
            <span className="ds-eyebrow" style={{ color: "#ffd9a3" }}>Custom Package Builder</span>
            <h4 className="mt-3">Tell us about your team</h4>
            <p>
              Five quick steps. No prices to browse — just your requirement, so we can send back
              a plan built for your group.
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
          <div className="ds-wizard-main">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="ds-step-tag">
                Step {step + 1} of {STEP_META.length}
              </span>
              <span className="ds-step-tag">{Math.round(progress)}%</span>
            </div>
            <div className="ds-progress-track">
              <div className="ds-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <form onSubmit={handleSubmit} className="mt-4" noValidate>
              {/* STEP 0 — COMPANY DETAILS */}
              {step === 0 && (
                <div className="row g-3">
                  <div className="col-12">
                    <h5 className="mb-3">Company details</h5>
                  </div>
                  <div className="col-md-8">
                    <label className="ds-form-label">Company name *</label>
                    <input
                      className={`form-control ds-form-control ${errors.companyName ? "is-invalid" : ""}`}
                      value={form.companyName}
                      onChange={(e) => update("companyName", e.target.value)}
                      placeholder="e.g. Bengal Softworks Pvt. Ltd."
                    />
                    {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="ds-form-label">GSTIN (optional)</label>
                    <input
                      className="form-control ds-form-control"
                      value={form.gstin}
                      onChange={(e) => update("gstin", e.target.value)}
                      placeholder="For GST invoice"
                    />
                  </div>
                  <div className="col-12">
                    <label className="ds-form-label">Office address *</label>
                    <textarea
                      className={`form-control ds-form-control ${errors.companyAddress ? "is-invalid" : ""}`}
                      rows={2}
                      value={form.companyAddress}
                      onChange={(e) => update("companyAddress", e.target.value)}
                      placeholder="Building, street, city, state, PIN"
                    />
                    {errors.companyAddress && <div className="invalid-feedback">{errors.companyAddress}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label">Contact person *</label>
                    <input
                      className={`form-control ds-form-control ${errors.contactName ? "is-invalid" : ""}`}
                      value={form.contactName}
                      onChange={(e) => update("contactName", e.target.value)}
                      placeholder="Full name"
                    />
                    {errors.contactName && <div className="invalid-feedback">{errors.contactName}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label">Designation</label>
                    <input
                      className="form-control ds-form-control"
                      value={form.designation}
                      onChange={(e) => update("designation", e.target.value)}
                      placeholder="e.g. HR Manager, Admin Head"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label">Work email *</label>
                    <input
                      type="email"
                      className={`form-control ds-form-control ${errors.email ? "is-invalid" : ""}`}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="name@company.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label">Phone number *</label>
                    <input
                      className={`form-control ds-form-control ${errors.phone ? "is-invalid" : ""}`}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>
              )}

              {/* STEP 1 — TEAM SIZE */}
              {step === 1 && (
                <div className="row g-4">
                  <div className="col-12">
                    <h5 className="mb-3">How many are travelling?</h5>
                  </div>
                  <div className="col-md-4">
                    <Counter
                      label="Total members"
                      value={form.totalMembers}
                      min={1}
                      onChange={(v) => update("totalMembers", v)}
                    />
                  </div>
                  <div className="col-md-4">
                    <Counter
                      label="Male"
                      value={form.maleCount}
                      onChange={(v) => update("maleCount", v)}
                    />
                  </div>
                  <div className="col-md-4">
                    <Counter
                      label="Female"
                      value={form.femaleCount}
                      onChange={(v) => update("femaleCount", v)}
                    />
                  </div>
                  {errors.split && (
                    <div className="col-12">
                      <div className="text-danger small">
                        <i className="bi bi-exclamation-circle me-1" />
                        {errors.split} (currently {form.maleCount + form.femaleCount} of {form.totalMembers})
                      </div>
                    </div>
                  )}
                  <div className="col-12">
                    <div className="ds-mini-summary">
                      <i className="bi bi-info-circle me-2 text-success" />
                      Rooming, transport capacity and meal counts in your proposal will be based on
                      these numbers — you can always fine-tune them later on a call.
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — TRIP DETAILS */}
              {step === 2 && (
                <div className="row g-4">
                  <div className="col-12">
                    <h5 className="mb-3">Trip length & purpose</h5>
                  </div>
                  <div className="col-md-3">
                    <Counter label="Days" value={form.days} min={1} onChange={(v) => update("days", v)} />
                  </div>
                  <div className="col-md-3">
                    <Counter label="Nights" value={form.nights} min={0} onChange={(v) => update("nights", v)} />
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label">Preferred destination</label>
                    <select
                      className="form-select ds-form-control"
                      value={form.destination}
                      onChange={(e) => update("destination", e.target.value)}
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label">Preferred travel window</label>
                    <input
                      className="form-control ds-form-control"
                      value={form.travelWindow}
                      onChange={(e) => update("travelWindow", e.target.value)}
                      placeholder="e.g. Last week of September"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label">Approx. budget expectation (optional)</label>
                    <select
                      className="form-select ds-form-control"
                      value={form.budgetBand}
                      onChange={(e) => update("budgetBand", e.target.value)}
                    >
                      {BUDGET_BANDS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="ds-form-label d-block">Purpose of trip *</label>
                    <div className="d-flex flex-wrap gap-2">
                      {TRIP_PURPOSES.map((p) => (
                        <Pill
                          key={p}
                          label={p}
                          selected={form.purposes.includes(p)}
                          onClick={() => toggleInArray("purposes", p)}
                        />
                      ))}
                    </div>
                    {errors.purposes && <div className="text-danger small mt-2">{errors.purposes}</div>}
                  </div>
                </div>
              )}

              {/* STEP 3 — PREFERENCES */}
              {step === 3 && (
                <div className="row g-4">
                  <div className="col-12">
                    <h5 className="mb-3">Stay, meals & activities</h5>
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label d-block">Accommodation type</label>
                    <div className="d-flex flex-wrap gap-2">
                      {STAY_TYPES.map((s) => (
                        <Pill
                          key={s}
                          label={s}
                          selected={form.stayType === s}
                          onClick={() => update("stayType", s)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="ds-form-label d-block">Meal preference</label>
                    <div className="d-flex flex-wrap gap-2">
                      {MEAL_PREFS.map((m) => (
                        <Pill
                          key={m}
                          label={m}
                          selected={form.mealPref === m}
                          onClick={() => update("mealPref", m)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="ds-form-label d-block">Activities of interest</label>
                    <div className="d-flex flex-wrap gap-2">
                      {ACTIVITIES.map((a) => (
                        <Pill
                          key={a}
                          label={a}
                          selected={form.activities.includes(a)}
                          onClick={() => toggleInArray("activities", a)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="ds-form-label">Anything else we should know?</label>
                    <textarea
                      className="form-control ds-form-control"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Accessibility needs, past destinations to avoid, preferred hotel brands, etc."
                    />
                  </div>
                </div>
              )}

              {/* STEP 4 — REVIEW */}
              {step === 4 && (
                <div>
                  <h5 className="mb-3">Review your requirement</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <dl className="ds-mini-summary mb-0">
                        <dt>Company</dt>
                        <dd>{form.companyName || "—"}</dd>
                        <dt>Contact</dt>
                        <dd>{form.contactName} {form.designation && `· ${form.designation}`}</dd>
                        <dt>Email / Phone</dt>
                        <dd>{form.email} · {form.phone}</dd>
                        <dt>Office address</dt>
                        <dd className="mb-0">{form.companyAddress || "—"}</dd>
                      </dl>
                    </div>
                    <div className="col-md-6">
                      <dl className="ds-mini-summary mb-0">
                        <dt>Team size</dt>
                        <dd>{form.totalMembers} travellers ({form.maleCount} male · {form.femaleCount} female)</dd>
                        <dt>Duration</dt>
                        <dd>{form.days} days / {form.nights} nights</dd>
                        <dt>Destination</dt>
                        <dd>{form.destination}</dd>
                        <dt>Travel window</dt>
                        <dd className="mb-0">{form.travelWindow || "Flexible"}</dd>
                      </dl>
                    </div>
                    <div className="col-12">
                      <dl className="ds-mini-summary mb-0">
                        <dt>Trip purpose</dt>
                        <dd>{form.purposes.join(", ") || "—"}</dd>
                        <dt>Stay & meals</dt>
                        <dd>{form.stayType} accommodation · {form.mealPref} meals</dd>
                        <dt>Activities</dt>
                        <dd>{form.activities.join(", ") || "None selected"}</dd>
                        <dt>Budget expectation</dt>
                        <dd>{form.budgetBand}</dd>
                        {form.notes && (
                          <>
                            <dt>Notes</dt>
                            <dd className="mb-0">{form.notes}</dd>
                          </>
                        )}
                      </dl>
                    </div>
                  </div>
                  <p className="text-muted small mt-3 mb-0">
                    <i className="bi bi-shield-lock me-1" />
                    Submitting this form does not create a booking or charge — it sends your
                    requirement to our corporate desk for a custom proposal.
                  </p>
                </div>
              )}

              {/* NAV BUTTONS */}
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-ds-outline"
                  onClick={goBack}
                  disabled={step === 0}
                  style={{ visibility: step === 0 ? "hidden" : "visible" }}
                >
                  <i className="bi bi-arrow-left me-1" /> Back
                </button>

                {step < STEP_META.length - 1 ? (
                  <button type="button" className="btn btn-ds-primary" onClick={goNext}>
                    Next <i className="bi bi-arrow-right ms-1" />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-ds-primary">
                    Submit Requirement <i className="bi bi-send ms-2" />
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
