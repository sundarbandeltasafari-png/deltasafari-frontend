"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { showMessage } from '@/libs/commonHelper';
import { editProfileURL } from '@/routes/authRoutes';
import { setUser } from '@/services/reducers/userAuthSlice';

export default function EditProfilePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.userAuth || {});

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        gender: '',
        city: '',
        address: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                phone: user.phone || '',
                gender: user.gender || '',
                city: user.city || '',
                address: user.address || ''
            });

            if (user.profile_pic) {
                const picUrl = user.profile_pic.startsWith('http')
                    ? user.profile_pic
                    : process.env.NEXT_PUBLIC_SERVER_URL + user.profile_pic;
                setImagePreview(picUrl);
            }
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
                showMessage('error', 'Please select a valid image file (JPG, PNG, WEBP).');
                return;
            }
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            showMessage('error', 'You must be logged in to update profile.');
            return;
        }

        setSubmitting(true);

        try {
            const data = new FormData();
            data.append('first_name', formData.first_name);
            data.append('last_name', formData.last_name);
            data.append('phone', formData.phone);
            data.append('gender', formData.gender);
            data.append('city', formData.city);
            data.append('address', formData.address);

            if (selectedFile) {
                data.append('profile_pic', selectedFile);
            }

            const response = await axios.post(editProfileURL, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSubmitting(false);

            if (response.data?.status) {
                showMessage('success', response.data.msg || 'Profile updated successfully!');
                if (response.data?.userDetails) {
                    dispatch(setUser({ user: response.data.userDetails, token }));
                }
                router.push('/profile');
            } else {
                showMessage('error', response.data?.msg || 'Failed to update profile.');
            }
        } catch (error) {
            setSubmitting(false);
            const msg = error?.response?.data?.msg || 'Error submitting profile changes.';
            showMessage('error', msg);
        }
    };

    const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23e2e8f0'/><circle cx='50' cy='38' r='20' fill='%2394a3b8'/><path d='M 18 86 C 18 64 34 56 50 56 C 66 56 82 64 82 86 Z' fill='%2394a3b8'/></svg>";

    const currentProfileImage = imagePreview || DEFAULT_AVATAR;

    return (
        <div className="col-lg-8 col-xl-9">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="edit-profile-panel" role="tabpanel">
                    <div className="gofly-card shadow-sm border-0 rounded-4 p-4">
                        <h3 className="gofly-card-title border-bottom pb-3 mb-4 fw-bold text-dark" style={{ fontSize: '20px' }}>
                            <i className="fa-regular fa-pen-to-square me-2 text-primary"></i> Edit Profile Information
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                
                                {/* Profile Picture Upload Section */}
                                <div className="col-md-12 text-center mb-3">
                                    <div className="position-relative d-inline-block">
                                        <img 
                                            src={currentProfileImage} 
                                            className="rounded-circle border border-4 border-white shadow" 
                                            style={{ width: "120px", height: "120px", objectFit: "cover" }} 
                                            alt="Profile Preview" 
                                        />
                                        <label 
                                            htmlFor="profile-pic-input" 
                                            className="btn btn-primary position-absolute bottom-0 end-0 rounded-circle p-0 d-flex align-items-center justify-content-center shadow" 
                                            style={{ width: "38px", height: "38px", cursor: "pointer" }}
                                            title="Upload Profile Picture"
                                        >
                                            <i className="fa fa-camera text-white"></i>
                                            <input 
                                                type="file" 
                                                id="profile-pic-input" 
                                                className="d-none" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                    <p className="small text-muted mt-2 mb-0">Click the camera icon to upload a new avatar (JPG, PNG, WEBP)</p>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">First Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5 rounded-3 border" 
                                        value={formData.first_name}
                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                        placeholder="Enter first name"
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Last Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5 rounded-3 border" 
                                        value={formData.last_name}
                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                        placeholder="Enter last name"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control p-2.5 rounded-3 border bg-light" 
                                        value={user?.email || ''}
                                        disabled
                                    />
                                    <span className="text-muted text-xs">Email cannot be changed</span>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5 rounded-3 border" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Gender</label>
                                    <select 
                                        className="form-select p-2.5 rounded-3 border"
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Others</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">City / State</label>
                                    <input 
                                        type="text" 
                                        className="form-control p-2.5 rounded-3 border" 
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="Enter city or state"
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold text-dark">Address / Location</label>
                                    <textarea 
                                        className="form-control rounded-3 border p-2.5" 
                                        rows="3"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Enter full address"
                                    ></textarea>
                                </div>

                                <div className="col-12 pt-3 border-top d-flex gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Saving Changes...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle-fill"></i> Save Profile Changes
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary rounded-pill px-4 py-2"
                                        onClick={() => router.push('/profile')}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}