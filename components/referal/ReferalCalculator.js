'use client'
import React, { useState } from 'react'

function ReferalCalculator() {
    const [range, setRange] = useState(5);
    const [referBonus] = useState(500);
    return (
        <div className="calc-widget">
            <div className="calc-widget-title">
                <i className="bi bi-calculator-fill"></i> Earnings Calculator
            </div>
            <div className="calc-range-label">
                Number of Friends Referred: <span id="referralCount">{range}</span>
            </div>
            <input type="range" className="custom-range" id="refRange" value={range} min="1" max="50" onInput={(e) => { setRange(Number(e.target.value)) }} />
            <div className="calc-result-grid">
                <div className="calc-result-box primary">
                    <div className="calc-result-label">Est. Total Wallet Commissions</div>
                    <div className="calc-result-amount" id="totalEarnings">₹{(referBonus * range).toLocaleString('en-IN')}</div>
                </div>
                <div className="calc-result-box accent">
                    <div className="calc-result-label">Avg. Commission / Package</div>
                    <div className="calc-result-amount" id="friendSavings">₹{referBonus.toLocaleString('en-IN')}</div>
                </div>
            </div>
        </div>
    )
}

export default ReferalCalculator