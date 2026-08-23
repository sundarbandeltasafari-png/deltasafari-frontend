'use client';

import React from 'react';

const defaultFaqs = [
    {
        id: 1,
        question: "How do I book a customized tour package with Delta Safari?",
        answer: "You can click on the 'Customise' button on any package card or fill out our online wizard form. Our travel specialists will contact you within 1 hour with a personalized itinerary and custom quote."
    },
    {
        id: 2,
        question: "What is included in the Sundarban Wildlife & Boat Safari packages?",
        answer: "Our all-inclusive packages cover resort stay, river cruises on luxury boats, watchtower entry permits, government naturalist fees, breakfast, lunch, tea, snacks, and traditional dinners."
    },
    {
        id: 3,
        question: "Are the package prices flexible for large groups or corporate teams?",
        answer: "Yes! We offer special group rates, corporate offsite discounts, and customized inclusions for groups of 10 or more guests."
    },
    {
        id: 4,
        question: "What is the cancellation and refund policy?",
        answer: "We offer 100% flexible booking modifications up to 7 days prior to travel, and easy cancellation refund policies for unforeseen circumstances."
    }
];

function Faq({ faqs, faqText = "Find quick answers to common questions about our tour packages and booking policies." }) {
    const list = (faqs && faqs.length > 0) ? faqs : defaultFaqs;

    return (
        <div className="home4-faq-section py-5 bg-white border-top">
            <div className="container">
                <div className="row justify-content-start mb-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '200ms' }}>
                    <div className="col-xl-6 col-lg-8">
                        <div className="section-title text-start">
                            <h2 className="text-dark h3" style={{ fontFamily: "'Poppins', sans-serif" }}>Frequently Asked Questions</h2>
                            <p className='m-0 text-muted text-xs'>{faqText}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-start">
                    <div className="col-xl-12 col-lg-12">
                        <div className="faq-wrap two">
                            <div className="accordion accordion-flush" id="packageFaqAccordion">
                                {list.map((faq, index) => {
                                    const itemId = faq.id || index;
                                    return (
                                        <div key={itemId} className="accordion-item border rounded-3 mb-2 overflow-hidden shadow-2xs" style={{ borderColor: '#eef2f6' }}>
                                            <h5 className="accordion-header" id={"flush-heading_" + itemId}>
                                                <button 
                                                    className="accordion-button collapsed text-dark text-sm py-3 px-4" 
                                                    type="button" 
                                                    data-bs-toggle="collapse" 
                                                    data-bs-target={"#flush-collapse_" + itemId} 
                                                    aria-expanded="false" 
                                                    aria-controls={"flush-collapse_" + itemId}
                                                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px' }}
                                                >
                                                    {faq.question}
                                                </button>
                                            </h5>
                                            <div 
                                                id={"flush-collapse_" + itemId} 
                                                className="accordion-collapse collapse" 
                                                aria-labelledby={"flush-heading_" + itemId} 
                                                data-bs-parent="#packageFaqAccordion"
                                            >
                                                <div className="accordion-body text-secondary text-xs px-4 py-3" style={{ lineHeight: '1.6', fontSize: '14px', color: '#4b5563' }}>
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faq;