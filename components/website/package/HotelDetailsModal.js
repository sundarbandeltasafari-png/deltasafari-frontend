"use client";

import React, { useState, useEffect } from 'react';

export default function HotelDetailsModal({ hotel, isOpen, onClose, onEnquire }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    if (!isOpen || !hotel) return null;

    // Compile all images (main_image + gallery images)
    const allImages = [];
    if (hotel.main_image) {
        allImages.push(hotel.main_image.startsWith('http') || hotel.main_image.startsWith('/')
            ? hotel.main_image
            : `${process.env.NEXT_PUBLIC_SERVER_URL}${hotel.main_image}`);
    }
    if (Array.isArray(hotel.images)) {
        hotel.images.forEach(img => {
            if (img) {
                const src = img.startsWith('http') || img.startsWith('/')
                    ? img
                    : `${process.env.NEXT_PUBLIC_SERVER_URL}${img}`;
                if (!allImages.includes(src)) {
                    allImages.push(src);
                }
            }
        });
    }
    if (allImages.length === 0) {
        allImages.push('/assets/img/innerpages/hotel-dt-gallery-img1.jpg');
    }

    const amenitiesList = Array.isArray(hotel.amenities)
        ? hotel.amenities
        : (typeof hotel.amenities === 'string' ? JSON.parse(hotel.amenities || '[]') : []);

    const roomTypesList = Array.isArray(hotel.room_types)
        ? hotel.room_types
        : (typeof hotel.room_types === 'string' ? JSON.parse(hotel.room_types || '[]') : []);

    const getAmenityIcon = (amenity) => {
        const lower = (amenity || '').toLowerCase();
        if (lower.includes('wifi') || lower.includes('wi-fi') || lower.includes('internet')) return 'bi-wifi text-primary';
        if (lower.includes('pool') || lower.includes('swim')) return 'bi-water text-info';
        if (lower.includes('ac') || lower.includes('air') || lower.includes('condition')) return 'bi-wind text-primary';
        if (lower.includes('restaurant') || lower.includes('dining') || lower.includes('food') || lower.includes('meal')) return 'bi-egg-fried text-warning';
        if (lower.includes('power') || lower.includes('generator') || lower.includes('backup')) return 'bi-lightning-charge-fill text-warning';
        if (lower.includes('boat') || lower.includes('cruise') || lower.includes('transfer')) return 'bi-tsunami text-info';
        if (lower.includes('river') || lower.includes('balcony') || lower.includes('view')) return 'bi-binoculars-fill text-success';
        if (lower.includes('breakfast')) return 'bi-cup-hot-fill text-danger';
        if (lower.includes('spa') || lower.includes('wellness') || lower.includes('massage')) return 'bi-heart-pulse text-danger';
        if (lower.includes('parking')) return 'bi-car-front-fill text-secondary';
        if (lower.includes('geyser') || lower.includes('hot water')) return 'bi-droplet-fill text-primary';
        if (lower.includes('campfire') || lower.includes('show') || lower.includes('dance')) return 'bi-fire text-danger';
        if (lower.includes('room service')) return 'bi-bell-fill text-warning';
        if (lower.includes('tea') || lower.includes('coffee')) return 'bi-cup-fill text-secondary';
        if (lower.includes('doctor') || lower.includes('medical')) return 'bi-hospital-fill text-danger';
        if (lower.includes('security') || lower.includes('cctv')) return 'bi-shield-check text-success';
        return 'bi-check-circle-fill text-success';
    };

    return (
        <div
            className="hotel-modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(6px)',
                zIndex: 99999,
                animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={onClose}
        >
            <div
                className="hotel-modal-card card border-0 shadow-lg rounded-4 overflow-hidden w-100 d-flex flex-column"
                style={{
                    maxWidth: '860px',
                    maxHeight: '90vh',
                    backgroundColor: '#ffffff',
                    animation: 'slideUp 0.3s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >

                {/* MODAL HEADER */}
                <div
                    className="p-4 text-white d-flex align-items-start justify-content-between position-relative"
                    style={{
                        background: 'linear-gradient(135deg, #1c2b46 0%, #0d1e3a 100%)',
                        borderBottom: '3px solid #ef6614'
                    }}
                >
                    <div>
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                            <span className="badge bg-warning text-dark fw-bold px-2.5 py-1 rounded-pill" style={{ fontSize: '11px' }}>
                                ★ {hotel.star_rating || 4} Star {hotel.hotel_type || 'Resort'}
                            </span>
                            <span className="badge bg-success bg-opacity-25 text-white border border-success border-opacity-50 px-2.5 py-1 rounded-pill" style={{ fontSize: '11px' }}>
                                <i className="bi bi-shield-check me-1"></i> Verified Partner Stay
                            </span>
                            {hotel.city_name && (
                                <span className="badge bg-white bg-opacity-15 text-light px-2.5 py-1 rounded-pill" style={{ fontSize: '11px' }}>
                                    <i className="bi bi-geo-alt me-1 text-danger"></i> {hotel.city_name}
                                </span>
                            )}
                        </div>

                        <h3 className="h4 fw-bold text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {hotel.name}
                        </h3>

                        {hotel.address && (
                            <p className="text-light opacity-75 small mb-0 d-flex align-items-center gap-1.5">
                                <i className="bi bi-pin-map-fill text-warning"></i>
                                <span>{hotel.address}</span>
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-outline-light btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: '36px', height: '36px', fontSize: '18px' }}
                        title="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* MODAL BODY (SCROLLABLE) */}
                <div className="card-body p-4 overflow-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>

                    {/* 1. IMAGE GALLERY DISPLAY */}
                    <div className="mb-4">
                        {/* Main Featured Photo */}
                        <div className="position-relative rounded-4 overflow-hidden shadow-sm mb-2" style={{ height: '320px', backgroundColor: '#f1f5f9' }}>
                            <img
                                src={allImages[selectedImageIndex] || allImages[0]}
                                alt={hotel.name}
                                className="w-100 h-100 object-fit-cover transition-all"
                                onError={(e) => { e.target.src = "/assets/img/innerpages/hotel-dt-gallery-img1.jpg"; }}
                            />
                            <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark text-white d-flex justify-content-between align-items-center"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
                                <span className="text-xs text-white fw-semibold">
                                    Photo {selectedImageIndex + 1} of {allImages.length}
                                </span>
                                {hotel.starting_price > 0 && (
                                    <span className="badge bg-warning text-dark fw-bold px-3 py-1.5 rounded-pill fs-6">
                                        Starting ₹{Number(hotel.starting_price).toLocaleString('en-IN')} / night
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Row */}
                        {allImages.length > 1 && (
                            <div className="d-flex gap-2 overflow-auto pb-2">
                                {allImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`rounded-3 overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all ${
                                            selectedImageIndex === idx ? 'border-primary shadow-sm' : 'border-transparent opacity-75 hover-opacity-100'
                                        }`}
                                        style={{ width: '76px', height: '54px', cursor: 'pointer' }}
                                    >
                                        <img
                                            src={img}
                                            alt="Thumbnail"
                                            className="w-100 h-100 object-fit-cover"
                                            onError={(e) => { e.target.src = "/assets/img/innerpages/hotel-dt-gallery-img1.jpg"; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 2. QUICK SPECIFICATIONS MATRIX */}
                    <div className="row g-2 mb-4">
                        <div className="col-6 col-md-3">
                            <div className="p-3 bg-light rounded-3 border text-center h-100">
                                <i className="bi bi-clock-history fs-5 text-primary d-block mb-1"></i>
                                <small className="text-muted d-block text-2xs text-uppercase fw-bold">Check-In</small>
                                <span className="fw-bold text-dark text-sm">{hotel.check_in_time || '12:00 PM'}</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="p-3 bg-light rounded-3 border text-center h-100">
                                <i className="bi bi-clock fs-5 text-danger d-block mb-1"></i>
                                <small className="text-muted d-block text-2xs text-uppercase fw-bold">Check-Out</small>
                                <span className="fw-bold text-dark text-sm">{hotel.check_out_time || '11:00 AM'}</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="p-3 bg-light rounded-3 border text-center h-100">
                                <i className="bi bi-building-check fs-5 text-success d-block mb-1"></i>
                                <small className="text-muted d-block text-2xs text-uppercase fw-bold">Property Type</small>
                                <span className="fw-bold text-dark text-sm">{hotel.hotel_type || 'Eco Resort'}</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="p-3 bg-light rounded-3 border text-center h-100">
                                <i className="bi bi-shield-lock fs-5 text-warning d-block mb-1"></i>
                                <small className="text-muted d-block text-2xs text-uppercase fw-bold">Safari Permit</small>
                                <span className="fw-bold text-dark text-sm">Assistance Inc.</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. HOTEL OVERVIEW & DESCRIPTION */}
                    <div className="mb-4">
                        <h5 className="h6 fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                            <i className="bi bi-info-circle-fill text-primary"></i> About The Property
                        </h5>
                        <div
                            className="text-secondary text-sm leading-relaxed"
                            style={{ lineHeight: '1.7' }}
                            dangerouslySetInnerHTML={{
                                __html: hotel.description && hotel.description.trim() !== ''
                                    ? hotel.description
                                    : 'Nestled amidst lush mangroves and serene river streams, this resort offers authentic eco-cottages equipped with modern conveniences. Enjoy fresh traditional meals prepared with local organic ingredients, evening cultural shows, and seamless jetty connectivity for your wildlife safaris.'
                            }}
                        />
                    </div>

                    {/* 4. ALL AMENITIES & FACILITIES */}
                    {amenitiesList.length > 0 && (
                        <div className="mb-4">
                            <h5 className="h6 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                                <i className="bi bi-stars text-warning"></i> Key Amenities & Services
                            </h5>
                            <div className="row g-2">
                                {amenitiesList.map((amenity, aIdx) => (
                                    <div key={aIdx} className="col-12 col-md-6 col-lg-4">
                                        <div className="p-2.5 bg-light rounded-3 border d-flex align-items-center gap-2.5 h-100">
                                            <i className={`bi ${getAmenityIcon(amenity)} fs-5`}></i>
                                            <span className="text-dark fw-medium text-xs">{amenity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. AVAILABLE ROOM TYPES */}
                    {roomTypesList.length > 0 && (
                        <div className="mb-4">
                            <h5 className="h6 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                                <i className="bi bi-door-open-fill text-primary"></i> Room Categories
                            </h5>
                            <div className="row g-3">
                                {roomTypesList.map((room, rIdx) => (
                                    <div key={rIdx} className="col-md-6">
                                        <div className="p-3 bg-white rounded-3 border border-2 border-light shadow-2xs h-100 d-flex flex-column justify-content-between">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-baseline mb-1">
                                                    <h6 className="fw-bold text-dark mb-0 text-sm">{room.name}</h6>
                                                    {room.price && (
                                                        <span className="text-primary fw-bold text-sm">
                                                            ₹{Number(room.price).toLocaleString('en-IN')} <small className="text-muted text-3xs">/ night</small>
                                                        </span>
                                                    )}
                                                </div>
                                                {room.features && (
                                                    <p className="text-secondary text-2xs mb-0 mt-1">
                                                        <i className="bi bi-check2 text-success me-1"></i>
                                                        {room.features}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. PACKAGE INCLUSION NOTICE BANNER */}
                    <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25 d-flex align-items-center gap-3">
                        <div className="avatar avatar-md bg-success text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                            <i className="bi bi-check-lg fs-4"></i>
                        </div>
                        <div>
                            <span className="fw-bold text-success text-sm d-block">Reference Tour Stay Included</span>
                            <small className="text-secondary text-xs">
                                Accommodation at this property or an equivalent verified resort category is included in your Delta Safari package itinerary with complimentary meals and transfers.
                            </small>
                        </div>
                    </div>

                </div>

                {/* MODAL FOOTER */}
                <div className="p-3.5 bg-light border-top d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2">
                        {hotel.contact_number && (
                            <a
                                href={`tel:${hotel.contact_number}`}
                                className="btn btn-outline-secondary btn-sm rounded-pill d-inline-flex align-items-center gap-1.5 text-xs fw-semibold"
                            >
                                <i className="bi bi-telephone-fill text-primary"></i>
                                <span>{hotel.contact_number}</span>
                            </a>
                        )}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-semibold text-xs"
                        >
                            Close
                        </button>
                        {onEnquire && (
                            <button
                                type="button"
                                onClick={() => { onClose(); onEnquire(); }}
                                className="btn btn-danger btn-sm rounded-pill px-4 fw-bold text-xs shadow-sm"
                                style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }}
                            >
                                <i className="bi bi-send me-1"></i> Inquire / Book Package
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
