"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { axiosNormalPost } from '@/libs/axiosHelper';
import { getSavedPackagesUrl, toggleSavePackageUrl } from '@/routes/serviceRoutes';
import { showMessage } from '@/libs/commonHelper';
import PackageCard from '@/components/website/package/PackageCard';

export default function SavedTourPage() {
    const router = useRouter();
    const { user, token } = useSelector((state) => state.userAuth || {});
    const [savedPackages, setSavedPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [removingId, setRemovingId] = useState(null);

    const getUserId = () => {
        if (user?.id) return user.id;
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem('user') || localStorage.getItem('user_details') || localStorage.getItem('userAuth');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    return parsed?.id || parsed?.user?.id;
                }
            } catch (e) {}
        }
        return null;
    };

    const fetchSavedPackages = async () => {
        const uid = getUserId();
        if (!uid) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const res = await axiosNormalPost(getSavedPackagesUrl, { user_id: uid });
            if (res?.status && Array.isArray(res.packages)) {
                setSavedPackages(res.packages);
            } else {
                setSavedPackages([]);
            }
        } catch (err) {
            console.error('Error fetching saved packages:', err);
            setSavedPackages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedPackages();
    }, [user]);

    const handleRemoveSavedPackage = async (packageId, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const uid = getUserId();
        if (!uid) return;

        setRemovingId(packageId);
        try {
            const res = await axiosNormalPost(toggleSavePackageUrl, { user_id: uid, package_id: packageId });
            if (res && res.status) {
                setSavedPackages((prev) => prev.filter((pkg) => pkg.id !== packageId));
                showMessage('Package removed from your saved list.', 'info');
            }
        } catch (err) {
            showMessage('Failed to remove package. Please try again.', 'error');
        } finally {
            setRemovingId(null);
        }
    };

    const filteredPackages = savedPackages.filter((pkg) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            (pkg.title && pkg.title.toLowerCase().includes(q)) ||
            (pkg.to_destination_name && pkg.to_destination_name.toLowerCase().includes(q)) ||
            (pkg.package_type_name && pkg.package_type_name.toLowerCase().includes(q))
        );
    });

    return (
        <div className="col-lg-8 col-xl-9">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                {/* Header Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom mb-4">
                    <div>
                        <div className="d-flex align-items-center gap-2">
                            <h4 className="fw-bold text-dark mb-0">
                                <i className="fa-solid fa-heart text-danger me-2"></i>
                                Saved Travel Packages
                            </h4>
                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1.5 fw-bold" style={{ fontSize: '13px' }}>
                                {savedPackages.length} {savedPackages.length === 1 ? 'Package' : 'Packages'}
                            </span>
                        </div>
                        <p className="text-muted small mb-0 mt-1">
                            Your bookmarked delta safaris and holiday tours. Click any package to view details or book now.
                        </p>
                    </div>

                    {/* Quick Search inside saved tours */}
                    {savedPackages.length > 3 && (
                        <div className="position-relative" style={{ minWidth: '220px' }}>
                            <input 
                                type="text"
                                className="form-control form-control-sm rounded-pill ps-4 bg-light border-0"
                                placeholder="Search saved tours..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="fa-solid fa-magnifying-glass position-absolute top-50 start-0 translate-middle-y ms-2.5 text-muted text-xs"></i>
                            {searchQuery && (
                                <button 
                                    className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y text-muted text-decoration-none me-2 p-0"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Body Content */}
                {loading ? (
                    <div className="row g-4 py-4">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="col-md-6 col-xl-4">
                                <div className="card border-0 shadow-xs rounded-4 overflow-hidden bg-light animate-pulse" style={{ height: '320px' }}>
                                    <div className="bg-secondary bg-opacity-25" style={{ height: '180px' }}></div>
                                    <div className="p-3">
                                        <div className="bg-secondary bg-opacity-25 rounded mb-2" style={{ height: '18px', width: '80%' }}></div>
                                        <div className="bg-secondary bg-opacity-25 rounded mb-3" style={{ height: '14px', width: '50%' }}></div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <div className="bg-secondary bg-opacity-25 rounded" style={{ height: '24px', width: '30%' }}></div>
                                            <div className="bg-secondary bg-opacity-25 rounded-pill" style={{ height: '28px', width: '35%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : savedPackages.length === 0 ? (
                    <div className="text-center py-5 my-3">
                        <div className="mb-3">
                            <span className="d-inline-flex align-items-center justify-content-center bg-danger-subtle text-danger rounded-circle p-4 shadow-xs" style={{ width: '85px', height: '85px' }}>
                                <i className="fa-solid fa-heart-crack fs-1"></i>
                            </span>
                        </div>
                        <h5 className="fw-bold text-dark mb-2">No Saved Packages Found</h5>
                        <p className="text-muted small mx-auto mb-4" style={{ maxWidth: '420px' }}>
                            You haven't saved any tour packages yet. Click the heart icon on any tour package card to save it for easy access later!
                        </p>
                        <Link 
                            href="/packages/destination-sundarban" 
                            className="btn btn-primary rounded-pill px-4 py-2.5 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
                            style={{ backgroundColor: '#ef6614', borderColor: '#ef6614' }}
                        >
                            <i className="fa-solid fa-compass me-1"></i> Explore Tour Packages
                        </Link>
                    </div>
                ) : filteredPackages.length === 0 ? (
                    <div className="text-center py-4 my-2 text-muted">
                        <i className="fa-solid fa-magnifying-glass fs-3 mb-2 opacity-50"></i>
                        <p className="mb-2 fw-semibold">No packages match "{searchQuery}"</p>
                        <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={() => setSearchQuery('')}>
                            Clear Search Filter
                        </button>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredPackages.map((pkg) => (
                            <div key={pkg.id || pkg.saved_id} className="col-md-6 col-xl-4">
                                <div className="position-relative h-100">
                                    <PackageCard 
                                        pkg={pkg} 
                                        initialSaved={true}
                                        onSaveChange={(id, isSavedNow) => {
                                            if (!isSavedNow) {
                                                setSavedPackages((prev) => prev.filter((p) => p.id !== id));
                                            }
                                        }}
                                    />
                                    {/* Action to Remove Package */}
                                    <button 
                                        type="button" 
                                        onClick={(e) => handleRemoveSavedPackage(pkg.id, e)}
                                        disabled={removingId === pkg.id}
                                        className="btn btn-sm btn-light border text-danger rounded-circle position-absolute bottom-0 end-0 m-3 shadow-xs d-flex align-items-center justify-content-center"
                                        style={{ width: '32px', height: '32px', zIndex: 15, cursor: 'pointer' }}
                                        title="Remove from Saved Packages"
                                    >
                                        {removingId === pkg.id ? (
                                            <span className="spinner-border spinner-border-sm" role="status" style={{ width: '12px', height: '12px' }}></span>
                                        ) : (
                                            <i className="fa-solid fa-trash-can text-2xs"></i>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}