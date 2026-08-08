'use client';

import React, { useState } from 'react';

const BRAND_COLOR = "#2196f3";
const BRAND_LIGHT_BG = "#e3f2fd";
const BRAND_BORDER = "#90caf9";

const wrapInBaseTemplate = (title, preheader, bodyContent) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .top-bar {
            height: 5px;
            background-color: ${BRAND_COLOR};
        }
        .header {
            padding: 28px 32px 20px 32px;
            text-align: center;
            background-color: #ffffff;
            border-bottom: 1px solid #f1f5f9;
        }
        .header-logo {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
            text-decoration: none;
        }
        .header-logo span {
            color: ${BRAND_COLOR};
        }
        .body-content {
            padding: 32px;
        }
        .greeting {
            font-size: 20px;
            font-weight: 700;
            color: #0f172a;
            margin-top: 0;
            margin-bottom: 16px;
        }
        .paragraph {
            font-size: 15px;
            line-height: 1.6;
            color: #475569;
            margin-top: 0;
            margin-bottom: 20px;
        }
        .otp-container {
            background-color: ${BRAND_LIGHT_BG};
            border: 1px solid ${BRAND_BORDER};
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            margin: 28px 0;
        }
        .otp-label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: ${BRAND_COLOR};
            margin-bottom: 12px;
        }
        .otp-digits {
            display: inline-block;
            letter-spacing: 8px;
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            background-color: ${BRAND_COLOR};
            padding: 10px 24px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);
        }
        .detail-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 20px;
            margin: 24px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dashed #e2e8f0;
            font-size: 14px;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            color: #64748b;
            font-weight: 500;
        }
        .detail-value {
            color: #0f172a;
            font-weight: 700;
            text-align: right;
        }
        .badge {
            display: inline-block;
            background-color: ${BRAND_LIGHT_BG};
            color: ${BRAND_COLOR};
            border: 1px solid ${BRAND_BORDER};
            font-size: 12px;
            font-weight: 700;
            padding: 4px 12px;
            border-radius: 20px;
            text-transform: uppercase;
        }
        .footer {
            padding: 24px 32px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
        }
        .footer a {
            color: ${BRAND_COLOR};
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div style="padding: 30px 12px; background-color: #f8fafc;">
        <div class="email-container">
            <div class="top-bar"></div>
            <div class="header">
                <div class="header-logo">
                    Delta <span>Safari</span>
                </div>
            </div>
            <div class="body-content">
                ${bodyContent}
            </div>
            <div class="footer">
                <p style="margin: 0 0 8px 0;">Need assistance? Contact our travel desk at <a href="mailto:support@deltasafari.com">support@deltasafari.com</a></p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Delta Safari. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

const TEMPLATES = [
  {
    id: "register-otp",
    name: "Register OTP Email",
    category: "Authentication",
    subject: "Verify Your Registration - Delta Safari",
    getHtml: () =>
      wrapInBaseTemplate(
        "Register OTP - Delta Safari",
        "Verify your Delta Safari account",
        `
        <h2 class="greeting">Verify Your Registration</h2>
        <p class="paragraph">Hello <strong>Rahul Sharma</strong>,</p>
        <p class="paragraph">Welcome to <strong>Delta Safari</strong> — your premier travel partner for exclusive tours, custom packages, and wildlife safaris!</p>
        <p class="paragraph">Please enter the One-Time Password (OTP) below to complete your email verification and activate your account:</p>
        
        <div class="otp-container">
            <div class="otp-label">Your Verification Code</div>
            <div class="otp-digits">482915</div>
            <p style="font-size: 12px; color: #64748b; margin-top: 14px; margin-bottom: 0;">This OTP code is valid for 10 minutes. Do not share this code with anyone.</p>
        </div>

        <p class="paragraph">If you did not request this registration, please ignore this email.</p>
        `
      ),
  },
  {
    id: "forgot-otp",
    name: "Reset Password OTP",
    category: "Security",
    subject: "Reset Password Verification Code - Delta Safari",
    getHtml: () =>
      wrapInBaseTemplate(
        "Reset Password - Delta Safari",
        "Your password reset OTP code",
        `
        <h2 class="greeting">Reset Your Password</h2>
        <p class="paragraph">Hello <strong>Rahul Sharma</strong>,</p>
        <p class="paragraph">We received a request to reset your password for your <strong>Delta Safari</strong> account.</p>
        <p class="paragraph">Use the One-Time Password (OTP) below to verify your identity and set a new password:</p>
        
        <div class="otp-container">
            <div class="otp-label">Password Reset Code</div>
            <div class="otp-digits">913042</div>
            <p style="font-size: 12px; color: #64748b; margin-top: 14px; margin-bottom: 0;">This OTP is valid for 10 minutes. If you did not initiate a password reset, please secure your account immediately.</p>
        </div>

        <p class="paragraph">If you didn't request a password reset, you can safely ignore this email.</p>
        `
      ),
  },
  {
    id: "login-otp",
    name: "Login OTP Code",
    category: "Authentication",
    subject: "Your Login Verification Code - Delta Safari",
    getHtml: () =>
      wrapInBaseTemplate(
        "Login Verification - Delta Safari",
        "Your Delta Safari login code",
        `
        <h2 class="greeting">Secure Login Code</h2>
        <p class="paragraph">Hello <strong>Priya Patel</strong>,</p>
        <p class="paragraph">Use the One-Time Password (OTP) below to complete your login to <strong>Delta Safari</strong>:</p>
        
        <div class="otp-container">
            <div class="otp-label">Login Verification Code</div>
            <div class="otp-digits">756184</div>
            <p style="font-size: 12px; color: #64748b; margin-top: 14px; margin-bottom: 0;">This OTP code will expire shortly. Do not share it with anyone.</p>
        </div>
        `
      ),
  },
  {
    id: "booking-confirmation",
    name: "Booking Confirmation Email",
    category: "Bookings",
    subject: "Booking Confirmation #BK-984120 - Delta Safari",
    getHtml: () =>
      wrapInBaseTemplate(
        "Booking Confirmation #BK-984120 - Delta Safari",
        "Your Delta Safari booking confirmation",
        `
        <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge">Booking Confirmed</span>
        </div>
        <h2 class="greeting" style="text-align: center;">Booking Request Received!</h2>
        <p class="paragraph" style="text-align: center;">Thank you <strong>Amit Banerjee</strong>! We have successfully received your tour booking request with Delta Safari.</p>
        
        <div class="detail-card">
            <div class="detail-row">
                <span class="detail-label">Booking Reference:</span>
                <span class="detail-value" style="color: ${BRAND_COLOR};">#BK-984120</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Package Name:</span>
                <span class="detail-value">Sundarban Eco Wildlife Safari (3D/2N)</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Travel Date:</span>
                <span class="detail-value">15 Oct 2026</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Travelers:</span>
                <span class="detail-value">4 Adults, 1 Child</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Amount:</span>
                <span class="detail-value" style="color: ${BRAND_COLOR}; font-size: 16px;">₹24,500</span>
            </div>
        </div>

        <div style="background-color: ${BRAND_LIGHT_BG}; border: 1px solid ${BRAND_BORDER}; border-radius: 10px; padding: 16px; text-align: center; margin-bottom: 24px;">
            <p style="margin: 0; font-weight: 700; color: ${BRAND_COLOR}; font-size: 14px;">Our Travel Operations Desk Will Connect With You Soon</p>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #475569;">A travel expert will reach out to confirm your itinerary and dispatch your final travel voucher.</p>
        </div>
        `
      ),
  },
  {
    id: "custom-enquiry",
    name: "Custom Package Enquiry Email",
    category: "Enquiries",
    subject: "Custom Package Request Received - Delta Safari",
    getHtml: () =>
      wrapInBaseTemplate(
        "Custom Package Request - Delta Safari",
        "Your custom package request confirmation",
        `
        <div style="text-align: center; margin-bottom: 24px;">
            <span class="badge">Request Submitted</span>
        </div>
        <h2 class="greeting" style="text-align: center;">Custom Package Enquiry Received</h2>
        <p class="paragraph" style="text-align: center;">Thank you <strong>Delta Technologies Corp</strong>! We have received your customized tour / corporate offsite request for <strong>Gangtok & North Sikkim</strong>.</p>
        
        <div class="detail-card">
            <div class="detail-row">
                <span class="detail-label">Destination:</span>
                <span class="detail-value">Gangtok & North Sikkim</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Travel Date:</span>
                <span class="detail-value">01 Nov 2026</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Duration:</span>
                <span class="detail-value">5 Days / 4 Nights</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Group Size:</span>
                <span class="detail-value">25 Employees (15 M / 10 F)</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value" style="color: ${BRAND_COLOR};">Quote Under Review</span>
            </div>
        </div>

        <div style="background-color: ${BRAND_LIGHT_BG}; border: 1px solid ${BRAND_BORDER}; border-radius: 10px; padding: 16px; text-align: center; margin-bottom: 24px;">
            <p style="margin: 0; font-weight: 700; color: ${BRAND_COLOR}; font-size: 14px;">Our Dedicated Travel Desk Is Reviewing Your Request</p>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #475569;">Our travel specialists will reach out via phone or email shortly to share tailored itinerary options and custom pricing.</p>
        </div>
        `
      ),
  },
];

export default function EmailTemplatesPreviewPage() {
  const [activeTab, setActiveTab] = useState(TEMPLATES[0].id);
  const [viewMode, setViewMode] = useState("desktop"); // desktop | mobile

  const activeTemplate = TEMPLATES.find((t) => t.id === activeTab) || TEMPLATES[0];

  return (
    <div className="bg-slate-900 min-vh-100 py-4 px-3" style={{ backgroundColor: "#0f172a", color: "#f8fafc" }}>
      <div className="container-fluid max-w-7xl mx-auto">

        {/* Top Header Bar */}
        <div className="bg-slate-800 p-4 rounded-4 shadow-lg mb-4 border border-slate-700 d-flex flex-wrap justify-content-between align-items-center gap-3"
             style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge px-3 py-1 rounded-pill text-uppercase fw-bold"
                    style={{ backgroundColor: "#e3f2fd", color: "#2196f3", border: "1px solid #90caf9" }}>
                Mailjet Integration Preview
              </span>
              <span className="text-slate-400 text-xs" style={{ color: "#94a3b8" }}>Strict #2196f3 Color Scheme</span>
            </div>
            <h3 className="fw-bold text-white m-0" style={{ fontSize: "1.5rem" }}>
              Delta Safari Mailjet HTML Email Templates
            </h3>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="btn-group bg-slate-900 p-1 rounded-pill border border-slate-700" style={{ backgroundColor: "#0f172a", borderColor: "#334155" }}>
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 fw-bold text-xs ${viewMode === "desktop" ? "btn-primary" : "btn-link text-slate-300"}`}
                style={viewMode === "desktop" ? { backgroundColor: "#2196f3", borderColor: "#2196f3" } : { color: "#94a3b8", textDecoration: "none" }}
                onClick={() => setViewMode("desktop")}
              >
                <i className="fa-solid fa-desktop me-1"></i> Desktop (600px)
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 fw-bold text-xs ${viewMode === "mobile" ? "btn-primary" : "btn-link text-slate-300"}`}
                style={viewMode === "mobile" ? { backgroundColor: "#2196f3", borderColor: "#2196f3" } : { color: "#94a3b8", textDecoration: "none" }}
                onClick={() => setViewMode("mobile")}
              >
                <i className="fa-solid fa-mobile-screen me-1"></i> Mobile (380px)
              </button>
            </div>
          </div>
        </div>

        {/* Template Selector Tabs */}
        <div className="row g-4">
          <div className="col-lg-3">
            <div className="bg-slate-800 p-3 rounded-4 border border-slate-700 shadow-sm" style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}>
              <h6 className="text-uppercase text-xs fw-bold text-slate-400 mb-3 px-2" style={{ color: "#94a3b8" }}>
                Select Email Template
              </h6>
              <div className="nav flex-column nav-pills gap-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    className={`nav-link text-start p-3 rounded-3 transition-all border ${activeTab === tpl.id ? "active" : ""}`}
                    style={
                      activeTab === tpl.id
                        ? { backgroundColor: "#2196f3", color: "#ffffff", borderColor: "#2196f3", fontWeight: 700 }
                        : { backgroundColor: "#0f172a", color: "#cbd5e1", borderColor: "#334155" }
                    }
                    onClick={() => setActiveTab(tpl.id)}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold" style={{ fontSize: "14px" }}>{tpl.name}</span>
                      <span className={`badge ${activeTab === tpl.id ? "bg-white text-dark" : "bg-slate-700 text-slate-300"}`} style={{ fontSize: "10px" }}>
                        {tpl.category}
                      </span>
                    </div>
                    <div className="text-truncate text-xs opacity-75" style={{ fontSize: "12px" }}>
                      Subject: {tpl.subject}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Email Preview Frame */}
          <div className="col-lg-9">
            <div className="bg-slate-800 p-4 rounded-4 border border-slate-700 shadow-lg" style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}>
              
              {/* Email Envelope Meta Bar */}
              <div className="bg-slate-900 p-3 rounded-3 mb-4 border border-slate-700 text-xs font-monospace" style={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#cbd5e1" }}>
                <div className="d-flex gap-2 mb-1">
                  <span className="text-slate-500" style={{ color: "#64748b" }}>From:</span>
                  <span className="text-info fw-bold" style={{ color: "#60a5fa" }}>Delta Safari &lt;sundarban.deltasafari@gmail.com&gt;</span>
                </div>
                <div className="d-flex gap-2 mb-1">
                  <span className="text-slate-500" style={{ color: "#64748b" }}>Subject:</span>
                  <span className="text-white fw-bold">{activeTemplate.subject}</span>
                </div>
                <div className="d-flex gap-2">
                  <span className="text-slate-500" style={{ color: "#64748b" }}>Engine:</span>
                  <span className="text-success fw-bold" style={{ color: "#4ade80" }}>Mailjet API v3.1 (node-mailjet)</span>
                </div>
              </div>

              {/* Rendered Live HTML Email iframe */}
              <div className="d-flex justify-content-center bg-slate-950 p-4 rounded-4 border border-slate-800 overflow-auto"
                   style={{ backgroundColor: "#020617", minHeight: "580px" }}>
                <iframe
                  title="Mailjet Email Preview"
                  srcDoc={activeTemplate.getHtml()}
                  style={{
                    width: viewMode === "mobile" ? "380px" : "640px",
                    height: "620px",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                    transition: "width 0.3s ease"
                  }}
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
