import React from 'react'

function page() {
    return (
        <div className="col-lg-8 col-xl-9">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="edit-profile-panel" role="tabpanel">
                    <div className="gofly-card">
                        <h3 className="gofly-card-title">Edit Profile Information</h3>

                        <form>
                            <div className="row g-4">
                                <div className="col-md-12 text-center mb-2">
                                    <div className="position-relative d-inline-block">
                                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" className="rounded-circle border" style={{width: "110px", height: "110px", objectFit: "cover"}} id="avatar-preview" alt="Profile avatar" />
                                        <label className="btn btn-sm btn-dark position-absolute bottom-0 end-0 rounded-circle p-2 style-cursor" style={{width: "34px", height: "34px"}}>
                                            <i className="fa fa-camera"></i>
                                            <input type="file" className="d-none" />
                                        </label>
                                    </div>
                                    <p className="small text-muted mt-2">Accepted formats: JPG, PNG. Max size 2MB</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" defaultValue="Alex" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" defaultValue="Morgan" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email ID</label>
                                    <input type="email" className="form-control" defaultValue="alex.morgan@gofly-travel.com" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Phone Contact</label>
                                    <input type="text" className="form-control" defaultValue="+1 (555) 234-5678" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Country/Region</label>
                                    <select className="form-select">
                                        <option selected>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">City State</label>
                                    <input type="text" className="form-control" defaultValue="San Francisco, CA" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">About Me (Bio)</label>
                                    <textarea className="form-control" rows="4">Passionate adventure traveler, mountain hiker, and cultural explorer. Visited over 24 countries and looking forward to uncovering hidden treasures across Southeast Asia and the Swiss Alps this year.</textarea>
                                </div>

                                <div className="col-12 pt-2">
                                    <button type="submit" className=" btn-gofly me-2">Save Profile Changes</button>
                                    <button type="reset" className=" btn-gofly-outline">Discard Changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page