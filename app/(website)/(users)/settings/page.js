import React from 'react'

function page() {
    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div className="tab-content" id="v-pills-tabContent">
                     <div className="tab-pane fade show active" id="settings-panel" role="tabpanel">
                        <div className="gofly-card mb-4">
                            <h3 className="gofly-card-title">Change Password</h3>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Current Password</label>
                                        <input type="password" className="form-control" placeholder="••••••••••••"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">New Password</label>
                                        <input type="password" className="form-control" placeholder="••••••••••••"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Confirm New Password</label>
                                        <input type="password" className="form-control" placeholder="••••••••••••"/>
                                    </div>
                                    <div className="col-12 pt-2">
                                        <button type="submit" className="btn btn-gofly">Update Account Security</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="gofly-card">
                            <h3 className="gofly-card-title">Preferences & Notifications</h3>
                            <div className="row g-3 mt-1">
                                <div className="col-12 d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <div>
                                        <h6 className="fw-bold mb-1">Email Newsletter Alerts</h6>
                                        <p className="text-muted small m-0">Receive price alerts and discounts on your saved items.</p>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" checked />
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <div>
                                        <h6 className="fw-bold mb-1">Two-Factor Security Authentication (2FA)</h6>
                                        <p className="text-muted small m-0">Secure your premium wallet using standard mobile push triggers.</p>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch"/>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between align-items-center py-2">
                                    <div>
                                        <h6 className="fw-bold mb-1 text-danger">Deactivate Account</h6>
                                        <p className="text-muted small m-0">Temporarily deactivate your booking record profile history.</p>
                                    </div>
                                    <button className="btn btn-sm btn-outline-danger px-3 py-2 fw-bold">Deactivate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page