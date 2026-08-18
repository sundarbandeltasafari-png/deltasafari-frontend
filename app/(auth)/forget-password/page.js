"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emailValidation, passwordValidation, showMessage } from "../../../libs/commonHelper";
import { axiosNormalPost } from "@/libs/axiosHelper";
import { 
  forgotPasswordReqURL, 
  verifyResetOtpURL, 
  resetPasswordURL, 
  resendResetOtpURL 
} from "@/routes/authRoutes";
import "../auth.css";

function ForgetPasswordContent() {
  const router = useRouter();

  // Steps: 1 = Enter Email, 2 = Verify OTP & Set New Password, 3 = Success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [viewPass, setViewPass] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);

  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(0);

  // Timer countdown for resend OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Step 1: Request Password Reset OTP
  const handleRequestOtp = (e) => {
    if (e) e.preventDefault();

    if (!email.trim()) {
      const msg = "Please enter your registered email address.";
      setServerError(msg);
      showMessage("error", msg);
      return;
    }

    if (!emailValidation(email.trim())) {
      const msg = "Please enter a valid email address.";
      setServerError(msg);
      showMessage("error", msg);
      return;
    }

    setLoading(true);
    setServerError("");
    setSuccessMsg("");

    axiosNormalPost(forgotPasswordReqURL, { email: email.trim() })
      .then((res) => {
        setLoading(false);
        if (res?.status) {
          setSuccessMsg(res.msg || "Password reset OTP has been sent to your email.");
          showMessage("success", "OTP sent to your email!");
          setStep(2);
          setTimer(60); // 60 seconds countdown
        } else {
          const msg = res?.msg || "Failed to send reset OTP. Please check your email.";
          setServerError(msg);
          showMessage("error", msg);
        }
      })
      .catch((err) => {
        setLoading(false);
        const msg = err?.response?.data?.msg || err?.message || "Something went wrong, please try again.";
        setServerError(msg);
        showMessage("error", msg);
      });
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (timer > 0 || resending) return;

    setResending(true);
    setServerError("");

    axiosNormalPost(resendResetOtpURL, { email: email.trim() })
      .then((res) => {
        setResending(false);
        if (res?.status) {
          setSuccessMsg("A fresh OTP code has been dispatched to your email.");
          showMessage("success", "New OTP code sent to your inbox!");
          setTimer(60);
        } else {
          const msg = res?.msg || "Failed to resend OTP.";
          setServerError(msg);
          showMessage("error", msg);
        }
      })
      .catch((err) => {
        setResending(false);
        const msg = err?.response?.data?.msg || err?.message || "Failed to resend OTP.";
        setServerError(msg);
        showMessage("error", msg);
      });
  };

  // Step 2: Validate OTP and Set New Password
  const handleResetPassword = (e) => {
    if (e) e.preventDefault();

    if (!otp.trim()) {
      const msg = "Please enter the 6-digit OTP code sent to your email.";
      setServerError(msg);
      showMessage("error", msg);
      return;
    }

    if (otp.trim().length !== 6) {
      const msg = "Please enter a valid 6-digit OTP code.";
      setServerError(msg);
      showMessage("error", msg);
      return;
    }

    if (!password) {
      const msg = "Please enter your new password.";
      setServerError(msg);
      showMessage("error", msg);
      return;
    }

    if (!passwordValidation(password)) {
      const msg = "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.";
      setServerError(msg);
      showMessage("error", msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = "New Password and Confirm Password do not match.";
      setServerError(msg);
      showMessage("error", msg);
      return;
    }

    setLoading(true);
    setServerError("");

    axiosNormalPost(resetPasswordURL, {
      email: email.trim(),
      otp: otp.trim(),
      password: password,
      confirmPassword: confirmPassword
    })
      .then((res) => {
        setLoading(false);
        if (res?.status) {
          showMessage("success", "Your password has been reset successfully!");
          setStep(3);
        } else {
          const msg = res?.msg || "Failed to reset password. Please check your OTP.";
          setServerError(msg);
          showMessage("error", msg);
        }
      })
      .catch((err) => {
        setLoading(false);
        const msg = err?.response?.data?.msg || err?.message || "Something went wrong, please try again.";
        setServerError(msg);
        showMessage("error", msg);
      });
  };

  return (
    <div className="page-body">
      <div className="otp-card" style={{ maxWidth: "440px" }}>
        
        {/* Top Brand Banner */}
        <div className="otp-card-stripe">
          <Link href="/">
            <img src="/assets/img/logo_DS.png" style={{ width: "100%" }} alt="Delta Safari Logo" />
          </Link>
        </div>

        <div className="otp-card-body pb-3" id="cardBody">
          
          {/* Step Indicator / Header */}
          <div className="step-label flex-column text-center mb-3">
            <h5 className="fw-bold mb-1" style={{ color: "var(--text-1)", fontSize: "18px" }}>
              {step === 1 && "Forgot Password"}
              {step === 2 && "Enter OTP & Reset Password"}
              {step === 3 && "Password Reset Complete"}
            </h5>
            <small className="text-muted" style={{ fontSize: "13px" }}>
              {step === 1 && "Enter your email to receive a password reset OTP"}
              {step === 2 && `OTP verification code sent to ${email}`}
              {step === 3 && "You can now log in with your new password"}
            </small>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="alert alert-danger d-flex align-items-center gap-2 p-2.5 rounded-3 mb-3 text-xs border border-danger-subtle shadow-xs">
              <i className="bi bi-exclamation-triangle-fill text-danger fs-6 flex-shrink-0"></i>
              <div className="fw-semibold text-danger-emphasis" style={{ fontSize: "12.5px" }}>{serverError}</div>
            </div>
          )}

          {/* Success Banner on Step 2 */}
          {successMsg && step === 2 && (
            <div className="alert alert-success d-flex align-items-center gap-2 p-2.5 rounded-3 mb-3 text-xs border border-success-subtle shadow-xs">
              <i className="bi bi-check-circle-fill text-success fs-6 flex-shrink-0"></i>
              <div className="fw-semibold text-success-emphasis" style={{ fontSize: "12.5px" }}>{successMsg}</div>
            </div>
          )}

          {/* STEP 1: Enter Registered Email */}
          {step === 1 && (
            <div>
              <div className="input-group mb-3 col-12">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (serverError) setServerError("");
                  }}
                  className="form-control"
                  placeholder="Registered Email Address"
                  autoFocus
                />
              </div>

              <button
                onClick={handleRequestOtp}
                disabled={loading}
                className="db-btn-primary mb-2 d-flex align-items-center justify-content-center gap-2"
                id="sendOtpBtn"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    <span>Sending OTP to Email...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-envelope-fill me-1"></i>
                    <span>Send Password Reset OTP</span>
                  </>
                )}
              </button>

              <div className="text-center mt-3 mb-2">
                <Link
                  href="/login"
                  style={{ cursor: "pointer", color: "#ef6614", fontWeight: "600", fontSize: "13px", textDecoration: "none" }}
                  className="d-inline-flex align-items-center gap-1"
                >
                  <i className="fa-solid fa-arrow-left me-1"></i> Back to Sign In
                </Link>
              </div>
            </div>
          )}

          {/* STEP 2: Enter OTP & Set New Password */}
          {step === 2 && (
            <div>
              {/* OTP Field with Email edit & Resend */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="text-muted small fw-bold" style={{ fontSize: "12px" }}>
                    6-DIGIT OTP CODE
                  </label>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => setStep(1)}
                    style={{ color: "#ef6614", fontSize: "12px", fontWeight: "600" }}
                  >
                    Change Email
                  </button>
                </div>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    if (serverError) setServerError("");
                  }}
                  className="form-control text-center fw-bold"
                  placeholder="• • • • • •"
                  style={{ letterSpacing: "6px", fontSize: "20px" }}
                  autoFocus
                />
                
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Didn't receive the email OTP?
                  </span>
                  {timer > 0 ? (
                    <span className="badge bg-light text-muted border py-1 px-2" style={{ fontSize: "11px" }}>
                      Resend in {timer}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={handleResendOtp}
                      disabled={resending}
                      style={{ color: "#ef6614", fontSize: "12px", fontWeight: "700" }}
                    >
                      {resending ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                </div>
              </div>

              {/* New Password */}
              <div className="col-md-12 mb-3 position-relative">
                <label className="text-muted small fw-bold mb-1" style={{ fontSize: "12px" }}>
                  NEW PASSWORD
                </label>
                <input
                  type={viewPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (serverError) setServerError("");
                  }}
                  className="form-control"
                  placeholder="Minimum 8 characters (Uppercase, Lowercase, Number)"
                />
                <div className="position-absolute" style={{ top: "34px", right: "20px", cursor: "pointer" }}>
                  <i
                    className={`fa-solid ${!viewPass ? "fa-eye-slash" : "fa-eye"}`}
                    onClick={() => setViewPass(!viewPass)}
                  ></i>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="col-md-12 mb-4 position-relative">
                <label className="text-muted small fw-bold mb-1" style={{ fontSize: "12px" }}>
                  CONFIRM NEW PASSWORD
                </label>
                <input
                  type={viewConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (serverError) setServerError("");
                  }}
                  className="form-control"
                  placeholder="Re-enter your new password"
                />
                <div className="position-absolute" style={{ top: "34px", right: "20px", cursor: "pointer" }}>
                  <i
                    className={`fa-solid ${!viewConfirmPass ? "fa-eye-slash" : "fa-eye"}`}
                    onClick={() => setViewConfirmPass(!viewConfirmPass)}
                  ></i>
                </div>
              </div>

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="db-btn-primary mb-2 d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-shield-check-fill me-1"></i>
                    <span>Reset &amp; Save Password</span>
                  </>
                )}
              </button>

              <div className="text-center mt-3 mb-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-link p-0 text-muted text-decoration-none"
                  style={{ fontSize: "13px", fontWeight: "600" }}
                >
                  <i className="fa-solid fa-arrow-left me-1"></i> Back to Email Step
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Success State */}
          {step === 3 && (
            <div className="text-center py-3">
              <div className="mb-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: 64, height: 64, backgroundColor: "#dcfce7", color: "#16a34a" }}
                >
                  <i className="bi bi-check-lg fs-1"></i>
                </div>
              </div>

              <h5 className="fw-bold text-dark mb-2" style={{ fontSize: "18px" }}>Password Reset Successful!</h5>
              <p className="text-muted small mb-4" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                Your account password has been updated securely. You can now sign in with your new password.
              </p>

              <button
                onClick={() => router.push("/login")}
                className="db-btn-primary mb-2 d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                <span>Proceed to Sign In</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="otp-footer mt-2 text-center text-muted text-3xs">
          Need help? Contact our support at
          <a href="mailto:support@deltasafari.com" className="text-decoration-none ms-1 text-primary">support@deltasafari.com</a>
        </div>

      </div>
    </div>
  );
}

export default function ForgetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgetPasswordContent />
    </Suspense>
  );
}
