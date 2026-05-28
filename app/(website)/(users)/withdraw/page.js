import React from 'react'

function page() {
    return (
        <>
            <div className="col-lg-8 col-xl-9">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="withdraw-panel" role="tabpanel">
                        <div className="gofly-card">
                            <h3 className="gofly-card-title">Withdraw Funds to Local Bank</h3>
                            <p className="text-muted small mb-4">Transfer available funds from your cloud secure GoFly Wallet balances straight to personal savings checking records instantly.</p>

                            <form>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Withdrawal Amount ($)</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white">$</span>
                                            <input type="number" className="form-control" placeholder="Minimum $50" min="50" max="3450" />
                                        </div>
                                        <span className="text-muted small mt-1 d-block">Max dynamic transfer limit: $3,450.25</span>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Bank Identification / Routing Swift Code</label>
                                        <input type="text" className="form-control" placeholder="e.g. CHASUS33XXX" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Bank Routing Account Holder Name</label>
                                        <input type="text" className="form-control" value="Alex Morgan" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Account Number / IBAN</label>
                                        <input type="password" className="form-control" placeholder="•••• •••• •••• 5678" />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Bank Branch Name & Full Address Address</label>
                                        <input type="text" className="form-control" placeholder="Chase Bank National Main Square, SF Branch" />
                                    </div>
                                    <div className="col-12 pt-2">
                                        <button type="submit" className=" btn-gofly"><i className="fa-solid fa-check-double me-2"></i>Authorize Payout Request</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page