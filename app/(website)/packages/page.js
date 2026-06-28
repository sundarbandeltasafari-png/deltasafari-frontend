'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// Mock Data representing GoFly's premium travel packages
const INITIAL_PACKAGES = [
  {
    id: 1,
    title: 'Thailand Premium Beach & Culture Tour',
    location: 'Bangkok, Phuket, Thailand',
    duration: '5 Days / 4 Nights',
    rating: 5,
    reviews: 12,
    price: 185.00,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Switzerland Wonders & Ultimate Alps Train Journey',
    location: 'Interlaken, Lucerne, Switzerland',
    duration: '6 Days / 5 Nights',
    rating: 5,
    reviews: 18,
    price: 345.00,
    badge: 'Featured',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Bali Hidden Paradise & Volcanic Escape',
    location: 'Ubud, Seminyak, Indonesia',
    duration: '7 Days / 6 Nights',
    rating: 4,
    reviews: 9,
    price: 148.00,
    badge: '10% OFF',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
  },
];

export default function TravelPackageListPage() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Intersection observer trigger hook for infinite scroll tracking
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMorePackages();
    }
  }, [inView]);

  // Simulate API lazy-loading additional packages
  const loadMorePackages = () => {
    setLoading(true);
    setTimeout(() => {
      const moreItems = [
        {
          id: packages.length + 1,
          title: 'Romantic Paris City Guide & Seine Dinner Cruise',
          location: 'Paris, France',
          duration: '4 Days / 3 Nights',
          rating: 5,
          reviews: 24,
          price: 299.00,
          badge: 'Trending',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: packages.length + 2,
          title: 'Maldives Overwater Premium Private Villa Stay',
          location: 'Male, Maldives',
          duration: '5 Days / 4 Nights',
          rating: 5,
          reviews: 31,
          price: 450.00,
          badge: 'Luxury Tour',
          image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80',
        }
      ];

      setPackages((prev) => [...prev, ...moreItems]);
      setLoading(false);

      // Stop emulation after fetching a few times
      if (packages.length >= 7) {
        setHasMore(false);
      }
    }, 1200);
  };

  return (
    <div className="bg-light py-5 min-vh-100">
      <div className="container">
        
        {/* TOP FILTER BAR - GoFly Travel Package 01 Style */}
        <div className="card border-0 shadow-sm p-4 bg-white rounded-4 mb-5">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Destination</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="bi bi-geo-alt text-warning"></i></span>
                <input type="text" className="form-control bg-light border-0" placeholder="Where are you going?" />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Travel Type</label>
              <select className="form-select bg-light border-0">
                <option>Adventure Tour</option>
                <option>Honeymoon Tour</option>
                <option>Family Tour</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Duration</label>
              <select className="form-select bg-light border-0">
                <option>3-5 Days</option>
                <option>5-7 Days</option>
                <option>7+ Days</option>
              </select>
            </div>
            <div className="col-md-3">
              <button className="btn btn-warning w-100 fw-bold py-2 rounded-3 text-uppercase shadow-sm">
                Find Package <i className="bi bi-search ms-2"></i>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN BODY LAYOUT GRID */}
        <div className="row g-4">
          
          {/* LEFT SIDEBAR - Sticky Filter Settings */}
          <div className="col-lg-4 d-none d-lg-block">
            <aside className="sticky-top" style={{ top: '24px', zIndex: 10 }}>
              <div className="d-flex flex-column gap-4">
                
                {/* Categories Wrapper */}
                <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
                  <h5 className="fw-bold mb-3 text-dark border-start  ps-2">Filter Category</h5>
                  <div className="d-flex flex-column gap-2 mt-2">
                    {['Adventure Tour', 'Honeymoon Tour', 'Family Holiday', 'Wildlife Safari', 'Cultural Exploration'].map((cat, i) => (
                      <div key={i} className="form-check">
                        <input className="form-check-input accent-warning" type="checkbox" id={`cat-${i}`} defaultChecked={i===0} />
                        <label className="form-check-label text-secondary small fw-medium" htmlFor={`cat-${i}`}>{cat}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter Widget */}
                <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
                  <h5 className="fw-bold mb-3 text-dark border-start  ps-2">Filter Pricing</h5>
                  <label htmlFor="priceRange" className="form-label text-muted small">Max Budget: $500</label>
                  <input type="range" className="form-range" min="50" max="1000" id="priceRange" defaultValue="500" />
                  <div className="d-flex justify-content-between text-muted small mt-1 fw-bold">
                    <span>$50</span>
                    <span>$1000</span>
                  </div>
                </div>

                {/* Stars Rating Filter Widget */}
                <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
                  <h5 className="fw-bold mb-3 text-dark border-start  ps-2">Review Ratings</h5>
                  <div className="d-flex flex-column gap-2">
                    {[5, 4, 3].map((star) => (
                      <div key={star} className="form-check d-flex align-items-center gap-2">
                        <input className="form-check-input accent-warning" type="checkbox" id={`star-${star}`} defaultChecked={star===5} />
                        <label className="form-check-label text-warning small m-0" htmlFor={`star-${star}`}>
                          {Array.from({ length: star }).map((_, i) => <i key={i} className="bi bi-star-fill me-1"></i>)}
                          <span className="text-muted ms-1">({star} Stars)</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>

          {/* RIGHT GRID - Live Travel Feed Stream */}
          <div className="col-lg-8">
            <div className="row g-4">
              {packages.map((item) => (
                <div key={item.id} className="col-md-6 col-12">
                  <div className="card border-0 h-100 shadow-sm overflow-hidden bg-white package-card rounded-4">
                    
                    {/* Package Card Top Frame */}
                    <div className="position-relative overflow-hidden" style={{ height: '230px' }}>
                      <img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover package-img transition-all" />
                      <span className="position-absolute top-0 start-0 m-3 bg-warning text-dark px-3 py-1 fw-bold rounded-pill text-uppercase text-xs shadow-sm">
                        {item.badge}
                      </span>
                      <button className="position-absolute top-0 end-0 m-3 btn btn-white bg-white rounded-circle p-2 shadow-sm border-0 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                        <i className="bi bi-heart text-danger"></i>
                      </button>
                    </div>

                    {/* Package Card Bottom Body Frame */}
                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        {/* Geo Location + Duration Strip */}
                        <div className="d-flex justify-content-between text-muted mb-2 text-xs fw-semibold">
                          <span><i className="bi bi-geo-alt-fill text-warning me-1"></i> {item.location.split(',')[0]}</span>
                          <span><i className="bi bi-clock-fill text-warning me-1"></i> {item.duration}</span>
                        </div>
                        {/* Main Title Heading link */}
                        <h4 className="card-title h5 fw-bold text-dark mb-3 package-title-link line-clamp-2">
                          <a href="#" className="text-decoration-none text-dark">{item.title}</a>
                        </h4>
                      </div>

                      {/* Ratings and Pricing Row */}
                      <div className="border-top pt-3 mt-2 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-1 text-warning small">
                          <i className="bi bi-star-fill"></i>
                          <span className="text-dark fw-bold ms-1">{item.rating}.0</span>
                          <span className="text-muted text-xs">({item.reviews})</span>
                        </div>
                        <div>
                          <span className="text-muted text-xs d-block text-end">From</span>
                          <span className="h4 fw-extrabold text-primary m-0">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

              {/* INFINITE SCROLL BAR TRIGGER ZONE */}
              <div ref={ref} className="col-12 text-center py-5">
                {loading && (
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading options...</span>
                  </div>
                )}
                {!hasMore && (
                  <div className="bg-white py-3 px-4 rounded-pill shadow-sm d-inline-block border">
                    <p className="text-muted fw-bold m-0 small text-uppercase tracking-wide">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> All Holiday Packages Loaded
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Layout Enhancements */}
      <style jsx global>{`
        .fw-extrabold { font-weight: 800; }
        .text-xs { font-size: 0.785rem; }
        .accent-warning {
          accent-color: #ffc107;
        }
        .form-range::-webkit-slider-thumb {
          background: #ffc107;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .package-img {
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .package-card:hover .package-img {
          transform: scale(1.06);
        }
        .package-title-link a:hover {
          color: #ffc107 !important;
          transition: color 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}