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

    const popularDestinations = [
        { label: 'Sundarban', query: 'Sundarban' },
        { label: 'Goa', query: 'Goa' },
        { label: 'Kerala', query: 'Kerala' },
        { label: 'Kashmir', query: 'Kashmir' },
        { label: 'Himachal', query: 'Himachal' },
        { label: 'Rajasthan', query: 'Rajasthan' },
        { label: 'Thailand', query: 'Thailand' },
    ];

    const handleChipClick = (query) => {
        setSearchText(query);
        router.push('/packages/name-' + encodeURIComponent(query));
    };

    return (
        <div className="filter-wrapper">
            <div className="container">
                <div className="filter-input-wrap home m-auto position-relative" ref={dropdownRef} style={{ maxWidth: '900px', background: '#ffffff', borderRadius: '35px', padding: '12px 15px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #eef2f6' }}>
                    
                    {/* Search Form Bar */}
                    <form onSubmit={handleSearch} className="d-flex align-items-center gap-2 m-0 p-0">
                        <div className="d-flex align-items-center flex-grow-1 bg-light rounded-pill px-3 py-2 border" style={{ transition: 'border-color 0.2s ease', borderColor: '#e2e8f0' }}>
                            <i className="fa-solid fa-location-dot text-primary me-2" style={{ fontSize: '18px', color: '#0066cc' }}></i>
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onFocus={() => {
                                    if (searchResults && hasResults) setIsOpen(true);
                                }}
                                className="w-100 bg-transparent border-0 text-dark outline-none"
                                style={{ outline: 'none', fontSize: '15px', color: '#1f2937' }}
                                placeholder="Where do you want to go? (e.g. Sundarban, Goa, Kerala...)"
                            />
                            {searchText && (
                                <button
                                    type="button"
                                    onClick={() => { setSearchText(''); setIsOpen(false); }}
                                    className="btn btn-link text-muted p-0 ms-2 text-decoration-none"
                                    style={{ border: 'none', background: 'transparent' }}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                        </div>

                        <button 
                            onClick={handleSearch} 
                            type="submit" 
                            className="btn text-white rounded-pill px-4 py-2 d-flex align-items-center gap-2 flex-shrink-0"
                            style={{ backgroundColor: '#0066cc', border: 'none', height: '48px', fontSize: '15px', fontWeight: 500 }}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <span>Search Holidays</span>
                        </button>
                    </form>

                    {/* LIVE SEARCH AUTOCOMPLETE DROPDOWN */}
                    {isOpen && (
                        <div
                            className="position-absolute start-0 end-0 top-100 mt-2 bg-white rounded-4 shadow-lg border text-dark overflow-hidden"
                            style={{ zIndex: 1050, maxHeight: '420px', overflowY: 'auto', borderColor: '#e2e8f0' }}
                        >
                            {loading ? (
                                <div className="p-3 text-center text-muted" style={{ fontSize: '13px' }}>
                                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                                    Searching destinations & packages...
                                </div>
                            ) : hasResults ? (
                                <div className="p-2">
                                    {/* Grouped: Cities & Destinations */}
                                    {citiesAndDestinations.length > 0 && (
                                        <div className="mb-2">
                                            <div className="px-3 py-1 text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                Destinations & Cities
                                            </div>
                                            {citiesAndDestinations.map((item) => (
                                                <div
                                                    key={`${item.type}-${item.id}`}
                                                    onClick={() => handleSelectResult(item)}
                                                    className="d-flex align-items-center justify-content-between px-3 py-2 cursor-pointer rounded-3 transition-all"
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
                                                            <h6 className="mb-0 text-dark text-truncate" style={{ fontSize: '14px', lineHeight: '1.3' }}>
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
                                            <div className="px-3 py-1 text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                Holiday Packages
                                            </div>
                                            {packagesList.map((pkg) => (
                                                <div
                                                    key={`pkg-${pkg.id}`}
                                                    onClick={() => handleSelectResult(pkg)}
                                                    className="d-flex align-items-center justify-content-between px-3 py-2 cursor-pointer rounded-3 transition-all"
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
                                                            <h6 className="mb-0 text-dark text-truncate" style={{ fontSize: '14px', lineHeight: '1.3' }}>
                                                                {pkg.title || pkg.name}
                                                            </h6>
                                                            <span className="text-muted text-capitalize" style={{ fontSize: '11px' }}>
                                                                {pkg.package_type_name || 'Holiday Package'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className="badge rounded-pill border px-2 py-1 flex-shrink-0 ms-2 text-capitalize"
                                                        style={{ fontSize: '10px', backgroundColor: '#eff6ff', color: '#0066cc', borderColor: '#bfdbfe' }}
                                                    >
                                                        Package
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Flat list fallback */}
                                    {(!grouped || (citiesAndDestinations.length === 0 && packagesList.length === 0)) && (
                                        searchResults.results.map((item) => (
                                            <div
                                                key={`${item.type}-${item.id}`}
                                                onClick={() => handleSelectResult(item)}
                                                className="d-flex align-items-center justify-content-between px-3 py-2 cursor-pointer rounded-3 transition-all"
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
                                                        <h6 className="mb-0 text-dark text-truncate" style={{ fontSize: '14px', lineHeight: '1.3' }}>
                                                            {item.name || item.title}
                                                        </h6>
                                                        <span className="text-muted text-capitalize" style={{ fontSize: '11px' }}>
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="badge bg-light text-dark border text-capitalize" style={{ fontSize: '10px' }}>{item.type}</span>
                                            </div>
                                        ))
                                    )}

                                    <div
                                        onClick={handleSearch}
                                        className="p-2 text-center text-primary border-top bg-light cursor-pointer rounded-bottom-3"
                                        style={{ cursor: 'pointer', fontSize: '13px' }}
                                    >
                                        See all results for "{searchText}" ➔
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3 text-center text-muted" style={{ fontSize: '13px' }}>
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