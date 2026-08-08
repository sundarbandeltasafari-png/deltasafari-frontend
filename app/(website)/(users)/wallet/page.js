"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { axiosGet } from '@/libs/axiosHelper';

export default function WalletPage() {
    const router = useRouter();
    const token = useSelector((state) => state.userAuth?.token);
    const { user } = useSelector((state) => state.userAuth || {});

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            setLoading(true);
            const url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/user/getAgentDashboardStats`;
            axiosGet(url, token)
                .then((res) => {
                    setLoading(false);
                    if (res?.status) {
                        setStats(res);
                    }
                })
                .catch(() => setLoading(false));
        }
    }, [token]);

    const walletBalance = Number(stats?.stats?.walletBalance || user?.wallet_balance || 0);
    const totalEarned = Number(stats?.stats?.totalCommissionEarned || 0);
    const pendingComm = Number(stats?.stats?.pendingCommission || 0);
    const transactions = stats?.transactions || [];

    return (
        <div className="col-lg-8 col-xl-9">
            {/* Wallet Header & Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div 
                        className="card border-0 shadow-sm rounded-4 p-4 text-white h-100 position-relative overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #064e3b 0%, #047857 100%)" }}
                    >
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="badge bg-warning text-dark px-3 py-1 rounded-pill fw-bold text-uppercase" style={{ fontSize: '11px' }}>
                                Available Payout Balance
                            </span>
                            <i className="fa-solid fa-wallet fs-3 text-warning"></i>
                        </div>
                        <h1 className="display-6 fw-extrabold text-warning mb-2">
                            ₹{walletBalance.toLocaleString('en-IN')}
                        </h1>
                        <p className="m-0 text-light text-opacity-75 small">
                            <i className="fa-solid fa-shield-halved me-1 text-warning"></i> Indian Bank & UPI Payout Gateway
                        </p>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between">
                        <div>
                            <span className="text-muted small text-uppercase fw-bold d-block mb-1">Total Commission Earned</span>
                            <h3 className="fw-bold text-primary mb-1">₹{totalEarned.toLocaleString('en-IN')}</h3>
                            <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-2.5 py-1 rounded-pill">
                                ⏳ Pending Clearance: ₹{pendingComm.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-top d-flex gap-2">
                            <button 
                                className="btn btn-success rounded-pill px-4 py-2 fw-bold shadow-sm flex-grow-1"
                                onClick={() => router.push('/withdraw')}
                            >
                                <i className="fa-solid fa-arrow-up-from-bracket me-2"></i> Withdraw to Bank (₹)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction Ledger Table */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                    <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-receipt text-primary"></i> Commission & Payout Transaction Ledger
                    </h5>
                    <span className="badge bg-light text-dark border px-3 py-1.5 rounded-pill">
                        INR Currency (₹)
                    </span>
                </div>

                <div className="table-responsive">
                    {transactions.length === 0 ? (
                        <div className="p-5 text-center text-muted">
                            <i className="fa-solid fa-file-invoice-dollar fs-1 text-muted opacity-50 mb-2"></i>
                            <p className="mb-0">No wallet transactions recorded yet.</p>
                        </div>
                    ) : (
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: "14px" }}>
                            <thead className="table-light">
                                <tr>
                                    <th>Txn ID</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Amount (₹)</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id}>
                                        <td className="fw-bold text-primary">#TXN-{tx.id}</td>
                                        <td>{tx.description || tx.source}</td>
                                        <td>{new Date(tx.created_at).toLocaleDateString('en-IN')}</td>
                                        <td>
                                            <span className={`badge ${tx.type === 'CREDIT' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'} rounded-pill px-2.5 py-1 fw-bold`}>
                                                {tx.type === 'CREDIT' ? 'Credit (+)' : 'Debit (-)'}
                                            </span>
                                        </td>
                                        <td className={`fw-bold ${tx.type === 'CREDIT' ? 'text-success' : 'text-danger'}`}>
                                            {tx.type === 'CREDIT' ? '+' : '-'}₹{Number(tx.amount).toLocaleString('en-IN')}
                                        </td>
                                        <td>
                                            <span className="badge bg-light text-dark border rounded-pill px-2.5 py-1">
                                                {tx.status || 'COMPLETED'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}