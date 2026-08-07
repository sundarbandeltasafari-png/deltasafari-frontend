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
import Faq from '@/components/website/home/Faq';
import Link from 'next/link';
import CustomPackageWizardForm from '@/components/website/CustomPackageWizardForm';

export default function TravelPackageListPage() {
  const params = useParams();
  // --- DATA STATES ---
  const [dbPackages, setDbPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [customiseModalPkg, setCustomiseModalPkg] = useState(null);
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
                      const detailsUrl = `/package/${pkg.slug}`;
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
      <div className="bg-light min-vh-100 py-4 font-sans text-dark position-relative mt-4">

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
          {/* TOP EASEMYTRIP-STYLE FILTER BAR */}
          <div className="card border-0 shadow-xs px-3 py-2 bg-white rounded-4 mb-3 position-relative" style={{ zIndex: 500, overflow: 'visible' }} ref={filterBarRef}>
            <div className="d-flex align-items-center justify-content-between gap-2">
              
              {/* Single-row horizontal scrolling container for filter pills */}
              <div className="d-flex flex-nowrap align-items-center gap-2 overflow-x-auto scroll-x-single-row py-1 flex-grow-1">

                {/* Sort By Pill */}
                <button 
                  className={`btn text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0 ${sortBy !== 'Default' ? 'btn-primary text-white border-primary' : 'btn-light bg-white text-dark'}`} 
                  type="button"
                  onClick={() => toggleDropdown('sort')}
                >
                  <i className="fa-solid fa-arrow-down-up me-1"></i>
                  Sort By: <span className="fw-semibold ms-1">{sortBy === 'Default' ? 'Default' : sortBy === 'PriceLowHigh' ? 'Price: Low to High' : 'Price: High to Low'}</span>
                  <i className="fa-solid fa-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
                </button>

                {/* Package Type Pill */}
                <button 
                  className={`btn text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0 ${selectedPackageType !== 'All' ? 'btn-primary text-white border-primary' : 'btn-light bg-white text-dark'}`} 
                  type="button"
                  onClick={() => toggleDropdown('type')}
                >
                  <i className="fa-solid fa-filter me-1"></i>
                  Type: <span className="fw-semibold ms-1">{selectedPackageType}</span>
                  <i className="fa-solid fa-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
                </button>

                {/* Budget Pill */}
                <button 
                  className={`btn text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0 ${(minPrice > 0 || maxPrice < maxAvailablePrice) ? 'btn-primary text-white border-primary' : 'btn-light bg-white text-dark'}`} 
                  type="button"
                  onClick={() => toggleDropdown('price')}
                >
                  <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                  Budget: <span className="fw-semibold ms-1">₹{minPrice.toLocaleString('en-IN')} - ₹{maxPrice.toLocaleString('en-IN')}</span>
                  <i className="fa-solid fa-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
                </button>

                {/* Duration Pill */}
                <button 
                  className={`btn text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0 ${durationFilter !== 'All' ? 'btn-primary text-white border-primary' : 'btn-light bg-white text-dark'}`} 
                  type="button"
                  onClick={() => toggleDropdown('duration')}
                >
                  <i className="fa-solid fa-clock me-1"></i>
                  Duration: <span className="fw-semibold ms-1">{durationFilter === 'All' ? 'All' : `${durationFilter} Days`}</span>
                  <i className="fa-solid fa-chevron-down ms-1" style={{ fontSize: '10px' }}></i>
                </button>

                {/* Reset Filters Pill */}
                {(selectedPackageType !== 'All' || minPrice > 0 || maxPrice < maxAvailablePrice || durationFilter !== 'All' || sortBy !== 'Default') && (
                  <button 
                    className="btn btn-outline-danger text-xs rounded-pill px-3 py-1.5 border d-flex align-items-center gap-1 flex-shrink-0"
                    type="button"
                    onClick={() => {
                      setSelectedPackageType('All');
                      setMinPrice(0);
                      setMaxPrice(maxAvailablePrice);
                      setDurationFilter('All');
                      setSortBy('Default');
                      setOpenDropdown(null);
                    }}
                  >
                    <i className="fa-solid fa-rotate-left me-1"></i>
                    Reset Filters
                  </button>
                )}

              </div>

              {/* Package Counter Badge */}
              <div className="d-none d-md-flex align-items-center gap-1 flex-shrink-0">
                <span className="badge bg-primary bg-opacity-10 text-primary text-xs px-3 py-2 rounded-pill fw-bold border border-primary border-opacity-20">
                  {filteredPackages.length} Packages Found
                </span>
              </div>

            </div>

            {/* SORT BY DROPDOWN PANEL */}
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
              const detailsUrl = `/package/${pkg.slug}`;

              return (
                <div key={pkg.id} className="col-lg-4 col-md-6 col-12">
                  <div className="card h-100 border-0 shadow-sm bg-white rounded-4 overflow-hidden position-relative hover-lift transition-all">

                    {/* Top Media Window */}
                    <div className="position-relative overflow-hidden" style={{ height: '210px' }}>
                      <Link href={detailsUrl} className="d-block w-100 h-100">
                        <img src={imgUrl} alt={pkg.title} className="w-100 h-100 object-fit-cover package-img" />
                      </Link>

                      {/* Interactive Selection Checkbox Overlay */}
                      <span 
                        onClick={(e) => { e.stopPropagation(); }} 
                        className="position-absolute top-0 start-0 m-2.5 bg-dark bg-opacity-75 text-white px-2 py-1 text-2xs rounded-3 d-flex align-items-center gap-1 user-select-none shadow-xs" 
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

                      {/* Package Type Tag */}
                      {pkg.package_type_name && (
                        <span className="position-absolute top-0 end-0 m-2.5 badge text-white text-uppercase text-3xs px-2.5 py-1 rounded-2 shadow-xs fw-bold" style={{ backgroundColor: '#ef6614' }}>
                          {pkg.package_type_name}
                        </span>
                      )}

                      {/* Duration Banner */}
                      <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white px-3 py-1.5 text-xs fw-semibold d-flex align-items-center justify-content-between">
                        <span><i className="fa-solid fa-clock text-warning me-1"></i>{pkg.duration_nights || 0}N / {pkg.duration_days || 1}D</span>
                        <span className="text-3xs text-white-50">Customizable</span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="card-body p-3 d-flex flex-column justify-content-between">
                      <div>
                        <Link href={detailsUrl} className="text-decoration-none">
                          <h3 className="h6 fw-bold mb-1 text-dark text-truncate-2" style={{ minHeight: '38px', lineHeight: '1.35' }}>
                            {pkg.title}
                          </h3>
                        </Link>

                        <div className="text-xs text-primary fw-semibold mb-2">
                          <i className="fa-solid fa-location-dot text-danger me-1"></i>
                          {pkg.from_destination_name ? `${pkg.from_destination_name} ` : ''}
                          {pkg.to_destination_name && `➔ ${pkg.to_destination_name}`}
                        </div>

                        {/* Inclusion Icons Row - Centered with Bigger Icons & Text */}
                        <div className="d-flex gap-2 align-items-center justify-content-center my-2.5 text-muted text-center bg-light rounded-3 py-2.5 px-2 border">
                          <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
                            <i className="fa-solid fa-hotel fs-5 text-primary mb-1"></i>
                            <span className="text-2xs fw-semibold text-dark">Hotel</span>
                          </div>
                          <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
                            <i className="fa-solid fa-camera fs-5 text-primary mb-1"></i>
                            <span className="text-2xs fw-semibold text-dark">Sightseeing</span>
                          </div>
                          <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
                            <i className="fa-solid fa-bus fs-5 text-primary mb-1"></i>
                            <span className="text-2xs fw-semibold text-dark">Transfer</span>
                          </div>
                          <div className="flex-fill d-flex flex-column align-items-center justify-content-center">
                            <i className="fa-solid fa-utensils fs-5 text-primary mb-1"></i>
                            <span className="text-2xs fw-semibold text-dark">Meals</span>
                          </div>
                        </div>

                        {/* Highlights */}
                        {inclusions.length > 0 ? (
                          <ul className="list-unstyled d-flex flex-column gap-1.5 mb-2 text-xs text-secondary ms-1">
                            {inclusions.slice(0, 3).map((inc, index) => (
                              <li key={index} className="text-truncate d-flex align-items-center gap-1.5 text-xs">
                                <i className="fa-solid fa-circle-check text-success"></i>
                                <span>{typeof inc === 'object' ? (inc.name || JSON.stringify(inc)) : inc}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-xs text-muted mb-2">
                            <i className="fa-solid fa-circle-check text-success me-1"></i> Eco-Resort Stay & Boat Safari Included
                          </div>
                        )}
                      </div>

                      {/* Footer Rates & Action Block */}
                      <div className="border-top pt-2 d-flex align-items-end justify-content-between mt-2">
                        <div>
                          <span className="text-3xs text-muted d-block" style={{ lineHeight: '14px' }}>Starting From</span>
                          {pkg.base_price > pkg.actual_price && (
                            <span className="text-2xs text-muted text-decoration-line-through me-1 d-block" style={{ lineHeight: '14px' }}>
                              ₹{Number(pkg.base_price).toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="h4 fw-extrabold mb-0" style={{ fontWeight: 800, color: '#ef6614' }}>
                            ₹{Number(pkg.actual_price || 0).toLocaleString('en-IN')}
                          </span>
                          <span className="text-3xs text-muted d-block text-nowrap" style={{ lineHeight: '14px' }}>Per Person</span>
                        </div>

                        <div className="d-flex flex-column gap-1.5 align-items-stretch" style={{ minWidth: '110px' }}>
                          <button 
                            type="button" 
                            className="btn btn-outline-primary fw-bold py-1.5 px-2.5 rounded-3 text-xs shadow-xs d-flex align-items-center justify-content-center gap-1 border-primary w-100"
                            onClick={() => setCustomiseModalPkg(pkg)}
                            title="Customise Package"
                          >
                            <i className="fa-solid fa-wand-magic-sparkles text-primary"></i>
                            <span>Customise</span>
                          </button>

                          <Link href={detailsUrl} className="btn btn-orange text-white fw-bold py-1.5 px-2.5 rounded-3 text-xs shadow-xs text-decoration-none d-flex align-items-center justify-content-center gap-1 w-100">
                            <span>Book Now</span>
                            <i className="fa-solid fa-chevron-right text-3xs ms-0.5"></i>
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

        {/* NEW ENHANCEMENT 3: CURATED DESTINATION TRAVEL INSIGHTS & FAQS */}
        <div className="card border-0 shadow-sm bg-white rounded-4 p-4 mt-5">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-primary bg-opacity-10 text-primary p-2 rounded-circle">
              <i className="fa-solid fa-compass fs-5"></i>
            </span>
            <div>
              <h4 className="fw-bold text-dark h6 mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Traveler&apos;s Guide &amp; Destination Insights
              </h4>
              <small className="text-muted text-xs">Everything you need to know before booking your tour package.</small>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 border h-100">
                <h6 className="fw-bold text-dark text-xs mb-1 d-flex align-items-center gap-1.5">
                  <i className="fa-solid fa-calendar-days text-danger"></i> Best Time to Visit &amp; Weather
                </h6>
                <p className="text-secondary text-xs mb-0" style={{ lineHeight: '1.6' }}>
                  October through March offers pleasant weather, clear boat safari cruising, and maximum tiger &amp; bird sighting probabilities.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 border h-100">
                <h6 className="fw-bold text-dark text-xs mb-1 d-flex align-items-center gap-1.5">
                  <i className="fa-solid fa-shield-halved text-success"></i> 100% Safety &amp; Certified Guides
                </h6>
                <p className="text-secondary text-xs mb-0" style={{ lineHeight: '1.6' }}>
                  All packages include licensed forest department naturalists, GPS-tracked boats, and life jackets for every guest.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 border h-100">
                <h6 className="fw-bold text-dark text-xs mb-1 d-flex align-items-center gap-1.5">
                  <i className="fa-solid fa-sliders text-primary"></i> Customizable Itineraries
                </h6>
                <p className="text-secondary text-xs mb-0" style={{ lineHeight: '1.6' }}>
                  Want extra nights, private resort upgrades, or specialized meal plans? Click <strong>Customise</strong> on any card to tailor your plan!
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 border h-100">
                <h6 className="fw-bold text-dark text-xs mb-1 d-flex align-items-center gap-1.5">
                  <i className="fa-solid fa-tags text-warning"></i> Best Price &amp; Flexible Booking
                </h6>
                <p className="text-secondary text-xs mb-0" style={{ lineHeight: '1.6' }}>
                  Direct operator rates with zero hidden charges. Flexible date changes and instant query response within 1 hour.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* HOW WE ARE DIFFERENT FROM OTHERS SECTION - BEFORE FAQ */}
        <div className="mt-5 mb-5">
          <div className="different-section-card p-4 p-md-5">
            <div className="text-center max-w-2xl mx-auto mb-5">
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill fs-7 mb-2">
                <i className="fa-solid fa-gem me-1.5 text-warning"></i> Delta Safari Advantage
              </span>
              <h2 className="display-6 fw-extrabold text-dark mb-3">
                How We Are Different From Others
              </h2>
              <p className="text-secondary lead mx-auto" style={{ maxWidth: '780px' }}>
                We don&apos;t just book trips—we create safe, eco-conscious, and authentic Sundarban experiences with registered forest naturalists and premium luxury boat comfort.
              </p>
            </div>

            <div className="row gy-4 align-items-center mb-4">
              <div className="col-lg-6">
                <div className="different-banner-wrap">
                  <img 
                    src={`${process.env.NEXT_PUBLIC_PUBLIC_URL || ''}assets/img/innerpages/sundarban-different-banner.jpg`} 
                    alt="Why Delta Safari is Different in Sundarban" 
                    className="different-banner-img" 
                  />
                  <div className="different-banner-overlay">
                    <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill mb-2">
                      <i className="fa-solid fa-shield-heart me-1"></i> Certified Eco-Safari
                    </span>
                    <h5 className="text-white fw-bold mb-1">Direct Operator Experience</h5>
                    <p className="text-white-50 small mb-0">Solar-powered luxury vessels, expert naturalists, &amp; 100% transparent pricing.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row g-3">
                  {[
                    {
                      icon: 'fa-solid fa-ship',
                      title: 'Solar & Eco Luxury Vessels',
                      desc: 'Equipped with solar energy, quiet twin engines, clean sound systems, and panoramic observation decks for maximum tiger sighting chances.'
                    },
                    {
                      icon: 'fa-solid fa-user-shield',
                      title: 'Certified Forest Naturalists',
                      desc: 'Accompanied by Govt. Forest Department licensed naturalists who know tiger tracks, bird call signals, and hidden creeks intimately.'
                    },
                    {
                      icon: 'fa-solid fa-utensils',
                      title: 'Fresh Hot Local Cuisine',
                      desc: 'Cooked fresh onboard by local chefs—featuring fresh fish, prawns, crab delicacies, vegetarian spreads, and purified drinking water.'
                    },
                    {
                      icon: 'fa-solid fa-hand-holding-dollar',
                      title: 'Zero Hidden Charges',
                      desc: 'All forest entry permits, video camera fees, boat charges, meals, and GST are included upfront with absolute pricing transparency.'
                    }
                  ].map((feat, idx) => (
                    <div className="col-sm-6" key={idx}>
                      <div className="different-feature-card h-100">
                        <div className="different-feature-icon">
                          <i className={feat.icon}></i>
                        </div>
                        <h6 className="fw-bold text-dark mb-1">{feat.title}</h6>
                        <p className="text-muted text-xs mb-0" style={{ lineHeight: '1.6' }}>{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-4 text-center mt-4" style={{ background: 'linear-gradient(135deg, #ebf5ff 0%, #fff4ec 100%)', border: '1px solid #e2e8f0' }}>
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-start text-md-start">
                <div className="d-flex align-items-center gap-3">
                  <div className="icon-box-primary flex-shrink-0" style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0066cc', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                    <i className="fa-solid fa-headset"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Need help choosing your Sundarban package?</h6>
                    <p className="small text-muted mb-0">Our expert travel team is ready 24/7 to customize your trip, group bookings, or resort choices.</p>
                  </div>
                </div>
                <Link href="/contact" className="btn btn-primary px-4 py-2.5 rounded-pill fw-bold text-nowrap shadow-sm">
                  <i className="fa-solid fa-phone me-1.5"></i> Talk to Expert
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS SECTION AT THE END */}
        <div className="mt-5">
          <Faq />
        </div>

      </div>
    </div>

    {/* CUSTOM PACKAGE WIZARD MODAL */}
    {customiseModalPkg && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000001,
          padding: "16px"
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setCustomiseModalPkg(null);
        }}
      >
        <div className="position-relative w-100" style={{ maxWidth: "980px", maxHeight: "92vh", overflowY: "auto" }}>
          <CustomPackageWizardForm 
            isModal={true} 
            onClose={() => setCustomiseModalPkg(null)} 
            preselectedPackage={customiseModalPkg}
          />
        </div>
      </div>
    )}
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