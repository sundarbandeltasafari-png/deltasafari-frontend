'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { axiosNormalPost } from '@/libs/axiosHelper';
import { getFilterPackages } from '@/routes/packageRoutes';
import './page.css';
import { useParams, useRouter } from 'next/navigation';
import { urlEncode } from '@/libs/urlHelper';
import HomeBanner from '@/components/website/home/HomeBanner';
import Filter from '@/components/website/home/Filter';
import Link from 'next/link';

export default function TravelPackageListPage() {
  const params = useParams();
  // --- DATA STATES ---
  const [dbPackages, setDbPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const router = useRouter()

  // --- CEILING PRICE DETERMINATION ---
  const maxAvailablePrice = useMemo(() => {
    if (dbPackages.length === 0) return 50000;
    return Math.max(...dbPackages.map(p => p.actual_price || 0));
  }, [dbPackages]);

  // --- FILTER STATES ---
  const [selectedPackageType, setSelectedPackageType] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [durationFilter, setDurationFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('All Packages');
  const [sortBy, setSortBy] = useState('Default');

  // --- DROPDOWN CONTROL STATE ---
  const [openDropdown, setOpenDropdown] = useState(null);
  const filterBarRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- COMPARE STATES ---
  const [compareIds, setCompareIds] = useState([]);
  const [isComparing, setIsComparing] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.1 });

  // Update dynamic max value when data loads
  useEffect(() => {
    if (maxAvailablePrice) {
      setMaxPrice(maxAvailablePrice);
    }
  }, [maxAvailablePrice]);

  // --- FETCH DATA ---
  useEffect(() => {
    setLoading(true);
    const filter = params.slug && parseSlugFilters(params.slug);
    axiosNormalPost(getFilterPackages, filter)
      .then((res) => {
        if (res && res.packages) {
          const data = Array.isArray(res.packages) ? res.packages : [];
          setDbPackages(data);
        }
      })
      .catch((err) => console.error("Error fetching packages:", err))
      .finally(() => setLoading(false));
  }, []);

  // --- FILTER & SORT LOGIC ---
  const filteredPackages = useMemo(() => {
    let result = [...dbPackages];

    if (selectedPackageType !== 'All') {
      result = result.filter(pkg => pkg.package_type_name === selectedPackageType);
    }

    // Dynamic Min & Max Budget Sliders Matching
    result = result.filter(pkg => (pkg.actual_price || 0) >= minPrice && (pkg.actual_price || 0) <= maxPrice);

    if (durationFilter !== 'All') {
      if (durationFilter === '1-3') result = result.filter(pkg => pkg.duration_days <= 3);
      if (durationFilter === '4-7') result = result.filter(pkg => pkg.duration_days >= 4 && pkg.duration_days <= 7);
      if (durationFilter === '8+') result = result.filter(pkg => pkg.duration_days >= 8);
    }

    if (activeTab === 'Top Selling') {
      result = result.filter(pkg => pkg.sort_order === 1);
    } else if (activeTab === 'Guided Tours' || activeTab === 'Package with Tour Manager') {
      result = result.filter(pkg => pkg.package_type_name?.toLowerCase().includes('group') || pkg.package_type === 1);
    }

    if (sortBy === 'PriceLowHigh') {
      result.sort((a, b) => (a.actual_price || 0) - (b.actual_price || 0));
    } else if (sortBy === 'PriceHighLow') {
      result.sort((a, b) => (b.actual_price || 0) - (a.actual_price || 0));
    }

    return result;
  }, [dbPackages, selectedPackageType, minPrice, maxPrice, durationFilter, activeTab, sortBy]);

  useEffect(() => {
    if (inView && visibleCount < filteredPackages.length) {
      setVisibleCount(prev => prev + 6);
    }
  }, [inView, filteredPackages.length, visibleCount]);

  const handleResetAll = () => {
    setSelectedPackageType('All');
    setMinPrice(0);
    setMaxPrice(maxAvailablePrice);
    setDurationFilter('All');
    setActiveTab('All Packages');
    setSortBy('Default');
    setVisibleCount(6);
  };

  const toggleCompare = (id) => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const safeParseJSON = (jsonString) => {
    try {
      if (!jsonString) return [];
      if (Array.isArray(jsonString)) return jsonString;
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  const availableTypes = useMemo(() => {
    return ['All', ...new Set(dbPackages.map(p => p.package_type_name).filter(Boolean))];
  }, [dbPackages]);

  const comparedPackages = useMemo(() => {
    return dbPackages.filter(p => compareIds.includes(p.id));
  }, [dbPackages, compareIds]);

  const displayedPackages = filteredPackages.slice(0, visibleCount);

  // --- CONDITIONAL VIEW RENDERING (COMPARE SCREEN VIEW MODE) ---
  if (isComparing) {
    return (
      <div className="bg-white min-vh-100 py-4 text-dark font-sans">
        <div className="container">

          {/* Header */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <button className="btn btn-link text-dark fw-bold h4 text-decoration-none p-0 d-flex align-items-center gap-2" onClick={() => setIsComparing(false)}>
              <i className="bi bi-arrow-left"></i> Compare Packages ({comparedPackages.length})
            </button>
            <button className="btn btn-outline-primary text-xs rounded-3 px-3 py-2 fw-medium" onClick={() => setIsComparing(false)}>
              Back to List
            </button>
          </div>

          {comparedPackages.length === 0 ? (
            <div className="text-center py-5 border rounded-4 bg-light">
              <i className="bi bi-layers text-muted display-5"></i>
              <h5 className="fw-bold mt-3">No Packages Selected</h5>
              <p className="text-muted text-xs">Go back and pick items to display side-by-side.</p>
              <button className="btn btn-primary btn-sm mt-2" onClick={() => setIsComparing(false)}>Return to List</button>
            </div>
          ) : (
            <div className="table-responsive shadow-sm rounded-3 border">
              <table className="table table-bordered mb-0 align-middle compare-table">
                <thead className="table-light text-center">
                  <tr>
                    <th className="text-start bg-light text-secondary small fw-bold" style={{ width: '18%' }}>Features</th>
                    {comparedPackages.map(pkg => (
                      <th key={pkg.id} className="text-start text-xs fw-bold text-dark py-3" style={{ width: `${82 / comparedPackages.length}%` }}>
                        <div className="d-flex align-items-center justify-content-between gap-2">
                          <span className="text-truncate">{pkg.title}</span>
                          <button className="btn btn-link text-danger p-0 ms-2" title="Remove" onClick={() => toggleCompare(pkg.id)}>
                            <i className="bi bi-x-circle-fill"></i>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Row: Picture */}
                  <tr>
                    <td className="fw-bold text-secondary small">Package Preview</td>
                    {comparedPackages.map(pkg => {
                      const imgUrl = pkg.path ? process.env.NEXT_PUBLIC_SERVER_URL + `${pkg.path.replace(/\\/g, '/')}` : '/assets/images/noimage.jpg';
                      return (
                        <td key={pkg.id} className="text-center p-2">
                          <div className="position-relative overflow-hidden rounded-3" style={{ height: '140px' }}>
                            <img src={imgUrl} alt={pkg.title} className="w-100 h-100 object-fit-cover" />
                            {pkg.package_type_name && (
                              <span className="position-absolute top-0 end-0 m-2 badge bg-primary text-2xs">
                                {pkg.package_type_name}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: Duration */}
                  <tr>
                    <td className="fw-bold text-secondary small">Duration</td>
                    {comparedPackages.map(pkg => (
                      <td key={pkg.id} className="text-center fw-semibold text-xs">
                        <i className="bi bi-clock text-warning me-1"></i>
                        {pkg.duration_days || 1} Days / {pkg.duration_nights || 0} Nights
                      </td>
                    ))}
                  </tr>

                  {/* Row: Destination / Route */}
                  <tr>
                    <td className="fw-bold text-secondary small">Route & Cities</td>
                    {comparedPackages.map(pkg => (
                      <td key={pkg.id} className="text-center text-xs fw-medium text-primary">
                        {pkg.from_destination_name ? `${pkg.from_destination_name} ➔ ` : ''}
                        {pkg.to_destination_name || 'Destination'}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Inclusions */}
                  <tr>
                    <td className="fw-bold text-secondary small">Inclusions</td>
                    {comparedPackages.map(pkg => {
                      const incList = safeParseJSON(pkg.inclusions);
                      return (
                        <td key={pkg.id} className="p-3 align-top text-xs">
                          {incList && incList.length > 0 ? (
                            <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                              {incList.map((inc, i) => (
                                <li key={i} className="d-flex align-items-center gap-1.5">
                                  <i className="bi bi-check-circle-fill text-success me-1"></i>
                                  <span>{typeof inc === 'object' ? (inc.name || JSON.stringify(inc)) : inc}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-muted italic">Standard Holiday Inclusions</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: Price Per Person */}
                  <tr>
                    <td className="fw-bold text-secondary small">Price</td>
                    {comparedPackages.map(pkg => {
                      const priceText = pkg.actual_price ? `₹${Number(pkg.actual_price).toLocaleString('en-IN')}` : 'Contact Us';
                      const mrpText = pkg.mrp_price ? `₹${Number(pkg.mrp_price).toLocaleString('en-IN')}` : null;
                      return (
                        <td key={pkg.id} className="text-center py-3">
                          <div className="h5 fw-bold text-primary mb-0">{priceText}</div>
                          {mrpText && <small className="text-muted text-decoration-line-through me-2 text-2xs">{mrpText}</small>}
                          <span className="text-2xs text-muted d-block mt-0.5">Per Person</span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: Action Controls Footer */}
                  <tr>
                    <td className="bg-light"></td>
                    {comparedPackages.map(pkg => {
                      const detailsUrl = `/package/${pkg.to_destination_slug || 'destination'}/${pkg.slug}-${urlEncode(pkg.id)}`;
                      return (
                        <td key={pkg.id} className="p-3 text-center">
                          <Link href={detailsUrl} className="primary-btn1 py-2 px-3 text-xs d-inline-block">
                            <span>Book Now</span>
                            <span>Book Now</span>
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- STANDARD PACKAGES FEED MODULE ---
  return (
    <>
      <HomeBanner />
      <Filter />
      <div className="bg-light min-vh-100 py-4 font-sans text-dark position-relative">

        {/* STICKY FLOATING COMPARE ACTION TRIGGER STRIP */}
        {compareIds.length > 0 && (
          <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow-lg bg-dark text-white rounded-pill px-4 py-3 d-flex align-items-center gap-4 border border-secondary transition-all" style={{ zIndex: 1050 }}>
            <span className="text-xs fw-semibold">
              <i className="bi bi-layers-half text-warning me-2"></i>
              {compareIds.length} Package{compareIds.length > 1 ? 's' : ''} Selected
            </span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-warning rounded-pill px-3 py-1 text-xs fw-bold" onClick={() => setIsComparing(true)}>
                Compare Packages <i className="bi bi-chevron-right small ms-1"></i>
              </button>
              <button className="btn btn-sm btn-outline-light rounded-pill p-1 px-2 text-2xs" onClick={() => setCompareIds([])}>
                Clear
              </button>
            </div>
          </div>
        )}

        <div className="container">

          {/* TOP EASEMYTRIP-STYLE FILTER BAR (SINGLE ROW HORIZONTAL SCROLL ON MOBILE) */}
          <div className="card border-0 shadow-xs px-3 py-2 bg-white rounded-4 mb-4 position-relative" style={{ zIndex: 500, overflow: 'visible' }} ref={filterBarRef}>
            <div className="d-flex align-items-center justify-content-between gap-2">
              
              {/* Single-row horizontal scrolling container for filter pills */}
              <div className="d-flex flex-nowrap align-items-center gap-2 overflow-x-auto scroll-x-single-row py-1 flex-grow-1">

                {/* Sort By Pill */}
                <button 
                  className={`btn text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0 ${sortBy !== 'Default' ? 'btn-primary text-white border-primary' : 'btn-light bg-white text-dark'}`} 
                  type="button"
                  onClick={() => toggleDropdown('sort')}
                >
                  <i className="bi bi-arrow-down-up me-1"></i>
                  Sort By: <span className="fw-semibold ms-1">{sortBy === 'Default' ? 'Default' : sortBy === 'PriceLowHigh' ? 'Price: Low to High' : 'Price: High to Low'}</span>
                  <i className="bi bi-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
                </button>

                {/* Package Type Pill */}
                <button 
                  className={`btn text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0 ${selectedPackageType !== 'All' ? 'btn-primary text-white border-primary' : 'btn-light bg-white text-dark'}`} 
                  type="button"
                  onClick={() => toggleDropdown('type')}
                >
                  <i className="bi bi-funnel me-1"></i>
                  Type: <span className="fw-semibold ms-1">{selectedPackageType}</span>
                  <i className="bi bi-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
                </button>

                {/* Budget Pill */}
                <button 
                  className={`btn text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0 ${(minPrice > 0 || maxPrice < maxAvailablePrice) ? 'btn-primary text-white border-primary' : 'btn-light bg-white text-dark'}`} 
                  type="button"
                  onClick={() => toggleDropdown('price')}
                >
                  <i className="bi bi-currency-rupee me-1"></i>
                  Budget: <span className="fw-semibold ms-1">₹{minPrice.toLocaleString('en-IN')} - ₹{maxPrice.toLocaleString('en-IN')}</span>
                  <i className="bi bi-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
                </button>

                {/* Duration Pill */}
                <button 
                  className={`btn text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0 ${durationFilter !== 'All' ? 'btn-primary text-white border-primary' : 'btn-light bg-white text-dark'}`} 
                  type="button"
                  onClick={() => toggleDropdown('duration')}
                >
                  <i className="bi bi-clock me-1"></i>
                  Duration: <span className="fw-semibold ms-1">{durationFilter === 'All' ? 'All' : `${durationFilter} Days`}</span>
                  <i className="bi bi-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
                </button>

              </div>

              {/* Reset Button */}
              <button className="btn btn-link text-danger text-xs fw-semibold text-decoration-none px-2 flex-shrink-0 ms-auto" onClick={() => { handleResetAll(); setOpenDropdown(null); }}>
                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset
              </button>
            </div>

            {/* UNCLIPPED FLOATING DROPDOWN MENUS POSITIONED TO FILTER CARD */}
            {openDropdown === 'sort' && (
              <div className="position-absolute start-0 top-100 mt-2 bg-white rounded-3 shadow-lg border p-2 text-xs" style={{ zIndex: 1050, minWidth: '220px', marginLeft: '12px' }}>
                <div className="fw-bold px-3 py-1.5 text-muted border-bottom text-2xs text-uppercase mb-1">Sort Packages</div>
                <button className={`dropdown-item rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${sortBy === 'Default' ? 'active fw-bold' : ''}`} onClick={() => { setSortBy('Default'); setOpenDropdown(null); }}>
                  Default Sort {sortBy === 'Default' && <i className="bi bi-check2"></i>}
                </button>
                <button className={`dropdown-item rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${sortBy === 'PriceLowHigh' ? 'active fw-bold' : ''}`} onClick={() => { setSortBy('PriceLowHigh'); setOpenDropdown(null); }}>
                  Price: Low to High {sortBy === 'PriceLowHigh' && <i className="bi bi-check2"></i>}
                </button>
                <button className={`dropdown-item rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${sortBy === 'PriceHighLow' ? 'active fw-bold' : ''}`} onClick={() => { setSortBy('PriceHighLow'); setOpenDropdown(null); }}>
                  Price: High to Low {sortBy === 'PriceHighLow' && <i className="bi bi-check2"></i>}
                </button>
              </div>
            )}

            {openDropdown === 'type' && (
              <div className="position-absolute start-0 top-100 mt-2 bg-white rounded-3 shadow-lg border p-2 text-xs" style={{ zIndex: 1050, minWidth: '240px', maxHeight: '280px', overflowY: 'auto', marginLeft: '120px' }}>
                <div className="fw-bold px-3 py-1.5 text-muted border-bottom text-2xs text-uppercase mb-1">Package Type</div>
                {availableTypes.map((type, i) => (
                  <button key={i} className={`dropdown-item rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${selectedPackageType === type ? 'active fw-bold' : ''}`} onClick={() => { setSelectedPackageType(type); setOpenDropdown(null); }}>
                    {type} {selectedPackageType === type && <i className="bi bi-check2"></i>}
                  </button>
                ))}
              </div>
            )}

            {openDropdown === 'price' && (
              <div className="position-absolute start-0 top-100 mt-2 bg-white rounded-3 shadow-lg border p-3 text-xs" style={{ zIndex: 1050, width: '300px', marginLeft: '200px' }}>
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                  <h6 className="fw-bold mb-0 text-dark text-xs">Filter By Price Range</h6>
                  <button className="btn-close btn-sm" onClick={() => setOpenDropdown(null)}></button>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between text-2xs text-muted mb-1">
                    <span>Min Price</span>
                    <strong className="text-primary">₹{minPrice.toLocaleString('en-IN')}</strong>
                  </div>
                  <input type="range" className="form-range" min="0" max={maxAvailablePrice} step="500" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between text-2xs text-muted mb-1">
                    <span>Max Price</span>
                    <strong className="text-primary">₹{maxPrice.toLocaleString('en-IN')}</strong>
                  </div>
                  <input type="range" className="form-range" min="0" max={maxAvailablePrice} step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                </div>
                <div className="d-flex justify-content-between text-2xs text-muted border-top pt-2 mt-2">
                  <span>Min: ₹0</span>
                  <span>Max: ₹{maxAvailablePrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}

            {openDropdown === 'duration' && (
              <div className="position-absolute start-0 top-100 mt-2 bg-white rounded-3 shadow-lg border p-2 text-xs" style={{ zIndex: 1050, minWidth: '200px', marginLeft: '300px' }}>
                <div className="fw-bold px-3 py-1.5 text-muted border-bottom text-2xs text-uppercase mb-1">Duration</div>
                <button className={`dropdown-item rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${durationFilter === 'All' ? 'active fw-bold' : ''}`} onClick={() => { setDurationFilter('All'); setOpenDropdown(null); }}>
                  All Durations {durationFilter === 'All' && <i className="bi bi-check2"></i>}
                </button>
                <button className={`dropdown-item rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${durationFilter === '1-3' ? 'active fw-bold' : ''}`} onClick={() => { setDurationFilter('1-3'); setOpenDropdown(null); }}>
                  1 - 3 Days {durationFilter === '1-3' && <i className="bi bi-check2"></i>}
                </button>
                <button className={`dropdown-item rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${durationFilter === '4-7' ? 'active fw-bold' : ''}`} onClick={() => { setDurationFilter('4-7'); setOpenDropdown(null); }}>
                  4 - 7 Days {durationFilter === '4-7' && <i className="bi bi-check2"></i>}
                </button>
                <button className={`dropdown-item rounded-2 py-2 px-3 d-flex align-items-center justify-content-between ${durationFilter === '8+' ? 'active fw-bold' : ''}`} onClick={() => { setDurationFilter('8+'); setOpenDropdown(null); }}>
                  8+ Days {durationFilter === '8+' && <i className="bi bi-check2"></i>}
                </button>
              </div>
            )}
          </div>

        {/* HORIZONTAL SUB-TABS LINKS */}
        {/* <div className="card border-0 shadow-xs bg-white rounded-3 mb-4 overflow-hidden">
          <div className="d-flex border-bottom flex-wrap bg-white scroll-x-clean">
            {[
              { id: 'All Packages', icon: 'bi-box' },
              { id: 'Top Selling', icon: 'bi-fire' },
              { id: 'Package with Tour Manager', icon: 'bi-person-badge' },
              { id: 'Guided Tours', icon: 'bi-compass' },
              { id: 'All-Inclusive Package', icon: 'bi-gift' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn rounded-0 px-4 py-3 text-xs fw-semibold border-0 d-flex align-items-center gap-2 text-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'text-primary bg-light border-bottom-primary border-3 fw-bold' 
                    : 'text-secondary hover-bg-light'
                }`}
              >
                <i className={`bi ${tab.icon} ${activeTab === tab.id ? 'text-primary' : 'text-muted'}`}></i>
                {tab.id}
              </button>
            ))}
          </div>
        </div> */}

        {/* PACKAGE GRID Display (3 Columns) */}
        {loading ? (
          <div className="text-center py-5 card border-0 shadow-sm bg-white rounded-4 align-items-center">
            <div className="spinner-border text-primary my-4" role="status"></div>
            <p className="text-muted text-sm">Searching holiday departures...</p>
          </div>
        ) : displayedPackages.length === 0 ? (
          <div className="card text-center p-5 border-0 shadow-sm bg-white rounded-4">
            <i className="bi bi-search text-muted display-6"></i>
            <h5 className="fw-bold mt-3 mb-1">No Matching Packages</h5>
            <p className="text-muted text-xs max-w-sm mx-auto">Try relaxing your price filters or filtration selectors.</p>
          </div>
        ) : (
          <div className="row g-4">
            {displayedPackages.map((pkg) => {
              const inclusions = safeParseJSON(pkg.inclusions);
              const imgUrl = pkg.path ? process.env.NEXT_PUBLIC_SERVER_URL + `${pkg.path.replace(/\\/g, '/')}` : '/assets/images/noimage.jpg';

              const isCheckedForComparison = compareIds.includes(pkg.id);

              return (
                <div key={pkg.id} className="col-lg-4 col-md-6 col-12">
                  <div className="card h-100 border-0 shadow-sm bg-white rounded-4 overflow-hidden position-relative hover-lift transition-all">

                    {/* Top Media Window */}
                    <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                      <Link href={`/package/${pkg.to_destination_slug || 'destination'}/${pkg.slug}-${urlEncode(pkg.id)}`} className="d-block w-100 h-100">
                        <img src={imgUrl} alt={pkg.title} className="w-100 h-100 object-fit-cover" />
                      </Link>

                      {/* Interactive Selection Checkbox Overlay */}
                      <span 
                        onClick={(e) => { e.stopPropagation(); }} 
                        className="position-absolute top-0 start-0 m-2 bg-dark opacity-85 text-white px-2 py-1 text-2xs rounded d-flex align-items-center gap-1 user-select-none" 
                        style={{ zIndex: 55 }}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input m-0 cursor-pointer accent-warning"
                          id={`comp-${pkg.id}`}
                          checked={isCheckedForComparison}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleCompare(pkg.id);
                          }}
                        />
                        <label 
                          htmlFor={`comp-${pkg.id}`} 
                          className="m-0 cursor-pointer fw-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Add to Compare
                        </label>
                      </span>

                      {pkg.package_type_name && (
                        <span className="position-absolute top-0 end-0 m-2 badge bg-primary text-uppercase text-2xs px-2 py-1 rounded">
                          {pkg.package_type_name} Tour
                        </span>
                      )}

                      <div className="position-absolute bottom-0 start-0 w-100 bg-primary opacity-90 text-white px-3 py-1 text-xs fw-semibold">
                        {pkg.duration_nights || 0}N / {pkg.duration_days || 0}D | {pkg.package_type_name || 'Special'} Departure
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="card-body p-3 d-flex flex-column justify-content-between">
                      <div>
                        <h3 className="h6 fw-bold mb-1 text-dark text-truncate-2" style={{ minHeight: '38px', lineHeight: '1.35' }}>
                          {pkg.title}
                        </h3>

                        <div className="text-2xs text-primary fw-medium mb-1">
                          {pkg.from_destination_name && `${pkg.from_destination_name} `}
                          {pkg.to_destination_name && `➔ ${pkg.to_destination_name}`}
                        </div>

                        <div className="d-flex gap-3 align-items-center my-1 text-muted text-center border-top border-bottom py-2">
                          <div className="flex-fill"><i className="bi bi-building d-block text-base mb-1 text-secondary"></i><span className="text-3xs d-block" style={{ lineHeight: '15px' }}>Hotel</span></div>
                          <div className="flex-fill"><i className="bi bi-binoculars d-block text-base mb-1 text-secondary"></i><span className="text-3xs d-block" style={{ lineHeight: '15px' }}>Sightseeing</span></div>
                          <div className="flex-fill"><i className="bi bi-car-front d-block text-base mb-1 text-secondary"></i><span className="text-3xs d-block" style={{ lineHeight: '15px' }}>Transfer</span></div>
                          <div className="flex-fill"><i className="bi bi-egg-fried d-block text-base mb-1 text-secondary"></i><span className="text-3xs d-block" style={{ lineHeight: '15px' }}>Meals</span></div>
                        </div>

                        {inclusions.length > 0 && (
                          <ul className="list-unstyled d-flex flex-column gap-1 mb-1 text-xs text-secondary ms-1">
                            {inclusions.slice(0, 3).map((inc, index) => (
                              <li key={index} className="text-truncate">
                                <i className="bi bi-check-lg text-success me-1 fw-bold"></i> {inc}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Footer Rates Block */}
                      <div className="border-top pt-1 d-flex align-items-end justify-content-between mt-2">
                        <div>
                          <span className="text-3xs text-muted d-block line-height-1 mb-1" style={{ lineHeight: '15px' }}>Starting From</span>
                          {pkg.base_price > pkg.actual_price && (
                            <span className="text-2xs text-muted text-decoration-line-through me-1 d-block" style={{ lineHeight: '15px' }}>
                              ₹{Number(pkg.base_price).toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="h4 fw-extrabold text-dark mb-0" style={{ fontWeight: 700 }}>
                            ₹{Number(pkg.actual_price || 0).toLocaleString('en-IN')}
                          </span>
                          <span className="text-3xs text-muted d-block text-nowrap" style={{ lineHeight: '15px' }}>Per Person on twin sharing</span>
                        </div>

                        <div>
                          <Link href={`/package/${pkg.to_destination_slug || 'destination'}/${pkg.slug}-${urlEncode(pkg.id)}`} className="btn btn-primary text-white fw-bold px-4 py-2 rounded-pill text-xs shadow-xs">
                            Book Now <i className="bi bi-arrow-right-short ms-1 text-sm"></i>
                          </Link>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div ref={ref} className="text-center py-5">
          {visibleCount < filteredPackages.length && (
            <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
          )}
        </div>

      </div>
    </div>
  </>
  );
}


function parseSlugFilters(slugs) {
  const filters = {}
  if (!slugs) return filters;
  const slugArray = Array.isArray(slugs) ? slugs : [slugs];
  slugArray.forEach((slug) => {
    // Find the index of the first hyphen
    const hyphenIndex = slug.indexOf('-');
    // If there is no hyphen, skip this slug
    if (hyphenIndex === -1) {
      filters['name'] = decodeURI(slug);
      return;
    }
    // Extract the key (everything before first hyphen) and value (everything after)
    const key = slug.substring(0, hyphenIndex);
    const value = slug.substring(hyphenIndex + 1);
    if (key && value) {
      filters[key] = decodeURI(value);
    }
  });
  return filters;
}