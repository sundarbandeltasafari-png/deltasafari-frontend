'use client';

import React from 'react';
import Link from 'next/link';

export default function TouristGuideSection({ destinationInfo, cityInfo }) {
  const activeEntity = destinationInfo || cityInfo;
  const entityName = destinationInfo?.name || cityInfo?.name || "Sundarban";

  // Parse tourist_guide JSON if available from backend / admin
  const customGuide = React.useMemo(() => {
    const rawGuide = destinationInfo?.tourist_guide || cityInfo?.tourist_guide;
    if (!rawGuide) return null;
    if (typeof rawGuide === 'object') return rawGuide;
    try {
      return JSON.parse(rawGuide);
    } catch (e) {
      console.error("Error parsing tourist_guide:", e);
      return null;
    }
  }, [destinationInfo, cityInfo]);

  // If guide is explicitly disabled in admin
  if (customGuide && customGuide.enabled === false) {
    return null;
  }

  // Curated fallback data for Sundarban & destinations matching sundarbanecotourism.com
  const guideTitle = customGuide?.guide_title || `${entityName} Tour Guide`;
  const guideSubtitle = customGuide?.guide_subtitle || `Things you have to know before making a ${entityName.toLowerCase()} trip.`;
  const howToReachTitle = customGuide?.how_to_reach_title || `How can I make a ${entityName.toLowerCase()} tour comfortable?`;
  const overviewDesc = customGuide?.overview_desc || `We have started our journey since 2005 for providing a satisfactory ${entityName} tour to the tourists of every corner in the world. The love we received from our customers motivated us to expand our tour and travels business, and makes it much more comfortable and happy experience for our customers in ${entityName}. The ${entityName} travel is a wonderful experience with our tour guide team.`;
  const basePointIntro = customGuide?.base_point_intro || `There will be many ways to make a ${entityName.toLowerCase()} tour. First, you should be fixed a base point. I think KOLKATA is the right place to keep as a Basepoint for you if you belong to another city or state. You can reach at Kolkata by air, Train or Bus. You can choose our ${entityName.toLowerCase()} tour package for your hassle-free ${entityName} tour.`;

  const waysToReach = customGuide?.ways_to_reach && customGuide.ways_to_reach.length > 0 ? customGuide.ways_to_reach : [
    {
      title: "Way-1:- By Air",
      description: "You can reach DUM DUM airport (CCU) by air. It’s 110-120 km away from Sundarban. You can travel by bus or cab or if you book your Sundarban tour package with us, we can pick you up directly from the airport.",
      icon: "fa-solid fa-plane-departure",
      badge: "By Air Transfer"
    },
    {
      title: "Way-2:- By Train",
      description: "By train, you can reach Sealdah or Howrah Railway Station. Then from these stations, you can travel by bus or cab or by our packages. It’s near about 110 km away from Sundarban.",
      icon: "fa-solid fa-train-subway",
      badge: "By Train Transfer"
    },
    {
      title: "Way-3:- By Road / Local Train",
      description: "From Kolkata you can travel by local train to Canning then you can hire a private cab or auto to Godkhali / Gosaba. Canning is nearly 46 km away from Kolkata.",
      icon: "fa-solid fa-car-side",
      badge: "By Road Transfer"
    }
  ];

  const guidePoints = customGuide?.guide_points && customGuide.guide_points.length > 0 ? customGuide.guide_points : [
    {
      title: "Enjoy natural beauty :-",
      description: `I think ${entityName} is made by direct blessing of GOD. It’s natural beauty is highly charming which can change your mind to free.`,
      icon: "fa-solid fa-tree"
    },
    {
      title: `How to make a plan for ${entityName} tour? :-`,
      description: `You can book a ${entityName} tour by choosing a tour package or you can send us a request to make a customized ${entityName} tour package. Clear your doubts with our 24/7 experts.`,
      icon: "fa-solid fa-compass"
    },
    {
      title: "Watch Tower :-",
      description: "There will be three watch towers i.e Sajnekhali, Sudhanyakhali, Dobanki. From these towers, you can watch birds of around 200 species such as heron, Kingfisher, quill, eagle, Caspian tern, etc.",
      icon: "fa-solid fa-binoculars"
    },
    {
      title: "Enjoy of Local Tour :-",
      description: "You can feel like never before by touching the morning wind to your body. You will feel like listening to a song from nature surrounding you. The beginning of the day will make your day so sweet.",
      icon: "fa-solid fa-sun"
    },
    {
      title: "Riding of Boat :-",
      description: "If you will not ride a boat during your trip, it’s sure the trip will not be completed. During the houseboat riding period, you can feel the song of the river. If you are lucky then you can see Royal Bengal Tiger.",
      icon: "fa-solid fa-ship"
    },
    {
      title: "Jungle Trip :-",
      description: "By GOD’s grace jungle is full of ornaments like deer, tigers, snakes, monitor lizards, many types of birds along with BONO DEVI. You will never forget to visit the jungle during your tour.",
      icon: "fa-solid fa-paw"
    },
    {
      title: "Availability of ATM :-",
      description: "ATMs are not available in the deep delta area. Therefore you will take sufficient money as per your need from GOSABA / CANNING or your nearest availability area.",
      icon: "fa-solid fa-credit-card"
    }
  ];

  const servicesList = customGuide?.services && customGuide.services.length > 0 ? customGuide.services : [
    { title: "ACCOMODATION", desc: "We try to provide the best accommodation that is possible to provide.", icon: "fa-solid fa-hotel" },
    { title: "PRIVACY", desc: "We value the privacy of our visitors. We try to keep our visitors safe and sound.", icon: "fa-solid fa-user-shield" },
    { title: "GOOD FOOD", desc: "We provide the best kind of regional food to satisfy your delicacy.", icon: "fa-solid fa-utensils" },
    { title: "TRANSPORT", desc: "We provide the best transport for our visitors so that they can enjoy their trip.", icon: "fa-solid fa-van-shuttle" },
    { title: "SAFETY", desc: "We provide extreme safety of our visitors while they are on the safari.", icon: "fa-solid fa-shield-halved" },
    { title: "SIGHT SEEING", desc: "We assure our visitors the best view of all the nearest tourist spots.", icon: "fa-solid fa-binoculars" },
    { title: "DOCTOR ON CALL", desc: "24 X 7 Doctors' service is available through phone call.", icon: "fa-solid fa-kit-medical" },
    { title: "ELECTRICITY", desc: "We provide 24 X 7 electricity to all of our customers.", icon: "fa-solid fa-bolt" }
  ];

  const importantLinks = [
    { title: "Pakhiralaya island,", href: "/contact" },
    { title: "Hiron point,", href: "/contact" },
    { title: "Sundarban national park,", href: "/contact" },
    { title: "Not do during sundarban tour,", href: "/contact" },
    { title: "Safe and secure tour,", href: "/contact" },
    { title: "Sundarban supported by UNESCO,", href: "/contact" },
    { title: "Travel and explore,", href: "/contact" },
    { title: "Reasons of visit in winter,", href: "/contact" },
    { title: "Important things to bring during stay in hotel,", href: "/contact" },
    { title: "Why you should stay in houseboat during tour?", href: "/contact" }
  ];

  const bannerImageSrc = customGuide?.banner_image
    ? (customGuide.banner_image.startsWith('http') || customGuide.banner_image.startsWith('/') ? customGuide.banner_image : `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${customGuide.banner_image}`)
    : destinationInfo?.image
    ? (destinationInfo.image.startsWith('http') || destinationInfo.image.startsWith('/') ? destinationInfo.image : `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${destinationInfo.image}`)
    : cityInfo?.city_image
    ? (cityInfo.city_image.startsWith('http') || cityInfo.city_image.startsWith('/') ? cityInfo.city_image : `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${cityInfo.city_image}`)
    : '/assets/img/innerpages/universal-tour-guide-banner.jpg';

  return (
    <div className="sundarban-guide-container my-5 font-sans" id="tour-guide-section">
      
      {/* =========================================================================
          SECTION 1: TWO-COLUMN TOUR GUIDE & HOW TO REACH (Light Logo Blue Theme)
          ========================================================================= */}
      <section className="about_bg p-4 p-md-5 rounded-4 shadow-sm bg-white border mb-5">
        <div className="row g-4 g-lg-5 align-items-start">

          {/* LEFT COLUMN: HERO BANNER, GREAT HOLIDAYS, HOW TO MAKE TOUR COMFORTABLE & ROADMAP */}
          <div className="col-lg-6">
            <div className="about_left_wrap">
              {/* Header Hero Image */}
              <div className="mb-4 rounded-4 overflow-hidden shadow-sm position-relative" style={{ height: '240px' }}>
                <img 
                  src={bannerImageSrc} 
                  alt={`${entityName} Tour Guide Banner`} 
                  className="w-100 h-100 object-fit-cover transition-all hover-scale"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/img/innerpages/universal-tour-guide-banner.jpg';
                  }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t from-dark to-transparent text-white">
                  <span className="badge bg-primary text-white fw-bold px-2.5 py-1 rounded-pill text-2xs mb-1" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0088ee 100%)' }}>
                    <i className="fa-solid fa-award me-1"></i> Since 2005
                  </span>
                  <h4 className="fw-bold mb-0 text-white text-sm">Direct Operator &amp; Forest Safari Experts</h4>
                </div>
              </div>

              {/* Great Holidays Narrative */}
              <h2 className="fw-extrabold text-dark h4 mb-2 d-flex align-items-center gap-2">
                <span style={{ color: '#0066cc' }}><i className="fa-solid fa-compass"></i></span>
                <span style={{ color: '#0f172a' }}>GREAT HOLIDAYS</span>
              </h2>

              <p className="text-muted text-xs mb-3" style={{ lineHeight: '1.8' }}>
                {overviewDesc}
              </p>

              {/* How can I make a tour comfortable? */}
              <h3 className="h5 fw-bold mb-2 mt-4" style={{ color: '#0066cc' }}>
                {howToReachTitle}
              </h3>

              <p className="text-muted text-xs mb-3" style={{ lineHeight: '1.75' }}>
                {basePointIntro}
              </p>

              {/* TRANSIT ROADMAP LIST WITH CONNECTING ICONS & DIRECTION */}
              <div className="roadmap-ways-list mt-3">
                <h6 className="fw-bold text-uppercase text-2xs tracking-wider mb-3 d-flex align-items-center gap-1.5" style={{ color: '#0066cc' }}>
                  <i className="fa-solid fa-route"></i> Transit Directions &amp; Base Points:
                </h6>

                <div className="d-flex flex-column gap-3">
                  {waysToReach.map((way, idx) => (
                    <div key={idx} className="roadmap-way-card p-3 rounded-3 shadow-2xs transition-all hover-lift position-relative">
                      <div className="d-flex align-items-center justify-content-between mb-1.5">
                        <h4 className="h6 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                          <span className="badge rounded-circle p-1" style={{ width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', background: '#0066cc', color: '#ffffff' }}>
                            {idx + 1}
                          </span>
                          <span>{way.title}</span>
                        </h4>
                        <span className="badge border text-3xs fw-semibold px-2 py-0.5 rounded-pill" style={{ background: '#e0f2fe', color: '#0066cc', borderColor: '#bae6fd' }}>
                          <i className={`${way.icon || "fa-solid fa-location-arrow"} me-1`}></i>
                          {way.badge || `Way ${idx + 1}`}
                        </span>
                      </div>
                      <p className="text-muted text-2xs mb-0 ps-4" style={{ lineHeight: '1.65' }}>
                        {way.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: TOUR GUIDE, THINGS TO KNOW, BULLET POINTS & IMPORTANT LINKS */}
          <div className="col-lg-6">
            <div className="about_content p-3 p-md-4 rounded-4 bg-white border shadow-2xs h-100" style={{ borderColor: '#dbeafe' }}>
              
              <div className="border-bottom pb-3 mb-3" style={{ borderColor: '#e0f2fe' }}>
                <span className="badge fw-bold px-2.5 py-1 rounded-pill text-2xs mb-1.5 d-inline-block" style={{ background: '#e0f2fe', color: '#0066cc', border: '1px solid #bae6fd' }}>
                  <i className="fa-solid fa-circle-check me-1"></i> Verified Travel Advice
                </span>
                <h2 className="h4 fw-extrabold text-dark mb-1">{guideTitle}</h2>
                <h3 className="h6 text-muted fw-semibold mb-0" style={{ fontSize: '0.85rem' }}>
                  {guideSubtitle}
                </h3>
              </div>

              {/* GUIDE BULLET POINTS LIST */}
              <ul className="list-unstyled d-flex flex-column gap-3 mb-4 ps-1">
                {guidePoints.map((pt, idx) => (
                  <li key={idx} className="d-flex align-items-start gap-2.5">
                    <div 
                      className="flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center mt-0.5 shadow-xs"
                      style={{ width: '28px', height: '28px', background: '#e0f2fe', color: '#0066cc', fontSize: '12px', border: '1px solid #bae6fd' }}
                    >
                      <i className={pt.icon || "fa-solid fa-check"}></i>
                    </div>
                    <div className="flex-grow-1">
                      <h4 className="h6 fw-bold text-dark mb-0.5 d-inline-block" style={{ fontSize: '0.88rem' }}>
                        {pt.title}
                      </h4>
                      <span className="text-muted text-2xs ms-1" style={{ lineHeight: '1.65' }}>
                        {pt.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* IMPORTANT INFORMATION TAGS & LINKS */}
              <div className="p-3 rounded-3 border mb-4" style={{ background: '#f0f7ff', borderColor: '#bae6fd' }}>
                <h3 className="h6 fw-bold mb-2" style={{ fontSize: '0.85rem', color: '#0066cc' }}>
                  <i className="fa-solid fa-info-circle me-1"></i> Click Here To Get Other Some Important Information:
                </h3>
                <p className="mb-0 text-2xs text-muted" style={{ lineHeight: '1.8' }}>
                  {importantLinks.map((link, idx) => (
                    <span key={idx} className="me-1.5 d-inline-block">
                      <Link href={link.href} className="text-decoration-underline fw-medium" style={{ color: '#0066cc' }}>
                        <i>{link.title}</i>
                      </Link>
                    </span>
                  ))}
                </p>
              </div>

              {/* Light Logo Blue Action Button */}
              <div>
                <Link 
                  href="/contact" 
                  className="btn btn-logo-blue px-4 py-2.5 rounded-pill fw-bold text-white shadow-sm hover-lift text-xs text-uppercase tracking-wider d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-circle-question"></i>
                  <span>Know More About {entityName}</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BEST SERVICES & FACILITIES GRID (Light Logo Blue Theme)
          ========================================================================= */}
      <section className="amazing-tours text-center p-4 p-md-5 rounded-4 shadow-sm bg-white border mb-4" style={{ borderColor: '#dbeafe' }}>
        <div className="mb-4">
          <span className="badge fw-bold px-3 py-1 rounded-pill text-2xs mb-1.5 d-inline-block" style={{ background: '#e0f2fe', color: '#0066cc', border: '1px solid #bae6fd' }}>
            <i className="fa-solid fa-shield-heart me-1"></i> Top Hospitality
          </span>
          <h2 className="fw-extrabold text-dark h3 mb-1">Best Services</h2>
          <p className="text-muted text-xs mb-0">We guarantee supreme comfort, verified safety, and regional Bengali culinary excellence.</p>
        </div>

        <div className="row g-3 g-md-4">
          {servicesList.map((svc, idx) => (
            <div key={idx} className="col-6 col-md-3">
              <div className="service-matrix-card p-3.5 rounded-4 border h-100 text-center transition-all hover-lift shadow-2xs">
                {/* Circular Icon Holder */}
                <div 
                  className="service-matrix-icon mx-auto rounded-circle d-flex align-items-center justify-content-center mb-2.5 shadow-sm"
                  style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', color: '#0066cc', fontSize: '1.25rem', border: '1px solid #bae6fd' }}
                >
                  <i className={svc.icon || "fa-solid fa-check"}></i>
                </div>
                <h5 className="text-uppercase fw-bold text-dark text-xs mb-1" style={{ letterSpacing: '0.5px' }}>
                  {svc.title}
                </h5>
                <p className="text-muted text-3xs mb-0" style={{ lineHeight: '1.55' }}>
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 24X7 EXPERT NATURALIST ASSISTANCE STRIP (Logo Blue Gradient)
          ========================================================================= */}
      <div className="assistance-banner p-4 p-md-5 rounded-4 text-white shadow-sm position-relative overflow-hidden">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 text-start">
          <div className="d-flex align-items-center gap-3">
            <div 
              className="flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center shadow-md text-white"
              style={{ width: '50px', height: '50px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', fontSize: '1.35rem' }}
            >
              <i className="fa-solid fa-headset"></i>
            </div>
            <div>
              <span className="badge bg-white text-primary fw-bold px-2 py-0.5 rounded-pill text-3xs mb-1">
                <i className="fa-solid fa-bolt me-1 text-warning"></i> Quick Assistance
              </span>
              <h4 className="fw-bold text-white mb-0.5 h5">Need help choosing your {entityName} package?</h4>
              <p className="small text-white text-opacity-75 mb-0">Our expert travel team is ready 24/7 to customize your boat cruise, group bookings, or resort choices.</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <Link href="/contact" className="btn btn-light text-primary px-4 py-2.5 rounded-pill fw-bold text-nowrap shadow-sm hover-lift text-xs">
              <i className="fa-solid fa-phone me-1.5"></i> Talk to Expert
            </Link>
            <Link href="/contact" className="btn btn-outline-light px-3.5 py-2.5 rounded-pill fw-bold text-nowrap shadow-sm hover-lift text-xs bg-white text-dark">
              <i className="fa-brands fa-whatsapp text-success me-1"></i> WhatsApp
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
