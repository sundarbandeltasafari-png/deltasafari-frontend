"use client";
import React, { useState, Suspense } from "react";
import { emailValidation, passwordValidation, showMessage } from "../../../libs/commonHelper";
import { useRouter, useParams } from "next/navigation";
import "../auth.css";
import { axiosNormalPost } from "@/libs/axiosHelper";
import { loginURL, registerURL } from "@/routes/authRoutes";

function page() {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Register
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    password: ''
  });
  
  const [error, setError] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    password: ''
  });
  
  const [viewPass, setViewPass] = useState(false);
  const route = useRouter();
  const searchParams = useParams();

  // Reset errors when switching modes
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError({ first_name: '', last_name: '', gender: '', email: '', password: '' });
  };

  function submitForm() {
    let currentErrors = { first_name: '', last_name: '', gender: '', email: '', password: '' };
    let hasError = false;

    if (!isLoginMode) {
      if (!userData.first_name) {
        showMessage("error", "Please enter a valid first name!");
        currentErrors.first_name = "Please enter a valid first name!";
        hasError = true;
      }
      else if (!userData.last_name) {
        showMessage("error", "Please enter a valid last name!");
        currentErrors.last_name = "Please enter a valid last name!";
        hasError = true;
      }
      else if (!userData.gender) {
        showMessage("error", "Please enter a valid gender!");
        currentErrors.gender = "Please choose a valid gender!";
        hasError = true;
      }
    }
    
    if (!hasError && !emailValidation(userData.email)) {
      showMessage("error", "Please enter a valid email!");
      currentErrors.email = "Please enter a valid email!";
      hasError = true;
    }
    else if (!hasError && !passwordValidation(userData.password)) {
      showMessage("error", "Please enter a valid password!");
      currentErrors.password = "At least 8 characters, 1 uppercase, 1 lowercase, 1 number";
      hasError = true;
    }

    if (hasError) {
      setError(currentErrors);
      return;
    }

    // API Payload configuration based on mode
    const payload = isLoginMode 
      ? { email: userData.email, password: userData.password }
      : userData;

    // Send data to endpoint (Adjust axios endpoint helper or method if needed for your backend)
    axiosNormalPost(isLoginMode ? loginURL : registerURL, payload).then((res) => {
      if (res.status) {
        route.push(`/otpvalidation?token=${res.token}`);
      } else {
        showMessage('error', res.msg);
      }
    }).catch((err) => {
      showMessage('error', 'Something went wrong, please try again later.');
    });
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="page-body">
          <div className="otp-card">

            <div className="otp-card-stripe">
              <img src="/assets/img/logo_DS.png" style={{ width: "100%" }} alt="Logo" />
            </div>

            <div className="otp-card-body pb-0" id="cardBody">

              <div className="otp-steps-dots" id="stepDots">
                <div className="dot active" id="dot1"></div>
                <div className="dot" id="dot2"></div>
              </div>

              <div className="step active" id="step1">
                <div className="step-label">
                  <span>1</span> {isLoginMode ? "Login to Your Account" : "Enter Your Valid Details"}
                </div>
                
                <div className="row">
                  {/* Registration Fields (Hidden in Login Mode) */}
                  {!isLoginMode && (
                    <>
                      <div className="col-md-6 pe-0">
                        <div className="mb-3">
                          <input 
                            type="text" 
                            value={userData.first_name}
                            onChange={(e) => { setUserData({ ...userData, first_name: e.target.value }) }} 
                            className="form-control" 
                            placeholder="First Name" 
                          />
                          {error.first_name && <div className="db-error mt-2 col-12"><i className="bi bi-exclamation-circle-fill"></i> {error.first_name}</div>}
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="mb-3">
                          <input 
                            type="text" 
                            value={userData.last_name}
                            onChange={(e) => { setUserData({ ...userData, last_name: e.target.value }) }} 
                            className="form-control" 
                            placeholder="Last Name" 
                          />
                          {error.last_name && <div className="db-error mt-2 col-12"><i className="bi bi-exclamation-circle-fill"></i> {error.last_name}</div>}
                        </div>
                      </div>

                      <div className="input-group mb-3 col-12">
                        <select 
                          className="form-select" 
                          value={userData.gender}
                          onChange={(e) => { setUserData({ ...userData, gender: e.target.value }) }}
                        >
                          <option value="">Gender</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Others</option>
                        </select>
                        {error.gender && <div className="db-error mt-2 col-12"><i className="bi bi-exclamation-circle-fill"></i> {error.gender}</div>}
                      </div>
                    </>
                  )}

                  {/* Shared Fields (Email & Password) */}
                  <div className="input-group mb-3 col-12">
                    <input 
                      type="email" 
                      value={userData.email}
                      onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} 
                      className="form-control" 
                      placeholder="Email" 
                    />
                    {error.email && <div className="db-error mt-2 col-12"><i className="bi bi-exclamation-circle-fill"></i> {error.email}</div>}
                  </div>

                  <div className="col-md-12 mb-4 position-relative">
                    <input 
                      type={viewPass ? "text" : "password"} 
                      value={userData.password}
                      onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
                      className="form-control" 
                      placeholder="Password" 
                    />
                    <div className="position-absolute" style={{ top: "10px", right: "30px", cursor: "pointer" }}>
                      <i className={`fa-solid ${!viewPass ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setViewPass(!viewPass)}></i>
                    </div>
                    {error.password && <div className="db-error mt-2 col-12"><i className="bi bi-exclamation-circle-fill"></i> {error.password}</div>}
                  </div>
                </div>

                <button onClick={submitForm} className="db-btn-primary" id="sendOtpBtn">
                  <i className="bi bi-send-fill"></i> {isLoginMode ? "Login" : "Send OTP"}
                </button>

                <div className="db-divider">or</div>

                {/* Toggle Link */}
                <div className="text-center mt-2 mb-3">
                  <span style={{ cursor: "pointer", color: "#4285F4", fontWeight: "500" }} onClick={toggleMode}>
                    {isLoginMode ? "Don't have an account? Register here" : "Already have an account? Login here"}
                  </span>
                </div>

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

            <div className="otp-footer mt-4">
              By continuing, you agree to our
              <a href="#"> Terms of Service </a> &amp;
              <a href="#"> Privacy Policy</a>
            </div>

          </div>
        </div>
      </Suspense>
    </>
  );
}

export default page;