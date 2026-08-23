'use client';
import React, { useState } from 'react';

function ReferalCalculator() {
    const [range, setRange] = useState(5);
    const referBonus = 500;

    return (
        <div className="bg-white rounded-4 border p-4 shadow-sm" style={{ borderColor: '#eef2f6' }}>
            <div className="d-flex align-items-center gap-2 mb-3">
                <i className="fa-solid fa-calculator text-primary fs-5" style={{ color: '#0066cc' }}></i>
                <h5 className="m-0 text-dark">Referral Earnings Calculator</h5>
            </div>
            
            <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted" style={{ fontSize: '14px' }}>Number of Friends Referred:</span>
                <span className="badge rounded-pill px-3 py-1" style={{ backgroundColor: '#eff6ff', color: '#0066cc', fontSize: '14px', fontWeight: 500 }}>
                    {range} Friends
                </span>
            </div>
            
            <input 
                type="range" 
                className="form-range mb-4" 
                value={range} 
                min="1" 
                max="50" 
                onChange={(e) => setRange(Number(e.target.value))} 
                style={{ accentColor: '#0066cc' }}
            />
            
            <div className="row g-3">
                <div className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 text-center border" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
                        <span className="text-muted d-block text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                            Est. Total Wallet Commission
                        </span>
                        <div className="mt-1" style={{ fontSize: '24px', fontWeight: 700, color: '#0066cc' }}>
                            ₹{(referBonus * range).toLocaleString('en-IN')}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 text-center border" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                        <span className="text-muted d-block text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                            Avg. Commission / Tour
                        </span>
                        <div className="mt-1" style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>
                            ₹{referBonus.toLocaleString('en-IN')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferalCalculator;