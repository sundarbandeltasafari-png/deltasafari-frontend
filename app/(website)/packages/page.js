"use client"
import React, { useState } from 'react';

// Mock data mapping the standard features of the GoFly travel package cards
const initialPackages = [
  {
    id: 1,
    title: "Enchanting Paris & Versailles Exploration",
    destination: "Paris, France",
    duration: "06 Days",
    rating: 4.8,
    reviewsCount: 124,
    price: 1350,
    oldPrice: 1600,
    category: "City Tour",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    features: ["Crystal-Clear Waters", "Luxury Overwater Villas", "Dolphin Watching"]
  },
  {
    id: 2,
    title: "Tropical Bali Paradise Resort & Spa",
    destination: "Indonesia",
    duration: "07 Days",
    rating: 4.9,
    reviewsCount: 312,
    price: 950,
    oldPrice: 1200,
    category: "Beach & Nature",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    features: ["Private Villa", "Breakfast Included", "Airport Transport"]
  },
  {
    id: 3,
    title: "Switzerland Alpine Scenic Wonders",
    destination: "Zermatt, Switzerland",
    duration: "05 Days",
    rating: 4.7,
    reviewsCount: 89,
    price: 1850,
    oldPrice: 2100,
    category: "Adventure",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    features: ["Train Pass Provided", "Mountain Resort", "Guided Hike"]
  },
  {
    id: 4,
    title: "The Ultimate Maldives Luxury Overwater Escape",
    destination: "Maldives",
    duration: "05 Days",
    rating: 5.0,
    reviewsCount: 418,
    price: 2450,
    category: "Beach & Nature",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",
    features: ["Crystal-Clear Waters", "Luxury Overwater Villas", "Dolphin Watching"]
  }
];

export default function TravelPackages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState(2500);
  const [sortBy, setSortBy] = useState("Default");

  // Filter and Sort Logic
  const filteredPackages = initialPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(pkg.region);
    const matchesDestination = selectedDestinations.length === 0 || selectedDestinations.includes(pkg.destination);
    const matchesPrice = pkg.price <= priceRange;

    return matchesSearch && matchesRegion && matchesDestination && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "Price High") return b.price - a.price;
    if (sortBy === "Price Low") return a.price - b.price;
    return 0; // Default / latest
  });

  const handleRegionChange = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const handleDestinationChange = (dest) => {
    if (selectedDestinations.includes(dest)) {
      setSelectedDestinations(selectedDestinations.filter(d => d !== dest));
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRegions([]);
    setSelectedDestinations([]);
    setPriceRange(2500);
    setSortBy("Default");
  };

  return (
    <div className="package-grid-page pt-50 mb-100">
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="package-sidebar-area">
                        <div className="sidebar-wrapper">
                            <div className="title-area">
                                <h5>Filter</h5>
                                <span id="clear-filters" style={{ cursor: 'pointer' }} onClick={clearAllFilters}>Clear All</span>
                            </div>

                            {/* Search bar inside Sidebar */}
                            <div className="single-widgets">
                                <div className="widget-title">
                                    <h5>Search Package</h5>
                                </div>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search by title or place..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '100%' }}
                                />
                            </div>

                            <div className="single-widgets">
                                <div className="widget-title">
                                    <h5>Destinations</h5>
                                </div>
                                <div className="checkbox-container">
                                    <ul>
                                        <li className="sidebar-category-dropdown">
                                            <label className="containerss">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedRegions.includes("Europe")} 
                                                    onChange={() => handleRegionChange("Europe")} 
                                                />
                                                <span className="checkmark"></span>
                                                <strong>Europe</strong>
                                            </label>
                                            <ul className="sub-category">
                                                <li>
                                                    <label className="containerss">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedDestinations.includes("Paris, France")} 
                                                            onChange={() => handleDestinationChange("Paris, France")}
                                                        />
                                                        <span className="checkmark"></span>
                                                        <strong><span>Paris, France</span> <span>02</span></strong>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="containerss">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedDestinations.includes("Zermatt, Switzerland")} 
                                                            onChange={() => handleDestinationChange("Zermatt, Switzerland")}
                                                        />
                                                        <span className="checkmark"></span>
                                                        <strong><span>Zermatt, Switzerland</span> <span>01</span></strong>
                                                    </label>
                                                </li>
                                            </ul>
                                            <i className="bi bi-caret-right-fill sidebar-category-icon active"></i>
                                        </li>
                                        <li className="sidebar-category-dropdown">
                                            <label className="containerss">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedRegions.includes("Asia")} 
                                                    onChange={() => handleRegionChange("Asia")} 
                                                />
                                                <span className="checkmark"></span>
                                                <strong>Asia</strong>
                                            </label>
                                            <ul className="sub-category">
                                                <li>
                                                    <label className="containerss">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedDestinations.includes("Indonesia")} 
                                                            onChange={() => handleDestinationChange("Indonesia")}
                                                        />
                                                        <span className="checkmark"></span>
                                                        <strong><span>Indonesia</span> <span>01</span></strong>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="containerss">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedDestinations.includes("Maldives")} 
                                                            onChange={() => handleDestinationChange("Maldives")}
                                                        />
                                                        <span className="checkmark"></span>
                                                        <strong><span>Maldives</span> <span>01</span></strong>
                                                    </label>
                                                </li>
                                            </ul>
                                            <i className="bi bi-caret-right-fill sidebar-category-icon"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="single-widgets">
                                <div className="widget-title">
                                    <h5>Pricing</h5>
                                </div>
                                <div className="range-wrap">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input 
                                                type="range" 
                                                min="500" 
                                                max="3000" 
                                                step="50"
                                                value={priceRange} 
                                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                                style={{ width: '100%', accentColor: '#ff5c41' }} 
                                            />
                                        </div>
                                    </div>
                                    <div className="slider-labels" style={{ marginTop: '10px' }}>
                                        <div className="caption">
                                            <span>Max Price: <strong>${priceRange}</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-8">
                    <div className="package-grid-top-area">
                        <span><strong>{filteredPackages.length}</strong> Unforgettable Journeys Await!</span>
                        <div className="selector-and-list-grid-area">
                            <div className="selector-area">
                                <span>Sort By:</span>
                                <select 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)} 
                                    className="nice-select-custom"
                                    style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ddd', marginLeft: '5px' }}
                                >
                                    <option value="Default">Default</option>
                                    <option value="Price High">Price High</option>
                                    <option value="Price Low">Price Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="list-grid-product-wrap column-2-wrapper">
                        <div className="row gy-md-5 gy-4">
                            {filteredPackages.map((pkg) => (
                                <div key={pkg.id} className="col-md-6 item wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <div className="package-card">
                                        <div className="package-img-wrap">
                                            <a href="#" className="package-img">
                                                <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                            </a>
                                            <div className="batch">
                                                <span>Hot Sale!</span>
                                            </div>
                                        </div>
                                        <div className="package-content">
                                            <h5><a href="#">{pkg.title}</a></h5>
                                            <div className="location-and-time">
                                                <div className="location">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.83615 0C3.77766 0 1.28891 2.48879 1.28891 5.54892C1.28891 7.93837 4.6241 11.8351 6.05811 13.3994C6.25669 13.6175 6.54154 13.7411 6.83615 13.7411C7.13076 13.7411 7.41561 13.6175 7.6142 13.3994C9.04821 11.8351 12.3834 7.93833 12.3834 5.54892C12.3834 2.48879 9.89464 0 6.83615 0ZM7.31469 13.1243C7.18936 13.2594 7.02008 13.3342 6.83615 13.3342C6.65222 13.3342 6.48295 13.2594 6.35761 13.1243C4.95614 11.5959 1.69584 7.79515 1.69584 5.54896C1.69584 2.7134 4.00067 0.406933 6.83615 0.406933C9.67164 0.406933 11.9765 2.7134 11.9765 5.54896C11.9765 7.79515 8.71617 11.5959 7.31469 13.1243Z"></path>
                                                        <path d="M6.83618 8.54554C8.4624 8.54554 9.7807 7.22723 9.7807 5.60102C9.7807 3.9748 8.4624 2.65649 6.83618 2.65649C5.20997 2.65649 3.89166 3.9748 3.89166 5.60102C3.89166 7.22723 5.20997 8.54554 6.83618 8.54554Z"></path>
                                                    </svg>
                                                    <a href="#">{pkg.destination}</a>
                                                </div>
                                                <svg className="arrow" width="25" height="6" viewBox="0 0 25 6" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 3L5 5.88675V0.113249L0 3ZM25 3L20 0.113249V5.88675L25 3ZM4.5 3.5H20.5V2.5H4.5V3.5Z"></path>
                                                </svg>
                                                <span>{pkg.duration}</span>
                                            </div>
                                            <ul className="package-info">
                                                {pkg.features.map((feature, i) => (
                                                    <li key={i}>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="14" height="14" rx="7"></rect>
                                                            <path d="M10.6947 5.45777L6.24644 9.90841C6.17556 9.97689 6.08572 10.0124 5.99596 10.0124C5.9494 10.0125 5.90328 10.0033 5.86027 9.98548C5.81727 9.96763 5.77822 9.94144 5.7454 9.90841L3.3038 7.46681C3.16436 7.32969 3.16436 7.10521 3.3038 6.96577L4.16652 6.10065C4.29892 5.96833 4.53524 5.96833 4.66764 6.10065L5.99596 7.42897L9.33092 4.09161C9.36377 4.05868 9.40278 4.03255 9.44573 4.01471C9.48868 3.99686 9.53473 3.98766 9.58124 3.98761C9.67572 3.98761 9.76556 4.02545 9.83172 4.09161L10.6944 4.95681C10.8341 5.09625 10.8341 5.32073 10.6947 5.45777Z"></path>
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="btn-and-price-area">
                                                <a href="#" className="primary-btn1">
                                                    <span> Book Now 
                                                        <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                                        </svg>
                                                    </span>
                                                </a>
                                                <div className="price">
                                                    <span>${pkg.price}</span>
                                                    {pkg.oldPrice && <del>${pkg.oldPrice}</del>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}