"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { createContactQueryUrl, contactQueryUrl } from "@/routes/serviceRoutes";
import { axiosNormalPost } from "@/libs/axiosHelper";

const SUBJECT_PRESETS = [
  "Safari Inquiry",
  "Custom Tour Package",
  "Hotel & Resort Booking",
  "Cab & Transport",
  "General Inquiry",
];

const INITIAL_FORM = {
  full_name: "",
  email: "",
  phone_number: "",
  subject: "Safari Inquiry",
  message: "",
  status: "new",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) setApiError("");
  };

  const handlePresetSelect = (preset) => {
    setFormData((prev) => ({ ...prev, subject: preset }));
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // full_name validation (Required, max 100)
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    } else if (formData.full_name.trim().length > 100) {
      newErrors.full_name = "Full name cannot exceed 100 characters";
    }

    // email validation (Required, max 255)
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (formData.email.trim().length > 255) {
      newErrors.email = "Email cannot exceed 255 characters";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // phone_number validation (Optional, max 20)
    if (formData.phone_number && formData.phone_number.trim().length > 20) {
      newErrors.phone_number = "Phone number cannot exceed 20 characters";
    } else if (
      formData.phone_number &&
      !/^[0-9+\-\s()]{7,20}$/.test(formData.phone_number.trim())
    ) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    // subject validation (Optional, max 150)
    if (formData.subject && formData.subject.length > 150) {
      newErrors.subject = "Subject cannot exceed 150 characters";
    }

    // message validation (Required)
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) {
      toast.error("Please fix the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim() || undefined,
      subject: formData.subject.trim() || "Safari Inquiry",
      message: formData.message.trim(),
      status: "new",
    };

    try {
      // Primary Endpoint: service/createContactQuery
      let res = await axiosNormalPost(createContactQueryUrl, payload);

      // Fallback if primary fails or returns Error
      if (!res || res instanceof Error) {
        console.warn("Primary endpoint failed, attempting fallback to /contact-query");
        res = await axiosNormalPost(contactQueryUrl, payload);
      }

      if (res && !(res instanceof Error)) {
        setIsSuccess(true);
        toast.success("Thank you! Your message has been sent successfully.");
        setFormData(INITIAL_FORM);
      } else {
        const errorMsg =
          res?.message || res?.data?.message || "Failed to submit query. Please try again.";
        setApiError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Submit contact query error:", err);
      const msg = err.response?.data?.message || "Failed to connect to backend server. Please try again.";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData(INITIAL_FORM);
    setErrors({});
    setApiError("");
  };

  return (
    <div className="contact-form-wrapper" id="contact-form-section">
      <div className="contact-form-card">
        <div className="contact-form-header mb-3">
          <span className="badge-pill mb-2">
            <i className="bi bi-envelope-paper-heart me-2" />
            Send Us a Message
          </span>
          <h2 className="form-title">Have Questions? Get in Touch!</h2>
          <p className="form-subtitle">
            Fill out the form below and our team at Sundarban Delta Safari will reach back to you shortly.
          </p>
        </div>

        {isSuccess ? (
          <div className="contact-success-box text-center py-4">
            <div className="success-icon-wrap mb-3">
              <i className="bi bi-check-circle-fill text-success" />
            </div>
            <h3 className="fw-bold mb-2">Query Received!</h3>
            <p className="text-muted max-w-md mx-auto mb-4">
              Thank you for reaching out. We have received your inquiry and our safari experts will get back to you within 24 hours.
            </p>
            <button
              type="button"
              className="btn btn-theme-primary px-4 py-2"
              onClick={handleReset}
            >
              <i className="bi bi-plus-circle me-2" />
              Send Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="contact-form">
            {apiError && (
              <div className="alert alert-danger d-flex align-items-center mb-3 py-2 px-3" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2 fs-6" />
                <div className="small">{apiError}</div>
              </div>
            )}

            <div className="row g-2 g-md-3">
              {/* Full Name */}
              <div className="col-md-6 form-group-compact">
                <label htmlFor="full_name" className="form-label font-medium mb-1">
                  Full Name <span className="text-danger">*</span>
                </label>
                <div className="input-group-custom">
                  <span className="input-icon">
                    <i className="bi bi-person" />
                  </span>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className={`form-control ps-5 custom-input ${errors.full_name ? "is-invalid" : ""}`}
                    placeholder="e.g. John Doe"
                    value={formData.full_name}
                    onChange={handleChange}
                    maxLength={100}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  {errors.full_name ? (
                    <span className="text-danger small">{errors.full_name}</span>
                  ) : (
                    <span />
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div className="col-md-6 form-group-compact">
                <label htmlFor="email" className="form-label font-medium mb-1">
                  Email Address <span className="text-danger">*</span>
                </label>
                <div className="input-group-custom">
                  <span className="input-icon">
                    <i className="bi bi-envelope" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ps-5 custom-input ${errors.email ? "is-invalid" : ""}`}
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={255}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  {errors.email ? (
                    <span className="text-danger small">{errors.email}</span>
                  ) : (
                    <span />
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-md-6 form-group-compact">
                <label htmlFor="phone_number" className="form-label font-medium mb-1">
                  Phone Number <small className="text-muted">(Optional)</small>
                </label>
                <div className="input-group-custom">
                  <span className="input-icon">
                    <i className="bi bi-telephone" />
                  </span>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    className={`form-control ps-5 custom-input ${errors.phone_number ? "is-invalid" : ""}`}
                    placeholder="e.g. +91 9876543210"
                    value={formData.phone_number}
                    onChange={handleChange}
                    maxLength={20}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  {errors.phone_number ? (
                    <span className="text-danger small">{errors.phone_number}</span>
                  ) : (
                    <span />
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="col-md-6 form-group-compact">
                <label htmlFor="subject" className="form-label font-medium mb-1">
                  Subject / Topic <small className="text-muted">(Optional)</small>
                </label>
                <div className="input-group-custom">
                  <span className="input-icon">
                    <i className="bi bi-tag" />
                  </span>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`form-control ps-5 custom-input ${errors.subject ? "is-invalid" : ""}`}
                    placeholder="e.g. Safari Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={150}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  {errors.subject ? (
                    <span className="text-danger small">{errors.subject}</span>
                  ) : (
                    <span />
                  )}
                </div>
              </div>

              {/* Subject Quick Presets */}
              <div className="col-12 mt-1">
                <div className="preset-container">
                  <span className="preset-label me-2 small text-muted">Quick topics:</span>
                  <div className="preset-pills">
                    {SUBJECT_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={`preset-pill ${formData.subject === preset ? "active" : ""}`}
                        onClick={() => handlePresetSelect(preset)}
                        disabled={isSubmitting}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="col-12 mt-2">
                <label htmlFor="message" className="form-label font-medium mb-1">
                  Your Message <span className="text-danger">*</span>
                </label>
                <div className="input-group-custom textarea-wrap">
                  <span className="input-icon textarea-icon">
                    <i className="bi bi-chat-left-text" />
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`form-control ps-5 custom-input custom-textarea ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    placeholder="Tell us about your trip plans, dates, group size, or any questions..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.message && (
                  <span className="text-danger small mt-1 d-block">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-12 mt-4 text-end">
                <button
                  type="submit"
                  className="btn btn-theme-primary submit-btn px-5 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Sending Query...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill me-2" />
                      Send Contact Query
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
