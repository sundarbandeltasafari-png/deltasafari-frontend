import React from 'react'
import "./referal.css"
import { fetchPageSeo } from '@/libs/seoHelper';

export async function generateMetadata() {
  return await fetchPageSeo('referal');
}

function page() {
    return (
        <>
            <section className="hero-section mt-0">
                <div className="hero-blob-1"></div>
                <div className="hero-blob-2"></div>
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <div className="hero-content text-lg-start text-center">
                                <div className="hero-eyebrow">
                                    <span className="dot"></span>
                                    Delta Safari Referral Program
                                </div>
                                <h1 className="hero-title">
                                    Invite Friends &amp;<br />
                                    Earn <span className="highlight">Package Cash</span><br />
                                    Commissions
                                </h1>
                                <p className="hero-desc">
                                    Share Delta Safari with your friends and family. Every time someone signs up with your referral code or link and books a tour package, you earn the user commission set for that package credited directly to your wallet balance — no limits!
                                </p>
                                <div className="hero-cta-group">
                                    <a href="/login" className="btn-hero-primary">
                                        <i className="bi bi-gift-fill"></i> Start Referring Now
                                    </a>
                                    <a href="#how-it-works" className="btn-hero-secondary">
                                        <i className="bi bi-play-circle"></i> See How It Works
                                    </a>
                                </div>
                                <div className="hero-trust">
                                    <span className="hero-trust-label">Why join?</span>
                                    <span className="trust-pill"><i className="bi bi-check-circle-fill"></i> Direct Wallet Credit</span>
                                    <span className="trust-pill"><i className="bi bi-infinity"></i> No Limit</span>
                                    <span className="trust-pill"><i className="bi bi-shield-fill-check"></i> Per-Package Earnings</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-visual">
                                <div className="hero-float-badge badge-top">
                                    <i className="bi bi-lightning-charge-fill text-warning"></i>
                                    Instant Wallet Commission!
                                </div>
                                <div className="hero-reward-card">
                                    <div className="reward-card-badge">
                                        <i className="bi bi-star-fill"></i> Refer &amp; Earn Rewards
                                    </div>
                                    <p className="reward-card-title">When your referred friend books any trip package:</p>
                                    <div className="reward-split">
                                        <div className="reward-box you">
                                            <div className="reward-box-label">You Receive</div>
                                            <div className="reward-box-amount">₹500+</div>
                                            <div className="reward-box-desc">Package Commission</div>
                                        </div>
                                        <div className="reward-box friend">
                                            <div className="reward-box-label">Friend Gets</div>
                                            <div className="reward-box-amount">Best Tour</div>
                                            <div className="reward-box-desc">Guaranteed Price</div>
                                        </div>
                                    </div>
                                    <div className="reward-divider-row">
                                        <div className="reward-divider-line"></div>
                                        <div className="reward-divider-text">Program Statistics</div>
                                        <div className="reward-divider-line"></div>
                                    </div>
                                    <div className="reward-stat-row">
                                        <div className="reward-stat">
                                            <div className="reward-stat-num">50K+</div>
                                            <div className="reward-stat-label">Active Referrers</div>
                                        </div>
                                        <div className="reward-stat">
                                            <div className="reward-stat-num">₹2.4Cr+</div>
                                            <div className="reward-stat-label">Commissions Paid</div>
                                        </div>
                                        <div className="reward-stat">
                                            <div className="reward-stat-num">4.9★</div>
                                            <div className="reward-stat-label">Avg. Rating</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hero-float-badge badge-bottom">
                                    <span className="badge-dot"></span>
                                    Automatic referral tracking via code & link
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="stats-banner">
                <div className="stats-banner-inner">
                    <div className="stat-marquee-item"><i className="bi bi-people-fill"></i><strong>50,000+</strong> Active Referrers</div>
                    <div className="stat-marquee-sep"></div>
                    <div className="stat-marquee-item"><i className="bi bi-wallet2"></i><strong>₹2.4 Crore+</strong> Commissions Paid</div>
                    <div className="stat-marquee-sep"></div>
                    <div className="stat-marquee-item"><i className="bi bi-bag-check-fill"></i><strong>1.2 Lakh+</strong> Bookings via Referrals</div>
                    <div className="stat-marquee-sep"></div>
                    <div className="stat-marquee-item"><i className="bi bi-lightning-charge-fill"></i><strong>Instant</strong> Wallet Credit on Booking</div>
                    <div className="stat-marquee-sep"></div>
                    <div className="stat-marquee-item"><i className="bi bi-infinity"></i><strong>Unlimited</strong> Referrals Allowed</div>
                </div>
            </div>

            <section className="hiw-section section-pad" id="how-it-works">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-eyebrow">Step by Step</span>
                        <h2 className="section-heading mt-2">How Does The Referral System <span>Work?</span></h2>
                        <p className="section-subheading center">Start earning package commissions in 4 simple steps.</p>
                    </div>
                    <div className="row g-1 align-items-start">
                        <div className="col-md-3 animUp">
                            <div className="hiw-step">
                                <div className="step-num-badge c1">1</div>
                                <div className="step-icon-circle c1"><i className="bi bi-person-plus-fill"></i></div>
                                <h5>Create Your Account</h5>
                                <p>Sign up on Delta Safari. Your personal referral code and invite link are generated automatically in your account dashboard.</p>
                            </div>
                        </div>
                        <div className="col-md-3 animUp anim-d1">
                            <div className="hiw-step">
                                <div className="step-num-badge c2">2</div>
                                <div className="step-icon-circle c2"><i className="bi bi-share-fill"></i></div>
                                <h5>Share Link or Code</h5>
                                <p>Copy your unique referral link or referral code and share it via WhatsApp, Facebook, email, or social media.</p>
                            </div>
                        </div>
                        <div className="col-md-3 animUp anim-d2">
                            <div className="hiw-step">
                                <div className="step-num-badge c3">3</div>
                                <div className="step-icon-circle c3"><i className="bi bi-person-check-fill"></i></div>
                                <h5>Friend Registers</h5>
                                <p>Your friend signs up using your referral link or enters your referral code at registration, linking them to your account.</p>
                            </div>
                        </div>
                        <div className="col-md-3 animUp" style={{ height: "stretch" }}>
                            <div className="hiw-step">
                                <div className="step-num-badge c4">4</div>
                                <div className="step-icon-circle c4"><i className="bi bi-wallet-fill"></i></div>
                                <h5>Earn Package Commission</h5>
                                <p>When your referred friend books any package, the package referral commission is credited directly to your wallet balance!</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="benefit-icon green" style={{ width: "40px", height: "40px", borderRadius: "10px", fontSize: "1rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="bi bi-credit-card-fill"></i>
                                    </div>
                                    <span style={{ fontSize: ".875rem", color: "var(--text-muted)" }}>Commissions credited directly to your wallet</span>
                                </div>
                                <span style={{ color: "var(--border)" }}>|</span>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="benefit-icon orange" style={{ width: "40px", height: "40px", borderRadius: "10px", fontSize: "1rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="bi bi-clock-fill"></i>
                                    </div>
                                    <span style={{ fontSize: ".875rem", color: "var(--text-muted)" }}>Automatic reward trigger on package booking</span>
                                </div>
                                <span style={{ color: "var(--border)" }}>|</span>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="benefit-icon blue" style={{ width: "40px", height: "40px", borderRadius: "10px", fontSize: "1rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="bi bi-infinity"></i>
                                    </div>
                                    <span style={{ fontSize: ".875rem", color: "var(--text-muted)" }}>No cap — refer as many friends as you like</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="benefits-section section-pad">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-eyebrow green">Why Choose Delta Safari</span>
                        <h2 className="section-heading mt-2">Highlights Of <span>Our Referral Program</span></h2>
                        <p className="section-subheading center">Transparent, per-package referral commissions designed for every traveler.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4 animUp">
                            <div className="benefit-item">
                                <div className="benefit-icon orange"><i className="bi bi-lightning-charge-fill"></i></div>
                                <div>
                                    <h5>Per-Package Commission</h5>
                                    <p>Earn the user commission specified on every package booked by your referred friends.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 animUp anim-d1">
                            <div className="benefit-item">
                                <div className="benefit-icon blue"><i className="bi bi-infinity"></i></div>
                                <div>
                                    <h5>No Cap on Referrals</h5>
                                    <p>Refer 1 friend or 1,000 — there's absolutely no limit to how much you can earn.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 animUp anim-d2">
                            <div className="benefit-item">
                                <div className="benefit-icon green"><i className="bi bi-credit-card-2-front-fill"></i></div>
                                <div>
                                    <h5>Direct Wallet Payouts</h5>
                                    <p>Your referral earnings go directly to your Delta Safari wallet for easy withdrawal or future package bookings.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 animUp anim-d1">
                            <div className="benefit-item">
                                <div className="benefit-icon purple"><i className="bi bi-link-45deg"></i></div>
                                <div>
                                    <h5>Dual Tracking (Link & Code)</h5>
                                    <p>Friends can register either by clicking your referral link or by manually typing your referral code during signup.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 animUp anim-d2">
                            <div className="benefit-item">
                                <div className="benefit-icon amber"><i className="bi bi-share-fill"></i></div>
                                <div>
                                    <h5>1-Click Social Sharing</h5>
                                    <p>Share instantly on WhatsApp, Facebook, Twitter, or email directly from your account dashboard.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 animUp anim-d3">
                            <div className="benefit-item">
                                <div className="benefit-icon navy"><i className="bi bi-shield-fill-check"></i></div>
                                <div>
                                    <h5>100% Transparent Dashboard</h5>
                                    <p>View your referred friends, booking history, and commission payouts in real time in your account dashboard.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq-section section-pad" id="faq">
                <div className="container">
                    <div className="row g-5 align-items-start">
                        <div className="col-lg-4">
                            <span className="section-eyebrow">Have Questions?</span>
                            <h2 className="section-heading mt-2">
                                Frequently<br />Asked <span>Questions</span>
                            </h2>
                            <p className="section-subheading mt-3">
                                Got questions about how referrals work? Here are answers to common questions.
                            </p>
                            <a
                                href="/contact"
                                className="d-inline-flex align-items-center gap-2 mt-4 text-decoration-none"
                                style={{ color: "var(--primary)", fontWeight: "700", fontSize: ".9rem" }}
                            >
                                <i className="bi bi-chat-dots-fill"></i> Contact Support
                            </a>
                        </div>

                        <div className="col-lg-8">
                            <div className="accordion" id="faqAccordion">

                                <div className="accordion-item border-0 mb-3 shadow-sm">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            How does the referral program work?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            Share your personal referral code or referral link with friends. When a friend registers using your link or code and books any tour package, you earn the user commission set for that package credited directly to your wallet!
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item border-0 mb-3 shadow-sm">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            When will I receive my referral commission?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            As soon as your referred friend's package booking is created and confirmed, the referral commission is automatically calculated and credited to your wallet balance.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item border-0 mb-3 shadow-sm">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            Is there a limit to how many friends I can refer?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            There is no limit! You can refer as many friends as you wish and earn package commissions on every successful booking they make.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item border-0 mb-3 shadow-sm">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour"
                                            aria-expanded="false"
                                            aria-controls="collapseFour"
                                        >
                                            Where can I check my referral history and earnings?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFour"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFour"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            You can view your referral code, shareable link, list of referred friends, and detailed commission payouts anytime in your account under the "Refer & Earn" section (`/myreferal`).
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page