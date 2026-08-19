'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { getCorporateDestinationsUrl } from '@/routes/serviceRoutes';

import 'swiper/css';
import 'swiper/css/navigation';

const DEFAULT_DESTINATIONS = [
  { title: "Sundarban", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80", tag: "Jungle & Boat Safari" },
  { title: "Darjeeling", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80", tag: "Tea Gardens & Hills" },
  { title: "Digha", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", tag: "Beach & Sea Resorts" },
  { title: "Gangtok", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", tag: "Mountain Offsite" },
  { title: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80", tag: "International MICE" },
  { title: "Thailand", image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80", tag: "Beach & Nightlife" },
  { title: "Jim Corbett", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", tag: "Wildlife Retreat" },
  { title: "Rishikesh", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", tag: "Adventure & Camping" },
];

export default function CorporateDestinations({ onRequestCall }) {
  const [destinations, setDestinations] = useState(DEFAULT_DESTINATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getCorporateDestinationsUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data?.status && Array.isArray(data?.destinations) && data.destinations.length > 0) {
          const serverBase = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/';
          const mapped = data.destinations.map((item, idx) => {
            let img = item.image;
            if (img) {
              img = img.startsWith('http') || img.startsWith('/') ? img : `${serverBase}${img}`;
            } else {
              img = DEFAULT_DESTINATIONS[idx % DEFAULT_DESTINATIONS.length].image;
            }

            return {
              id: item.id,
              title: item.name || item.zone_name,
              image: img,
              tag: item.corporate_tag || item.showing_text || item.description || 'Corporate Retreat',
              slug: item.slug
            };
          });

          if (mapped.length > 0) {
            setDestinations(mapped);
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching corporate destinations:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="container ds-container">

        <div className="d-flex flex-wrap align-items-end justify-content-between mb-4">
          <div>
            <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-1.5 rounded-pill text-xs fw-bold text-uppercase">
              Popular Offsites
            </span>
            <h2 className="fw-extrabold text-dark mt-2 mb-1" style={{ fontSize: '28px', fontFamily: "'Poppins', sans-serif" }}>
              Popular Corporate Destinations
            </h2>
            <p className="text-muted text-xs mb-0 d-none d-md-block" style={{ lineHeight: '1.6' }}>
              Handpicked destinations equipped with premium conference facilities, team adventure, and luxury resorts.
            </p>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={destinations.length >= 4}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-2"
        >
          {destinations.map((item, index) => (
            <SwiperSlide key={item.id || index}>
              <div
                onClick={() => onRequestCall?.(item.title)}
                className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative hover-lift transition-all"
                style={{ height: '260px', cursor: 'pointer' }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-100 h-100 object-fit-cover package-img" 
                  onError={(e) => {
                    e.target.src = DEFAULT_DESTINATIONS[index % DEFAULT_DESTINATIONS.length].image;
                  }}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 p-3.5 d-flex flex-column justify-content-between text-white"
                  style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, transparent 60%)' }}
                >
                  <span className="badge bg-white text-dark text-2xs rounded-pill align-self-start shadow-sm fw-semibold">
                    {item.tag}
                  </span>
                  <div>
                    <h4 className="fw-bold h5 mb-1 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</h4>
                    <span className="text-warning text-xs font-bold d-inline-flex align-items-center gap-1">
                      Request Call <i className="fa-solid fa-chevron-right text-3xs"></i>
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
