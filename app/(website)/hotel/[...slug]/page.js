"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { axiosNormalGet, axiosNormalPost } from '@/libs/axiosHelper';
import { getParticularHotelUrl, createContactQueryUrl } from '@/routes/serviceRoutes';
import LoadingComponent from '@/components/common/LoadingComponent';
import NotFound from '@/components/website/common/NotFound';
import ShareButton from '@/components/common/ShareButton';
import { showMessage } from '@/libs/commonHelper';
import { urlEncode, urlDecode } from '@/libs/urlHelper';

export default function HotelDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const rawSlug = params?.slug;
    const slug = Array.isArray(rawSlug) ? rawSlug.join('/') : rawSlug;

    const [loading, setLoading] = useState(true);
    const [hotel, setHotel] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // Quick Inquiry Form State
    const [enquiryForm, setEnquiryForm] = useState({
        name: '',
        email: '',
        phone: '',
        travel_date: '',
        guests: 2,
        message: ''
    });
    const [submittingEnquiry, setSubmittingEnquiry] = useState(false);

    useEffect(() => {
        if (!slug) {
            setLoading(false);
            return;
        }

        async function fetchHotel() {
            try {
                setLoading(true);
                const response = await axiosNormalGet(`${getParticularHotelUrl}?slug=${encodeURIComponent(slug)}`);
                if (response?.status && response?.hotel) {
                    setHotel(response.hotel);
                } else {
                    // Try by ID fallback
                    const idResponse = await axiosNormalGet(`${getParticularHotelUrl}?id=${encodeURIComponent(slug)}`);
                    if (idResponse?.status && idResponse?.hotel) {
                        setHotel(idResponse.hotel);
                    } else {
                        setHotel(null);
                    }
                }
            } catch (err) {
                console.error("Error fetching hotel details:", err);
                setHotel(null);
            } finally {
                setLoading(false);
            }
        }

        fetchHotel();
    }, [slug]);

    const handleEnquirySubmit = async (e) => {
        if (e) e.preventDefault();
        if (!enquiryForm.name.trim() || !enquiryForm.phone.trim()) {
            showMessage("Please provide your name and contact phone number.", "error");
            return;
        }

        setSubmittingEnquiry(true);
        try {
            const payload = {
                name: enquiryForm.name,
                email: enquiryForm.email,
                phone: enquiryForm.phone,
                message: `Inquiry for ${hotel?.name} (${enquiryForm.guests} Guests, Date: ${enquiryForm.travel_date || 'Flexible'}). Note: ${enquiryForm.message || 'General query'}`
            };

            const res = await axiosNormalPost(createContactQueryUrl, payload);
            if (res?.status) {
                showMessage("Thank you! Your hotel enquiry has been submitted. Our team will contact you shortly.", "success");
                setEnquiryForm({
                    name: '',
                    email: '',
                    phone: '',
                    travel_date: '',
                    guests: 2,
                    message: ''
                });
            } else {
                showMessage(res?.msg || "Failed to submit enquiry. Please try again.", "error");
            }
        } catch (err) {
            console.error("Error submitting hotel enquiry:", err);
            showMessage("Error sending enquiry. Please contact us directly.", "error");
        } finally {
            setSubmittingEnquiry(false);
        }
    };

    if (loading) {
        return (
            <div className="py-5 text-center my-5 min-vh-50 d-flex align-items-center justify-content-center">
                <LoadingComponent />
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="container py-5 text-center my-5">
                <NotFound />
                <h3 className="h4 fw-bold text-dark mt-4">Hotel Not Found</h3>
                <p className="text-secondary mb-4">
                    The accommodation property you are looking for does not exist or has been removed.
                </p>
                <Link href="/hotel" className="btn btn-danger rounded-pill px-4 py-2 text-white fw-bold shadow-sm">
                    Browse All Hotels & Stays
                </Link>
            </div>
        );
    }

    // Compile gallery images
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

    const linkedPackages = Array.isArray(hotel.packages) ? hotel.packages : [];

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
        <div className="hotel-details-page-wrapper bg-light min-vh-100 py-4">
            <div className="container py-3">

                {/* HERO HEADER TITLE BAR */}
                <div className="card border-0 shadow-sm bg-white rounded-4 p-4 p-md-3 mb-4 position-relative overflow-hidden">
                    <div className="row g-4 align-items-center justify-content-between">
                        <div className="col-lg-8 mt-0">
                            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                <span className="badge bg-warning text-dark fw-bold px-3 py-1.5 rounded-pill shadow-2xs">
                                    ★ {hotel.star_rating || 4} Star {hotel.hotel_type || 'Eco Resort'}
                                </span>
                                <span className="badge bg-success text-white bg-opacity-15 text-success border border-success border-opacity-25 px-3 py-1.5 rounded-pill fw-semibold">
                                    <i className="bi bi-patch-check-fill me-1"></i> Verified Delta Safari Partner
                                </span>
                                {hotel.city_name && (
                                    <span className="badge bg-light text-secondary border px-3 py-1.5 rounded-pill">
                                        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                                        {hotel.city_name} {hotel.zone_name ? `• ${hotel.zone_name}` : ''}
                                    </span>
                                )}
                            </div>

                            <h1 className="h2 fw-bold text-dark mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                {hotel.name}
                            </h1>

                            {hotel.address && (
                                <p className="text-secondary small mb-0 d-flex align-items-center gap-2">
                                    <i className="bi bi-pin-map-fill text-danger fs-6"></i>
                                    <span>{hotel.address}</span>
                                </p>
                            )}
                        </div>

                        {/* Starting Price & Action Badges */}
                        <div className="col-lg-4 text-lg-end">
                            <div className="d-inline-flex flex-column align-items-lg-end gap-1">
                                <small className="text-muted text-uppercase fw-bold text-3xs">Reference Stay Pricing</small>
                                <div className="d-flex align-items-baseline gap-1.5">
                                    <span className="text-muted text-xs">From</span>
                                    <span className="h3 fw-bold text-primary mb-0">
                                        ₹{hotel.starting_price ? Number(hotel.starting_price).toLocaleString('en-IN') : '2,800'}
                                    </span>
                                    <span className="text-muted text-xs">/ night</span>
                                </div>
                                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2.5 py-1 text-2xs fw-bold mt-1">
                                    ✓ Included in Delta Tour Packages
                                </span>
                                <div className="mt-3 d-flex align-items-center gap-2">
                                    <ShareButton title={hotel.name} text={`Check out ${hotel.name} on Delta Safari`} />
                                    {hotel.contact_number && (
                                        <a
                                            href={`tel:${hotel.contact_number}`}
                                            className="btn btn-outline-dark btn-sm rounded-pill px-3 py-2 fw-semibold text-xs d-inline-flex align-items-center gap-1.5"
                                        >
                                            <i className="bi bi-telephone-fill text-success"></i>
                                            <span>Call Property</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PHOTO GALLERY SECTION */}
                <div className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4">
                    <div className="row g-3">
                        {/* Main Large Photo */}
                        <div className="col-12 col-lg-8">
                            <div
                                className="position-relative rounded-4 overflow-hidden shadow-sm cursor-pointer"
                                style={{ height: '420px', backgroundColor: '#f1f5f9' }}
                                onClick={() => setLightboxOpen(true)}
                            >
                                <img
                                    src={allImages[activeImageIndex] || allImages[0]}
                                    alt={hotel.name}
                                    className="w-100 h-100 object-fit-cover transition-all"
                                    onError={(e) => { e.target.src = "/assets/img/innerpages/hotel-dt-gallery-img1.jpg"; }}
                                />
                                <div
                                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white d-flex justify-content-between align-items-center"
                                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
                                >
                                    <span className="text-xs text-white fw-semibold">
                                        <i className="bi bi-image me-1.5"></i>
                                        Photo {activeImageIndex + 1} of {allImages.length}
                                    </span>
                                    <span className="badge bg-white text-dark rounded-pill px-3 py-1.5 text-xs fw-bold shadow-sm">
                                        <i className="bi bi-arrows-fullscreen me-1 text-primary"></i> Click for Fullscreen
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Column */}
                        <div className="col-12 col-lg-4 d-flex flex-column gap-2" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                            <div className="row g-2">
                                {allImages.map((img, idx) => (
                                    <div key={idx} className="col-6">
                                        <div
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`rounded-3 overflow-hidden border-2 cursor-pointer transition-all ${
                                                activeImageIndex === idx ? 'border-primary shadow-sm ring-2' : 'border-transparent opacity-80 hover-opacity-100'
                                            }`}
                                            style={{ height: '98px', cursor: 'pointer' }}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="w-100 h-100 object-fit-cover"
                                                onError={(e) => { e.target.src = "/assets/img/innerpages/hotel-dt-gallery-img1.jpg"; }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT GRID & STICKY SIDEBAR */}
                <div className="row g-4">

                    {/* LEFT COLUMN: DETAILS, AMENITIES, ROOMS & PACKAGES */}
                    <div className="col-lg-8">

                        {/* 1. QUICK SPECIFICATIONS MATRIX */}
                        <div className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4">
                            <div className="row g-3 text-center">
                                <div className="col-6 col-md-3">
                                    <div className="p-3 bg-light rounded-3 border h-100">
                                        <i className="bi bi-clock-history fs-4 text-primary d-block mb-1"></i>
                                        <small className="text-muted d-block text-3xs text-uppercase fw-bold">Check-In Time</small>
                                        <span className="fw-bold text-dark text-sm">{hotel.check_in_time || '12:00 PM'}</span>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="p-3 bg-light rounded-3 border h-100">
                                        <i className="bi bi-clock fs-4 text-danger d-block mb-1"></i>
                                        <small className="text-muted d-block text-3xs text-uppercase fw-bold">Check-Out Time</small>
                                        <span className="fw-bold text-dark text-sm">{hotel.check_out_time || '11:00 AM'}</span>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="p-3 bg-light rounded-3 border h-100">
                                        <i className="bi bi-tree-fill fs-4 text-success d-block mb-1"></i>
                                        <small className="text-muted d-block text-3xs text-uppercase fw-bold">Location Hub</small>
                                        <span className="fw-bold text-dark text-sm">{hotel.city_name || 'Sundarban'}</span>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="p-3 bg-light rounded-3 border h-100">
                                        <i className="bi bi-shield-check fs-4 text-warning d-block mb-1"></i>
                                        <small className="text-muted d-block text-3xs text-uppercase fw-bold">Safari Assistance</small>
                                        <span className="fw-bold text-dark text-sm">Included</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. ABOUT PROPERTY & OVERVIEW */}
                        <div className="card border-0 shadow-sm bg-white rounded-4 p-4 p-md-5 mb-4">
                            <h3 className="h5 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                                <i className="bi bi-info-circle-fill text-danger"></i>
                                <span>About The Property</span>
                            </h3>
                            <div
                                className="text-secondary text-sm leading-relaxed"
                                style={{ lineHeight: '1.8' }}
                                dangerouslySetInnerHTML={{
                                    __html: hotel.description && hotel.description.trim() !== ''
                                        ? hotel.description
                                        : '<p>Experience serene natural beauty staying at this handpicked eco-retreat. Featuring authentic rural cottages combined with modern conveniences, multi-cuisine gourmet dining, evening Baul folk performances, and prompt boat cruise departure assistance.</p>'
                                }}
                            />
                        </div>

                        {/* 3. AMENITIES & FACILITIES */}
                        {amenitiesList.length > 0 && (
                            <div className="card border-0 shadow-sm bg-white rounded-4 p-4 p-md-5 mb-4">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h3 className="h5 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                        <i className="bi bi-stars text-warning"></i>
                                        <span>Amenities & Highlights</span>
                                    </h3>
                                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1.5 rounded-pill text-xs fw-bold">
                                        {amenitiesList.length} Facilities Available
                                    </span>
                                </div>

                                <div className="row g-3">
                                    {amenitiesList.map((amenity, aIdx) => (
                                        <div key={aIdx} className="col-12 col-md-6">
                                            <div className="p-3 bg-light rounded-3 border d-flex align-items-center gap-3 h-100 transition-all hover-shadow">
                                                <div className="avatar bg-white rounded-circle shadow-2xs d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '38px', height: '38px' }}>
                                                    <i className={`bi ${getAmenityIcon(amenity)} fs-5`}></i>
                                                </div>
                                                <span className="text-dark fw-semibold text-xs">{amenity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 4. ROOM TYPES & CATEGORIES */}
                        {roomTypesList.length > 0 && (
                            <div className="card border-0 shadow-sm bg-white rounded-4 p-4 p-md-5 mb-4">
                                <h3 className="h5 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                                    <i className="bi bi-door-open-fill text-primary"></i>
                                    <span>Available Room Categories</span>
                                </h3>

                                <div className="row g-3">
                                    {roomTypesList.map((room, rIdx) => (
                                        <div key={rIdx} className="col-12 col-md-6">
                                            <div className="p-4 bg-white rounded-4 border border-2 border-light shadow-sm h-100 d-flex flex-column justify-content-between">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <h4 className="h6 fw-bold text-dark mb-0">{room.name}</h4>
                                                        {room.price && (
                                                            <span className="badge bg-primary bg-opacity-10 text-primary fw-bold text-xs px-2.5 py-1">
                                                                ₹{Number(room.price).toLocaleString('en-IN')} / night
                                                            </span>
                                                        )}
                                                    </div>
                                                    {room.features && (
                                                        <p className="text-secondary text-xs mb-3">
                                                            <i className="bi bi-check2-circle text-success me-1"></i>
                                                            {room.features}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="badge bg-light text-secondary border text-2xs py-1.5 rounded-pill text-center d-block">
                                                    Available in Delta Safari Packages
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 5. TOUR PACKAGES FEATURING THIS HOTEL */}
                        {linkedPackages.length > 0 && (
                            <div className="card border-0 shadow-sm bg-white rounded-4 p-4 p-md-5 mb-4">
                                <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                                    <div>
                                        <h3 className="h5 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                                            <i className="bi bi-compass-fill text-danger"></i>
                                            <span>Tour Packages Featuring This Stay</span>
                                        </h3>
                                        <p className="text-secondary text-xs mb-0">
                                            Book an all-inclusive safari package that includes stay at {hotel.name}
                                        </p>
                                    </div>
                                    <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-1.5 text-xs fw-bold">
                                        {linkedPackages.length} Available Packages
                                    </span>
                                </div>

                                <div className="row g-3">
                                    {linkedPackages.map((pkg) => (
                                        <div key={pkg.id} className="col-12 col-md-6">
                                            <div className="card h-100 border rounded-4 p-3 bg-light hover-shadow transition-all d-flex flex-column justify-content-between">
                                                <div>
                                                    <span className="badge bg-warning text-dark text-3xs fw-bold px-2 py-0.5 rounded-pill mb-2">
                                                        {pkg.duration_days} Days / {pkg.duration_nights || (pkg.duration_days - 1)} Nights
                                                    </span>
                                                    <h5 className="h6 fw-bold text-dark mb-2 line-clamp-2" style={{ lineHeight: '1.4' }}>
                                                        {pkg.title}
                                                    </h5>
                                                    {pkg.actual_price > 0 && (
                                                        <div className="mb-3">
                                                            <span className="text-primary fw-bold fs-6">
                                                                ₹{Number(pkg.actual_price).toLocaleString('en-IN')}
                                                            </span>
                                                            <small className="text-muted text-3xs"> / person</small>
                                                        </div>
                                                    )}
                                                </div>

                                                <Link
                                                    href={`/package/${pkg.slug || pkg.id}`}
                                                    className="btn btn-sm btn-primary rounded-pill px-3 py-2 text-xs fw-bold d-flex align-items-center justify-content-center gap-1.5 shadow-sm"
                                                >
                                                    <span>View Package Details</span>
                                                    <i className="bi bi-arrow-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN: STICKY ENQUIRY & CONTACT CARD */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm bg-white rounded-4 p-4 position-sticky" style={{ top: '90px' }}>
                            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
                                <div>
                                    <small className="text-muted text-uppercase fw-bold text-3xs">Book or Inquire Stay</small>
                                    <h4 className="h5 fw-bold text-dark mb-0">Direct Stay Enquiry</h4>
                                </div>
                                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2.5 py-1 text-2xs fw-bold">
                                    Instant Support
                                </span>
                            </div>

                            <form onSubmit={handleEnquirySubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-secondary small fw-semibold">Your Full Name *</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        placeholder="e.g. Rahul Sharma"
                                        value={enquiryForm.name}
                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-secondary small fw-semibold">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        className="form-control rounded-3"
                                        placeholder="+91 98765 43210"
                                        value={enquiryForm.phone}
                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-secondary small fw-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control rounded-3"
                                        placeholder="rahul@example.com"
                                        value={enquiryForm.email}
                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                    />
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <label className="form-label text-secondary small fw-semibold">Travel Date</label>
                                        <input
                                            type="date"
                                            className="form-control rounded-3"
                                            value={enquiryForm.travel_date}
                                            onChange={(e) => setEnquiryForm({ ...enquiryForm, travel_date: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label text-secondary small fw-semibold">Guests Count</label>
                                        <select
                                            className="form-select rounded-3"
                                            value={enquiryForm.guests}
                                            onChange={(e) => setEnquiryForm({ ...enquiryForm, guests: e.target.value })}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-secondary small fw-semibold">Message / Room Preference</label>
                                    <textarea
                                        className="form-control rounded-3"
                                        rows="3"
                                        placeholder="Tell us your room preferences or package questions..."
                                        value={enquiryForm.message}
                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submittingEnquiry}
                                    className="btn btn-danger w-100 py-3 rounded-pill fw-bold text-white shadow-sm d-flex align-items-center justify-content-center gap-2"
                                    style={{ backgroundColor: '#ff5c41', borderColor: '#ff5c41' }}
                                >
                                    {submittingEnquiry ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                            <span>Sending Inquiry...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-send-fill"></i>
                                            <span>Submit Stay Inquiry</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Contact Hotline Helper */}
                            <div className="mt-4 pt-3 border-top text-center">
                                <small className="text-muted d-block mb-1">Need Urgent Help or Custom Safari?</small>
                                <a
                                    href="tel:+919876543210"
                                    className="text-primary fw-bold text-sm text-decoration-none d-inline-flex align-items-center gap-1.5"
                                >
                                    <i className="bi bi-telephone-outbound-fill"></i>
                                    <span>+91 98765 43210</span>
                                </a>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            {/* LIGHTBOX FULLSCREEN PHOTO VIEWER */}
            {lightboxOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-95 d-flex flex-column align-items-center justify-content-center p-3"
                    style={{ zIndex: 999999 }}
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        className="btn btn-outline-light btn-sm position-absolute top-0 end-0 m-4 rounded-circle p-0 d-flex align-items-center justify-content-center"
                        style={{ width: '40px', height: '40px', fontSize: '20px' }}
                    >
                        ✕
                    </button>

                    <div className="position-relative max-w-4xl max-h-80vh text-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={allImages[activeImageIndex]}
                            alt="Fullscreen view"
                            className="img-fluid rounded-4 max-h-80vh object-fit-contain shadow-lg"
                            style={{ maxHeight: '80vh' }}
                        />
                        <div className="mt-3 text-white d-flex align-items-center justify-content-center gap-3">
                            <button
                                type="button"
                                className="btn btn-outline-light btn-sm rounded-pill px-3"
                                onClick={() => setActiveImageIndex((activeImageIndex - 1 + allImages.length) % allImages.length)}
                            >
                                ❮ Previous
                            </button>
                            <span className="text-xs">
                                {activeImageIndex + 1} / {allImages.length}
                            </span>
                            <button
                                type="button"
                                className="btn btn-outline-light btn-sm rounded-pill px-3"
                                onClick={() => setActiveImageIndex((activeImageIndex + 1) % allImages.length)}
                            >
                                Next ❯
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
