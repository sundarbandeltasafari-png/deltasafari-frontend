"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { showMessage, passwordValidation } from '@/libs/commonHelper';
import { axiosPost } from '@/libs/axiosHelper';
import { changePasswordURL } from '@/routes/authRoutes';

export default function SettingsPage() {
    const { token } = useSelector((state) => state.userAuth || {});

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPass, setShowPass] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [submitting, setSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            showMessage('error', 'You must be logged in to change password.');
            return;
        }

        if (!passwords.currentPassword) {
            showMessage('error', 'Please enter your current password.');
            return;
        }

        if (!passwords.newPassword) {
            showMessage('error', 'Please enter a new password.');
            return;
        }

        if (passwords.newPassword.length < 6) {
            showMessage('error', 'New password must be at least 6 characters long.');
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            showMessage('error', 'New password and confirm password do not match.');
            return;
        }

        setSubmitting(true);

        try {
            const res = await axiosPost(changePasswordURL, {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
                confirmPassword: passwords.confirmPassword
            }, token);

            setSubmitting(false);

            if (res?.status) {
                showMessage('success', res.msg || 'Password updated successfully!');
                setPasswords({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                showMessage('error', res?.msg || 'Failed to update password.');
            }
        } catch (error) {
            setSubmitting(false);
            const msg = error?.response?.data?.msg || 'Something went wrong, please try again.';
            showMessage('error', msg);
        }
    };

    return (
        <div className="col-lg-8 col-xl-9">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="settings-panel" role="tabpanel">
                    
                    {/* Change Password Card */}
                    <div className="gofly-card shadow-sm border-0 rounded-4 p-4 mb-4">
                        <h3 className="gofly-card-title border-bottom pb-3 mb-4 fw-bold text-dark" style={{ fontSize: '20px' }}>
                            <i className="fa-solid fa-lock me-2 text-primary"></i> Account Security & Change Password
                        </h3>

                        <form onSubmit={handleFormSubmit}>
                            <div className="row g-3">
                                
                                {/* Current Password */}
                                <div className="col-md-12 position-relative mb-2">
                                    <label className="form-label fw-semibold text-dark">Current Password</label>
                                    <div className="position-relative">
                                        <input 
                                            type={showPass.current ? "text" : "password"} 
                                            className="form-control p-2.5 rounded-3 border" 
                                            placeholder="Enter current password"
                                            value={passwords.currentPassword}
                                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="btn border-0 position-absolute end-0 top-50 translate-middle-y me-2 text-muted"
                                            onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
                                        >
                                            <i className={`fa-solid ${showPass.current ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="col-md-6 position-relative">
                                    <label className="form-label fw-semibold text-dark">New Password</label>
                                    <div className="position-relative">
                                        <input 
                                            type={showPass.new ? "text" : "password"} 
                                            className="form-control p-2.5 rounded-3 border" 
                                            placeholder="At least 6 characters"
                                            value={passwords.newPassword}
                                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="btn border-0 position-absolute end-0 top-50 translate-middle-y me-2 text-muted"
                                            onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
                                        >
                                            <i className={`fa-solid ${showPass.new ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm New Password */}
                                <div className="col-md-6 position-relative">
                                    <label className="form-label fw-semibold text-dark">Confirm New Password</label>
                                    <div className="position-relative">
                                        <input 
                                            type={showPass.confirm ? "text" : "password"} 
                                            className="form-control p-2.5 rounded-3 border" 
                                            placeholder="Re-enter new password"
                                            value={passwords.confirmPassword}
                                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="btn border-0 position-absolute end-0 top-50 translate-middle-y me-2 text-muted"
                                            onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })}
                                        >
                                            <i className={`fa-solid ${showPass.confirm ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="col-12 pt-3">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary rounded-pill px-4 py-2.5 fw-bold d-flex align-items-center gap-2 shadow-sm"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Updating Password...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-shield-lock-fill"></i> Update Password
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Preferences & Security Switch Card */}
                    <div className="gofly-card shadow-sm border-0 rounded-4 p-4">
                        <h3 className="gofly-card-title border-bottom pb-3 mb-3 fw-bold text-dark" style={{ fontSize: '18px' }}>
                            <i className="fa-solid fa-sliders me-2 text-primary"></i> Account Preferences
                        </h3>
                        <div className="row g-3">
                            <div className="col-12 d-flex justify-content-between align-items-center py-2 border-bottom">
                                <div>
                                    <h6 className="fw-bold text-dark mb-1">Email Travel Alerts</h6>
                                    <p className="text-muted small m-0">Receive updates and special package offers.</p>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-between align-items-center py-2">
                                <div>
                                    <h6 className="fw-bold text-danger mb-1">Deactivate Account</h6>
                                    <p className="text-muted small m-0">Temporarily deactivate account access.</p>
                                </div>
                                <button type="button" className="btn btn-sm btn-outline-danger px-3 py-1.5 rounded-pill fw-semibold">
                                    Deactivate
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}