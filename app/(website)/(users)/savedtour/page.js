import React from 'react'

function page() {
    return (
        <div className="col-lg-8 col-xl-9">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="saved-post-panel" role="tabpanel">
                    <div className="gofly-card">
                        <h3 className="gofly-card-title mb-4">Saved Travel Packages & Posts</h3>

                        <div className="row g-4">
                            <div className="col-md-6 col-xl-4">
                                <div className="saved-post-card">
                                    <div className="saved-post-img-wrap">
                                        <span className="post-badge">5 Days / 4 Nights</span>
                                        <button className="post-remove-btn" title="Remove Wishlist"><i className="fa-solid fa-trash-can"></i></button>
                                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" alt="Maldives Getaway" />
                                    </div>
                                    <div className="saved-post-content">
                                        <div className="saved-post-meta">
                                            <span><i className="fa-solid fa-star text-warning me-1"></i> 4.9 (124 reviews)</span>
                                        </div>
                                        <h5 className="saved-post-title"><a href="#" className="text-decoration-none text-dark">Maldives Luxury Private Island Getaway</a></h5>
                                        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                            <div className="saved-post-price">$1,250 <span className="text-muted small fw-normal">/ person</span></div>
                                            <a href="#" className="btn btn-sm btn-gofly px-3 py-2"><i className="fa-solid fa-bolt"></i> Book Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-xl-4">
                                <div className="saved-post-card">
                                    <div className="saved-post-img-wrap">
                                        <span className="post-badge">7 Days / 6 Nights</span>
                                        <button className="post-remove-btn" title="Remove Wishlist"><i className="fa-solid fa-trash-can"></i></button>
                                        <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=500&q=80" alt="Tokyo Expedition" />
                                    </div>
                                    <div className="saved-post-content">
                                        <div className="saved-post-meta">
                                            <span><i className="fa-solid fa-star text-warning me-1"></i> 4.8 (98 reviews)</span>
                                        </div>
                                        <h5 className="saved-post-title"><a href="#" className="text-decoration-none text-dark">Tokyo & Kyoto Cultural Heritage Tour</a></h5>
                                        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                            <div className="saved-post-price">$1,890 <span className="text-muted small fw-normal">/ person</span></div>
                                            <a href="#" className="btn btn-sm btn-gofly px-3 py-2"><i className="fa-solid fa-bolt"></i> Book Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-xl-4">
                                <div className="saved-post-card">
                                    <div className="saved-post-img-wrap">
                                        <span className="post-badge">3 Days / 2 Nights</span>
                                        <button className="post-remove-btn" title="Remove Wishlist"><i className="fa-solid fa-trash-can"></i></button>
                                        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=80" alt="Santorini Sunset" />
                                    </div>
                                    <div className="saved-post-content">
                                        <div className="saved-post-meta">
                                            <span><i className="fa-solid fa-star text-warning me-1"></i> 5.0 (46 reviews)</span>
                                        </div>
                                        <h5 className="saved-post-title"><a href="#" className="text-decoration-none text-dark">Romantic Honeymoon Santorini Escape</a></h5>
                                        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                            <div className="saved-post-price">$950 <span className="text-muted small fw-normal">/ person</span></div>
                                            <a href="#" className="btn btn-sm btn-gofly px-3 py-2"><i className="fa-solid fa-bolt"></i> Book Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page