'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosGet } from '@/libs/axiosHelper';
import { getCustomPackageEnquiriesURL } from '@/routes/authRoutes';
import CustomPackageWizardForm from '@/components/website/CustomPackageWizardForm';

export default function UserCustomizedPackagesPage() {
  const { token, user } = useSelector((state) => state.userAuth || {});
  const activeToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showWizardModal, setShowWizardModal] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, [activeToken]);

  const fetchEnquiries = () => {
    setLoading(true);
    axiosGet(getCustomPackageEnquiriesURL, activeToken)
      .then((res) => {
        setLoading(false);
        if (res?.status && Array.isArray(res?.enquiries)) {
          setEnquiries(res.enquiries);
        } else {
          setEnquiries([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching custom package enquiries:", err);
      });
  };

  const getStatusBadge = (status) => {
    const s = (status || 'Pending').toUpperCase();
    if (s === 'CONFIRMED' || s === 'APPROVED') {
      return <span className="badge bg-success text-white px-2.5 py-1.5 rounded-pill"><i className="fa-solid fa-circle-check me-1"></i> Quote Ready / Confirmed</span>;
    }
    if (s === 'UNDER REVIEW' || s === 'IN PROGRESS') {
      return <span className="badge bg-info text-dark px-2.5 py-1.5 rounded-pill"><i className="fa-solid fa-clock me-1"></i> Under Review</span>;
    }
    return <span className="badge bg-warning text-dark px-2.5 py-1.5 rounded-pill"><i className="fa-solid fa-hourglass-half me-1"></i> Enquiry Received</span>;
  };

  return (
    <div className="col-lg-8 col-xl-9">
      <div className="tab-content" id="v-pills-tabContent">
        <div className="tab-pane fade show active">

          {/* Page Banner Header */}
          <div className="gofly-card mb-4 border-0 shadow-sm rounded-4 overflow-hidden text-white"
               style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div className="row align-items-center p-4">
              <div className="col-md-8">
                <span className="badge bg-warning text-dark mb-2 px-3 py-1.5 fw-bold text-uppercase rounded-pill" style={{ fontSize: '0.75rem' }}>
                  <i className="fa-solid fa-wand-magic-sparkles me-1"></i> Customized Trip Requests
                </span>
                <h3 className="fw-bold text-white mb-2" style={{ fontSize: '1.6rem' }}>
                  My <span style={{ color: '#fb923c' }}>Custom Package</span> Enquiries
                </h3>
                <p className="text-slate-300 small mb-0" style={{ opacity: 0.9 }}>
                  View all tailored holiday itineraries and corporate offsite requests you have created. Our travel desk reviews your requirements and provides custom quotes.
                </p>
              </div>

              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <button
                  type="button"
                  onClick={() => setShowWizardModal(true)}
                  className="btn btn-warning fw-bold rounded-pill px-3 py-2 shadow-sm text-dark btn-sm"
                >
                  <i className="fa-solid fa-plus me-1"></i> Create Custom Package
                </button>
              </div>
            </div>
          </div>

          {/* Summary Stat Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="bg-white p-3 border rounded-4 shadow-sm d-flex align-items-center">
                <div className="rounded-3 p-3 bg-primary bg-opacity-10 text-primary me-3 fs-3">
                  <i className="fa-solid fa-clipboard-list"></i>
                </div>
                <div>
                  <div className="text-muted text-uppercase text-xs fw-bold">Total Enquiries</div>
                  <div className="fs-4 fw-bold text-dark">{enquiries.length}</div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white p-3 border rounded-4 shadow-sm d-flex align-items-center">
                <div className="rounded-3 p-3 bg-success bg-opacity-10 text-success me-3 fs-3">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <div className="text-muted text-uppercase text-xs fw-bold">Holiday Customizations</div>
                  <div className="fs-4 fw-bold text-dark">{enquiries.filter(e => e.enquiry_type === 'HOLIDAY').length}</div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white p-3 border rounded-4 shadow-sm d-flex align-items-center">
                <div className="rounded-3 p-3 bg-warning bg-opacity-10 text-warning me-3 fs-3">
                  <i className="fa-solid fa-building"></i>
                </div>
                <div>
                  <div className="text-muted text-uppercase text-xs fw-bold">Corporate Offsites</div>
                  <div className="fs-4 fw-bold text-dark">{enquiries.filter(e => e.enquiry_type === 'CORPORATE').length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiries List Section */}
          <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark m-0">
                <i className="fa-solid fa-list-check text-primary me-2"></i> Saved Custom Requests ({enquiries.length})
              </h5>
              <button onClick={fetchEnquiries} className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                <i className="fa-solid fa-rotate me-1"></i> Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-5 text-muted">
                <div className="spinner-border spinner-border-sm me-2 text-primary" role="status"></div>
                Loading your custom package enquiries...
              </div>
            ) : enquiries.length === 0 ? (
              <div className="text-center py-5 bg-light rounded-4">
                <i className="fa-solid fa-wand-magic-sparkles text-muted fs-1 mb-3"></i>
                <h5 className="fw-bold text-dark mb-1">No Custom Packages Found</h5>
                <p className="text-secondary small mb-3">You haven&apos;t created any customized tour or corporate package requests yet.</p>
                <button
                  type="button"
                  onClick={() => setShowWizardModal(true)}
                  className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-xs"
                  style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }}
                >
                  <i className="fa-solid fa-plus me-1"></i> Build Your Custom Package Now
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light text-uppercase text-xs text-muted">
                    <tr>
                      <th>Type &amp; Ref</th>
                      <th>Destination</th>
                      <th>Travel Date</th>
                      <th>Group Size</th>
                      <th>Budget Band</th>
                      <th>Status</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((item) => (
                      <tr key={`${item.enquiry_type}-${item.id}`}>
                        <td>
                          <div>
                            <span className={`badge ${item.enquiry_type === 'CORPORATE' ? 'bg-primary' : 'bg-success'} text-white text-3xs px-2 py-1 rounded-pill fw-bold text-uppercase d-inline-block mb-1`}>
                              {item.enquiry_type === 'CORPORATE' ? 'Corporate' : 'Holiday'}
                            </span>
                            <div className="fw-bold text-dark small">#{item.id}</div>
                          </div>
                        </td>
                        <td>
                          <div className="fw-bold text-dark small">{item.destination || 'Custom Destination'}</div>
                          <small className="text-muted text-xs"><i className="fa-solid fa-plane-departure me-1"></i> {item.departure_city || 'Kolkata'}</small>
                        </td>
                        <td className="small text-dark">
                          <div className="fw-semibold">{item.travel_date || 'Flexible Date'}</div>
                          <small className="text-muted text-xs">{item.duration_days ? `${item.duration_days} Days / ${item.duration_nights || 0} Nights` : 'Custom Duration'}</small>
                        </td>
                        <td className="small">
                          <div className="fw-bold text-dark">
                            {item.enquiry_type === 'CORPORATE' ? (
                              <>{item.total_employees || item.adults_count || 1} Employees</>
                            ) : (
                              <>{item.adults_count || 1} Adults, {item.children_count || 0} Kids</>
                            )}
                          </div>
                          {item.male_count !== undefined && item.female_count !== undefined && (
                            <small className="text-muted text-2xs">({item.male_count} M / {item.female_count} F)</small>
                          )}
                        </td>
                        <td className="small text-secondary">
                          <span className="fw-semibold text-dark">{item.budget || 'Standard'}</span>
                        </td>
                        <td>{getStatusBadge(item.status)}</td>
                        <td className="text-end">
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(item)}
                            className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold text-xs"
                          >
                            <i className="fa-solid fa-eye me-1"></i> View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Details Modal */}
          {selectedEnquiry && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100000,
                padding: '16px'
              }}
              onClick={(e) => { if (e.target === e.currentTarget) setSelectedEnquiry(null); }}
            >
              <div className="bg-white rounded-4 shadow-lg overflow-hidden w-100" style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="p-4 bg-dark text-white d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-warning text-dark text-uppercase px-2.5 py-1 rounded-pill fw-bold text-2xs mb-1">
                      {selectedEnquiry.enquiry_type} CUSTOM ENQUIRY #{selectedEnquiry.id}
                    </span>
                    <h5 className="fw-bold text-white m-0">{selectedEnquiry.destination}</h5>
                  </div>
                  <button type="button" onClick={() => setSelectedEnquiry(null)} className="btn-close btn-close-white" aria-label="Close"></button>
                </div>

                <div className="p-4">
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <small className="text-uppercase text-muted text-3xs fw-bold d-block">Contact Name</small>
                        <div className="fw-bold text-dark small">{selectedEnquiry.full_name || user?.first_name}</div>
                        {selectedEnquiry.company_name && <small className="text-primary text-xs d-block">{selectedEnquiry.company_name}</small>}
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <small className="text-uppercase text-muted text-3xs fw-bold d-block">Phone &amp; Email</small>
                        <div className="fw-semibold text-dark small">{selectedEnquiry.phone || 'N/A'}</div>
                        <small className="text-muted text-xs text-truncate d-block">{selectedEnquiry.email || 'N/A'}</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <small className="text-uppercase text-muted text-3xs fw-bold d-block">Travel Schedule</small>
                        <div className="fw-bold text-dark small">{selectedEnquiry.travel_date || 'Flexible Date'}</div>
                        <small className="text-muted text-xs">{selectedEnquiry.duration_days} Days / {selectedEnquiry.duration_nights || 0} Nights</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <small className="text-uppercase text-muted text-3xs fw-bold d-block">Group Breakdown</small>
                        <div className="fw-bold text-dark small">
                          {selectedEnquiry.enquiry_type === 'CORPORATE' ? (
                            <>{selectedEnquiry.total_employees || selectedEnquiry.adults_count} Employees ({selectedEnquiry.male_count || 0} M / {selectedEnquiry.female_count || 0} F)</>
                          ) : (
                            <>{selectedEnquiry.adults_count || 1} Adults, {selectedEnquiry.children_count || 0} Kids</>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <small className="text-uppercase text-muted text-3xs fw-bold d-block">Hotel &amp; Meal Plan</small>
                        <div className="fw-bold text-dark small">{selectedEnquiry.hotel_category || 'Standard'}</div>
                        <small className="text-muted text-xs">{selectedEnquiry.meal_plan || 'All Meals Included'}</small>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <small className="text-uppercase text-muted text-3xs fw-bold d-block">Vehicle &amp; Flights</small>
                        <div className="fw-bold text-dark small">{selectedEnquiry.cab_type || 'Transport Included'}</div>
                        <small className="text-muted text-xs">Flights: {selectedEnquiry.include_flights ? 'Yes' : 'No'}</small>
                      </div>
                    </div>
                  </div>

                  {selectedEnquiry.message && (
                    <div className="p-3 bg-light rounded-3 border mb-4">
                      <small className="text-uppercase text-muted text-3xs fw-bold d-block mb-1">Custom Notes / Requests</small>
                      <p className="text-dark small m-0" style={{ whiteSpace: 'pre-wrap' }}>{selectedEnquiry.message}</p>
                    </div>
                  )}

                  <div className="p-3 bg-primary bg-opacity-10 border border-primary-subtle rounded-3 text-center mb-4">
                    <div className="fw-bold text-primary small"><i className="fa-solid fa-headset me-1"></i> Our Team Is Processing Your Quote</div>
                    <p className="text-secondary text-xs m-0">A travel desk executive will contact you shortly to review itinerary choices.</p>
                  </div>

                  <div className="text-end">
                    <button type="button" onClick={() => setSelectedEnquiry(null)} className="btn btn-secondary rounded-pill px-4 btn-sm fw-bold">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Popup to create new custom package */}
          {showWizardModal && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(8px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100000,
                padding: "16px"
              }}
              onClick={(e) => { if (e.target === e.currentTarget) setShowWizardModal(false); }}
            >
              <div className="position-relative w-100" style={{ maxWidth: "980px", maxHeight: "92vh", overflowY: "auto" }}>
                <CustomPackageWizardForm
                  isModal={true}
                  onClose={() => {
                    setShowWizardModal(false);
                    fetchEnquiries();
                  }}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
