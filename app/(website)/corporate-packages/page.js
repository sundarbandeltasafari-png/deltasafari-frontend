'use client';

import HomeBanner from '@/components/website/home/HomeBanner';
import { useState } from 'react';

export default function CorporatePackages() {
  // Wizard State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    maleCount: '',
    femaleCount: '',
    totalMembers: 0,
    days: '2',
    nights: '1',
    travelDate: '',
    accommodationType: 'AC Luxury Resort',
    teamActivities: [],
    specialRequirements: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Form Handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'maleCount' || name === 'femaleCount') {
        updated.totalMembers = (parseInt(updated.maleCount) || 0) + (parseInt(updated.femaleCount) || 0);
      }
      return updated;
    });
  };

  const handleCheckboxChange = (activity) => {
    setFormData((prev) => {
      const activities = prev.teamActivities.includes(activity)
        ? prev.teamActivities.filter((a) => a !== activity)
        : [...prev.teamActivities, activity];
      return { ...prev, teamActivities: activities };
    });
  };

  const nextStep = () => setStep((p) => Math.min(p + 1, 4));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect to your core API endpoints here
    console.log('Corporate Booking Request: ', formData);
    setSubmitted(true);
  };

  // Sample Corporate Focused Mock Packages (No Price Listed)
  const corporatePackages = [
    {
      id: 'corp-premium',
      title: 'Mangrove Leadership Retreat',
      duration: '2 Nights / 3 Days',
      idealFor: 'Executive Boards & Senior Management',
      features: ['Exclusive Private Luxury Boat Safari', 'AC Premium Resort Stay', 'Conference Hall Access', 'Sundarban Folk Performance Evening', 'Gala Dinner with Bengali Delicacies']
    },
    {
      id: 'corp-standard',
      title: 'Delta Team Bonding Expedition',
      duration: '1 Night / 2 Days',
      idealFor: 'Mid to Large Sized Corporate Squads',
      features: ['Thrilling Watchtower Canopy Walks', 'Core Jungle Safari Cruising', 'Custom Team Building Activities on Island', 'Traditional Bonfire and Live Music Nights', 'Corporate Pickup from Kolkata/Canning']
    }
  ];

  return (
    <>
      {/* Dynamic Theme Injector for Sundarban Palette */}
      <style jsx global>{`
        :root {
          --sundarban-green: #5271ff;
          --sundarban-amber: #d97706;
          --sundarban-light: #f4f6f4;
        }
        .bg-sundarban-green { background-color: var(--sundarban-green) !important; }
        .text-sundarban-green { color: var(--sundarban-green) !important; }
        .text-sundarban-amber { color: var(--sundarban-amber) !important; }
        .btn-sundarban { background-color: var(--sundarban-amber); color: white; border: none; }
        .btn-sundarban:hover { background-color: #b45309; color: white; }
        .step-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .step-active { background-color: var(--sundarban-amber); color: white; }
        .step-inactive { background-color: #e0e0e0; color: #6c757d; }
      `}</style>

      {/* Hero Header Banner */}
      <HomeBanner />
      {/* <section className="bg-sundarban-green text-white py-5 text-center position-relative">
        <div className="container py-4">
          <span className="text-uppercase tracking-wider text-sundarban-amber fw-bold small">Exclusive B2B Group Journeys</span>
          <h1 className="display-4 fw-bold mt-2">Corporate Tours & Team Retreats</h1>
          <p className="lead mx-auto col-md-8 mt-3 opacity-90">
            Unwind, connect, and collaborate amidst the raw beauty of the world's largest mangrove forest. Customize a unique experience tailored completely to your team's objectives.
          </p>
        </div>
      </section> */}

      <div className="container my-5">
        <div className="row g-5">
          {/* Informative Showcase Packages Columns */}
          <div className="col-lg-7">
            <h2 className="fw-bold mb-4 text-sundarban-green">Our Tailored Experiences</h2>
            <p className="text-muted mb-4">
              We design itineraries prioritizing team cohesion, safe luxury logistics, and high-quality local wildlife discovery. Review our core corporate configurations below:
            </p>

            <div className="row g-4">
              {corporatePackages.map((pkg) => (
                <div className="col-12" key={pkg.id}>
                  <div className="card shadow-sm border-0 h-100 overflow-hidden">
                    <div className="card-header bg-sundarban-green text-white py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0 fs-5 fw-bold">{pkg.title}</h4>
                        <span className="badge bg-warning text-dark fw-semibold">{pkg.duration}</span>
                      </div>
                    </div>
                    <div className="card-body p-4 bg-light">
                      <p className="text-muted small mb-3"><strong>Ideal For:</strong> {pkg.idealFor}</p>
                      <h6 className="fw-bold text-sundarban-green mb-2">Package Highlights:</h6>
                      <ul className="list-unstyled row g-2 mb-0">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="col-md-6 small d-flex align-items-start">
                            <span className="text-sundarban-amber me-2">✔</span> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Corporate Inclusions Section */}
            <div className="mt-5 p-4 bg-light rounded-3 border-start border-4 border-success">
              <h5 className="fw-bold text-sundarban-green mb-3">All Corporate Blueprints Include:</h5>
              <div className="row g-3 small">
                <div className="col-sm-6">🔹 Dedicated Tour Manager & Local Guide</div>
                <div className="col-sm-6">🔹 Govt. Permissions & Watchtower Clearances</div>
                <div className="col-sm-6">🔹 Sanitized AC Luxury Transport Options</div>
                <div className="col-sm-6">🔹 Authentic Multi-Course Corporate Catering</div>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Step Wizard Request Box */}
          <div className="col-lg-5">
            <div className="card shadow border-0 position-sticky" style={{ top: '2rem' }}>
              <div className="card-body p-4">
                <h3 className="h4 fw-bold text-center text-sundarban-green mb-4">Plan Your Custom Package</h3>

                {/* Progress Indicators */}
                {!submitted && (
                  <div className="d-flex justify-content-between align-items-center mb-4 text-center">
                    <div className={`step-circle ${step >= 1 ? 'step-active' : 'step-inactive'}`}>1</div>
                    <div className="flex-grow-1 border-top mx-2"></div>
                    <div className={`step-circle ${step >= 2 ? 'step-active' : 'step-inactive'}`}>2</div>
                    <div className="flex-grow-1 border-top mx-2"></div>
                    <div className={`step-circle ${step >= 3 ? 'step-active' : 'step-inactive'}`}>3</div>
                    <div className="flex-grow-1 border-top mx-2"></div>
                    <div className={`step-circle ${step >= 4 ? 'step-active' : 'step-inactive'}`}>4</div>
                  </div>
                )}

                {/* Submission State Message */}
                {submitted ? (
                  <div className="text-center py-5">
                    <div className="text-success display-3 mb-3">🎉</div>
                    <h4 className="fw-bold text-sundarban-green">Proposal Request Received</h4>
                    <p className="text-muted small mt-2">
                      Thank you for connecting with us! Our Sundarban B2B team will compute a targeted quotation for <strong>{formData.companyName}</strong> and follow up within 2 business hours.
                    </p>
                    <button className="btn btn-sundarban mt-3 btn-sm" onClick={() => { setSubmitted(false); setStep(1); }}>
                      Request Another Quote
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    
                    {/* Step 1: Corporate Contact Identity Details */}
                    {step === 1 && (
                      <div>
                        <h5 className="fw-bold mb-3 text-secondary fs-6 text-uppercase">Step 1: Company Profile</h5>
                        <div className="mb-3">
                          <label className="form-label small fw-semibold">Company Name *</label>
                          <input type="text" className="form-file form-control" name="companyName" required value={formData.companyName} onChange={handleInputChange} placeholder="e.g. Acme Corporation" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-semibold">Contact Person *</label>
                          <input type="text" className="form-control" name="contactPerson" required value={formData.contactPerson} onChange={handleInputChange} placeholder="Name of Event Coordinator" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-semibold">Email Address *</label>
                          <input type="email" className="form-control" name="email" required value={formData.email} onChange={handleInputChange} placeholder="corporate@company.com" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-semibold">Phone / WhatsApp No *</label>
                          <input type="tel" className="form-control" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="Primary contact number" />
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                          <button type="button" className="btn btn-sundarban px-4" disabled={!formData.companyName || !formData.email || !formData.phone} onClick={nextStep}>Next: Team Strength</button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Headcount Configuration Split */}
                    {step === 2 && (
                      <div>
                        <h5 className="fw-bold mb-3 text-secondary fs-6 text-uppercase">Step 2: Team Headcount</h5>
                        <p className="text-muted small mb-3">We need structural numbers to balance room allotments and configurations safely.</p>
                        <div className="row g-3 mb-3">
                          <div className="col-6">
                            <label className="form-label small fw-semibold">Male Employees</label>
                            <input type="number" className="form-control" name="maleCount" min="0" value={formData.maleCount} onChange={handleInputChange} placeholder="0" />
                          </div>
                          <div className="col-6">
                            <label className="form-label small fw-semibold">Female Employees</label>
                            <input type="number" className="form-control" name="femaleCount" min="0" value={formData.femaleCount} onChange={handleInputChange} placeholder="0" />
                          </div>
                        </div>
                        <div className="p-3 bg-light rounded text-center mb-4">
                          <span className="small text-muted d-block">Estimated Total Attendee Matrix</span>
                          <span className="fs-3 fw-bold text-sundarban-green">{formData.totalMembers} Members</span>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <button type="button" className="btn btn-outline-secondary px-4" onClick={prevStep}>Back</button>
                          <button type="button" className="btn btn-sundarban px-4" disabled={formData.totalMembers <= 0} onClick={nextStep}>Next: Tour Matrix</button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Duration, Matrix and Dates */}
                    {step === 3 && (
                      <div>
                        <h5 className="fw-bold mb-3 text-secondary fs-6 text-uppercase">Step 3: Duration & Logistics</h5>
                        <div className="row g-3 mb-3">
                          <div className="col-6">
                            <label className="form-label small fw-semibold">Days</label>
                            <select className="form-select" name="days" value={formData.days} onChange={handleInputChange}>
                              <option value="1">1 Day</option>
                              <option value="2">2 Days</option>
                              <option value="3">3 Days</option>
                              <option value="4">4+ Days</option>
                            </select>
                          </div>
                          <div className="col-6">
                            <label className="form-label small fw-semibold">Nights</label>
                            <select className="form-select" name="nights" value={formData.nights} onChange={handleInputChange}>
                              <option value="0">0 Nights</option>
                              <option value="1">1 Night</option>
                              <option value="2">2 Nights</option>
                              <option value="3">3 Nights</option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-semibold">Tentative Travel Date</label>
                          <input type="date" className="form-control" name="travelDate" value={formData.travelDate} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-semibold">Preferred Accommodation</label>
                          <select className="form-select" name="accommodationType" value={formData.accommodationType} onChange={handleInputChange}>
                            <option value="AC Luxury Resort">AC Luxury Eco-Resort</option>
                            <option value="Premium Hotel Room">Premium Standard Rooms</option>
                            <option value="Exclusive Cruise Boat Stay">Exclusive Over-Night Cruise Boat</option>
                          </select>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <button type="button" className="btn btn-outline-secondary px-4" onClick={prevStep}>Back</button>
                          <button type="button" className="btn btn-sundarban px-4" onClick={nextStep}>Next: Final Addons</button>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Addons & Form Submission Processing */}
                    {step === 4 && (
                      <div>
                        <h5 className="fw-bold mb-3 text-secondary fs-6 text-uppercase">Step 4: Special Custom Options</h5>
                        <label className="form-label small fw-semibold mb-2">Team Custom Addons</label>
                        <div className="mb-3">
                          {['Conference Space Setup', 'Audio-Visual Kit Rental', 'Island Team Bonding Games', 'Tribal Jhumur Folk Dance Evening', 'Kolkata to Kolkata AC Coach Setup'].map((activity) => (
                            <div className="form-check small mb-2" key={activity}>
                              <input className="form-check-input" type="checkbox" checked={formData.teamActivities.includes(activity)} onChange={() => handleCheckboxChange(activity)} id={activity} />
                              <label className="form-check-input-label ps-1 cursor-pointer" htmlFor={activity}>{activity}</label>
                            </div>
                          ))}
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-semibold">Additional Special Requirements</label>
                          <textarea className="form-control text-small" rows="2" name="specialRequirements" value={formData.specialRequirements} onChange={handleInputChange} placeholder="Dietary adjustments, pickup points, scheduling preferences..."></textarea>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <button type="button" className="btn btn-outline-secondary px-4" onClick={prevStep}>Back</button>
                          <button type="submit" className="btn btn-success px-4 bg-sundarban-green text-white">Submit Request</button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}