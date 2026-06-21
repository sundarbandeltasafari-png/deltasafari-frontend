"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, EffectFade } from 'swiper/modules';

// Comprehensive Swiper CSS Imports 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import PackageBanner from '@/components/website/packages/PackageBanner';
import { axiosNormalGet, axiosNormalPost } from '@/libs/axiosHelper';
import { useParams, useRouter } from 'next/navigation';
import { createBookingsUrl, getParticularPackageUrl } from '@/routes/serviceRoutes';
import LoadingComponent from '@/components/common/LoadingComponent';
import { showMessage } from '@/libs/commonHelper';
import Head from 'next/head';
import { urlEncode } from '@/libs/urlHelper';
import ShareButton from '@/components/common/ShareButton';

export default function GoFlyPackageDetails() {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(0);
  const [departure, setDeparture] = useState()
  const [guestsCount, setGuestsCount] = useState(1);
  const [packageDetails, setPackageDetails] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const { slug } = params;
  const route = useRouter()
  if (!slug && !slug.split("-").length > 1) {
    route.back()
  }
  const [ogImageUrl, setOgImageUrl] = useState();
  const siteUrl = process.env.NEXT_PUBLIC_PUBLIC_URL;
  const sidebarRef = useRef()

  useEffect(() => {
    axiosNormalGet(`${getParticularPackageUrl}?id=${slug.split("-")[slug.split("-").length - 1]}`).then((res) => {
      if (res?.status) {
        setPackageDetails(res?.package)
        if (res?.package.assets.length > 0) {
          let ogImage = null
          res?.package.assets.forEach(element => {
            if (element.type == 1 && !ogImage) {
              ogImage = `${process.env.NEXT_PUBLIC_SERVER_URL}${element.path.replace(/\\/g, '/')}`
              setOgImageUrl(ogImage)
            }
          });
        } else {
          setOgImageUrl(`${process.env.NEXT_PUBLIC_PUBLIC_URL}assets/img/logo_DS.png`)
        }
        setLoading(false)
      }
      showMessage(res?.status ? 'success' : 'error', res?.msg)
    }).catch((err) => {
      showMessage('Something went wrong!  Please try again later.', 'error')
    })
  }, [])

  function bookNow() {
    axiosNormalPost().then((res) => {

    }).catch((err) => {

    })
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  // Form Validation Errors State
  const [errors, setErrors] = useState({});

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error dynamically when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Modal Validation & Submission Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Phone Validation (10 Digit Mobile Regex pattern)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    // Email Validation (Optional field - validate only if text is provided)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Final clean object ready for backend submission API integration
    axiosNormalPost(createBookingsUrl, {
      package_id: packageDetails.id,
      total_travelers: guestsCount,
      actual_price: packageDetails.actual_price,
      total_cost: packageDetails.actual_price * guestsCount,
      customer_name: formData.name,
      customer_email: formData?.email,
      customer_phone: formData?.phone,
      customer_comment: formData?.comment,
      departure_date: departure
    }).then((res) => {
      setFormData({ name: '', phone: '', email: '', comment: '' });
      showMessage('success', 'Booking request registered successfully!')
      setIsModalOpen(false);
    }).catch((err) => {
      showMessage('error', 'Something went wrong! Please try again later')
    })

    // Reset Form Fields & Close Modal
  };

  const handleViewBooking = (type) => {
    // 2. Add a class safely
    if (type) {
      sidebarRef.current?.classList.add('active-booking-sidebar');
    } else {
      sidebarRef.current?.classList.remove('active-booking-sidebar');
    }
  };


  return (
    <>
      {loading ?
        <LoadingComponent />
        :
        <>
          <Head>
            {/* Regular SEO Tags */}
            <title>{packageDetails.meta_title || packageDetails.title}</title>
            <meta name="description" content={packageDetails.meta_description || packageDetails.description?.substring(0, 160)} />
            {packageDetails.tags && <meta name="keywords" content={packageDetails.tags} />}
            <link rel="canonical" href={`${siteUrl}/packages/details/${packageDetails?.slug}-${urlEncode(packageDetails?.id)}`} />

            {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={packageDetails.title} />
            <meta property="og:description" content={packageDetails.meta_description || packageDetails.description?.substring(0, 160)} />
            <meta property="og:url" content={`${siteUrl}/packages/details/${packageDetails?.slug}-${urlEncode(packageDetails?.id)}`} />
            <meta property="og:site_name" content="Your Travel Agency Brand" />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={packageDetails.title} />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter Card Layout */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={packageDetails.title} />
            <meta name="twitter:description" content={packageDetails.meta_description || packageDetails.description?.substring(0, 160)} />
            <meta name="twitter:image" content={ogImageUrl} />
          </Head>
          <div className="package-details-section pt-50 mb-100" style={{ fontFamily: 'sans-serif', paddingBottom: '80px' }}>
            <div className="container">
              {/* Title Area */}
              <div className="row mb-4 align-items-center">
                <div className="col-md-8">
                  <span className="badge mb-2" style={{ backgroundColor: '#ff5c41', color: '#fff', padding: '6px 14px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600' }}>
                    {packageDetails.package_type_name}
                  </span>
                  <ShareButton
                    title={packageDetails.title}
                    text={packageDetails.meta_description}
                    url={"/packages/details/" + packageDetails?.slug + "-" + urlEncode(packageDetails?.id)}
                  />
                  <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#0A132C', marginTop: '5px', marginBottom: '10px' }}>
                    {packageDetails.title}
                  </h2>
                  <div className="d-flex flex-wrap align-items-center gap-4" style={{ fontSize: '14px', color: '#4A5264' }}>
                    <div><i className="bi bi-geo-alt" style={{ color: '#ff5c41', marginRight: '5px' }}></i>{packageDetails.from_destination_name} to {packageDetails.to_destination_name}</div>
                    <div><i className="bi bi-clock" style={{ color: '#ff5c41', marginRight: '5px' }}></i>{packageDetails.duration_days} Days / {packageDetails.duration_nights} Nights</div>
                    <div><i className="bi bi-star-fill" style={{ color: '#FBBF24', marginRight: '5px' }}></i>4.8 (Highly Rated)</div>
                  </div>
                </div>
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <span style={{ fontSize: '14px', color: '#4A5264', display: 'block' }}>Starting From</span>
                  <h3 style={{ fontSize: '38px', fontWeight: '800', color: '#ff5c41', margin: 0 }}>
                    {packageDetails.currency === 'INR' ? '₹' : '$'}{packageDetails.actual_price}
                    {packageDetails.base_price && <del style={{ fontSize: '18px', color: '#A0A6B5', marginLeft: '10px', fontWeight: '400' }}>{packageDetails.currency === 'INR' ? '₹' : '$'}{packageDetails.base_price}</del>}
                  </h3>
                </div>
              </div>

              <PackageBanner packageDetails={packageDetails} />
              <button type="button" onClick={() => { handleViewBooking(true) }} className="primary-btn1 w-100 border-0 pt-3 pb-3 justify-content-center  d-flex d-md-none " style={{ background: '#ff5c41', color: '#fff', borderRadius: '6px', fontWeight: '700' }}>
                Book Now
              </button>
              {/* Content Layout & Interactive Sidebar Component Frame */}
              <div className="row">
                <div className="col-lg-8">
                  {/* Tabs System Navigation Header */}
                  <div className="gofly-tabs-container mb-4" style={{ display: 'flex', borderBottom: '2px solid #E4E7EC', gap: '30px' }}>
                    {["overview", "inclusions", "policies"].map((tab) => (
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
                        <p style={{ color: '#4A5264', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{packageDetails.description}</p>
                        <h4 className="mt-4 mb-3" style={{ fontWeight: '700', color: '#0A132C' }}>Tour Tags</h4>
                        <ul style={{ paddingLeft: '20px', color: '#4A5264', lineHeight: '2', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {packageDetails.tags?.split(',').map((tag, i) => <li className='badge text-bg-secondary d-flex' key={i}>{tag.trim()}</li>)}
                        </ul>
                      </div>
                    )}
                    {activeTab === 'inclusions' && (
                      <div className="row">
                        <div className="col-md-6">
                          <h5 className="mb-3" style={{ color: '#10B981', fontWeight: '700' }}>Included</h5>
                          {JSON.parse(packageDetails.inclusions || '[]').map((item, i) => <div key={i} className="mb-2" style={{ color: '#4A5264' }}><i className="bi bi-check2 text-success me-2"></i>{item}</div>)}
                        </div>
                        <div className="col-md-6">
                          <h5 className="mb-3" style={{ color: '#EF4444', fontWeight: '700' }}>Excluded</h5>
                          {JSON.parse(packageDetails.exclusions || '[]').map((item, i) => <div key={i} className="mb-2" style={{ color: '#4A5264' }}><i className="bi bi-x text-danger me-2"></i>{item}</div>)}
                        </div>
                      </div>
                    )}
                    {activeTab === 'policies' && (
                      <div className="policies-timeline">
                        {packageDetails.policies?.map((policy, i) => (
                          <div key={i} className="mb-4">
                            <h5 style={{ fontWeight: '700', color: '#0A132C' }}>{policy.title}</h5>
                            <ul style={{ paddingLeft: '20px', color: '#4A5264', lineHeight: '1.8' }}>
                              {JSON.parse(policy.bullets || '[]').map((bullet, idx) => <li key={idx}>{bullet}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* GoFly Sidebar Context Form Layout Panel */}
                <div className="col-lg-4">
                  <div ref={sidebarRef} className="package-sidebar-area">
                    <div className="sidebar-wrapper" style={{ position: 'sticky', top: '30px', background: '#fff', border: '1px solid #E4E7EC', padding: '30px', borderRadius: '12px' }}>
                      <div className="title-area mb-3 pb-2" style={{ borderBottom: '1px solid #E4E7EC' }}>
                        <h5 style={{ margin: 0, fontWeight: '700', color: '#0A132C' }}>Book This Package</h5>
                        <button type="button" className='d-block d-md-none' onClick={() => handleViewBooking(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '22px', color: '#A0A6B5', cursor: 'pointer' }}>
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                      <form className="d-flex flex-column gap-3">
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#4A5264', marginBottom: '6px', display: 'block' }}>Departure Date</label>
                          <input type="date" className="form-control" onChange={(e) => setDeparture(e.target.value)} style={{ padding: '11px', borderRadius: '6px', border: '1px solid #D4D7DF', width: '100%' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#4A5264', marginBottom: '6px', display: 'block' }}>Total Travelers</label>
                          <input type="number" min="1" value={guestsCount} onChange={(e) => setGuestsCount(Math.max(1, parseInt(e.target.value) || 1))} className="form-control" style={{ padding: '11px', borderRadius: '6px', border: '1px solid #D4D7DF', width: '100%' }} />
                        </div>
                        <div className="p-3" style={{ backgroundColor: '#F8F9FC', borderRadius: '8px', fontSize: '14px' }}>
                          <div className="d-flex justify-content-between mb-2"><span style={{ color: '#4A5264' }}>Total Cost</span><strong style={{ fontSize: '22px', color: '#ff5c41', fontWeight: '800' }}>{packageDetails.currency === 'INR' ? '₹' : '$'}{packageDetails.actual_price * guestsCount}</strong></div>
                        </div>
                        <button type="button" onClick={() => { setIsModalOpen(true); handleViewBooking(false) }} className="primary-btn1 w-100 border-0 pt-3 pb-3 d-flex justify-content-center" style={{ background: '#ff5c41', color: '#fff', borderRadius: '6px', fontWeight: '700' }}>
                          Book Now
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion FAQ Area Component Block */}
              <div className="faq-section mb-5">
                <h3 className="mb-4" style={{ fontWeight: '700', color: '#0A132C' }}>Policies & Guidelines</h3>
                <div className="accordion-wrapper d-flex flex-column gap-3">
                  {packageDetails.policies?.map((policy, index) => (
                    <div key={index} style={{ border: '1px solid #E4E7EC', borderRadius: '8px', background: '#fff', overflow: 'hidden' }}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                        className="w-100 text-start d-flex justify-content-between align-items-center p-3"
                        style={{ background: 'none', border: 'none', fontWeight: '700', color: '#0A132C', cursor: 'pointer', outline: 'none' }}
                      >
                        <span>{policy.title}</span>
                        <span style={{ color: '#ff5c41', transition: 'transform 0.2s', transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <i className="bi bi-chevron-down"></i>
                        </span>
                      </button>
                      {openFaq === index && (
                        <div className="p-3 border-top" style={{ color: '#4A5264', fontSize: '14px', lineHeight: '1.6', background: '#F8F9FC' }}>
                          <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            {JSON.parse(policy.bullets || '[]').map((bullet, idx) => <li key={idx} className="mb-1">{bullet}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
            {/* Dynamic Pop-up Booking Lead Form Modal Overlay */}
            {isModalOpen && (
              <div className="booking-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(10, 19, 44, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '20px' }}>
                <div className="booking-modal-card" style={{ background: '#fff', width: '100%', maxWidth: '500px', borderRadius: '12px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>

                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '22px', color: '#A0A6B5', cursor: 'pointer' }}>
                    <i className="bi bi-x-lg"></i>
                  </button>

                  <h4 style={{ fontWeight: '700', color: '#0A132C', marginBottom: '5px' }}>Traveler Details</h4>
                  <p style={{ fontSize: '13px', color: '#4A5264', marginBottom: '20px' }}>Provide details to complete the booking workflow reservation query for {packageDetails.title}</p>

                  <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-3">
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#4A5264', marginBottom: '6px', display: 'block' }}>Full Name <span style={{ color: '#EF4444' }}>*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control" style={{ padding: '11px', borderRadius: '6px', border: `1px solid ${errors.name ? '#EF4444' : '#D4D7DF'}`, width: '100%' }} placeholder="" />
                      {errors.name && <small style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</small>}
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#4A5264', marginBottom: '6px', display: 'block' }}>Phone Number <span style={{ color: '#EF4444' }}>*</span></label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" style={{ padding: '11px', borderRadius: '6px', border: `1px solid ${errors.phone ? '#EF4444' : '#D4D7DF'}`, width: '100%' }} placeholder="9876xxxxxx" />
                      {errors.phone && <small style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</small>}
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#4A5264', marginBottom: '6px', display: 'block' }}>Email Address <span style={{ color: '#A0A6B5', fontWeight: 'normal' }}>(Optional)</span></label>
                      <input type="text" name="email" value={formData.email} onChange={handleInputChange} className="form-control" style={{ padding: '11px', borderRadius: '6px', border: `1px solid ${errors.email ? '#EF4444' : '#D4D7DF'}`, width: '100%' }} placeholder="joxxxxxxx@example.com" />
                      {errors.email && <small style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</small>}
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#4A5264', marginBottom: '6px', display: 'block' }}>Comments / Special Requirements</label>
                      <textarea name="comment" rows="3" value={formData.comment} onChange={handleInputChange} className="form-control" style={{ padding: '11px', borderRadius: '6px', border: '1px solid #D4D7DF', width: '100%', resize: 'none' }} placeholder="Any food preferences, seat allocations or specific assistance needs..."></textarea>
                    </div>

                    <div className="mt-2 pt-2" style={{ borderTop: '1px solid #E4E7EC' }}>
                      <button type="submit" className="primary-btn1 w-100 border-0 pt-3 pb-3 d-flex justify-content-center" style={{ background: '#ff5c41', color: '#fff', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
                        Book Now
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            )}
            {/* Styled Scoped Overrides Sheet */}
            <style jsx global>{`
          .single-package-card:hover { transform: translateY(-5px); }
          .swiper-nav-arrows div:hover { background: #ff5c41 !important; color: #fff !important; border-color: #ff5c41 !important; }
        `}</style>
          </div>
        </>
      }
    </>
  );
}