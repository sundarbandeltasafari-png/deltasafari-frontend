import React from 'react';
import { getAllCitiesUrl } from '@/routes/packageRoutes';
import axios from 'axios';
import Link from 'next/link';

async function CitiesPage() {
    let cities = [];
    try {
        const response = await axios.post(getAllCitiesUrl, { condition: { is_active: 1 } });
        if (response.data?.status && Array.isArray(response.data?.cities)) {
            cities = response.data.cities;
        }
        console.log(response);
        
    } catch (error) {
        cities = [];
    }

    return (
        <div className="destination-dt-travel-season-section py-5 mb-100" id="cities-page">
            <div className="container">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb text-xs mb-0 bg-transparent p-0">
                        <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                        <li className="breadcrumb-item"><Link href="/package" className="text-secondary text-decoration-none">Packages</Link></li>
                        <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">All Cities</li>
                    </ol>
                </nav>

                <div className="section-title mb-4">
                    <h1 className="h2 fw-bold mb-2">Explore All Cities & Destinations</h1>
                    <p className="text-muted m-0">Browse through our complete collection of travel destinations to find your perfect getaway.</p>
                </div>

                <div className="row g-3">
                    {cities && cities.length > 0 ? (
                        cities.map((city, index) => {
                            const imgUrl = city.city_image 
                                ? `${process.env.NEXT_PUBLIC_SERVER_URL}${city.city_image}`
                                : '/assets/images/noimage.jpg';
                            const cityLink = `/packages/city-${city.slug}`;

                            return (
                                <div 
                                    key={city.id || index} 
                                    className="col-12 col-md-6 col-lg-4 wow animate fadeInDown" 
                                    data-wow-delay={`${(index % 3) * 150}ms`} 
                                    data-wow-duration="1500ms"
                                >
                                    <div className="hotel-card row m-1 border rounded-3 p-2 bg-white shadow-sm hover-lift transition-all">
                                        <div className="hotel-img-wrap p-0 col-md-5">
                                            <Link href={cityLink} className="hotel-img d-block h-100 overflow-hidden rounded-2">
                                                <img 
                                                    src={imgUrl} 
                                                    alt={city.name} 
                                                    style={{ height: "95px", width: "100%", objectFit: "cover" }} 
                                                />
                                            </Link>
                                        </div>
                                        <div className="hotel-content col-md-7 pb-0 pt-2">
                                            <div className="location-area flex-column mb-0 gap-1">
                                                <div className="location w-100 mb-2 d-flex align-items-center gap-1">
                                                    <svg width="22" height="22" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                                        <path d="M6.83615 0C3.77766 0 1.28891 2.48879 1.28891 5.54892C1.28891 7.93837 4.6241 11.8351 6.05811 13.3994C6.25669 13.6175 6.54154 13.7411 6.83615 13.7411C7.13076 13.7411 7.41561 13.6175 7.6142 13.3994C9.04821 11.8351 12.3834 7.93833 12.3834 5.54892C12.3834 2.48879 9.89464 0 6.83615 0ZM7.31469 13.1243C7.18936 13.2594 7.02008 13.3342 6.83615 13.3342C6.65222 13.3342 6.48295 13.2594 6.35761 13.1243C4.95614 11.5959 1.69584 7.79515 1.69584 5.54896C1.69584 2.7134 4.00067 0.406933 6.83615 0.406933C9.67164 0.406933 11.9765 2.7134 11.9765 5.54896C11.9765 7.79515 8.71617 11.5959 7.31469 13.1243Z"></path>
                                                        <path d="M6.83618 8.54554C8.4624 8.54554 9.7807 7.22723 9.7807 5.60102C9.7807 3.9748 8.4624 2.65649 6.83618 2.65649C5.20997 2.65649 3.89166 3.9748 3.89166 5.60102C3.89166 7.22723 5.20997 8.54554 6.83618 8.54554Z"></path>
                                                    </svg>
                                                    <Link href={cityLink} className="fw-bold text-dark text-decoration-none text-truncate" style={{ fontSize: "18px" }}>
                                                        {city.name}
                                                    </Link>
                                                </div>
                                                <ul className="hotel-feature-list mb-0 list-unstyled">
                                                    <li>
                                                        <Link href={cityLink} className="text-secondary text-decoration-none">Best Packages</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={cityLink} className="text-secondary text-decoration-none">Affordable Packages</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">No cities available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CitiesPage;
