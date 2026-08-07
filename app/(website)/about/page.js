import React from 'react';
import Link from 'next/link';
import './about.css';

export async function generateMetadata() {
  return {
    title: 'About Delta Safari – Your Trusted Travel Partner for Unforgettable Holidays',
    description: 'Learn about Delta Safari, one of India\'s trusted travel companies specializing in customized holiday packages, budget tours, luxury vacations, wildlife safaris, and international trips.',
    keywords: 'Delta Safari, About Delta Safari, travel agency India, holiday packages, customized tours, budget travel, wildlife safari, domestic tours, international holidays',
  };
}

export default function AboutPage() {
  const publicUrl = process.env.NEXT_PUBLIC_PUBLIC_URL || '';

  const bookingCategories = [
    { title: 'Budget Holiday Packages', icon: 'bi-piggy-bank', desc: 'Affordable tours designed to give maximum value without compromising quality.' },
    { title: 'Family Tour Packages', icon: 'bi-people', desc: 'Fun-filled, wholesome itineraries tailored for families and multi-gen travel.' },
    { title: 'Honeymoon Packages', icon: 'bi-heart', desc: 'Romantic escapes in idyllic destinations with special touches for couples.' },
    { title: 'Adventure Tour Packages', icon: 'bi-compass', desc: 'Thrilling trekking, rafting, and outdoor activities for adventure enthusiasts.' },
    { title: 'Wildlife Safari Tours', icon: 'bi-tree', desc: 'Exciting national park safaris and wildlife encounters in natural habitats.' },
    { title: 'Beach Holiday Packages', icon: 'bi-sun', desc: 'Relaxing coastal getaways along pristine shores and tropical beaches.' },
    { title: 'Hill Station Tours', icon: 'bi-mountains', desc: 'Refreshing retreats in scenic mountain ranges and cool hill retreats.' },
    { title: 'Weekend Getaways', icon: 'bi-calendar-event', desc: 'Quick short trips to rejuvenate your mind and spirit close to home.' },
    { title: 'Group Tour Packages', icon: 'bi-person-arms-up', desc: 'Engaging, well-organized tours for friends, clubs, and social groups.' },
    { title: 'Corporate Tours', icon: 'bi-briefcase', desc: 'Custom MICE, team outings, and business incentive retreats.' },
    { title: 'Educational Trips', icon: 'bi-mortarboard', desc: 'Insightful, safe, and enriching study trips for schools and colleges.' },
    { title: 'Customized Travel Packages', icon: 'bi-sliders', desc: 'Fully personalized itineraries built around your exact preferences.' },
  ];

  const whyChooseReasons = [
    { number: '01', title: 'Customized Holiday Packages', desc: 'Tailored specifically for every budget and personal travel style.' },
    { number: '02', title: 'Affordable & Transparent Pricing', desc: 'Complete peace of mind with zero hidden fees or surprise costs.' },
    { number: '03', title: 'Experienced Travel Professionals', desc: 'Guidance from seasoned tourism experts every step of the way.' },
    { number: '04', title: 'Safe & Reliable Arrangements', desc: 'Prioritizing your comfort, safety, and security on all journeys.' },
    { number: '05', title: 'Handpicked Hotels & Transport', desc: 'Trusted partners for verified stays and comfortable transit.' },
    { number: '06', title: 'Flexible Itineraries', desc: 'Freedom to customize pace, attractions, and activity options.' },
    { number: '07', title: '24/7 Customer Support', desc: 'Dedicated assistance before, during, and after your trip.' },
    { number: '08', title: 'Fast & Secure Online Booking', desc: 'Hassle-free reservations with instant confirmation.' },
    { number: '09', title: 'Quality Service & Satisfaction', desc: 'Focusing on creating lifelong unforgettable memories.' },
  ];

  const domesticDestinations = [
    { name: 'Sundarban', img: publicUrl + 'assets/img/innerpages/destination-card4-img1.jpg' },
    { name: 'Darjeeling', img: publicUrl + 'assets/img/innerpages/destination-card4-img2.jpg' },
    { name: 'Sikkim', img: publicUrl + 'assets/img/innerpages/destination-card4-img3.jpg' },
    { name: 'Bhutan', img: publicUrl + 'assets/img/innerpages/destination-card4-img4.jpg' },
    { name: 'Andaman Islands', img: publicUrl + 'assets/img/innerpages/destination-dt-location-img1.jpg' },
    { name: 'Kashmir', img: publicUrl + 'assets/img/innerpages/destination-dt-location-img2.jpg' },
    { name: 'Himachal Pradesh', img: publicUrl + 'assets/img/innerpages/destination-dt-location-img3.jpg' },
    { name: 'Kerala', img: publicUrl + 'assets/img/innerpages/destination-dt-location-img4.jpg' },
    { name: 'Rajasthan', img: publicUrl + 'assets/img/innerpages/destination-dt-location-img5.jpg' },
    { name: 'Goa', img: publicUrl + 'assets/img/innerpages/destination-card4-img6.jpg' },
    { name: 'North East India', img: publicUrl + 'assets/img/innerpages/destination-dt-location-img6.jpg' },
  ];

  const intlDestinations = ['Nepal', 'Dubai', 'Thailand', 'Bali', 'Singapore', 'Malaysia', 'Maldives'];

  const customExperienceTypes = [
    { title: 'Nature and Wildlife Tours', icon: 'bi-flower1' },
    { title: 'Cultural and Heritage Tours', icon: 'bi-bank' },
    { title: 'Adventure Holidays', icon: 'bi-fire' },
    { title: 'Honeymoon Escapes', icon: 'bi-suit-heart-fill' },
    { title: 'Family Vacations', icon: 'bi-house-heart' },
    { title: 'Pilgrimage Tours', icon: 'bi-stars' },
    { title: 'Educational Tours', icon: 'bi-book' },
    { title: 'Luxury Holidays', icon: 'bi-gem' },
    { title: 'Weekend Trips', icon: 'bi-lightning-charge' },
    { title: 'Corporate Incentive Tours', icon: 'bi-building' },
  ];

  return (
    <div className="about-us-page">

      {/* Hero Banner Section */}
      <section 
        className="about-hero-section"
        style={{ backgroundImage: `url(${publicUrl}assets/img/innerpages/breadcrumb-bg1.jpg)` }}
      >
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="about-badge">
                <i className="bi bi-shield-check"></i> Delta Safari Official
              </span>
              <h1 className="about-hero-title text-white">
                About Delta Safari – Your Trusted Travel Partner for Unforgettable Holidays
              </h1>
              <p className="about-hero-sub">
                Crafting memorable, budget-friendly, and seamless travel experiences across India and top international destinations.
              </p>
              
              <nav aria-label="breadcrumb" className="mt-4">
                <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
                  <li className="breadcrumb-item">
                    <Link href="/" className="text-white opacity-75 text-decoration-none">
                      <i className="bi bi-house-door me-1"></i>Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item text-white active fw-semibold" aria-current="page">
                    About Us
                  </li>
                </ol>
              </nav>
            </div>

            <div className="col-lg-4 text-center d-none d-lg-block">
              <div className="floating-element p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <i className="bi bi-globe-americas text-warning display-4 mb-2 d-block"></i>
                <h4 className="text-white fw-bold">Explore With Confidence</h4>
                <p className="text-white-50 small mb-0">Customized Holidays | Transparent Pricing | 24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Welcome to Delta Safari */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center gy-5">

            <div className="col-lg-6">
              <div className="collage-container pe-lg-4">
                <div className="collage-experience-badge">
                  <h3 className="mb-0 fw-extrabold text-white">10+</h3>
                  <span className="small text-white-50 fw-medium">Years of Excellence</span>
                </div>
                <img 
                  src={publicUrl + "assets/img/innerpages/about-journey-main.jpg"} 
                  alt="Delta Safari Tour Destinations" 
                  className="collage-main-img"
                />
                <img 
                  src={publicUrl + "assets/img/innerpages/about-journey-sub.jpg"} 
                  alt="Happy Travelers Experience" 
                  className="collage-sub-img d-none d-sm-block"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="ps-lg-3">
                <span className="text-primary fw-bold text-uppercase tracking-wider fs-6 d-block mb-2">
                  <i className="bi bi-compass-fill me-2"></i>Welcome to Delta Safari
                </span>
                <h2 className="display-6 fw-bold mb-4 text-dark">
                  Your Journey to Unforgettable Destinations Starts Here
                </h2>
                
                <p className="lead text-secondary mb-3">
                  At <strong>Delta Safari</strong>, we believe that every journey should be memorable, affordable, and stress-free. As one of India's trusted travel companies, we specialize in creating customized holiday packages, budget-friendly tours, luxury vacations, group tours, family holidays, honeymoon packages, adventure trips, wildlife tours, and weekend getaways across India and selected international destinations.
                </p>

                <p className="text-muted mb-4">
                  Our experienced travel experts carefully design every itinerary to match your budget, travel preferences, and holiday expectations. Whether you're looking for a peaceful nature retreat, an exciting adventure, a romantic honeymoon, or a fun-filled family vacation, Delta Safari ensures a seamless travel experience from booking to your safe return.
                </p>

                <div className="row g-3 mt-1">
                  <div className="col-6 col-md-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-patch-check-fill text-success fs-4"></i>
                      <span className="fw-semibold text-dark">Trusted Agency</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-heart-fill text-danger fs-4"></i>
                      <span className="fw-semibold text-dark">50,000+ Happy Guests</span>
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

          {/* Mission Statement Block directly after Welcome Section */}
          <div className="mt-4">
            <div className="mission-statement-card p-4 p-md-5 rounded-4 shadow-sm" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #fff8f0 100%)', border: '1px solid rgba(33, 150, 243, 0.18)' }}>
              <div className="d-flex gap-3 align-items-start">
                <div className="icon-box-primary flex-shrink-0" style={{ width: '54px', height: '54px', borderRadius: '14px', fontSize: '1.6rem' }}>
                  <i className="bi bi-rocket-takeoff-fill"></i>
                </div>
                <div>
                  <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-1 rounded-pill mb-2 fs-8">
                    OUR CORE MISSION
                  </span>
                  <p className="fw-semibold text-dark fs-5 mb-3" style={{ lineHeight: '1.6' }}>
                    "With years of experience in the tourism industry, our mission is simple—to provide <span className="text-primary fw-bold">exceptional travel experiences</span>, <span className="text-primary fw-bold">outstanding customer service</span>, <span className="text-primary fw-bold">transparent pricing</span>, and <span className="text-primary fw-bold">unforgettable memories</span> for every traveller."
                  </p>
                  
                  <div className="d-flex flex-wrap gap-2 pt-1">
                    <span className="badge bg-white text-dark border px-3 py-2 rounded-pill fs-6 fw-medium shadow-sm">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Exceptional Experiences
                    </span>
                    <span className="badge bg-white text-dark border px-3 py-2 rounded-pill fs-6 fw-medium shadow-sm">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Outstanding Service
                    </span>
                    <span className="badge bg-white text-dark border px-3 py-2 rounded-pill fs-6 fw-medium shadow-sm">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Transparent Pricing
                    </span>
                    <span className="badge bg-white text-dark border px-3 py-2 rounded-pill fs-6 fw-medium shadow-sm">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> Unforgettable Memories
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Book Your Holiday Packages with Confidence */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container py-4">
          <div className="row align-items-center gy-4">
            
            <div className="col-lg-6">
              <span className="text-primary fw-bold text-uppercase tracking-wider fs-6 d-block mb-2">
                <i className="bi bi-shield-lock-fill me-2"></i>Seamless & Worry-Free
              </span>
              <h2 className="fw-bold display-6 text-dark mb-3">
                Book Your Holiday Packages with Confidence
              </h2>
              <p className="text-secondary mb-3">
                Planning your dream vacation has never been easier. Delta Safari offers a wide range of domestic tour packages, international holiday packages, custom tour packages, and all-inclusive travel packages designed for every type of traveller.
              </p>
              <p className="text-muted mb-4">
                Whether you're planning to explore the Himalayas, relax on pristine beaches, experience thrilling wildlife safaris, discover rich cultural heritage, or enjoy scenic hill stations, we have the perfect holiday package for you.
              </p>

              <h5 className="fw-bold text-dark mb-3">Every itinerary is carefully planned to provide:</h5>
              <div className="row g-3 mb-4">
                {[
                  'Comfortable accommodation',
                  'Reliable transportation',
                  'Sightseeing tours',
                  'Local experiences',
                  'Flexible travel options',
                  'Excellent customer support throughout your journey',
                ].map((item, idx) => (
                  <div className="col-sm-6" key={idx}>
                    <div className="feature-check-item">
                      <span className="check-icon"><i className="bi bi-check-lg"></i></span>
                      <span className="fw-semibold text-dark fs-6">{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="alert alert-primary d-flex align-items-center gap-3 border-0 shadow-sm rounded-4 p-3" role="alert">
                <i className="bi bi-award-fill fs-2 text-primary"></i>
                <div>
                  <h6 className="mb-1 fw-bold text-primary">Our Core Goal</h6>
                  <p className="mb-0 small text-dark">
                    Our goal is to help you travel more while spending less without compromising on quality or comfort.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="rounded-4 overflow-hidden shadow-sm mb-3">
                    <img src={publicUrl + "assets/img/innerpages/tour-package-img1.jpg"} alt="Holiday Package" className="w-100 object-fit-cover" style={{ height: '220px' }} />
                  </div>
                  <div className="rounded-4 overflow-hidden shadow-sm">
                    <img src={publicUrl + "assets/img/innerpages/hotel-img1.jpg"} alt="Comfortable Stay" className="w-100 object-fit-cover" style={{ height: '160px' }} />
                  </div>
                </div>
                <div className="col-6 pt-4">
                  <div className="rounded-4 overflow-hidden shadow-sm mb-3">
                    <img src={publicUrl + "assets/img/innerpages/destination-img1.jpg"} alt="Sightseeing Tour" className="w-100 object-fit-cover" style={{ height: '160px' }} />
                  </div>
                  <div className="rounded-4 overflow-hidden shadow-sm">
                    <img src={publicUrl + "assets/img/innerpages/destination-img2.jpg"} alt="Local Experience" className="w-100 object-fit-cover" style={{ height: '220px' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Easy Online Booking at Budget-Friendly Prices */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase tracking-wider fs-6 d-block mb-2">
              <i className="bi bi-laptop me-2"></i>Online Booking Made Simple
            </span>
            <h2 className="fw-bold display-6 text-dark mb-3">
              Easy Online Booking at Budget-Friendly Prices
            </h2>
            <p className="text-secondary lead mx-auto" style={{ maxWidth: '800px' }}>
              Delta Safari provides a simple, secure, and hassle-free online booking experience. With just a few clicks, you can browse, compare, and book the best travel packages that match your preferences.
            </p>
          </div>

          <div className="row g-4">
            {bookingCategories.map((cat, idx) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={idx}>
                <div className="p-4 about-card-hover h-100 d-flex flex-column">
                  <div className="icon-box-primary mb-3">
                    <i className={`bi ${cat.icon}`}></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{cat.title}</h5>
                  <p className="text-muted small mb-0 flex-grow-1">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-4 text-center" style={{ background: 'linear-gradient(135deg, #ebf5ff 0%, #fff4ec 100%)', border: '1px solid #e2e8f0' }}>
            <p className="mb-0 fw-semibold text-dark fs-5">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Our transparent pricing means there are <strong>no hidden charges</strong>, allowing you to plan your holiday with complete peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 & 5: Best Travel Deals & Customized Tours */}
      <section className="py-5" style={{ background: '#f4f6f8' }}>
        <div className="container py-4">
          <div className="row gy-5">

            {/* Best Deals */}
            <div className="col-lg-6">
              <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm h-100 d-flex flex-column justify-content-between border">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge bg-danger px-3 py-2 rounded-pill fs-7">
                      <i className="bi bi-percent me-1"></i> Exclusive Savings
                    </span>
                    <span className="badge bg-success-subtle text-success fw-bold px-3 py-1 rounded-pill small">
                      <i className="bi bi-tag-fill me-1"></i> Up to 30% Off
                    </span>
                  </div>
                  
                  <h3 className="fw-bold text-dark mb-3">
                    Best Travel Deals & Exclusive Holiday Offers
                  </h3>
                  
                  <p className="text-secondary mb-3">
                    At Delta Safari, we believe that amazing holidays shouldn't come with expensive price tags. We regularly release exclusive travel deals, seasonal discounts, early bird offers, and group savings to ensure maximum value for your money.
                  </p>

                  {/* Highlights Grid */}
                  <h6 className="fw-bold text-dark mb-3">Popular Deal Categories:</h6>
                  <div className="row g-2 mb-4">
                    {[
                      { icon: 'bi-alarm-fill', title: 'Early Bird Offers', desc: 'Save big by booking in advance' },
                      { icon: 'bi-people-fill', title: 'Group Savings', desc: 'Special rates for family & group trips' },
                      { icon: 'bi-calendar-range-fill', title: 'Seasonal Packages', desc: 'Handpicked holiday specials' },
                      { icon: 'bi-lightning-charge-fill', title: 'Last-Minute Deals', desc: 'Instant discounts on quick escapes' },
                      { icon: 'bi-heart-fill', title: 'Honeymoon Specials', desc: 'Romantic perks & special discounts' },
                      { icon: 'bi-compass-fill', title: 'Weekend Getaways', desc: 'Budget-friendly short trip offers' },
                    ].map((deal, idx) => (
                      <div className="col-6" key={idx}>
                        <div className="p-3 rounded-3 bg-light border h-100">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <i className={`bi ${deal.icon} text-danger fs-6`}></i>
                            <span className="fw-bold text-dark small">{deal.title}</span>
                          </div>
                          <p className="small text-muted mb-0" style={{ fontSize: '0.8rem' }}>{deal.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-light rounded-3 border">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-box-orange flex-shrink-0">
                      <i className="bi bi-stars"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-1">Tailored For Everyone</h6>
                      <p className="small text-muted mb-0">From solo travellers to large families and corporate groups, we have special packages designed to suit every travel budget.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customized Tours */}
            <div className="col-lg-6">
              <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm h-100 d-flex flex-column justify-content-between border">
                <div>
                  <span className="badge bg-primary px-3 py-2 rounded-pill fs-7 mb-3">
                    <i className="bi bi-sliders me-1"></i> 100% Personalised
                  </span>
                  <h3 className="fw-bold text-dark mb-3">
                    Customized Tours Designed Just for You
                  </h3>
                  <p className="text-secondary mb-4">
                    Every traveller is different, and every holiday should be unique. Our travel specialists work closely with you to create personalised itineraries based on your interests, travel dates, preferred destinations, and budget.
                  </p>
                  
                  <h6 className="fw-bold text-dark mb-3">Tailored Experience Types:</h6>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {customExperienceTypes.map((exp, idx) => (
                      <span className="destination-pill" key={idx}>
                        <i className={`bi ${exp.icon} text-primary`}></i>
                        {exp.title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="alert alert-success mb-0 border-0 rounded-3 p-3">
                  <p className="mb-0 small fw-semibold text-success">
                    <i className="bi bi-magic me-2"></i>
                    Delta Safari will create the perfect itinerary tailored specifically for you.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 6: Why Choose Delta Safari */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase tracking-wider fs-6 d-block mb-2">
              <i className="bi bi-trophy-fill me-2"></i>The Delta Safari Advantage
            </span>
            <h2 className="fw-bold display-6 text-dark mb-3">
              Why Choose Delta Safari?
            </h2>
            <p className="text-secondary lead mx-auto" style={{ maxWidth: '750px' }}>
              Choosing the right travel company makes all the difference. At Delta Safari, we are committed to delivering reliable service, affordable pricing, and memorable travel experiences.
            </p>
          </div>

          <div className="row g-4">
            {whyChooseReasons.map((reason, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="p-4 about-card-hover h-100 d-flex gap-3 align-items-start">
                  <div 
                    className="flex-shrink-0 fw-extrabold fs-3 text-primary px-3 py-2 rounded-3"
                    style={{ background: '#ebf5ff' }}
                  >
                    {reason.number}
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1">{reason.title}</h5>
                    <p className="text-muted small mb-0">{reason.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <p className="fst-italic text-secondary fs-5 mb-0">
              "Our focus is not just on booking trips but on creating experiences that you'll remember for a lifetime."
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Explore Incredible Destinations */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-primary fw-bold text-uppercase tracking-wider fs-6 d-block mb-2">
              <i className="bi bi-map-fill me-2"></i>Endless Possibilities
            </span>
            <h2 className="fw-bold display-6 text-dark mb-3">
              Explore Incredible Destinations with Delta Safari
            </h2>
            <p className="text-secondary lead mx-auto" style={{ maxWidth: '800px' }}>
              Discover India's most beautiful destinations and exciting international holidays with carefully planned travel packages.
            </p>
          </div>

          {/* Domestic Destinations Showcase */}
          <h4 className="fw-bold text-dark mb-4">
            <i className="bi bi-geo-alt-fill text-danger me-2"></i>Popular Domestic Destinations
          </h4>
          <div className="row g-3 mb-5">
            {domesticDestinations.map((dest, idx) => (
              <div className="col-6 col-md-4 col-lg-3" key={idx}>
                <div className="destination-card">
                  <img src={dest.img} alt={dest.name} />
                  <div className="destination-card-overlay">
                    <h5 className="fw-bold mb-1 text-white">{dest.name}</h5>
                    <span className="small text-white-50">Explore Packages <i className="bi bi-arrow-right"></i></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* International Destinations Showcase */}
          <h4 className="fw-bold text-dark mb-4">
            <i className="bi bi-airplane-fill text-primary me-2"></i>International Getaways
          </h4>
          <div className="d-flex flex-wrap gap-3">
            {intlDestinations.map((intl, idx) => (
              <div className="destination-pill py-3 px-4 shadow-sm" key={idx}>
                <i className="bi bi-globe text-primary fs-5"></i>
                <span className="fw-bold text-dark fs-6">{intl}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-muted fst-italic">
            <i className="bi bi-info-circle me-1"></i>
            We continue to add new destinations and unique travel experiences so every journey becomes extraordinary.
          </p>
        </div>
      </section>

      {/* Section 8: Our Promise Banner */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="promise-banner p-4 p-md-5">
            <div className="row align-items-center gy-4">
              <div className="col-lg-8">
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3">
                  <i className="bi bi-heart-pulse-fill me-1"></i> Customer First Commitment
                </span>
                <h2 className="display-6 fw-bold text-white mb-3">
                  Our Unwavering Promise To You
                </h2>
                <p className="text-white-50 lead mb-4" style={{ lineHeight: '1.7' }}>
                  At Delta Safari, customer satisfaction is our highest priority. Every booking is handled with professionalism, honesty, and attention to detail. From the moment you contact us until you return home, our dedicated team works hard to ensure your journey is smooth, enjoyable, and completely hassle-free.
                </p>
                <p className="fw-bold text-warning fs-5 mb-0">
                  "We don't just organize holidays—we create unforgettable memories that last a lifetime."
                </p>
              </div>

              <div className="col-lg-4">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="stat-box">
                      <h3 className="fw-bold text-white mb-1">100%</h3>
                      <p className="small text-white-50 mb-0">Satisfaction Priority</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-box">
                      <h3 className="fw-bold text-white mb-1">24/7</h3>
                      <p className="small text-white-50 mb-0">Trip Support</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="stat-box">
                      <h4 className="fw-bold text-warning mb-1">Transparent</h4>
                      <p className="small text-white-50 mb-0">No Hidden Costs Ever</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section: Start Your Journey Today */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #2196f3 0%, #0b4182 100%)' }}>
        <div className="container py-4 text-center">
          <span className="badge bg-white text-primary px-3 py-2 rounded-pill fw-bold mb-3">
            <i className="bi bi-rocket-takeoff-fill me-1"></i> Start Your Journey Today
          </span>
          <h2 className="display-5 fw-extrabold mb-3 text-white">
            Ready to Plan Your Next Unforgettable Vacation?
          </h2>
          <p className="lead text-white-50 max-w-2xl mx-auto mb-4" style={{ maxWidth: '800px' }}>
            Book your next holiday with Delta Safari and explore the world with confidence. Discover the best travel packages, unbeatable holiday deals, customized itineraries, and exceptional service—all at prices that fit your budget.
          </p>

          <p className="small text-white-75 mb-4 fw-medium" style={{ maxWidth: '850px', margin: '0 auto' }}>
            Delta Safari – Your Trusted Partner for Domestic Tours, International Holidays, Wildlife Safaris, Family Vacations, Honeymoon Packages, Group Tours, Adventure Travel, and Customized Holiday Experiences.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link href="/package" className="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-pill shadow">
              <i className="bi bi-search me-2"></i>Explore Holiday Packages
            </Link>
            <Link href="/customized-package" className="btn btn-outline-light btn-lg px-4 py-3 fw-bold rounded-pill">
              <i className="bi bi-sliders me-2"></i>Request Customized Plan
            </Link>
            <Link href="/contact" className="btn btn-light btn-lg px-4 py-3 fw-bold text-primary rounded-pill shadow-sm">
              <i className="bi bi-headset me-2"></i>Contact Travel Expert
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
