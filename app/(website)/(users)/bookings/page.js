import React from 'react'

function page() {
    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="bookings-panel" role="tabpanel">
                        <div className="gofly-card">
                            <h3 className="gofly-card-title">Reservation & Tour Bookings History</h3>
                            <div className="table-responsive mt-4">
                                <table className="table table-gofly align-middle">
                                    <thead>
                                        <tr className="rounded-3 overflow-hidden">
                                            <th>Booking ID</th>
                                            <th>Package Destination</th>
                                            <th>Travel Date</th>
                                            <th>Total Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold text-primary">#GF-98241</td>
                                            <td>
                                                <div className="fw-bold">Maldives Luxury Private Island</div>
                                                <span className="text-muted small"><i className="fa fa-hotel me-1"></i> 5 Days Flight+Stay</span>
                                            </td>
                                            <td>May 24, 2026</td>
                                            <td className="fw-bold">$1,250.00</td>
                                            <td><span className="booking-status-badge status-confirmed">Confirmed</span></td>
                                            <td><a href="#" className="btn btn-sm btn-gofly-outline py-1 px-3 fs-12">Invoice</a></td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-primary">#GF-83104</td>
                                            <td>
                                                <div className="fw-bold">Tokyo & Kyoto Cultural Tour</div>
                                                <span className="text-muted small"><i className="fa fa-car me-1"></i> Guided Group Express</span>
                                            </td>
                                            <td>Jul 12, 2026</td>
                                            <td className="fw-bold">$1,890.00</td>
                                            <td><span className="booking-status-badge status-pending">Pending</span></td>
                                            <td><a href="#" className="btn btn-sm btn-gofly-outline py-1 px-3 fs-12">Pay Now</a></td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-primary">#GF-72210</td>
                                            <td>
                                                <div className="fw-bold">Paris Weekend Gateway Break</div>
                                                <span className="text-muted small"><i className="fa fa-plane me-1"></i> Flight Ticket Only</span>
                                            </td>
                                            <td>Jan 14, 2026</td>
                                            <td className="fw-bold">$420.00</td>
                                            <td><span className="booking-status-badge status-cancelled">Cancelled</span></td>
                                            <td><a href="#" className="btn btn-sm btn-gofly-outline py-1 px-3 fs-12 disabled">Rebook</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page