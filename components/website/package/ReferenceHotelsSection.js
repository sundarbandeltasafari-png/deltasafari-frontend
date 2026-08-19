"use client";

import React from 'react';
import Link from 'next/link';
import { urlEncode } from '@/libs/urlHelper';

export default function ReferenceHotelsSection({ referenceHotels = [], destinationName = 'Sundarban' }) {

    // Fallback default hotels if no custom hotels linked yet
    const defaultHotels = [
        {
            id: '1',
            slug: 'sundarban-tiger-camp-eco-resort',
            name: `${destinationName} Tiger Camp Eco Resort`,
            star_rating: 4,
            hotel_type: 'Eco Resort',
            city_name: 'Dayapur Island',
            zone_name: destinationName,
            address: `Dayapur Island, Opp. Sajnekhali Watch Tower, ${destinationName}`,
            starting_price: 2800,
            main_image: '/assets/img/innerpages/hotel-dt-gallery-img1.jpg',
            amenities: [
                "Free High-Speed Wi-Fi",
                "Air Conditioned Cottages",
                "Multi-Cuisine Restaurant",
                "24/7 Power Backup",
                "Safari Boat Jetty Transfer",
                "River View Balcony",
                "Campfire & Folk Baul Show"
            ],
            room_types: [
                { name: "Deluxe AC Mud Cottage", price: 2800, features: "King Bed, River View, AC, Attached Bath" },
                { name: "Executive Mangrove Suite", price: 4200, features: "Private Balcony, Bathtub, Garden View" }
            ]
        },
        {
            id: '2',
            slug: 'pakhiralay-riverside-retreat-and-spa',
            name: `Pakhiralay Riverside Retreat & Spa`,
            star_rating: 4,
            hotel_type: 'Resort',
            city_name: 'Pakhiralay',
            zone_name: destinationName,
            address: `Pakhiralay Tourist Hub, Gosaba, ${destinationName}`,
            starting_price: 3200,
            main_image: '/assets/img/innerpages/hotel-dt-gallery-img2.jpg',
            amenities: [
                "Swimming Pool",
                "Air Conditioned Luxury Rooms",
                "River-Facing Dining Deck",
                "24/7 Room Service",
                "Complimentary Breakfast",
                "Free Wi-Fi"
            ],
            room_types: [
                { name: "Luxury Riverfront Room", price: 3500, features: "Scenic River View, King Bed, Minibar" },
                { name: "Royal Forest Villa", price: 5500, features: "Jacuzzi, Private Lawn, Butler Service" }
            ]
        }
    ];

    const displayHotels = (referenceHotels && referenceHotels.length > 0)
        ? referenceHotels
        : defaultHotels;

    const getAmenityIcon = (amenity) => {
        const lower = (amenity || '').toLowerCase();
        if (lower.includes('wifi') || lower.includes('wi-fi')) return 'bi-wifi text-primary';
        if (lower.includes('pool')) return 'bi-water text-info';
        if (lower.includes('ac') || lower.includes('air')) return 'bi-wind text-primary';
        if (lower.includes('restaurant') || lower.includes('dining')) return 'bi-egg-fried text-warning';
        if (lower.includes('power') || lower.includes('backup')) return 'bi-lightning-charge-fill text-warning';
        if (lower.includes('boat') || lower.includes('transfer')) return 'bi-tsunami text-info';
        if (lower.includes('river') || lower.includes('balcony')) return 'bi-binoculars-fill text-success';
        if (lower.includes('breakfast')) return 'bi-cup-hot-fill text-danger';
        return 'bi-check2-circle text-success';
    };

    return (
        <div id="hotels" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">

            {/* SECTION HEADER */}
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <div>
                    <h3 className="h5 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                        <i className="bi bi-house-door-fill text-danger"></i>
                        <span>Accommodation & Reference Stays</span>
                    </h3>
                    <p className="text-secondary text-xs mb-0">
                        Handpicked verified eco-resorts, river lodges and premium jungle retreats included in your tour package
                    </p>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-1.5 rounded-pill text-xs fw-bold d-inline-flex align-items-center gap-1">
                    <i className="bi bi-patch-check-fill text-success"></i> Verified Partner Stays
                </span>
            </div>

            {/* HOTELS CARDS GRID */}
            <div className="row g-4">
                {displayHotels.map((hotel, index) => {
                    const hotelTargetUrl = `/hotel/${hotel.slug || urlEncode(hotel.id)}`;

                    const imgSrc = hotel.main_image
                        ? (hotel.main_image.startsWith('http') || hotel.main_image.startsWith('/')
                            ? hotel.main_image
                            : `${process.env.NEXT_PUBLIC_SERVER_URL}${hotel.main_image}`)
                        : "/assets/img/innerpages/hotel-dt-gallery-img1.jpg";

                    const amenitiesList = Array.isArray(hotel.amenities)
                        ? hotel.amenities
                        : (typeof hotel.amenities === 'string' ? JSON.parse(hotel.amenities || '[]') : []);

                    const roomTypesList = Array.isArray(hotel.room_types)
                        ? hotel.room_types
                        : (typeof hotel.room_types === 'string' ? JSON.parse(hotel.room_types || '[]') : []);

                    return (
                        <div key={hotel.id || index} className="col-12 col-md-6">
                            <div
                                className="hotel-reference-card card h-100 border rounded-4 overflow-hidden shadow-sm transition-all hover-lift bg-white d-flex flex-column justify-content-between"
                                style={{
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                    border: '1px solid #e2e8f0'
                                }}
                            >

                                <div>
                                    {/* PHOTO BANNER WITH OVERLAYS */}
                                    <Link
                                        href={hotelTargetUrl}
                                        className="position-relative overflow-hidden d-block text-decoration-none"
                                        style={{ height: '210px', backgroundColor: '#f1f5f9' }}
                                    >
                                        <img
                                            src={imgSrc}
                                            alt={hotel.name}
                                            className="w-100 h-100 object-fit-cover transition-all hotel-banner-img"
                                            onError={(e) => { e.target.src = "/assets/img/innerpages/hotel-dt-gallery-img1.jpg"; }}
                                            style={{ transition: 'transform 0.4s ease' }}
                                        />

                                        {/* Star Rating Badge (Top Left) */}
                                        <div className="position-absolute top-0 start-0 m-3">
                                            <span
                                                className="badge bg-warning text-dark fw-bold px-2.5 py-1.5 rounded-pill shadow-sm d-inline-flex align-items-center gap-1"
                                                style={{ fontSize: '11px' }}
                                            >
                                                <i className="bi bi-star-fill text-dark"></i>
                                                <span>{hotel.star_rating || 4} Star Stay</span>
                                            </span>
                                        </div>

                                        {/* Property Type Badge (Top Right) */}
                                        <div className="position-absolute top-0 end-0 m-3">
                                            <span
                                                className="badge bg-dark bg-opacity-75 text-white backdrop-blur px-2.5 py-1.5 rounded-pill text-xs fw-semibold"
                                                style={{ backdropFilter: 'blur(4px)' }}
                                            >
                                                {hotel.hotel_type || 'Eco Resort'}
                                            </span>
                                        </div>

                                        {/* Bottom Overlay Pill: Verified Stay */}
                                        <div
                                            className="position-absolute bottom-0 start-0 end-0 p-2.5 text-white d-flex align-items-center justify-content-between"
                                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
                                        >
                                            <span className="text-3xs text-light d-flex align-items-center gap-1">
                                                <i className="bi bi-geo-alt-fill text-warning"></i>
                                                <span>{hotel.city_name || hotel.zone_name || destinationName}</span>
                                            </span>
                                            <span className="badge bg-success bg-opacity-90 text-white rounded-pill text-3xs px-2 py-0.5">
                                                Package Included
                                            </span>
                                        </div>
                                    </Link>

                                    {/* CARD BODY */}
                                    <div className="p-3.5">
                                        {/* Hotel Title */}
                                        <h4
                                            className="h6 fw-bold text-dark mb-1"
                                            style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', lineHeight: '1.35' }}
                                        >
                                            <Link href={hotelTargetUrl} className="text-dark text-decoration-none hover-text-primary">
                                                {hotel.name}
                                            </Link>
                                        </h4>

                                        {/* Address / Location */}
                                        <p className="text-muted text-2xs mb-2.5 text-truncate" title={hotel.address}>
                                            <i className="bi bi-map me-1 text-secondary"></i>
                                            {hotel.address || `Located at tranquil riverside, ${destinationName}`}
                                        </p>

                                        {/* Amenities Preview Chips */}
                                        <div className="d-flex flex-wrap gap-1.5 mb-3">
                                            {amenitiesList.slice(0, 4).map((amenity, aIdx) => (
                                                <span
                                                    key={aIdx}
                                                    className="badge bg-light text-dark border px-2 py-1 d-inline-flex align-items-center gap-1"
                                                    style={{ fontSize: '10.5px' }}
                                                >
                                                    <i className={`bi ${getAmenityIcon(amenity)}`}></i>
                                                    <span>{amenity}</span>
                                                </span>
                                            ))}
                                            {amenitiesList.length > 4 && (
                                                <span
                                                    className="badge bg-primary bg-opacity-10 text-primary px-1.5 py-1"
                                                    style={{ fontSize: '10.5px' }}
                                                >
                                                    +{amenitiesList.length - 4} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Room Categories Preview */}
                                        {roomTypesList.length > 0 && (
                                            <div className="bg-light p-2 rounded-3 border mb-2">
                                                <small className="text-muted d-block text-3xs text-uppercase fw-bold mb-0.5">
                                                    Room Category Options:
                                                </small>
                                                <span className="text-dark fw-semibold text-2xs">
                                                    {roomTypesList.map(r => r.name).join(' • ')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* CARD FOOTER ACTION BAR */}
                                <div className="p-3 bg-light bg-opacity-50 border-top d-flex align-items-center justify-content-between">
                                    <div>
                                        <small className="text-muted d-block text-3xs">Accommodation</small>
                                        <span className="text-success fw-bold text-xs d-flex align-items-center gap-1">
                                            <i className="bi bi-check-circle-fill"></i> Included in Plan
                                        </span>
                                    </div>

                                    <Link
                                        href={hotelTargetUrl}
                                        className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 text-xs fw-bold d-inline-flex align-items-center gap-1.5 shadow-2xs hover-lift text-decoration-none"
                                    >
                                        <span>View Hotel Details</span>
                                        <i className="bi bi-arrow-right-short fs-6"></i>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
