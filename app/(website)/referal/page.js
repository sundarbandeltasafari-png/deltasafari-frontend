import React from 'react';
import Link from 'next/link';
import '../about/about.css';
import './referal.css';
import { fetchPageSeo } from '@/libs/seoHelper';

export async function generateMetadata() {
  return await fetchPageSeo('referal');
}

export default function ReferralPage() {
  const publicUrl = process.env.NEXT_PUBLIC_PUBLIC_URL || '';

  const steps = [
    {
      num: 1,
      icon: 'fa-solid fa-user-plus',
      title: 'Create Account',
      desc: 'Sign up on Delta Safari. Your unique referral code and invite link are automatically generated in your account dashboard.',
    },
    {
      num: 2,
      icon: 'fa-solid fa-share-nodes',
      title: 'Share Code or Link',
      desc: 'Share your personal referral link or code with friends, family, and colleagues via WhatsApp, social media, or email.',
    },
    {
      num: 3,
      icon: 'fa-solid fa-plane-departure',
      title: 'Friend Books a Tour',
      desc: 'Your friend registers using your link/code and books any exciting Sundarban, domestic, or international tour package.',
    },
    {
      num: 4,
      icon: 'fa-solid fa-wallet',
      title: 'Earn Wallet Commission',
      desc: 'The designated package referral commission is credited instantly to your Delta Safari wallet balance for easy withdrawal or travel.',
    },
  ];

  const highlights = [
    {
      icon: 'fa-solid fa-hand-holding-dollar',
      iconBg: '#eff6ff',
      iconColor: '#0066cc',
      title: 'Per-Package Commission',
      desc: 'Earn the exact user commission defined on every package booked by your referred friends.',
    },
    {
      icon: 'fa-solid fa-infinity',
      iconBg: '#f0f7ff',
      iconColor: '#0284c7',
      title: 'No Limit on Referrals',
      desc: 'Refer as many friends as you want. There is no ceiling on your total potential referral income.',
    },
    {
      icon: 'fa-solid fa-money-bill-transfer',
      iconBg: '#e0f2fe',
      iconColor: '#0369a1',
      title: 'Direct Wallet Payouts',
      desc: 'Earnings are instantly credited to your wallet balance, ready to withdraw to your bank or use on your next holiday.',
    },
    {
      icon: 'fa-solid fa-link',
      iconBg: '#eef6ff',
      iconColor: '#1d4ed8',
      title: 'Dual-Tracking System',
      desc: 'Friends can register by clicking your custom shareable link or manually typing your referral code during signup.',
    },
    {
      icon: 'fa-solid fa-bolt',
      iconBg: '#e8f1fd',
      iconColor: '#174385',
      title: 'Instant Booking Credit',
      desc: 'No waiting periods. Commission triggers automatically upon booking confirmation.',
    },
    {
      icon: 'fa-solid fa-chart-line',
      iconBg: '#eff6ff',
      iconColor: '#0066cc',
      title: 'Real-time Dashboard',
      desc: 'Track invited users, total bookings, and complete commission earnings history from your profile dashboard.',
    },
  ];

  const faqs = [
    {
      id: 'faq1',
      question: 'How does the Delta Safari Referral Program work?',
      answer: 'When you create an account on Delta Safari, a unique referral code and shareable link are generated for you. Share them with friends. When someone registers through your link or enters your code and books any tour package, you earn the designated package commission credited straight to your wallet.',
    },
    {
      id: 'faq2',
      question: 'When is my referral commission credited?',
      answer: 'Referral commission is automatically credited to your Delta Safari wallet balance as soon as your referred friend completes and confirms their package booking.',
    },
    {
      id: 'faq3',
      question: 'Is there any limit to how many people I can refer?',
      answer: 'There are no limits! You can invite as many friends, family members, or colleagues as you like and earn commissions on all their package bookings.',
    },
    {
      id: 'faq4',
      question: 'How can I withdraw my referral earnings?',
      answer: 'You can view your available wallet balance in your account dashboard and request a payout directly to your bank account or use your wallet balance toward your next holiday booking.',
    },
    {
      id: 'faq5',
      question: 'Where can I see my referral link, code, and earnings?',
      answer: 'Log in to your Delta Safari account and visit the "Refer & Earn" section (/myreferal). You will find your referral code, one-click share buttons, referred friends list, and complete payout history.',
    },
  ];

  return (
    <div className="referral-page-wrapper">
      
      {/* 1. GLASS HERO BANNER SECTION (Matching /contact page) */}
      <section 
        className="about-hero-section"
        style={{ backgroundImage: `url(${publicUrl}assets/img/innerpages/breadcrumb-bg2.jpg)` }}
      >
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <div className="row align-items-center g-4">
            
            {/* Left Content */}
            <div className="col-lg-8">
              <span className="about-badge">
                <i className="fa-solid fa-gift"></i> Delta Safari Referral Program
              </span>
              <h1 className="about-hero-title text-white">
                Invite Friends & Earn Commission on Every Holiday Tour
              </h1>
              <p className="about-hero-sub">
                Share Delta Safari with friends and family. Earn a direct cash commission credited straight to your wallet every time someone books a tour with your invite link or code.
              </p>
              
              <div className="d-flex align-items-center gap-3 flex-wrap mt-4 mb-3">
                <Link 
                  href="/login" 
                  className="btn btn-primary rounded-pill px-4 py-2.5 d-inline-flex align-items-center gap-2 shadow-sm"
                  style={{ backgroundColor: '#0066cc', borderColor: '#0066cc', fontSize: '15px', fontWeight: 500 }}
                >
                  <i className="fa-solid fa-paper-plane"></i> Start Referring Now
                </Link>
                <a 
                  href="#how-it-works" 
                  className="btn btn-outline-light rounded-pill px-4 py-2.5 d-inline-flex align-items-center gap-2"
                  style={{ fontSize: '15px', fontWeight: 500 }}
                >
                  <i className="fa-solid fa-circle-question"></i> How It Works
                </a>
              </div>

              <nav aria-label="breadcrumb" className="mt-4">
                <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
                  <li className="breadcrumb-item">
                    <Link href="/" className="text-white opacity-75 text-decoration-none">
                      <i className="fa-solid fa-house me-1"></i>Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item text-white active" aria-current="page" style={{ fontWeight: 500 }}>
                    Referral Program
                  </li>
                </ol>
              </nav>
              
            </div>

            {/* Right Glass Card (Matching /contact floating glass box) */}
            <div className="col-lg-4 text-center d-none d-lg-block">
              <div 
                className="floating-element p-4 rounded-4" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.12)', 
                  backdropFilter: 'blur(14px)', 
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="badge rounded-pill mb-3" style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#7dd3fc', fontSize: '11px', fontWeight: 500 }}>
                  <i className="fa-solid fa-bolt me-1"></i> Instant Wallet Payout
                </div>
                
                <i className="fa-solid fa-wallet text-info display-4 mb-2 d-block" style={{ color: '#38bdf8' }}></i>
                <h3 className="text-white fw-bold h4 mb-1">₹500+ Commission</h3>
                <p className="text-white opacity-75 small mb-3">Per Booked Holiday Package</p>
                
                <div className="border-top border-white border-opacity-25 pt-3 mt-2 text-white-50 text-xs">
                  <span>Direct Wallet Credit • Unlimited Referrals • Real-time Tracking</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS RIBBON */}
      <section className="referral-stats-ribbon">
        <div className="container">
          <div className="row g-3 justify-content-center">
            
            <div className="col-6 col-md-3">
              <div className="referral-stat-item">
                <div className="referral-stat-icon" style={{ backgroundColor: '#eff6ff', color: '#0066cc' }}>
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <div className="referral-stat-num">50,000+</div>
                  <div className="referral-stat-label">Active Referrers</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="referral-stat-item">
                <div className="referral-stat-icon" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                  <i className="fa-solid fa-wallet"></i>
                </div>
                <div>
                  <div className="referral-stat-num">₹2.4 Crore+</div>
                  <div className="referral-stat-label">Payouts Distributed</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="referral-stat-item">
                <div className="referral-stat-icon" style={{ backgroundColor: '#f0f7ff', color: '#1d4ed8' }}>
                  <i className="fa-solid fa-suitcase-rolling"></i>
                </div>
                <div>
                  <div className="referral-stat-num">1.2 Lakh+</div>
                  <div className="referral-stat-label">Tours Booked</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="referral-stat-item">
                <div className="referral-stat-icon" style={{ backgroundColor: '#e8f1fd', color: '#174385' }}>
                  <i className="fa-solid fa-shield-heart"></i>
                </div>
                <div>
                  <div className="referral-stat-num">100%</div>
                  <div className="referral-stat-label">Direct Payouts</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STEP BY STEP PROCESS */}
      <section className="py-5" id="how-it-works" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container py-3">
          
          <div className="text-center mb-5">
            <span className="badge rounded-pill px-3 py-1.5 mb-2" style={{ backgroundColor: '#e0f2fe', color: '#0066cc', fontSize: '12px', fontWeight: 500 }}>
              Step by Step
            </span>
            <h2 className="fw-bold text-dark mt-1 mb-2" style={{ fontSize: '28px' }}>
              How Does The Referral Program Work?
            </h2>
            <p className="text-muted mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '14px', lineHeight: '1.6' }}>
              Start earning package commissions in 4 simple and automated steps.
            </p>
          </div>

          <div className="row g-4">
            {steps.map((step) => (
              <div key={step.num} className="col-12 col-sm-6 col-lg-3">
                <div className="referral-step-card">
                  <div className="referral-step-badge">{step.num}</div>
                  <div className="referral-step-icon-box">
                    <i className={step.icon}></i>
                  </div>
                  <h3 className="referral-step-title">{step.title}</h3>
                  <p className="referral-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. PROGRAM HIGHLIGHTS / BENEFITS */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          
          <div className="text-center mb-5">
            <span className="badge rounded-pill px-3 py-1.5 mb-2" style={{ backgroundColor: '#eff6ff', color: '#0066cc', fontSize: '12px', fontWeight: 500 }}>
              Why Join Delta Safari
            </span>
            <h2 className="fw-bold text-dark mt-1 mb-2" style={{ fontSize: '28px' }}>
              Highlights Of Our Referral Program
            </h2>
            <p className="text-muted mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '14px', lineHeight: '1.6' }}>
              Transparent, automated, per-package referral commissions designed for every traveler.
            </p>
          </div>

          <div className="row g-4">
            {highlights.map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="referral-benefit-card">
                  <div 
                    className="referral-benefit-icon"
                    style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                  >
                    <i className={item.icon}></i>
                  </div>
                  <h4 className="text-dark mb-2" style={{ fontSize: '16px' }}>{item.title}</h4>
                  <p className="text-muted m-0" style={{ fontSize: '13.5px', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container py-3">
          
          <div className="row g-5 align-items-start">
            
            {/* Left Header Info */}
            <div className="col-lg-4">
              <span className="badge rounded-pill px-3 py-1.5 mb-2" style={{ backgroundColor: '#eff6ff', color: '#0066cc', fontSize: '12px', fontWeight: 500 }}>
                Got Questions?
              </span>
              <h2 className="fw-bold text-dark mt-1 mb-3" style={{ fontSize: '28px' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-muted mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Everything you need to know about referring friends, tracking bookings, and withdrawing your earnings.
              </p>
              <Link
                href="/contact"
                className="btn btn-outline-primary rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
                style={{ fontSize: '14px', fontWeight: 500, borderColor: '#0066cc', color: '#0066cc' }}
              >
                <i className="fa-solid fa-headset"></i> Contact Support
              </Link>
            </div>

            {/* Right Accordion List */}
            <div className="col-lg-8">
              <div className="accordion" id="referralFaqAccordion">
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="accordion-item border rounded-3 p-1 bg-white shadow-sm mb-3" style={{ borderColor: '#eef2f6' }}>
                    <h3 className="accordion-header" id={`heading-${faq.id}`}>
                      <button
                        className={`accordion-button ${idx !== 0 ? 'collapsed' : ''} bg-transparent text-dark shadow-none`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${faq.id}`}
                        aria-expanded={idx === 0 ? 'true' : 'false'}
                        aria-controls={`collapse-${faq.id}`}
                        style={{ fontSize: '15px' }}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div
                      id={`collapse-${faq.id}`}
                      className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                      aria-labelledby={`heading-${faq.id}`}
                      data-bs-parent="#referralFaqAccordion"
                    >
                      <div className="accordion-body text-muted pt-0" style={{ fontSize: '13.5px', lineHeight: '1.65' }}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="referral-cta-box text-center text-white">
            <div className="mx-auto" style={{ maxWidth: '680px' }}>
              <span className="badge bg-white bg-opacity-10 text-white rounded-pill px-3 py-1 mb-3" style={{ fontSize: '12px', fontWeight: 500 }}>
                Start Earning Today
              </span>
              <h2 className="fw-bold text-white mb-3" style={{ fontSize: '32px' }}>
                Ready to Turn Travel Sharing into Real Earnings?
              </h2>
              <p className="text-white text-opacity-80 mb-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                Join thousands of Delta Safari members who earn commissions every month. Sign up now, get your invite link, and start sharing!
              </p>
              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                <Link
                  href="/login"
                  className="referral-cta-btn"
                >
                  <i className="fa-solid fa-gift"></i> Get Your Referral Code
                </Link>
                <Link
                  href="/packages"
                  className="btn btn-outline-light rounded-pill px-4 py-2.5"
                  style={{ fontSize: '15px', fontWeight: 500 }}
                >
                  Explore Holiday Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}