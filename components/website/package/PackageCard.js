"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import AgentBookingModal from './AgentBookingModal';
import { axiosNormalPost } from '@/libs/axiosHelper';
import { toggleSavePackageUrl, checkIsPackageSavedUrl } from '@/routes/serviceRoutes';
import { showMessage } from '@/libs/commonHelper';

export default function PackageCard({ pkg, onSaveChange, initialSaved = false }) {
    const [agentModalOpen, setAgentModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(initialSaved);
    const [saveLoading, setSaveLoading] = useState(false);
    const { user } = useSelector((state) => state.userAuth || {});
    const isAgent = Number(user?.user_type) === 3;

    useEffect(() => {
        if (pkg?.id) {
            let uid = user?.id;
            if (!uid && typeof window !== 'undefined') {
                try {
                    const raw = localStorage.getItem('user') || localStorage.getItem('user_details') || localStorage.getItem('userAuth');
                    if (raw) uid = JSON.parse(raw)?.id;
                } catch (e) {}
            }
            if (uid) {
                axiosNormalPost(checkIsPackageSavedUrl, { user_id: uid, package_id: pkg.id })
                    .then((res) => {
                        if (res && res.status) setIsSaved(!!res.is_saved);
                    })
                    .catch(() => {});
            }
        }
    }, [pkg?.id, user]);

    const handleToggleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let uid = user?.id;
        if (!uid && typeof window !== 'undefined') {
            try {
                const raw = localStorage.getItem('user') || localStorage.getItem('user_details') || localStorage.getItem('userAuth');
                if (raw) uid = JSON.parse(raw)?.id;
            } catch (e) {}
        }

        if (!uid) {
            showMessage('Please sign in to save packages to your wishlist.', 'info');
            return;
        }

        setSaveLoading(true);
        try {
            const res = await axiosNormalPost(toggleSavePackageUrl, { user_id: uid, package_id: pkg.id });
            if (res && res.status) {
                setIsSaved(res.is_saved);
                showMessage(res.msg || (res.is_saved ? 'Package saved to your wishlist!' : 'Package removed from saved tours.'), res.is_saved ? 'success' : 'info');
                if (onSaveChange) onSaveChange(pkg.id, res.is_saved);
            }
        } catch (err) {
            showMessage('Could not update saved status.', 'error');
        } finally {
            setSaveLoading(false);
        }
    };

    if (!pkg) return null;

    const imgUrl = pkg.path
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}${pkg.path.replace(/\\/g, '/')}`
        : (pkg.banner_path ? `${process.env.NEXT_PUBLIC_SERVER_URL}${pkg.banner_path.replace(/\\/g, '/')}` : (Array.isArray(pkg.gallery) && pkg.gallery[0] ? (pkg.gallery[0].src || pkg.gallery[0]) : '/assets/images/noimage.jpg'));
    
    const detailsUrl = pkg.detailsUrl || `/package/${pkg.slug}`;
    const durationText = pkg.duration_nights
        ? `${pkg.duration_nights}N / ${pkg.duration_days}D`
        : (pkg.duration || `${pkg.duration_days || 1} Days`);
    
    const actualPrice = pkg.actual_price ? Number(pkg.actual_price) : (pkg.price ? Number(pkg.price) : null);
    const basePrice = Number(pkg.base_price) || actualPrice || 0;
    const agentNetPrice = Number(pkg.agent_actual_price || actualPrice || 0);
    const commissionPerPax = Math.max(0, basePrice - agentNetPrice);

    const mrpPrice = pkg.mrp_price ? Number(pkg.mrp_price) : (actualPrice ? Math.round(actualPrice * 1.25) : null);
    const priceText = actualPrice ? `₹${actualPrice.toLocaleString('en-IN')}` : null;
    const mrpText = mrpPrice && mrpPrice > (actualPrice || 0) ? `₹${mrpPrice.toLocaleString('en-IN')}` : null;
    const discountPercent = (mrpPrice && actualPrice && mrpPrice > actualPrice) 
        ? Math.round(((mrpPrice - actualPrice) / mrpPrice) * 100)
        : 0;

    const destinationName = pkg.to_destination_name || pkg.destination_name || (typeof pkg.location === 'object' ? pkg.location.name : 'Sundarban');
    const categoryName = pkg.package_type_name || pkg.category_name || 'Holiday Tour';

    return (
        <>
            <div className="card h-100 border-0 shadow-sm bg-white rounded-4 overflow-hidden position-relative hover-lift transition-all">
                {/* Media Banner */}
                <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <Link href={detailsUrl} className="d-block w-100 h-100">
                        <img 
                            src={imgUrl} 
                            alt={pkg.title || 'Travel Package'} 
                            className="w-100 h-100 object-fit-cover"
                        />
                    </Link>

                    {/* Wishlist Save Button (Top Right) */}
                    <button 
                        type="button" 
                        onClick={handleToggleSave}
                        disabled={saveLoading}
                        className="position-absolute top-0 end-0 m-2.5 rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm"
                        style={{ 
                            width: '34px', 
                            height: '34px', 
                            zIndex: 12, 
                            cursor: 'pointer',
                            backgroundColor: 'rgba(255, 255, 255, 0.92)',
                            transition: 'transform 0.2s ease-in-out'
                        }}
                        title={isSaved ? "Remove from Saved Tours" : "Save Tour Package"}
                    >
                        <i className={`fa-heart ${isSaved ? 'fa-solid text-danger fs-6' : 'fa-regular text-muted fs-6'}`}></i>
                    </button>

                    {/* Location Badge (Top Start) */}
                    <span className="position-absolute top-0 start-0 m-2.5 bg-dark bg-opacity-75 text-white px-2.5 py-1 text-2xs rounded-3 d-flex align-items-center gap-1 shadow-xs fw-semibold" style={{ zIndex: 10 }}>
                        <i className="fa-solid fa-location-dot text-danger me-0.5"></i>
                        {destinationName}
                    </span>

                    {/* Category Badge (Top End) */}
                    <span className="position-absolute top-0 end-0 m-2.5 badge text-white text-uppercase text-3xs px-2.5 py-1 rounded-2 shadow-xs fw-bold" style={{ backgroundColor: '#ef6614', zIndex: 10 }}>
                        {categoryName}
                    </span>

                    {/* Duration & Discount Overlay Banner */}
                    <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white px-3 py-1.5 text-xs fw-semibold d-flex align-items-center justify-content-between" style={{ zIndex: 10 }}>
                        <span><i className="fa-solid fa-clock text-warning me-1"></i>{durationText}</span>
                        {discountPercent > 0 && (
                            <span className="badge bg-danger text-white text-3xs px-2 py-0.5 rounded-pill fw-bold">
                                {discountPercent}% OFF
                            </span>
                        )}
                    </div>
                </div>

                {/* Body & Details */}
                <div className="card-body p-3.5 d-flex flex-column justify-content-between">
                    <div>
                        <h3 className="h6 fw-bold mb-1.5 text-dark text-truncate-2" style={{ minHeight: '38px', lineHeight: '1.35', fontFamily: "'Poppins', sans-serif" }}>
                            <Link href={detailsUrl} className="text-dark text-decoration-none hover-text-primary">
                                {pkg.title}
                            </Link>
                        </h3>

                        <div className="d-flex align-items-center justify-content-between text-2xs text-muted mb-2">
                            <span><i className="fa-solid fa-map-pin text-primary me-1"></i>{destinationName}</span>
                            <span className="badge bg-light text-secondary border text-2xs">{categoryName}</span>
                        </div>

                        {/* Agent-Only Commission Strip (Theme Blue) */}
                        {isAgent && (
                            <div className="p-2 rounded-3 bg-primary-subtle border border-primary-subtle mb-2 text-start">
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="text-2xs fw-bold text-primary text-uppercase">
                                        <i className="fa-solid fa-hand-holding-dollar me-1"></i> Agent Commission
                                    </span>
                                    <span className="badge bg-primary fw-bold text-white px-2 py-0.5" style={{ fontSize: '11px', backgroundColor: '#2e266d' }}>
                                        ₹{commissionPerPax.toLocaleString('en-IN')} / pax
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-1 text-3xs text-muted">
                                    <span>B2B Net: ₹{agentNetPrice.toLocaleString('en-IN')}</span>
                                    <span>Selling MRP: {priceText}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Price & Action */}
                    <div className="d-flex align-items-end justify-content-between pt-2.5 border-top mt-2">
                        <div>
                            <span className="text-muted text-3xs d-block" style={{ fontSize: '11px', lineHeight: '14px' }}>
                                {isAgent ? 'B2B Net Rate' : 'Starting From'}
                            </span>
                            <div className="d-flex align-items-baseline gap-2">
                                {mrpText && !isAgent && (
                                    <span className="text-muted text-decoration-line-through text-nowrap" style={{ fontSize: '13px' }}>
                                        {mrpText}
                                    </span>
                                )}
                                <strong className="fw-extrabold mb-0 text-nowrap" style={{ fontSize: '20px', fontWeight: 800, color: isAgent ? '#2e266d' : '#ef6614' }}>
                                    {isAgent ? `₹${agentNetPrice.toLocaleString('en-IN')}` : (priceText || 'Contact Us')}
                                </strong>
                            </div>
                        </div>

                        {isAgent ? (
                            <button 
                                type="button" 
                                className="btn btn-primary fw-bold py-1.5 px-3 text-xs rounded-pill shadow-xs d-flex align-items-center gap-1"
                                style={{ backgroundColor: '#2e266d', borderColor: '#2e266d' }}
                                onClick={() => setAgentModalOpen(true)}
                            >
                                <i className="fa-solid fa-user-plus me-1"></i> Book for Client
                            </button>
                        ) : (
                            <Link href={detailsUrl} className="primary-btn1 py-1.5 px-3 text-xs">
                                <span>Book Now</span>
                                <span>Book Now</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Agent B2B Client Booking Modal */}
            {agentModalOpen && (
                <AgentBookingModal
                    pkg={pkg}
                    isOpen={agentModalOpen}
                    onClose={() => setAgentModalOpen(false)}
                    onSuccess={() => {}}
                />
            )}
        </>
    );
}