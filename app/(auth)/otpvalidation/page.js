"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import "../auth.css";
import OTPInput from "react-otp-input";
function page() {
    const [loading, setLoaging] = useState(true);
    const [error, setError] = useState(null);
    const [otp, setOtp] = useState('');
    const [resend, setResend] = useState(true);
    const searchParams = useSearchParams();
    const phone = searchParams.get('phone');
    const route = useRouter();
    useEffect(() => {
        if (!phone) {
            route.push("/auth/login");
        } else {
            setLoaging(false);
            handleResendInterval()
        }

        return 
    }, [])

    function handleResendInterval() {
        var time = 30;
        const resentInterval = setInterval(() => {
            if (time > 0) {
                time = time - 1;
                if(document.getElementById('timerBadge')){
                    document.getElementById('timerBadge').innerText = time > 9 ? "00:" + time : "00:0" + time;
                }
            } else {
                clearInterval(resentInterval)
                setResend(false)
            }
        }, 1000);
    }

    function handleResend() {
        setResend(true);
        handleResendInterval();
    }

    return (
        <>
            <div className="page-body">
                <div className="otp-card">

                    <div className="otp-card-stripe">
                        <img src="/assets/img/logo_DS.png" style={{width: "100%"}} />
                    </div>

                    <div className="otp-card-body d-flex flex-column" id="cardBody">

                        <div className="otp-steps-dots" id="stepDots">
                            <div className="dot" id="dot1"></div>
                            <div className="dot active" id="dot2"></div>
                        </div>

                        <div className="step active" id="step2">
                            <div className="phone-hint">
                                OTP sent to <strong id="phoneDisplay">+91 {phone.slice(0, 4) + phone.split('').map((num, index)=>{ if(index > 3){ return "X"}}).join('')}</strong>
                                <br />
                                <button className="resend-link" onClick={()=>{route.back()}} id="changePhone" style={{ fontSize: 13 }}>
                                    <i className="bi bi-pencil-fill"></i> Change number
                                </button>
                            </div>

                            <div className="step-label"><span>2</span> Enter 6-digit OTP</div>

                            <div className="otp-boxes" id="otpBoxes">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    inputType="number"
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>

                            {error && <div className="db-error" id="otpError">
                                <i className="bi bi-exclamation-circle-fill"></i>
                                <span id="otpErrorMsg">Incorrect OTP. Please try again.</span>
                            </div>}

                            <div className="resend-row">
                                <span>Didn't receive OTP?</span>
                                <button className="resend-link" onClick={handleResend} id="resendBtn" disabled ={resend}>Resend</button>
                                {resend && <span className="timer-badge" id="timerBadge">00:30</span>}
                            </div>

                            <button className="db-btn-primary" id="verifyBtn">
                                <i className="bi bi-patch-check-fill"></i> Verify OTP
                            </button>
                            <button className="db-btn-ghost" onClick={()=>{route.back()}} id="backBtn">
                                <i className="bi bi-arrow-left"></i> Back
                            </button>
                        </div>

                    </div>

                    <div className="otp-footer">
                        By continuing, you agree to our
                        <a href="#">Terms of Service</a> &amp;
                        <a href="#">Privacy Policy</a>
                    </div>

                </div>
            </div>
        </>
    )
}

export default page