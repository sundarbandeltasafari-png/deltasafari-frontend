import React from 'react'
import "../users.css"
function page() {
    return (
        <div className="col-lg-8 col-xl-9">
            <div className="tab-content" id="v-pills-tabContent">

                <div className="tab-pane fade show active" id="profile-panel" role="tabpanel">
                    <div className="gofly-card">
                        <h3 className="gofly-card-title">Profile Overview</h3>

                        <div className="row mt-4">
                            <div className="col-md-6 info-group">
                                <div className="info-label">Full Name</div>
                                <div className="info-value">Alex Morgan</div>
                            </div>
                            <div className="col-md-6 info-group">
                                <div className="info-label">Email Address</div>
                                <div className="info-value">alex.morgan@gofly-travel.com</div>
                            </div>
                            <div className="col-md-6 info-group">
                                <div className="info-label">Phone Number</div>
                                <div className="info-value">+1 (555) 234-5678</div>
                            </div>
                            <div className="col-md-6 info-group">
                                <div className="info-label">Location / City</div>
                                <div className="info-value">San Francisco, California</div>
                            </div>
                            <div className="col-md-6 info-group">
                                <div className="info-label">Preferred Currency</div>
                                <div className="info-value">USD ($)</div>
                            </div>
                            <div className="col-md-6 info-group">
                                <div className="info-label">Joined Date</div>
                                <div className="info-value">January 14, 2024</div>
                            </div>
                            <div className="col-12 info-group mt-2">
                                <div className="info-label">Biography</div>
                                <p className="text-muted">Passionate adventure traveler, mountain hiker, and cultural explorer. Visited over 24 countries and looking forward to uncovering hidden treasures across Southeast Asia and the Swiss Alps this year.</p>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-top">
                            <button className=" btn-gofly" onclick="document.getElementById('edit-profile-tab').click();">
                                <i className="fa-regular fa-edit me-2"></i>Modify Profile Information
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page