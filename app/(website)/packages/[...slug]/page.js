'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { axiosNormalPost } from '@/libs/axiosHelper';
import { getFilterPackages } from '@/routes/packageRoutes';
import './page.css';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { urlEncode } from '@/libs/urlHelper';

export default function TravelPackageListPage() {
  const params = useParams();
  // --- DATA STATES ---
  const [dbPackages, setDbPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

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
    const filter  = params.slug && parseSlugFilters(params.slug)
    console.log(filter);
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
          
          {/* Header element directly matching image_ab5565.jpg */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <button className="btn btn-link text-dark fw-bold h4 text-decoration-none p-0 d-flex align-items-center gap-2" onClick={() => setIsComparing(false)}>
              <i className="bi bi-arrow-left"></i> Compare Packages
            </button>
            <button className="btn btn-outline-primary text-xs rounded-3 px-3 py-2 fw-medium" onClick={() => setIsComparing(false)}>
              Add Packages +
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
                    <th className="text-start bg-light text-secondary small fw-bold" style={{ width: '20%' }}>Items</th>
                    {comparedPackages.map(pkg => (
                      <th key={pkg.id} className="text-uppercase text-xs fw-bold text-dark py-3" style={{ width: `${80 / comparedPackages.length}%` }}>
                        {pkg.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Row: Picture */}
                  <tr>
                    <td className="fw-bold text-secondary small">Picture</td>
                    {comparedPackages.map(pkg => {
                      const imgUrl = pkg.path ? process.env.NEXT_PUBLIC_SERVER_URL+`${pkg.path.replace(/\\/g, '/')}` : '/assets/images/noimage.jpg';
                      return (
                        <td key={pkg.id} className="text-center p-2">
                          <img src={imgUrl} alt="package" className="rounded-3 object-fit-cover" style={{ width: '100%', maxHeight: '160px', maxWidth: '280px' }} />
                        </td>
                      );
                    })}
                  </tr>
                  
                  {/* Row: No. of Nights */}
                  <tr>
                    <td className="fw-bold text-secondary small">No. of Nights</td>
                    {comparedPackages.map(pkg => (
                      <td key={pkg.id} className="text-center fw-semibold text-sm">{pkg.duration_nights || 0}</td>
                    ))}
                  </tr>

                  {/* Row: Flight */}
                  <tr>
                    <td className="fw-bold text-secondary small">Flight</td>
                    {comparedPackages.map(pkg => {
                      const inclusionsStr = String(pkg.inclusions || '').toLowerCase();
                      const hasFlight = inclusionsStr.includes('flight') || inclusionsStr.includes('airfare');
                      return <td key={pkg.id} className="text-center text-sm">{hasFlight ? 'Included' : 'No'}</td>;
                    })}
                  </tr>

                  {/* Row: Hotels */}
                  <tr>
                    <td className="fw-bold text-secondary small">Hotels</td>
                    {comparedPackages.map(pkg => {
                      const inclusionsStr = String(pkg.inclusions || '').toLowerCase();
                      let tier = "Standard Stay";
                      if (inclusionsStr.includes('luxury') || inclusionsStr.includes('resort')) tier = "5 Star";
                      else if (inclusionsStr.includes('ac')) tier = "3 Star";
                      return <td key={pkg.id} className="text-center text-sm">{tier}</td>;
                    })}
                  </tr>

                  {/* Row: Transfer */}
                  <tr>
                    <td className="fw-bold text-secondary small">Transfer</td>
                    {comparedPackages.map(pkg => {
                      const inclusionsStr = String(pkg.inclusions || '').toLowerCase();
                      const hasTransfer = inclusionsStr.includes('pickup') || inclusionsStr.includes('transfer') || inclusionsStr.includes('drop');
                      return <td key={pkg.id} className="text-center text-sm">{hasTransfer ? 'Yes' : 'No'}</td>;
                    })}
                  </tr>

                  {/* Row: Visa */}
                  <tr>
                    <td className="fw-bold text-secondary small">Visa</td>
                    {comparedPackages.map(pkg => (
                      <td key={pkg.id} className="text-center text-sm">No</td>
                    ))}
                  </tr>

                  {/* Row: City Includes */}
                  <tr>
                    <td className="fw-bold text-secondary small">City Includes</td>
                    {comparedPackages.map(pkg => (
                      <td key={pkg.id} className="text-center text-xs text-muted fw-medium">
                        {pkg.duration_nights}N {pkg.to_destination_name || 'Sightseeing'}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Price Per Person */}
                  <tr>
                    <td className="fw-bold text-secondary small">Price Per Person</td>
                    {comparedPackages.map(pkg => (
                      <td key={pkg.id} className="text-center text-primary fw-bold h5 py-3">
                        ₹{Number(pkg.actual_price || 0).toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Action Controls Footer */}
                  <tr>
                    <td className="bg-light"></td>
                    {comparedPackages.map(pkg => (
                      <td key={pkg.id} className="p-3">
                        <div className="d-flex flex-column gap-2 mx-auto" style={{ maxWidth: '240px' }}>
                          <button className="btn btn-orange text-white fw-bold py-2 text-xs rounded-2">View Package</button>
                          <button className="btn btn-outline-danger py-1 text-xs rounded-2" onClick={() => toggleCompare(pkg.id)}>Remove</button>
                        </div>
                      </td>
                    ))}
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

        {/* TOP COMPACT BRAND SEARCH & DROPDOWNS BAR */}
        <div className="card border-0 shadow-xs px-4 py-3 bg-white rounded-4 mb-3" style={{position: 'sticky', top: "10%", zIndex: 555, borderRadius: '5px !important'}}>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="d-flex flex-wrap align-items-center gap-2">
              
              <div className="dropdown">
                <button className="btn btn-light bg-white border rounded-pill dropdown-toggle text-xs px-3" type="button" data-bs-toggle="dropdown">
                  Sort By: <span className="fw-semibold text-primary">{sortBy === 'Default' ? 'Select' : sortBy}</span>
                </button>
                <ul className="dropdown-menu shadow-sm text-sm">
                  <li><button className="dropdown-item" onClick={() => setSortBy('Default')}>Default</button></li>
                  <li><button className="dropdown-item" onClick={() => setSortBy('PriceLowHigh')}>Price: Low to High</button></li>
                  <li><button className="dropdown-item" onClick={() => setSortBy('PriceHighLow')}>Price: High to Low</button></li>
                </ul>
              </div>

              <div className="dropdown">
                <button className="btn btn-light bg-white border rounded-pill dropdown-toggle text-xs px-3" type="button" data-bs-toggle="dropdown">
                  Package Type: <span className="fw-semibold text-primary">{selectedPackageType}</span>
                </button>
                <ul className="dropdown-menu shadow-sm text-sm">
                  {availableTypes.map((type, i) => (
                    <li key={i}><button className="dropdown-item" onClick={() => setSelectedPackageType(type)}>{type}</button></li>
                  ))}
                </ul>
              </div>

              {/* DUAL SCROLL RANGE INPUT PANEL */}
              <div className="dropdown">
                <button className="btn btn-light bg-white border rounded-pill dropdown-toggle text-xs px-3" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                  Price: <span className="fw-semibold text-primary">₹{minPrice} - ₹{maxPrice}</span>
                </button>
                <div className="dropdown-menu p-3 shadow-sm text-sm" style={{ width: '260px' }}>
                  <div className="mb-2">
                    <label className="text-2xs text-muted d-block mb-1">Min Price: <strong>₹{minPrice.toLocaleString('en-IN')}</strong></label>
                    <input type="range" className="form-range" min="0" max={maxAvailablePrice} value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="text-2xs text-muted d-block mb-1">Max Price: <strong>₹{maxPrice.toLocaleString('en-IN')}</strong></label>
                    <input type="range" className="form-range" min="0" max={maxAvailablePrice} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                  </div>
                  <div className="d-flex justify-content-between text-3xs text-muted border-top pt-2 mt-2">
                    <span>Min: ₹0</span>
                    <span>Max: ₹{maxAvailablePrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="dropdown">
                <button className="btn btn-light bg-white border rounded-pill dropdown-toggle text-xs px-3" type="button" data-bs-toggle="dropdown">
                  Duration: <span className="fw-semibold text-primary">{durationFilter === 'All' ? 'All' : `${durationFilter} Days`}</span>
                </button>
                <ul className="dropdown-menu shadow-sm text-sm">
                  <li><button className="dropdown-item" onClick={() => setDurationFilter('All')}>All Durations</button></li>
                  <li><button className="dropdown-item" onClick={() => setDurationFilter('1-3')}>1 - 3 Days</button></li>
                  <li><button className="dropdown-item" onClick={() => setDurationFilter('4-7')}>4 - 7 Days</button></li>
                  <li><button className="dropdown-item" onClick={() => setDurationFilter('8+')}>8+ Days</button></li>
                </ul>
              </div>

            </div>

            <button className="btn btn-link text-danger text-xs fw-semibold text-decoration-none p-0" onClick={handleResetAll}>
              Reset All
            </button>
          </div>
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
              const imgUrl = pkg.path ? process.env.NEXT_PUBLIC_SERVER_URL+`${pkg.path.replace(/\\/g, '/')}` : '/assets/images/noimage.jpg';

              const isCheckedForComparison = compareIds.includes(pkg.id);

              return (
                <div key={pkg.id} className="col-lg-4 col-md-6 col-12">
                  <div className="card h-100 border-0 shadow-sm bg-white rounded-4 overflow-hidden position-relative hover-lift transition-all">
                    
                    {/* Top Media Window */}
                    <div href={"/package/"+pkg?.to_destination_slug+'/'+pkg?.slug+'-'+urlEncode(pkg?.id)} className="position-relative" style={{ height: '200px' }}>
                      <img src={imgUrl} alt={pkg.title} className="w-100 h-100 object-fit-cover" />
                      
                      {/* Interactive Selection Checkbox Overlay */}
                      <span className="position-absolute top-0 start-0 m-2 bg-dark opacity-85 text-white px-2 py-1 text-2xs rounded d-flex align-items-center gap-1 user-select-none">
                        <input 
                          type="checkbox" 
                          className="form-check-input m-0 cursor-pointer accent-warning" 
                          id={`comp-${pkg.id}`} 
                          checked={isCheckedForComparison}
                          onChange={() => toggleCompare(pkg.id)}
                        />
                        <label htmlFor={`comp-${pkg.id}`} className="m-0 cursor-pointer fw-medium">Add to Compare</label>
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
                          <div className="flex-fill"><i className="bi bi-building d-block text-base mb-1 text-secondary"></i><span className="text-3xs d-block" style={{lineHeight: '15px'}}>Hotel</span></div>
                          <div className="flex-fill"><i className="bi bi-binoculars d-block text-base mb-1 text-secondary"></i><span className="text-3xs d-block" style={{lineHeight: '15px'}}>Sightseeing</span></div>
                          <div className="flex-fill"><i className="bi bi-car-front d-block text-base mb-1 text-secondary"></i><span className="text-3xs d-block" style={{lineHeight: '15px'}}>Transfer</span></div>
                          <div className="flex-fill"><i className="bi bi-egg-fried d-block text-base mb-1 text-secondary"></i><span className="text-3xs d-block" style={{lineHeight: '15px'}}>Meals</span></div>
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
                          <span className="text-3xs text-muted d-block line-height-1 mb-1" style={{lineHeight: '15px'}}>Starting From</span>
                          {pkg.base_price > pkg.actual_price && (
                            <span className="text-2xs text-muted text-decoration-line-through me-1 d-block" style={{lineHeight: '15px'}}>
                              ₹{Number(pkg.base_price).toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="h4 fw-extrabold text-dark mb-0" style={{fontWeight: 700}}>
                            ₹{Number(pkg.actual_price || 0).toLocaleString('en-IN')}
                          </span>
                          <span className="text-3xs text-muted d-block text-nowrap" style={{lineHeight: '15px'}}>Per Person on twin sharing</span>
                        </div>

                        <div>
                          <button className="btn btn-primary text-white fw-bold px-4 py-2 rounded-pill text-xs shadow-xs">
                            Book Now <i className="bi bi-arrow-right-short ms-1 text-sm"></i>
                          </button>
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
    if (hyphenIndex === -1) return;
    // Extract the key (everything before first hyphen) and value (everything after)
    const key = slug.substring(0, hyphenIndex);
    const value = slug.substring(hyphenIndex + 1);
    if (key && value) {
      filters[key] = value;
    }
  });
  return filters;
}