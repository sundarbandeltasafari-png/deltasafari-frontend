"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosGet, axiosNormalPost } from '@/libs/axiosHelper';
import { showMessage } from '@/libs/commonHelper';

export default function WithdrawPage() {
    const token = useSelector((state) => state.userAuth?.token);
    const { user } = useSelector((state) => state.userAuth || {});

    const [stats, setStats] = useState(null);
    const [amount, setAmount] = useState('');
    const [bankDetails, setBankDetails] = useState({
        bank_name: '',
        account_number: '',
        ifsc_code: '',
        account_holder: '',
        upi_id: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [savingBank, setSavingBank] = useState(false);

    const loadData = () => {
        if (!token) return;
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/user/getAgentDashboardStats`;
        axiosGet(url, token)
            .then((res) => {
                setLoading(false);
                if (res?.status) {
                    setStats(res);
                    if (res?.agent) {
                        setBankDetails({
                            bank_name: res.agent.bank_name || '',
                            account_number: res.agent.account_number || '',
                            ifsc_code: res.agent.ifsc_code || '',
                            account_holder: res.agent.account_holder || `${res.agent.first_name} ${res.agent.last_name || ''}`.trim(),
                            upi_id: res.agent.upi_id || ''
                        });
                    }
                }
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
    }, [token]);

    const walletBalance = Number(stats?.stats?.walletBalance || user?.wallet_balance || 0);

    const handleSaveBank = async (e) => {
        e.preventDefault();
        setSavingBank(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/user/updateAgentBankDetails`;
            const res = await axiosNormalPost(url, bankDetails, token);
            if (res.status) {
                showMessage('Indian Bank Account & UPI details saved successfully!', 'success');
                loadData();
            } else {
                showMessage(res.msg || 'Failed to save bank details.', 'error');
            }
        } catch (err) {
            showMessage(err?.response?.data?.msg || err.message || 'Error updating bank details.', 'error');
        } finally {
            setSavingBank(false);
        }
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();
        const amt = Number(amount);
        if (!amt || amt < 500) {
            showMessage('Minimum withdrawal amount is ₹500.', 'error');
            return;
        }
        if (amt > walletBalance) {
            showMessage(`Insufficient balance! Your current wallet balance is ₹${walletBalance.toLocaleString('en-IN')}.`, 'error');
            return;
        }

        setSubmitting(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/user/requestAgentWithdrawal`;
            const payload = {
                amount: amt,
                ...bankDetails
            };
            const res = await axiosNormalPost(url, payload, token);
            if (res.status) {
                showMessage(`Withdrawal of ₹${amt.toLocaleString('en-IN')} requested successfully!`, 'success');
                setAmount('');
                loadData();
            } else {
                showMessage(res.msg || 'Withdrawal failed.', 'error');
            }
        } catch (err) {
            showMessage(err?.response?.data?.msg || err.message || 'Server error during withdrawal.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="col-lg-8 col-xl-9">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-4">
                    <div>
                        <h4 className="fw-bold text-dark mb-1">
                            <i className="fa-solid fa-money-bill-transfer text-success me-2"></i> Withdraw Commission to Indian Bank Account
                        </h4>
                        <p className="text-muted small mb-0">Direct IMPS / NEFT / UPI settlement in INR (₹) to your registered bank account</p>
                    </div>
                    <div className="p-2.5 bg-success-subtle border border-success-subtle rounded-3 text-end">
                        <small className="text-muted d-block" style={{ fontSize: '11px' }}>Available Balance</small>
                        <strong className="text-success fs-5">₹{walletBalance.toLocaleString('en-IN')}</strong>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Withdrawal Form */}
                    <div className="col-md-6 border-end-md">
                        <h6 className="fw-bold text-primary text-uppercase mb-3" style={{ fontSize: '12px' }}>
                            1. Enter Payout Amount (₹)
                        </h6>
                        <form onSubmit={handleWithdraw}>
                            <div className="mb-3">
                                <label className="form-label text-muted small fw-bold">Amount to Withdraw (₹) <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light fw-bold">₹</span>
                                    <input 
                                        type="number" 
                                        className="form-control p-2.5" 
                                        placeholder="Min ₹500" 
                                        value={amount} 
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="500" 
                                        max={walletBalance} 
                                        required 
                                    />
                                </div>
                                <small className="text-muted">Min: ₹500 | Max Available: ₹{walletBalance.toLocaleString('en-IN')}</small>
                            </div>

                            <div className="p-3 bg-light rounded-3 border mb-3">
                                <small className="text-muted d-block fw-bold mb-1">Payout Destination Preview:</small>
                                <div className="small text-dark">
                                    <strong>{bankDetails.bank_name || 'Bank Name Pending'}</strong> - A/C: {bankDetails.account_number || 'Pending'}
                                    {bankDetails.ifsc_code && <span className="d-block text-muted">IFSC: {bankDetails.ifsc_code}</span>}
                                    {bankDetails.upi_id && <span className="d-block text-success fw-semibold">UPI: {bankDetails.upi_id}</span>}
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-success w-100 py-2.5 rounded-pill fw-bold shadow d-flex align-items-center justify-content-center gap-2"
                                disabled={submitting || walletBalance < 500}
                            >
                                {submitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                        <span>Submitting Payout...</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-check-double"></i>
                                        <span>Authorize Withdrawal Request (₹)</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Bank Details Management */}
                    <div className="col-md-6">
                        <h6 className="fw-bold text-success text-uppercase mb-3" style={{ fontSize: '12px' }}>
                            2. Manage Indian Bank & UPI Details
                        </h6>
                        <form onSubmit={handleSaveBank}>
                            <div className="mb-2">
                                <label className="form-label text-muted small fw-semibold">Account Holder Name</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm" 
                                    placeholder="Account Holder Name"
                                    value={bankDetails.account_holder} 
                                    onChange={(e) => setBankDetails({ ...bankDetails, account_holder: e.target.value })}
                                    required 
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted small fw-semibold">Bank Name</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm" 
                                    placeholder="e.g. State Bank of India / HDFC Bank"
                                    value={bankDetails.bank_name} 
                                    onChange={(e) => setBankDetails({ ...bankDetails, bank_name: e.target.value })}
                                    required 
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted small fw-semibold">Account Number</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm" 
                                    placeholder="e.g. 50100234567890"
                                    value={bankDetails.account_number} 
                                    onChange={(e) => setBankDetails({ ...bankDetails, account_number: e.target.value })}
                                    required 
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label text-muted small fw-semibold">IFSC Code</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm text-uppercase" 
                                    placeholder="e.g. SBIN0001234"
                                    value={bankDetails.ifsc_code} 
                                    onChange={(e) => setBankDetails({ ...bankDetails, ifsc_code: e.target.value.toUpperCase() })}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-muted small fw-semibold">UPI ID (Optional)</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm" 
                                    placeholder="e.g. 9876543210@upi"
                                    value={bankDetails.upi_id} 
                                    onChange={(e) => setBankDetails({ ...bankDetails, upi_id: e.target.value })}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-outline-success btn-sm w-100 rounded-pill fw-bold"
                                disabled={savingBank}
                            >
                                {savingBank ? 'Saving...' : 'Update Bank & UPI Details'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}