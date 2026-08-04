'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getSearchUrl } from '@/routes/packageRoutes';
import { urlEncode } from '@/libs/urlHelper';

function Filter() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef(null);

    // Debounced Search API Call
    useEffect(() => {
        if (!searchText || searchText.trim().length < 2) {
            setSearchResults(null);
            setIsOpen(false);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(true);
            axios.post(getSearchUrl, { search: searchText.trim() })
                .then((res) => {
                    if (res.data?.status) {
                        setSearchResults(res.data);
                        setIsOpen(true);
                    } else {
                        setSearchResults(null);
                    }
                })
                .catch(() => {
                    // Fallback to GET request if POST fails
                    axios.get(`${getSearchUrl}?search=${encodeURIComponent(searchText.trim())}`)
                        .then((res) => {
                            if (res.data?.status) {
                                setSearchResults(res.data);
                                setIsOpen(true);
                            }
                        })
                        .catch(() => setSearchResults(null));
                })
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(timer);
    }, [searchText]);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleSearch(e) {
        if (e) e.preventDefault();
        if (!searchText || !searchText.trim()) return;
        setIsOpen(false);
        router.push('/packages/name-' + encodeURIComponent(searchText.trim()));
    }

    function handleSelectResult(item) {
        setIsOpen(false);
        if (item.type === 'city') {
            router.push(`/packages/city-${item.slug}`);
        } else if (item.type === 'zone') {
            router.push(`/packages/destination-${item.slug}`);
        } else if (item.type === 'package') {
            const pkgSlug = item.slug || 'package';
            router.push(`/package/${pkgSlug}`);
        } else {
            router.push(`/packages/name-${encodeURIComponent(item.name || item.title || searchText)}`);
        }
    }

    function getItemImageUrl(item) {
        const rawPath = item.path || item.city_image || item.image || item.zone_image || item.cover_image;
        if (rawPath) {
            if (rawPath.startsWith('http')) return rawPath;
            return `${process.env.NEXT_PUBLIC_SERVER_URL}${rawPath.replace(/\\/g, '/')}`;
        }
        return '/assets/images/noimage.jpg';
    }

    const hasResults = searchResults?.results && searchResults.results.length > 0;
    const grouped = searchResults?.groupedResults;

    // Combine Cities & Zones for "Cities & Destinations" section
    const citiesAndDestinations = [
        ...(grouped?.cities || []),
        ...(grouped?.zones || [])
    ];

    const packagesList = grouped?.packages || [];

    return (
        <div className="filter-wrapper">
            <div className="container">
                <div className="filter-input-wrap home m-auto p-0 position-relative" ref={dropdownRef}>
                    <form onSubmit={handleSearch} className="filter-input show">
                        <div className="single-search-box w-100 p-0 ps-3 m-0 justify-content-between border-0">
                            <div className="form-inner2 p-0">
                                <i className="bi bi-search"></i>
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onFocus={() => {
                                        if (searchResults && hasResults) setIsOpen(true);
                                    }}
                                    className="w-100 h-100"
                                    placeholder="Enter your dream destination (e.g. Goa, Western Zone)"
                                />
                            </div>
                            <button onClick={handleSearch} type="submit" className="primary-btn1 h-100">
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M17.7799 16.746L14.6861 13.7226L14.6137 13.6126C14.4774 13.4781 14.2936 13.4028 14.1022 13.4028C13.9107 13.4028 13.7269 13.4781 13.5906 13.6126C10.9613 16.0246 6.91095 16.1554 4.12376 13.9188C1.33658 11.6821 0.680209 7.7696 2.58814 4.77921C4.49607 1.78882 8.37732 0.64519 11.6585 2.10734C14.9396 3.56949 16.5993 7.18566 15.539 10.555C15.5016 10.675 15.4972 10.8029 15.5262 10.9251C15.5552 11.0474 15.6166 11.1597 15.7039 11.2501C15.7921 11.3421 15.9027 11.4097 16.0248 11.4463C16.1469 11.4829 16.2764 11.4872 16.4007 11.4589C16.5243 11.4317 16.6387 11.3725 16.7323 11.2872C16.8258 11.202 16.8954 11.0936 16.934 10.973C18.1996 6.97472 16.2878 2.6716 12.434 0.848041C8.58017 -0.975514 3.94271 0.225775 1.52009 3.67706C-0.902526 7.12835 -0.382565 11.7918 2.74388 14.6518C5.87033 17.5118 10.6646 17.7083 14.0273 15.1173L16.7667 17.7955C16.9042 17.9276 17.0875 18.0014 17.2782 18.0014C17.4689 18.0014 17.6522 17.9276 17.7897 17.7955C17.8568 17.7298 17.9101 17.6513 17.9465 17.5648C17.9829 17.4782 18.0016 17.3852 18.0016 17.2913C18.0016 17.1974 17.9829 17.1045 17.9465 17.0179C17.9101 16.9313 17.8568 16.8529 17.7897 16.7872L17.7799 16.746Z" fill="currentColor"></path>
                                        </g>
                                    </svg>
                                    SEARCH
                                </span>
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M17.7799 16.746L14.6861 13.7226L14.6137 13.6126C14.4774 13.4781 14.2936 13.4028 14.1022 13.4028C13.9107 13.4028 13.7269 13.4781 13.5906 13.6126C10.9613 16.0246 6.91095 16.1554 4.12376 13.9188C1.33658 11.6821 0.680209 7.7696 2.58814 4.77921C4.49607 1.78882 8.37732 0.64519 11.6585 2.10734C14.9396 3.56949 16.5993 7.18566 15.539 10.555C15.5016 10.675 15.4972 10.8029 15.5262 10.9251C15.5552 11.0474 15.6166 11.1597 15.7039 11.2501C15.7921 11.3421 15.9027 11.4097 16.0248 11.4463C16.1469 11.4829 16.2764 11.4872 16.4007 11.4589C16.5243 11.4317 16.6387 11.3725 16.7323 11.2872C16.8258 11.202 16.8954 11.0936 16.934 10.973C18.1996 6.97472 16.2878 2.6716 12.434 0.848041C8.58017 -0.975514 3.94271 0.225775 1.52009 3.67706C-0.902526 7.12835 -0.382565 11.7918 2.74388 14.6518C5.87033 17.5118 10.6646 17.7083 14.0273 15.1173L16.7667 17.7955C16.9042 17.9276 17.0875 18.0014 17.2782 18.0014C17.4689 18.0014 17.6522 17.9276 17.7897 17.7955C17.8568 17.7298 17.9101 17.6513 17.9465 17.5648C17.9829 17.4782 18.0016 17.3852 18.0016 17.2913C18.0016 17.1974 17.9829 17.1045 17.9465 17.0179C17.9101 16.9313 17.8568 16.8529 17.7897 16.7872L17.7799 16.746Z" fill="currentColor"></path>
                                        </g>
                                    </svg>
                                    SEARCH
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* LIVE SEARCH AUTOCOMPLETE DROPDOWN */}
                    {isOpen && (
                        <div
                            className="position-absolute start-0 end-0 top-100 mt-2 bg-white rounded-3 shadow-lg border text-dark overflow-hidden"
                            style={{ zIndex: 1050, maxHeight: '420px', overflowY: 'auto' }}
                        >
                            {loading ? (
                                <div className="p-3 text-center text-muted text-xs">
                                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                                    Searching destinations & packages...
                                </div>
                            ) : hasResults ? (
                                <div className="p-2">
                                    {/* Grouped: Cities & Destinations */}
                                    {citiesAndDestinations.length > 0 && (
                                        <div className="mb-2">
                                            {citiesAndDestinations.map((item) => (
                                                <div
                                                    key={`${item.type}-${item.id}`}
                                                    onClick={() => handleSelectResult(item)}
                                                    className="d-flex align-items-center justify-content-between px-3 py-2 cursor-pointer rounded transition-all"
                                                    style={{ cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <div className="d-flex align-items-center gap-3 overflow-hidden">
                                                        <img
                                                            src={getItemImageUrl(item)}
                                                            alt={item.name || item.title}
                                                            className="rounded-2 object-fit-cover flex-shrink-0"
                                                            style={{ width: '40px', height: '40px' }}
                                                            onError={(e) => { e.target.src = '/assets/images/noimage.jpg'; }}
                                                        />
                                                        <div className="text-truncate">
                                                            <h6 className="mb-0 fw-semibold text-dark text-truncate" style={{ fontSize: '14px', lineHeight: '1.3' }}>
                                                                {item.name || item.title}
                                                            </h6>
                                                            <span className="text-muted text-capitalize" style={{ fontSize: '11px' }}>
                                                                {item.type === 'zone' ? 'Destination Zone' : 'City'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className="badge rounded-pill border px-2 py-1 flex-shrink-0 ms-2 text-capitalize"
                                                        style={{ fontSize: '10px', backgroundColor: '#f1f5f9', color: '#475569', borderColor: '#cbd5e1' }}
                                                    >
                                                        {item.type}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Grouped: Packages */}
                                    {packagesList.length > 0 && (
                                        <div className="mb-2">
                                            {packagesList.map((pkg) => (
                                                <div
                                                    key={`pkg-${pkg.id}`}
                                                    onClick={() => handleSelectResult(pkg)}
                                                    className="d-flex align-items-center justify-content-between px-3 py-2 cursor-pointer rounded transition-all"
                                                    style={{ cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <div className="d-flex align-items-center gap-3 overflow-hidden">
                                                        <img
                                                            src={getItemImageUrl(pkg)}
                                                            alt={pkg.title || pkg.name}
                                                            className="rounded-2 object-fit-cover flex-shrink-0"
                                                            style={{ width: '40px', height: '40px' }}
                                                            onError={(e) => { e.target.src = '/assets/images/noimage.jpg'; }}
                                                        />
                                                        <div className="text-truncate">
                                                            <h6 className="mb-0 fw-semibold text-dark text-truncate" style={{ fontSize: '14px', lineHeight: '1.3' }}>
                                                                {pkg.title || pkg.name}
                                                            </h6>
                                                            <span className="text-muted text-capitalize" style={{ fontSize: '11px' }}>
                                                                {pkg.package_type_name || 'Holiday Package'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className="badge rounded-pill border px-2 py-1 flex-shrink-0 ms-2 text-capitalize"
                                                        style={{ fontSize: '10px', backgroundColor: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}
                                                    >
                                                        Package
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Flat list fallback if groupedResults structure isn't populated */}
                                    {(!grouped || (citiesAndDestinations.length === 0 && packagesList.length === 0)) && (
                                        searchResults.results.map((item) => (
                                            <div
                                                key={`${item.type}-${item.id}`}
                                                onClick={() => handleSelectResult(item)}
                                                className="d-flex align-items-center justify-content-between px-3 py-2 cursor-pointer rounded transition-all"
                                                style={{ cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <div className="d-flex align-items-center gap-3 overflow-hidden">
                                                    <img
                                                        src={getItemImageUrl(item)}
                                                        alt={item.name || item.title}
                                                        className="rounded-2 object-fit-cover flex-shrink-0"
                                                        style={{ width: '40px', height: '40px' }}
                                                        onError={(e) => { e.target.src = '/assets/images/noimage.jpg'; }}
                                                    />
                                                    <div className="text-truncate">
                                                        <h6 className="mb-0 fw-semibold text-dark text-truncate" style={{ fontSize: '14px', lineHeight: '1.3' }}>
                                                            {item.name || item.title}
                                                        </h6>
                                                        <span className="text-muted text-capitalize" style={{ fontSize: '11px' }}>
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="badge bg-light text-dark text-2xs border text-capitalize">{item.type}</span>
                                            </div>
                                        ))
                                    )}

                                    <div
                                        onClick={handleSearch}
                                        className="p-2 text-center text-primary fw-bold text-xs border-top bg-light cursor-pointer rounded-bottom"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        See all results for "{searchText}" ➔
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3 text-center text-muted text-xs">
                                    No destinations or packages found for "{searchText}"
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Filter;