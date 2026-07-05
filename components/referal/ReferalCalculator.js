'use client'
import React, { useState } from 'react'

function ReferalCalculator() {
    const [range, setRange] = useState(5);
    const [referBonus, setReferBonus] = useState(200)
    return (
        <div className="calc-widget">
            <div className="calc-widget-title">
                <i className="bi bi-calculator-fill"></i> Earnings Calculator
            </div>
            <div className="calc-range-label">
                Number of Referrals: <span id="referralCount">10</span>
            </div>
            <input type="range" className="custom-range" id="refRange" value={range} min="1" max="50" onInput={(e) => { setRange(e.target.value) }} />
            <div className="calc-result-grid">
                <div className="calc-result-box primary">
                    <div className="calc-result-label">Your Total Earnings</div>
                    <div className="calc-result-amount" id="totalEarnings">₹{referBonus*range}</div>
                </div>
                <div className="calc-result-box accent">
                    <div className="calc-result-label">Friends Save</div>
                    <div className="calc-result-amount" id="friendSavings">₹{referBonus}</div>
                </div>
            </div>
        </div>
    )
}

export default ReferalCalculator