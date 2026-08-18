"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { emailValidation, passwordValidation, showMessage } from "../../../libs/commonHelper";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/services/reducers/userAuthSlice";
import "../auth.css";
import { axiosNormalPost } from "@/libs/axiosHelper";
import { loginURL, registerURL, googleLoginURL } from "@/routes/authRoutes";

// Helper function to decode Google OAuth JWT Token
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.userAuth || {});

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userType, setUserType] = useState(1); // 1 = Customer, 2 = Corporate, 3 = Agent
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
    const typeParam = searchParams.get('type');
    if (typeParam && [1, 2, 3].includes(Number(typeParam))) {
      setUserType(Number(typeParam));
    }

    // Check for referral code in URL query (?ref=DS12345 or ?referral_code=DS12345)
    const refParam = searchParams.get('ref') || searchParams.get('referral_code');
    if (refParam) {
      const code = refParam.trim().toUpperCase();
      try {
        localStorage.setItem('pending_referral_code', code);
      } catch (e) {}
      setIsLoginMode(false); // Auto switch to Register mode when opening via referral link
      setUserData((prev) => ({ ...prev, referral_code: code }));
    } else {
      try {
        const savedRef = localStorage.getItem('pending_referral_code');
        if (savedRef) {
          setUserData((prev) => ({ ...prev, referral_code: savedRef }));
        }
      } catch (e) {}
    }
  }, [searchParams, router, isLoggedIn]);

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    password: '',
    referral_code: ''
  });
  
  const [error, setError] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    password: ''
  });
  
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewPass, setViewPass] = useState(false);

  // Initialize Google Identity Services SDK
  useEffect(() => {
    const scriptId = 'google-gsi-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initGoogleOAuth();
      };
      document.body.appendChild(script);
    } else {
      initGoogleOAuth();
    }
  }, [userType]);

  const initGoogleOAuth = () => {
    if (window.google?.accounts?.id) {
      const clientId = (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1060481688994-l2hqidq1gdnm0b571jmffbsk611jgco1.apps.googleusercontent.com').trim();
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleOAuthResponse,
        auto_select: false
      });

      const googleBtnDiv = document.getElementById('googleOAuthBtnContainer');
      if (googleBtnDiv) {
        googleBtnDiv.innerHTML = '';
        window.google.accounts.id.renderButton(googleBtnDiv, {
          theme: 'outline',
          size: 'large',
          width: 360,
          text: 'continue_with',
          logo_alignment: 'center'
        });
      }
    }
  };

  const handleGoogleOAuthResponse = (response) => {
    if (response && response.credential) {
      const payload = parseJwt(response.credential);
      sendGoogleAuthToBackend({
        token: response.credential,
        email: payload?.email || '',
        first_name: payload?.given_name || payload?.name?.split(' ')[0] || '',
        last_name: payload?.family_name || payload?.name?.split(' ').slice(1).join(' ') || '',
        google_id: payload?.sub || '',
        picture: payload?.picture || ''
      });
      return;
    }
    const errMsg = 'Google OAuth failed to retrieve account credentials.';
    setServerError(errMsg);
    showMessage('error', errMsg);
  };

  const sendGoogleAuthToBackend = (authData) => {
    setLoadingGoogle(true);
    setServerError('');
    const googlePayload = {
      ...authData,
      type: userType // 1 = Customer, 2 = Corporate, 3 = Agent
    };

    axiosNormalPost(googleLoginURL, googlePayload)
      .then((res) => {
        setLoadingGoogle(false);
        if (res?.status) {
          if (res.token) {
            dispatch(setUser({ user: res.userDetails, token: res.token }));
          }
          const roleLabel = userType === 1 ? 'Customer' : userType === 2 ? 'Corporate' : 'Agent';
          showMessage('success', `Signed in successfully via Google OAuth as ${roleLabel}!`);
          router.push('/');
        } else {
          const errMsg = res?.msg || res?.message || 'Google OAuth Login failed. Please try again.';
          setServerError(errMsg);
          showMessage('error', errMsg);
        }
      })
      .catch((err) => {
        setLoadingGoogle(false);
        const errMsg = err?.response?.data?.msg || err?.message || 'Google OAuth server connection error.';
        setServerError(errMsg);
        showMessage('error', errMsg);
      });
  };

  // Trigger Google OAuth One-Tap Prompt
  const handleGoogleAuthClick = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          showMessage('info', 'Please click the "Continue with Google" button below to sign in.');
        }
      });
    } else {
      showMessage('error', 'Google Sign-In SDK is loading. Please click the Google button below.');
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setServerError('');
    setError({ first_name: '', last_name: '', gender: '', email: '', password: '' });
  };

  function submitForm() {
    let currentErrors = { first_name: '', last_name: '', gender: '', email: '', password: '' };
    let hasError = false;
    setServerError('');

    if (!isLoginMode) {
      if (!userData.first_name?.trim()) {
        currentErrors.first_name = "Please enter your first name";
        hasError = true;
      }
      else if (!userData.last_name?.trim()) {
        currentErrors.last_name = "Please enter your last name";
        hasError = true;
      }
      else if (!userData.gender) {
        currentErrors.gender = "Please choose a gender";
        hasError = true;
      }
    }
    
    if (!hasError && !emailValidation(userData.email)) {
      currentErrors.email = "Please enter a valid email address";
      hasError = true;
    }
    else if (!hasError && !passwordValidation(userData.password)) {
      currentErrors.password = "At least 8 characters, 1 uppercase, 1 lowercase, 1 number";
      hasError = true;
    }

    if (hasError) {
      setError(currentErrors);
      const firstErrMsg = Object.values(currentErrors).find(msg => msg !== '');
      if (firstErrMsg) {
        setServerError(firstErrMsg);
        showMessage("error", firstErrMsg);
      }
      return;
    }

    setLoading(true);
    const payload = isLoginMode 
      ? { email: userData.email.trim(), password: userData.password, user_type: userType }
      : { ...userData, email: userData.email.trim(), user_type: userType };

    axiosNormalPost(isLoginMode ? loginURL : registerURL, payload).then((res) => {
      setLoading(false);
      if (res?.status) {
        if (res.token) {
          dispatch(setUser({ user: res.userDetails, token: res.token }));
        }
        showMessage('success', isLoginMode ? 'Signed in successfully!' : (res.msg || 'OTP sent successfully!'));
        router.push(isLoginMode ? '/' : `/otpvalidation?token=${res.token}`);
      } else {
        const errorMsg = res?.msg || res?.message || (isLoginMode ? 'Invalid email or password. Please check your credentials.' : 'Registration failed.');
        setServerError(errorMsg);
        showMessage('error', errorMsg);
      }
    }).catch((err) => {
      setLoading(false);
      const errorMsg = err?.response?.data?.msg || err?.message || 'Something went wrong, please try again later.';
      setServerError(errorMsg);
      showMessage('error', errorMsg);
    });
  }

  const roleLabels = { 1: "Customer", 2: "Corporate", 3: "Agent" };

  return (
    <div className="page-body">
      <div className="otp-card" style={{ maxWidth: '440px' }}>

        <div className="otp-card-stripe">
          <img src="/assets/img/logo_DS.png" style={{ width: "100%" }} alt="Logo" />
        </div>

        <div className="otp-card-body pb-0" id="cardBody">

          {/* Account Role Selector Tabs */}
          <div className="mb-3">
            <label className="text-2xs text-muted fw-bold mb-1.5 d-block text-center text-uppercase">
              Select Account Type
            </label>
            <div className="btn-group w-100 p-1 bg-light rounded-3 border" role="group">
              <button
                type="button"
                className={`btn text-xs fw-bold rounded-2 py-2 transition-all ${userType === 1 ? 'bg-white shadow-xs text-primary' : 'text-secondary border-0'}`}
                onClick={() => setUserType(1)}
              >
                <i className="fa-solid fa-user me-1"></i> Customer
              </button>
              <button
                type="button"
                className={`btn text-xs fw-bold rounded-2 py-2 transition-all ${userType === 2 ? 'bg-white shadow-xs text-primary' : 'text-secondary border-0'}`}
                onClick={() => setUserType(2)}
              >
                <i className="fa-solid fa-briefcase me-1"></i> Corporate
              </button>
              <button
                type="button"
                className={`btn text-xs fw-bold rounded-2 py-2 transition-all ${userType === 3 ? 'bg-white shadow-xs text-primary' : 'text-secondary border-0'}`}
                onClick={() => setUserType(3)}
              >
                <i className="fa-solid fa-user-shield me-1"></i> Agent
              </button>
            </div>
          </div>

          <div className="step active" id="step1">
            <div className="step-label text-center mb-3">
              <span>{userType}</span> {isLoginMode ? `${roleLabels[userType]} Login` : `Register New ${roleLabels[userType]} Account`}
            </div>

            {/* Server Error Alert Banner */}
            {serverError && (
              <div className="alert alert-danger d-flex align-items-center gap-2 p-2.5 rounded-3 mb-3 text-xs border border-danger-subtle shadow-xs">
                <i className="bi bi-exclamation-triangle-fill text-danger fs-6 flex-shrink-0"></i>
                <div className="fw-semibold text-danger-emphasis">{serverError}</div>
              </div>
            )}
            
            <div className="row">
              {!isLoginMode && (
                <>
                  <div className="col-md-6 pe-0">
                    <div className="mb-3">
                      <input 
                        type="text" 
                        value={userData.first_name}
                        onChange={(e) => { 
                          setUserData({ ...userData, first_name: e.target.value });
                          if (serverError) setServerError('');
                        }} 
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
                        onChange={(e) => { 
                          setUserData({ ...userData, last_name: e.target.value });
                          if (serverError) setServerError('');
                        }} 
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
                      onChange={(e) => { 
                        setUserData({ ...userData, gender: e.target.value });
                        if (serverError) setServerError('');
                      }}
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

              <div className="input-group mb-3 col-12">
                <input 
                  type="email" 
                  value={userData.email}
                  onChange={(e) => { 
                    setUserData({ ...userData, email: e.target.value });
                    if (serverError) setServerError('');
                  }} 
                  className="form-control" 
                  placeholder="Email Address" 
                />
                {error.email && <div className="db-error mt-2 col-12"><i className="bi bi-exclamation-circle-fill"></i> {error.email}</div>}
              </div>

              <div className="col-md-12 mb-3 position-relative">
                <input 
                  type={viewPass ? "text" : "password"} 
                  value={userData.password}
                  onChange={(e) => { 
                    setUserData({ ...userData, password: e.target.value });
                    if (serverError) setServerError('');
                  }} 
                  className="form-control" 
                  placeholder="Password" 
                />
                <div className="position-absolute" style={{ top: "10px", right: "30px", cursor: "pointer" }}>
                  <i className={`fa-solid ${!viewPass ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setViewPass(!viewPass)}></i>
                </div>
                {error.password && <div className="db-error mt-2 col-12"><i className="bi bi-exclamation-circle-fill"></i> {error.password}</div>}
              </div>

              {isLoginMode && (
                <div className="col-12 text-end mb-3">
                  <Link 
                    href="/forget-password" 
                    style={{ color: "#ef6614", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}
            </div>

            <button 
              onClick={submitForm} 
              disabled={loading}
              className="db-btn-primary mb-2 d-flex align-items-center justify-content-center gap-2" 
              id="sendOtpBtn"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill me-1"></i>
                  <span>{isLoginMode ? `Login as ${roleLabels[userType]}` : "Send OTP"}</span>
                </>
              )}
            </button>

            <div className="text-center mt-2 mb-3">
              <span style={{ cursor: "pointer", color: "#ef6614", fontWeight: "600", fontSize: '13px' }} onClick={toggleMode}>
                {isLoginMode ? "Don't have an account? Register here" : "Already have an account? Login here"}
              </span>
            </div>

            <div className="db-divider">or continue with</div>

            {/* Official Google OAuth Button */}
            <div id="googleOAuthBtnContainer" className="d-flex justify-content-center w-100 mt-3 mb-2"></div>
          </div>

        </div>

        <div className="otp-footer mt-4 text-center text-muted text-3xs">
          By continuing, you agree to our
          <a href="#" className="text-decoration-none ms-1 me-1 text-primary"> Terms of Service </a> &amp;
          <a href="#" className="text-decoration-none ms-1 text-primary"> Privacy Policy</a>
        </div>

      </div>
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}