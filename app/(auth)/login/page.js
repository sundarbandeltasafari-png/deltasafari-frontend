"use client";
import React, { useState } from "react";
import { phoneValidation, showMessage } from "../../../libs/commonHelper";
import { useRouter, useParams } from "next/navigation";
import "../auth.css";
import { Suspense } from "react";
import ReactFlagsSelect from "react-flags-select";

function login() {
  const [selected, setSelected] = useState("IN");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [error, setError] = useState(null);
  const route = useRouter();
  const searchParams = useParams();

  function submitLogin() {
    if (!phoneValidation(phoneNumber)) {
      showMessage("error", "Please enter a valid phone number!");
      setError("Please enter a valid phone number!");
      return;
    }
    route.push(`/otpvalidation?phone=${phoneNumber}`);
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="page-body">
          <div className="otp-card">

            <div className="otp-card-stripe">
              <img src="/assets/img/logo_DS.png" style={{ width: "100%" }} />
            </div>

            <div className="otp-card-body pb-0" id="cardBody">

              <div className="otp-steps-dots" id="stepDots">
                <div className="dot active" id="dot1"></div>
                <div className="dot" id="dot2"></div>
              </div>

              <div className="step active" id="step1">
                <div className="step-label"><span>1</span> Enter Mobile Number</div>

                <div className="input-group mb-4">
                  <span className="input-group-text p-0" id="inputGroup-sizing-default">
                    <ReactFlagsSelect
                      selected={selected}
                      onSelect={(code) => setSelected(code)}
                      searchable
                    />
                  </span>
                  <input type="number" pattern="[0-9]*" onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} onChange={(event) => { setPhoneNumber(event.target.value) }} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter Mobile Number" />
                </div>
                {error && <div className="db-error" id="phoneError">
                  <i className="bi bi-exclamation-circle-fill"></i>
                  <span id="phoneErrorMsg">{error}</span>
                </div>}

                <button onClick={submitLogin} className="db-btn-primary" id="sendOtpBtn">
                  <i className="bi bi-send-fill"></i> Send OTP
                </button>

                <div className="db-divider">or continue with</div>

                <button className="db-social-btn" id="googleBtn">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
              </div>

            </div>

            <div className="otp-footer mt-0">
              By continuing, you agree to our
              <a href="#"> Terms of Service </a> &amp;
              <a href="#"> Privacy Policy</a>
            </div>

          </div>
        </div>
      </Suspense>
    </>
  )
}

export default login