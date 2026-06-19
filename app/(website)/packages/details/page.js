"use client"
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, EffectFade } from 'swiper/modules';

// Comprehensive Swiper CSS Imports 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

const packageDetails = {
  id: 201,
  title: "Enchanting Paris & Versailles Premium Exploration",
  destination: "Paris, France",
  duration: "06 Days",
  rating: "4.8",
  reviewsCount: "124",
  price: 1350,
  oldPrice: 1600,
  category: "City Tour",
  gallery: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1431274172761-fca41d93e114?auto=format&fit=crop&w=1200&q=80"
  ],
  overviewText: "Immerse yourself deep within Europe's capital of art, fashion, and gastronomy. This exclusive GoFly travel itinerary takes you gracefully across the cobblestone avenues of Paris down to the historical royal halls of Versailles.",
  highlights: [
    "Priority Skip-the-Line Entry passes to Eiffel Tower & Louvre Museum",
    "Full day expert-guided VIP excursion of the Palace of Versailles",
    "Private Bateaux Parisiens gourmet evening dinner cruise on the Seine"
  ],
  included: ["05 Nights Luxury Hotel Stay", "Airport Pickups & Drop Transfers"],
  excluded: ["International Airline Flights", "Personal Souvenirs & Dining Tips"],
  itinerary: [
    { day: "Day 01", title: "Arrival & Scenic Twilight Cruise", desc: "Touch down in Paris. Meet your private driver at the gate and transfer to your hotel." },
    { day: "Day 02", title: "Historic Icons & Louvre Exploration", desc: "Skip the lines at the Louvre Museum with our certified art historian." }
  ],
  faqs: [
    { q: "What is the policy on booking cancellations?", a: "Cancellations made 15 days prior to the departure date are eligible for a 100% full refund. Any cancellations within 7 days are subject to a 50% cancellation fee." },
    { q: "Are international flights included in the total pricing?", a: "No, international flight tickets are not included. Travelers must secure their own flights to Charles de Gaulle Airport (CDG)." },
    { q: "Is travel insurance mandatory for this specific tour?", a: "While not explicitly mandatory, we highly recommend purchasing a comprehensive travel insurance policy to cover unforeseen medical scenarios or baggage delays." }
  ],
  related: [
    { id: 1, title: "Swiss Alps Luxury Rail Adventure", destination: "Switzerland", price: 1850, duration: "07 Days", image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Rome & Amalfi Coast Historic Escape", destination: "Italy", price: 1420, duration: "08 Days", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Santorini Romantic Sunset Getaway", destination: "Greece", price: 1290, duration: "05 Days", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: "Barcelona Arts & Tapas Culture Tour", destination: "Spain", price: 1150, duration: "06 Days", image: "https://images.unsplash.com/photo-1583422874117-1e00ed70c6c0?auto=format&fit=crop&w=600&q=80" },
    { id: 5, title: "Santorini Romantic Sunset Getaway", destination: "Greece", price: 1290, duration: "05 Days", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80" },
    { id: 6, title: "Rome & Amalfi Coast Historic Escape", destination: "Italy", price: 1420, duration: "08 Days", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" },
  ]
};

export default function GoFlyPackageDetails() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(0);
  const [guestsCount, setGuestsCount] = useState(1);

  return (
    <div className="package-details-section pt-100 mb-100" style={{ fontFamily: 'sans-serif', paddingBottom: '80px' }}>

      {/* Dynamic Font-Icons Fallback Injector */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />

      <div className="container">

        {/* Title Area */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-8">
            <span className="badge mb-2" style={{ backgroundColor: '#ff5c41', color: '#fff', padding: '6px 14px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600' }}>
              {packageDetails.category}
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#0A132C', marginTop: '5px', marginBottom: '10px' }}>
              {packageDetails.title}
            </h2>
            <div className="d-flex flex-wrap align-items-center gap-4" style={{ fontSize: '14px', color: '#4A5264' }}>
              <div><i className="bi bi-geo-alt" style={{ color: '#ff5c41', marginRight: '5px' }}></i>{packageDetails.destination}</div>
              <div><i className="bi bi-clock" style={{ color: '#ff5c41', marginRight: '5px' }}></i>{packageDetails.duration}</div>
              <div><i className="bi bi-star-fill" style={{ color: '#FBBF24', marginRight: '5px' }}></i>{packageDetails.rating} ({packageDetails.reviewsCount} reviews)</div>
            </div>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <span style={{ fontSize: '14px', color: '#4A5264', display: 'block' }}>Starting From</span>
            <h3 style={{ fontSize: '38px', fontWeight: '800', color: '#ff5c41', margin: 0 }}>
              ${packageDetails.price}
              {packageDetails.oldPrice && <del style={{ fontSize: '18px', color: '#A0A6B5', marginLeft: '10px', fontWeight: '400' }}>${packageDetails.oldPrice}</del>}
            </h3>
          </div>
        </div>

        {/* Swiper Main Gallery Image Canvas Grid */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="gofly-swiper-wrapper">
              <Swiper
                style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#ff5c41', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px' }}
                effect={'fade'}
                loop={true}
                spaceBetween={10}
                navigation={true}
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Navigation, Pagination, Thumbs, EffectFade]}
                className="main-gallery-slider"
              >
                {packageDetails.gallery.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img src={img} alt={`Slide ${i}`} style={{ width: '100%', height: '480px', objectFit: 'cover' }} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="thumbs-gallery-selector"
              >
                {packageDetails.gallery.map((img, i) => (
                  <SwiperSlide key={i} style={{ borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                    <img src={img} alt={`Thumb ${i}`} style={{ width: '100%', height: '100px', objectFit: 'cover', border: '3px solid transparent' }} className="gofly-thumb-image" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Content Layout & Interactive Sidebar Component Frame */}
        <div className="row">
          <div className="col-lg-8">
            {/* Tabs System Navigation Header */}
            <div className="gofly-tabs-container mb-4" style={{ display: 'flex', borderBottom: '2px solid #E4E7EC', gap: '30px' }}>
              {["overview", "itinerary", "inclusions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '15px 5px', fontSize: '15px', fontWeight: '700',
                    color: activeTab === tab ? '#ff5c41' : '#4A5264', background: 'none', border: 'none',
                    borderBottom: activeTab === tab ? '3px solid #ff5c41' : '3px solid transparent',
                    textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Pane Active Card Rendering Viewport */}
            <div className="tab-content-wrapper p-4 mb-5" style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E4E7EC' }}>
              {activeTab === 'overview' && (
                <div>
                  <h4 style={{ fontWeight: '700', color: '#0A132C', marginBottom: '12px' }}>Tour Description</h4>
                  <p style={{ color: '#4A5264', lineHeight: '1.8' }}>{packageDetails.overviewText}</p>
                  <h4 className="mt-4 mb-3" style={{ fontWeight: '700', color: '#0A132C' }}>Tour Highlights</h4>
                  <ul style={{ paddingLeft: '20px', color: '#4A5264', lineHeight: '2' }}>
                    {packageDetails.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>
              )}
              {activeTab === 'itinerary' && (
                <div className="itinerary-timeline" style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px dashed #ff5c41' }}>
                  {packageDetails.itinerary.map((item, i) => (
                    <div key={i} className="mb-4" style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '-29px', top: '2px', background: '#ff5c41', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '3px 7px', borderRadius: '50%' }}>{i + 1}</span>
                      <h5 style={{ fontWeight: '700', color: '#0A132C', margin: '0 0 5px 10px' }}>{item.day}: {item.title}</h5>
                      <p style={{ color: '#4A5264', fontSize: '14px', margin: '0 0 0 10px' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'inclusions' && (
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="mb-3" style={{ color: '#10B981', fontWeight: '700' }}>Included</h5>
                    {packageDetails.included.map((item, i) => <div key={i} className="mb-2" style={{ color: '#4A5264' }}><i className="bi bi-check2 text-success me-2"></i>{item}</div>)}
                  </div>
                  <div className="col-md-6">
                    <h5 className="mb-3" style={{ color: '#EF4444', fontWeight: '700' }}>Excluded</h5>
                    {packageDetails.excluded.map((item, i) => <div key={i} className="mb-2" style={{ color: '#4A5264' }}><i className="bi bi-x text-danger me-2"></i>{item}</div>)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* GoFly Sidebar Context Form Layout Panel */}
          <div className="col-lg-4">
            <div className="package-sidebar-area">
              <div className="sidebar-wrapper" style={{ position: 'sticky', top: '30px', background: '#fff', border: '1px solid #E4E7EC', padding: '30px', borderRadius: '12px' }}>
                <div className="title-area mb-3 pb-2" style={{ borderBottom: '1px solid #E4E7EC' }}>
                  <h5 style={{ margin: 0, fontWeight: '700', color: '#0A132C' }}>Book This Package</h5>
                </div>
                <form className="d-flex flex-column gap-3">
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4A5264', marginBottom: '6px', display: 'block' }}>Departure Date</label>
                    <input type="date" className="form-control" style={{ padding: '11px', borderRadius: '6px', border: '1px solid #D4D7DF', width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4A5264', marginBottom: '6px', display: 'block' }}>Total Travelers</label>
                    <input type="number" min="1" value={guestsCount} onChange={(e) => setGuestsCount(Math.max(1, parseInt(e.target.value) || 1))} className="form-control" style={{ padding: '11px', borderRadius: '6px', border: '1px solid #D4D7DF', width: '100%' }} />
                  </div>
                  <div className="p-3" style={{ backgroundColor: '#F8F9FC', borderRadius: '8px', fontSize: '14px' }}>
                    <div className="d-flex justify-content-between mb-2"><span style={{ color: '#4A5264' }}>Total Cost</span><strong style={{ fontSize: '22px', color: '#ff5c41', fontWeight: '800' }}>${packageDetails.price * guestsCount}</strong></div>
                  </div>
                  <button type="button" className="primary-btn1 w-100 border-0 pt-3 pb-3 text-center" style={{ background: '#ff5c41', color: '#fff', borderRadius: '6px', fontWeight: '700' }}>
                    Confirm Booking Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Accordion FAQ Area Component Block */}
        <div className="faq-section mb-5">
          <h3 className="mb-4" style={{ fontWeight: '700', color: '#0A132C' }}>Frequently Asked Questions</h3>
          <div className="accordion-wrapper d-flex flex-column gap-3">
            {packageDetails.faqs.map((faq, index) => (
              <div key={index} style={{ border: '1px solid #E4E7EC', borderRadius: '8px', background: '#fff', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-100 text-start d-flex justify-content-between align-items-center p-3"
                  style={{ background: 'none', border: 'none', fontWeight: '700', color: '#0A132C', cursor: 'pointer', outline: 'none' }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: '#ff5c41', transition: 'transform 0.2s', transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </button>
                {openFaq === index && (
                  <div className="p-3 border-top" style={{ color: '#4A5264', fontSize: '14px', lineHeight: '1.6', background: '#F8F9FC' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Carousel Packages Section Element */}
        <div className="related-packages-section mt-5 pt-4 border-top">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 style={{ fontWeight: '700', color: '#0A132C', margin: 0 }}>You May Also Like</h3>
            <div className="swiper-nav-arrows d-flex gap-2">
              <div className="related-prev-btn" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E4E7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff' }}><i className="bi bi-arrow-left"></i></div>
              <div className="related-next-btn" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E4E7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff' }}><i className="bi bi-arrow-right"></i></div>
            </div>
          </div>

          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            navigation={{ nextEl: '.related-next-btn', prevEl: '.related-prev-btn' }}
            modules={[Navigation]}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 4 }
            }}
            className="related-packages-slider"
          >
            {packageDetails.related.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="single-package-card" style={{ background: '#fff', border: '1px solid #E4E7EC', borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.3s' }}>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="package-card-content p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '13px', color: '#4A5264' }}>
                      <span><i className="bi bi-geo-alt text-danger me-1"></i>{item.destination}</span>
                      <span><i className="bi bi-clock text-danger me-1"></i>{item.duration}</span>
                    </div>
                    <h5 style={{ fontSize: '16px', fontWeight: '700', color: '#0A132C', minHeight: '44px', margin: '0 0 15px 0' }}>{item.title}</h5>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <span style={{ fontSize: '14px', color: '#4A5264' }}>Price</span>
                      <strong style={{ color: '#ff5c41', fontSize: '18px', fontWeight: '800' }}>${item.price}</strong>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* Styled Scoped Overrides Sheet */}
      <style jsx global>{`
        .thumbs-gallery-selector .swiper-slide-thumb-active img { border-color: #ff5c41 !important; opacity: 1; }
        .thumbs-gallery-selector .gofly-thumb-image { opacity: 0.6; transition: all 0.3s ease; }
        .thumbs-gallery-selector .gofly-thumb-image:hover { opacity: 1; }
        .single-package-card:hover { transform: translateY(-5px); }
        .swiper-nav-arrows div:hover { background: #ff5c41 !important; color: #fff !important; border-color: #ff5c41 !important; }
      `}</style>
    </div>
  );
}