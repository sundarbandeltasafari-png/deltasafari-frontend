import React from 'react'

function page() {
    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="wallet-panel" role="tabpanel">
                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <div className="wallet-metric-card shadow-sm">
                                    <span className="text-white-50 uppercase small letter-spacing d-block mb-1">Available Balance</span>
                                    <h1 className="display-5 fw-bold text-white mb-2">$3,450.25</h1>
                                    <p className="m-0 text-white-50 small"><i className="fa fa-shield-halved me-1 text-success"></i> Secured via GoFly Wallet Gateway</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="gofly-card m-0 h-100 d-flex flex-column justify-content-center py-4">
                                    <span className="text-muted small uppercase d-block mb-1">Total Cashout Rewards</span>
                                    <h2 className="fw-bold text-dark mb-3">$840.00</h2>
                                    <div>
                                        <button className=" btn-gofly py-2 px-4" onclick="document.getElementById('withdraw-tab').click();">
                                            <i className="fa-solid fa-arrow-up-from-bracket me-2"></i>Withdraw to Bank Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="gofly-card">
                            <h4 className="fw-bold mb-4">Wallet Transaction Ledger</h4>
                            <div className="table-responsive">
                                <table className="table align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Transaction ID</th>
                                            <th>Details</th>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="small fw-bold">TXN-77310542</td>
                                            <td>Referral Bonus Credits <span className="text-muted">(User @James99)</span></td>
                                            <td>May 15, 2026</td>
                                            <td><span className="text-success fw-bold">Credit</span></td>
                                            <td className="text-success fw-bold">+$50.00</td>
                                        </tr>
                                        <tr>
                                            <td className="small fw-bold">TXN-49210481</td>
                                            <td>Bank Account Withdrawal Payout</td>
                                            <td>May 02, 2026</td>
                                            <td><span className="text-danger fw-bold">Debit</span></td>
                                            <td className="text-danger fw-bold">-$250.00</td>
                                        </tr>
                                        <tr>
                                            <td className="small fw-bold">TXN-28401948</td>
                                            <td>Refund for Cancelled Flight #GF-72210</td>
                                            <td>Jan 16, 2026</td>
                                            <td><span className="text-success fw-bold">Credit</span></td>
                                            <td className="text-success fw-bold">+$420.00</td>
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