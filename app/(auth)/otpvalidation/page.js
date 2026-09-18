"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/services/reducers/userAuthSlice";
import { showMessage } from "@/libs/commonHelper";
import { axiosNormalPost } from "@/libs/axiosHelper";
import { registerOtpValidateURL, resendOtpURL } from "@/routes/authRoutes";
import OTPInput from "react-otp-input";
import "../auth.css";

function OtpValidationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const channel = searchParams.get('channel') || 'whatsapp';
    const rawIdentifier = searchParams.get('identifier') || searchParams.get('phone') || searchParams.get('email') || '';

    const [identifier, setIdentifier] = useState(rawIdentifier);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [timer, setTimer] = useState(45);
    const canResend = timer <= 0;

    // Format display for identifier
    const formatDisplayIdentifier = (id) => {
        if (!id) return '';
        if (channel === 'whatsapp' || /^\d{10}$/.test(id)) {
            const digits = id.replace(/\D/g, '');
            if (digits.length === 10) {
                return `+91 ${digits.slice(0, 3)}****${digits.slice(7)}`;
            }
            return `+91 ${id}`;
        }
        if (id.includes('@')) {
            const [local, domain] = id.split('@');
            const maskedLocal = local.length > 2 ? `${local[0]}***${local[local.length - 1]}` : `${local[0]}***`;
            return `${maskedLocal}@${domain}`;
        }
        return id;
    };

    // Countdown timer for Resend OTP
    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // Handle Verify OTP
    const handleVerifyOtp = (e) => {
        if (e) e.preventDefault();
        setErrorMsg('');

        const cleanOtp = otp.trim();
        if (!cleanOtp || cleanOtp.length !== 6) {
            setErrorMsg('Please enter the complete 6-digit OTP code.');
            return;
        }

        if (!identifier.trim()) {
            setErrorMsg('Identifier is missing. Please restart registration.');
            return;
        }

        setLoading(true);
        axiosNormalPost(registerOtpValidateURL, {
            identifier: identifier.trim(),
            otp: cleanOtp
        })
        .then((res) => {
            setLoading(false);
            if (res?.status) {
                if (res.token && res.userDetails) {
                    dispatch(setUser({ user: res.userDetails, token: res.token }));
                }
                showMessage('success', res.msg || 'Account verified successfully! Welcome to Delta Safari.');
                router.push('/');
            } else {
                const msg = res?.msg || 'Invalid or expired OTP code. Please check and try again.';
                setErrorMsg(msg);
                showMessage('error', msg);
            }
        })
        .catch((err) => {
            setLoading(false);
            const msg = err?.response?.data?.msg || err?.message || 'Server connection error. Please try again.';
            setErrorMsg(msg);
            showMessage('error', msg);
        });
    };

    // Handle Resend OTP
    const handleResend = () => {
        if (!canResend || resending) return;
        setErrorMsg('');
        setResending(true);

        axiosNormalPost(resendOtpURL, {
            identifier: identifier.trim()
        })
        .then((res) => {
            setResending(false);
            if (res?.status) {
                setTimer(45);
                setCanResend(false);
                showMessage('success', res.msg || 'A fresh verification OTP has been dispatched.');
            } else {
                const msg = res?.msg || 'Failed to resend OTP. Please try again.';
                setErrorMsg(msg);
                showMessage('error', msg);
            }
        })
        .catch((err) => {
            setResending(false);
            const msg = err?.response?.data?.msg || err?.message || 'Failed to resend OTP.';
            setErrorMsg(msg);
            showMessage('error', msg);
        });
    };

    const isWhatsApp = channel === 'whatsapp';

    return (
        <div className="page-body">
            <div className="otp-card" style={{ maxWidth: '440px' }}>

                <div className="otp-card-stripe">
                    <img src="/assets/img/logo_DS.png" alt="Delta Safari Official Logo" style={{ width: "100%" }} />
                </div>

                <div className="otp-card-body d-flex flex-column" id="cardBody">

                    <div className="otp-steps-dots" id="stepDots">
                        <div className="dot"></div>
                        <div className="dot active"></div>
                    </div>

                    <div className="step active" id="step2">

                        {/* Channel Notification Header */}
                        <div className="text-center mb-3">
                            <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mb-2" 
                                style={{ backgroundColor: isWhatsApp ? '#e8f7ee' : '#ebf5ff' }}>
                                <i className={isWhatsApp ? "bi bi-whatsapp fs-2 text-success" : "bi bi-envelope-check fs-2 text-primary"}></i>
                            </div>
                            <h5 className="fw-bold mb-1" style={{ color: '#1a2b49' }}>
                                {isWhatsApp ? 'WhatsApp Verification' : 'Email Verification'}
                            </h5>
                            <p className="text-muted text-xs mb-0">
                                Enter the 6-digit code sent to your {isWhatsApp ? 'WhatsApp number' : 'email'}
                            </p>
                        </div>

                        <div className="phone-hint text-center bg-light p-2.5 rounded-3 mb-3 border">
                            <div className="text-xs text-muted mb-1">
                                {isWhatsApp ? (
                                    <span><i className="bi bi-whatsapp text-success me-1"></i> WhatsApp:</span>
                                ) : (
                                    <span><i className="bi bi-envelope-fill text-primary me-1"></i> Email:</span>
                                )}
                            </div>
                            <strong className="fs-6 text-dark" id="phoneDisplay">
                                {formatDisplayIdentifier(identifier) || 'Your registered contact'}
                            </strong>
                            <div className="mt-1">
                                <button 
                                    className="resend-link btn-link text-decoration-none" 
                                    onClick={() => router.push('/login')} 
                                    style={{ fontSize: 12, cursor: 'pointer', background: 'none', border: 'none', color: '#ef6614' }}
                                >
                                    <i className="bi bi-pencil-fill me-1"></i> Change number / email
                                </button>
                            </div>
                        </div>

                        <div className="step-label text-center mb-2">
                            <span><i className="bi bi-shield-lock-fill text-white"></i></span> Enter 6-digit OTP
                        </div>

                        <div className="otp-boxes justify-content-center mb-3" id="otpBoxes">
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span className="mx-1 text-muted">-</span>}
                                inputType="number"
                                shouldAutoFocus={true}
                                inputStyle={{
                                    width: "42px",
                                    height: "48px",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    borderRadius: "8px",
                                    border: "1.5px solid #d1d5db",
                                    textAlign: "center",
                                    outline: "none",
                                    margin: "0 2px"
                                }}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>

                        {errorMsg && (
                            <div className="alert alert-danger d-flex align-items-center gap-2 p-2.5 rounded-3 mb-3 text-xs border border-danger-subtle shadow-xs" id="otpError">
                                <i className="bi bi-exclamation-circle-fill text-danger flex-shrink-0"></i>
                                <span className="fw-semibold text-danger-emphasis">{errorMsg}</span>
                            </div>
                        )}

                        <div className="resend-row d-flex align-items-center justify-content-between p-2 bg-light rounded-3 mb-3 border text-xs">
                            <span className="text-muted">Didn&apos;t receive OTP?</span>
                            <div className="d-flex align-items-center gap-2">
                                <button 
                                    className="resend-link fw-bold border-0 bg-transparent text-primary p-0" 
                                    onClick={handleResend} 
                                    id="resendBtn" 
                                    disabled={!canResend || resending}
                                    style={{ cursor: canResend ? 'pointer' : 'not-allowed', opacity: canResend ? 1 : 0.6 }}
                                >
                                    {resending ? 'Sending...' : 'Resend Code'}
                                </button>
                                {!canResend && (
                                    <span className="badge bg-secondary-subtle text-secondary border px-2 py-1" id="timerBadge">
                                        00:{timer > 9 ? timer : `0${timer}`}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button 
                            className="db-btn-primary mb-2 d-flex align-items-center justify-content-center gap-2" 
                            id="verifyBtn"
                            onClick={handleVerifyOtp}
                            disabled={loading || otp.length !== 6}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-patch-check-fill me-1"></i>
                                    <span>Verify &amp; Activate Account</span>
                                </>
                            )}
                        </button>

                        <button 
                            className="db-btn-ghost w-100 d-flex align-items-center justify-content-center gap-1 mt-1" 
                            onClick={() => router.push('/login')} 
                            id="backBtn"
                        >
                            <i className="bi bi-arrow-left"></i> Back to Login
                        </button>
                    </div>

                </div>

                <div className="otp-footer text-center mt-3 text-muted text-3xs">
                    By continuing, you agree to our
                    <a href="#" className="text-decoration-none ms-1 me-1 text-primary">Terms of Service</a> &amp;
                    <a href="#" className="text-decoration-none ms-1 text-primary">Privacy Policy</a>
                </div>

            </div>
        </div>
    );
}

export default function page() {
    return (
        <Suspense fallback={<div className="page-body d-flex align-items-center justify-content-center"><div className="spinner-border text-primary" role="status"></div></div>}>
            <OtpValidationContent />
        </Suspense>
    );
}