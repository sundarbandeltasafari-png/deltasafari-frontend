import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { contactDetailsURL } from '@/routes/homeRoutes';
import ContactForm from '@/components/website/contact/ContactForm';
import { fetchPageSeo } from '@/libs/seoHelper';
import '../about/about.css';
import './contact.css';

export async function generateMetadata() {
  return await fetchPageSeo('contact');
}

async function page() {
  const publicUrl = process.env.NEXT_PUBLIC_PUBLIC_URL || '';
  let contacts = null;
  let offices = null;
  let faqs = null;
  try {
    const response = await axios.get(contactDetailsURL);
    if (response.data?.status) {
      contacts = response.data?.contacts;
      offices = response.data?.offices;
      faqs = response.data?.faqs;
    }
  } catch (error) {
    contacts = null;
    offices = null;
    faqs = null;
  }

  return (
    <div className="contact-us-page">

      {/* 1. Hero Banner Section (About Us Style) */}
      <section 
        className="about-hero-section"
        style={{ backgroundImage: `url(${publicUrl}assets/img/innerpages/breadcrumb-bg2.jpg)` }}
      >
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="about-badge">
                <i className="bi bi-shield-check"></i> Delta Safari Official
              </span>
              <h1 className="about-hero-title text-white">
                Contact Delta Safari – We're Here to Help You Plan Your Perfect Journey
              </h1>
              <p className="about-hero-sub">
                Have questions about our tour packages or need help planning your next holiday? The team at Delta Safari is always ready to assist you.
              </p>
              
              <nav aria-label="breadcrumb" className="mt-4">
                <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
                  <li className="breadcrumb-item">
                    <Link href="/" className="text-white opacity-75 text-decoration-none">
                      <i className="bi bi-house-door me-1"></i>Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item text-white active fw-semibold" aria-current="page">
                    Contact Us
                  </li>
                </ol>
              </nav>
            </div>

            <div className="col-lg-4 text-center d-none d-lg-block">
              <div className="floating-element p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <i className="bi bi-headset text-warning display-4 mb-2 d-block"></i>
                <h4 className="text-white fw-bold">24/7 Support</h4>
                <p className="text-white-50 small mb-0">Customized Holidays | Instant Query | 24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Details Section (About Us Style) */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center gy-5">

            <div className="col-lg-6">
              <div className="collage-container pe-lg-4">
                <div className="collage-experience-badge">
                  <h3 className="mb-0 fw-extrabold text-white">24/7</h3>
                  <span className="small text-white-50 fw-medium">Trip Support</span>
                </div>
                <img 
                  src={publicUrl + "assets/img/innerpages/contact-support-banner.jpg"} 
                  alt="Delta Safari Support Desk & Consultants" 
                  className="collage-main-img"
                />
                <img 
                  src={publicUrl + "assets/img/innerpages/contact-support-sub.jpg"} 
                  alt="Happy Travelers Planning Vacation" 
                  className="collage-sub-img d-none d-sm-block"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="ps-lg-3">
                <span className="text-primary fw-bold text-uppercase tracking-wider fs-6 d-block mb-2">
                  <i className="bi bi-compass-fill me-2"></i>Welcome to Delta Safari Support
                </span>
                <p className="lead text-secondary mb-3">
                  Whether you're looking for domestic tour packages, international holiday packages, customized travel itineraries, group tours, family vacations, honeymoon packages, or wildlife safari tours, we're just a call, email, or message away.
                </p>

                <p className="text-muted mb-4">
                  Our experienced travel consultants are committed to providing quick responses, expert travel advice, transparent pricing, and personalized holiday solutions to make your journey smooth and memorable. From choosing the perfect destination to booking your trip and answering all your travel-related queries, we're here to guide you every step of the way.
                </p>

                <p className="text-muted mb-4">
                  Feel free to contact us for tour bookings, travel assistance, package customization, corporate tours, school and college excursions, hotel reservations, transportation, or any other travel services. Your satisfaction is our priority, and we strive to deliver exceptional service with every interaction.
                </p>

                <div className="p-4 rounded-4 mb-4 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(233, 76, 59, 0.08) 0%, rgba(255, 180, 0, 0.12) 100%)' }}>
                  <div className="d-flex align-items-start gap-3">
                    <div className="flex-shrink-0 text-danger fs-3">
                      <i className="bi bi-stars"></i>
                    </div>
                    <div>
                      <p className="fw-semibold text-dark mb-0 fs-6" style={{ lineHeight: '1.6' }}>
                        Get in touch with Delta Safari today and let us help you create unforgettable travel experiences at the best prices. <span className="text-danger fw-bold">Your dream holiday starts with a simple conversation.</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-6 col-md-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-patch-check-fill text-success fs-4"></i>
                      <span className="fw-semibold text-dark">Quick Response</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-heart-fill text-danger fs-4"></i>
                      <span className="fw-semibold text-dark">50,000+ Guests</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-tag-fill text-warning fs-4"></i>
                      <span className="fw-semibold text-dark">Best Price Guarantee</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Contact Cards Section */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container py-2">
          
          {/* Row 1: General & Travel Support */}
          <div className="mb-4">
            <h3 className="fw-bold text-dark mb-3">
              <i className="bi bi-person-lines-fill me-2 text-primary"></i>General & Travel Support
            </h3>
            <div className="tabs row">
              <div className="tab col-md-4">
                <div className="title">
                  <h3>Call Us Directly</h3>
                </div>
                <p>Our team is available to assist you Monday to Saturday, 10 AM to 5 PM.</p>
                <div className="contact-info">
                  {contacts?.phone_1 && <a href={`tel:${contacts.phone_1.replaceAll(" ", "")}`}><i className="bi bi-telephone-fill me-1"></i>{contacts?.phone_1}</a>}
                  {contacts?.phone_2 && <a href={`tel:${contacts.phone_2.replaceAll(" ", "")}`}><i className="bi bi-telephone-fill me-1"></i>{contacts?.phone_2}</a>}
                </div>
              </div>
              <div className="tab col-md-4">
                <div className="title">
                  <h3>Email Support</h3>
                </div>
                <p>Need assistance? Email us, and we'll get back to you as soon as possible!</p>
                <div className="contact-info">
                  <a href={`mailto:${contacts?.email}`}><i className="bi bi-envelope-fill me-1"></i>{contacts?.email}</a>
                </div>
              </div>
              <div className="tab col-md-4">
                <div className="title">
                  <h3>Chat Live</h3>
                </div>
                <p>We're available to assist you Monday to Saturday, 10 AM to 5 PM.</p>
                <div className="contact-info">
                  <a href={contacts?.whatsapp_link} target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp me-1"></i>Chat on WhatsApp</a>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: For Business Purpose */}
          <div className="mb-5">
            <h3 className="fw-bold text-dark mb-3">
              <i className="bi bi-briefcase-fill me-2 text-primary"></i>For Business Purpose
            </h3>
            <div className="tabs row">
              <div className="tab col-md-4">
                <div className="title">
                  <h3>Business Calls</h3>
                </div>
                <p>For corporate tie-ups, B2B queries, MICE tours, and business partnerships.</p>
                <div className="contact-info">
                  {contacts?.business_phone ? (
                    <a href={`tel:${contacts.business_phone.replaceAll(" ", "")}`}><i className="bi bi-telephone-outbound-fill me-1"></i>{contacts.business_phone}</a>
                  ) : contacts?.phone_2 ? (
                    <a href={`tel:${contacts.phone_2.replaceAll(" ", "")}`}><i className="bi bi-telephone-outbound-fill me-1"></i>{contacts.phone_2}</a>
                  ) : (
                    contacts?.phone_1 && <a href={`tel:${contacts.phone_1.replaceAll(" ", "")}`}><i className="bi bi-telephone-outbound-fill me-1"></i>{contacts.phone_1}</a>
                  )}
                </div>
              </div>
              <div className="tab col-md-4">
                <div className="title">
                  <h3>Business Email</h3>
                </div>
                <p>Send your corporate proposals, vendor tie-ups & B2B requests here.</p>
                <div className="contact-info">
                  <a href={`mailto:${contacts?.business_email || contacts?.email || "business@deltasafari.com"}`}>
                    <i className="bi bi-envelope-check-fill me-1"></i>{contacts?.business_email || contacts?.email || "business@deltasafari.com"}
                  </a>
                </div>
              </div>
              <div className="tab col-md-4">
                <div className="title">
                  <h3>Business WhatsApp</h3>
                </div>
                <p>Connect with our B2B team directly on WhatsApp for quick corporate deals.</p>
                <div className="contact-info">
                  <a href={contacts?.business_whatsapp || contacts?.whatsapp_link || "#"} target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-whatsapp me-1"></i>Business WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Our Offices */}
          <div className="address mb-5">
            <h2 className="fw-bold text-dark mb-3">Our Offices</h2>
            <div className="tabs">
              {
                offices && offices.length > 0 && offices.sort((a, b) => {
                  if (a.office_type == "Head Office") return -1;
                  if (b.office_type == "Head Office") return 1;
                  return 0;
                }).map((office, index) => {
                  return <div key={index} className="tab">
                    <div className="title">
                      <h3>{office?.office_type}</h3>
                    </div>
                    <p>{office?.address}</p>
                    <div className="contact-info">
                      <a href={office?.map_direction_link}>Get Direction</a>
                    </div>
                  </div>
                })
              }
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="row mb-5">
            <div className="col-12">
              <ContactForm />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faqs p-3 bg-white rounded-4 shadow-sm">
            <div className="child area row">
              <div className="tab start col-md-8">
                <h2 className="title">Frequently Asked Questions</h2>
                <p className="subtitle">Everything you need to know about us</p>

                <div className="contact-us" style={{ maxWidth: "100%" }}>
                  <p>If you still have any questions or need further clarification, feel free to reach out to us directly. We’re here to help!</p>
                  <a href="#contact-form-section">Contact Us</a>
                </div>
              </div>
              <div className="faq-wrap two col-md-8">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  {
                    faqs && faqs.length > 0 && faqs?.map((faq, index) => {
                      return <div key={index} className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '800ms' }}>
                        <h5 className="accordion-header" id={"flush-headingFour_" + faq?.id}>
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseFour_" + faq?.id} aria-expanded="false" aria-controls={"flush-collapseFour_" + faq?.id}>{faq?.question}</button>
                        </h5>
                        <div id={"flush-collapseFour_" + faq?.id} className="accordion-collapse collapse" aria-labelledby={"flush-headingFour_" + faq?.id} data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body">
                            {faq?.answer}
                          </div>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default page;