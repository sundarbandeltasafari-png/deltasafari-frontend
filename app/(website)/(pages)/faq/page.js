import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { getFaqPageUrl } from '@/routes/commonRoutes';
import './page.css';
import { fetchPageSeo } from '@/libs/seoHelper';

export async function generateMetadata() {
  const seoData = await fetchPageSeo('faq');
  if (seoData && seoData.title && seoData.title !== 'Delta Safari') {
    return seoData;
  }
  return {
    title: 'Frequently Asked Questions (FAQ) – Delta Safari',
    description: 'Find answers to common questions about Delta Safari holiday packages, customized travel planning, online booking, transparent pricing, top destinations, and customer support.',
    keywords: 'Delta Safari FAQ, travel questions, booking tour packages, customized holiday FAQ, Sundarban safari FAQ, budget tour packages India',
  };
}

const defaultFaqs = [
  {
    id: 'def_1',
    question: 'What is Delta Safari and what services do you offer?',
    answer: 'Delta Safari is one of India’s trusted travel companies, specializing in customized holiday packages, budget-friendly tours, luxury vacations, group tours, family holidays, honeymoon packages, adventure trips, wildlife tours, and weekend getaways across India and selected international destinations.'
  },
  {
    id: 'def_2',
    question: 'What holiday packages can I book with Delta Safari?',
    answer: 'We offer a wide array of travel packages including Budget Holiday Packages, Family Tour Packages, Honeymoon Packages, Adventure Tour Packages, Wildlife Safari Tours, Beach Holiday Packages, Hill Station Tours, Weekend Getaways, Group Tour Packages, Corporate Tours, Educational Trips, and 100% Customized Travel Packages.'
  },
  {
    id: 'def_3',
    question: 'Are there any hidden charges in your pricing?',
    answer: 'No, Delta Safari operates on a complete transparent pricing policy. There are no hidden fees or undisclosed charges, allowing you to plan your holiday with complete peace of mind.'
  },
  {
    id: 'def_4',
    question: 'Can Delta Safari create a customized itinerary for my trip?',
    answer: 'Yes! Every traveller is unique. Our experienced travel specialists work closely with you to design personalized itineraries tailored specifically to your interests, preferred dates, destinations, and budget.'
  },
  {
    id: 'def_5',
    question: 'Which domestic and international destinations do you cover?',
    answer: 'We cover top domestic destinations including Sundarban, Darjeeling, Sikkim, Bhutan, Andaman Islands, Kashmir, Himachal Pradesh, Kerala, Rajasthan, Goa, and North East India. Our international getaways include Nepal, Dubai, Thailand, Bali, Singapore, Malaysia, and the Maldives.'
  },
  {
    id: 'def_6',
    question: 'What is included in Delta Safari tour itineraries?',
    answer: 'Every itinerary is carefully planned to include comfortable hotel accommodations, reliable transportation, curated sightseeing tours, authentic local experiences, flexible options, and 24/7 customer support throughout your entire journey.'
  },
  {
    id: 'def_7',
    question: 'How do I book a holiday package with Delta Safari?',
    answer: 'You can easily browse, compare, and book your desired package online through our website. Alternatively, you can reach out to our travel experts via phone, email, or WhatsApp for custom bookings.'
  },
  {
    id: 'def_8',
    question: 'Why should I choose Delta Safari as my travel partner?',
    answer: 'Thousands of travellers trust us for our affordable and transparent pricing, experienced travel professionals, safe and reliable arrangements, handpicked hotels, flexible itineraries, fast online booking, and dedicated customer support before, during, and after your trip.'
  }
];

async function Page({ params }) {
  let pageContent = [];
  try {
    const response = await axios.get(`${getFaqPageUrl}?page=faq`);
    if (response.data?.status && Array.isArray(response.data?.page) && response.data.page.length > 0) {
      pageContent = response.data?.page;
    } else {
      pageContent = defaultFaqs;
    }
  } catch (error) {
    pageContent = defaultFaqs;
  }

  const faqsToDisplay = (pageContent && pageContent.length > 0) ? pageContent : defaultFaqs;

  return (
    <>
      <section className="mt-0 mb-5">
        <div className='page-header-div'>
          <img src={(process.env.NEXT_PUBLIC_PUBLIC_URL || '') + 'assets/images/pagebg.jpg'} alt="FAQ Header" />
          <h1 className='mb-5'>Frequently Asked Questions</h1>
        </div>
        <div className='container'>
          <div className="faqs p-3">
            <div className="child area row">
              <div className="tab start col-md-12 mb-4">
                <h2 className="title fw-bold text-dark">Everything You Need to Know About Delta Safari</h2>
                <p className="subtitle text-muted fs-6">Find quick answers to common questions about our packages, booking, destinations, and services.</p>

                <div className="contact-us mt-3" style={{ maxWidth: "100%" }}>
                  <p>If you still have any questions or need further clarification, feel free to reach out to us directly. We’re here to help!</p>
                  <Link href="/contact" className="btn btn-primary btn-sm px-4 rounded-pill mt-2">Contact Support</Link>
                </div>
              </div>

              <div className="faq-wrap two col-md-12">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  {
                    faqsToDisplay.map((faq, index) => {
                      const collapseId = "flush-collapse_" + (faq?.id || index);
                      const headingId = "flush-heading_" + (faq?.id || index);
                      return (
                        <div key={index} className="accordion-item mb-3 border rounded-3 shadow-sm overflow-hidden">
                          <h5 className="accordion-header" id={headingId}>
                            <button 
                              className={`accordion-button ${index === 0 ? '' : 'collapsed'} fw-semibold text-dark fs-6`} 
                              type="button" 
                              data-bs-toggle="collapse" 
                              data-bs-target={"#" + collapseId} 
                              aria-expanded={index === 0 ? "true" : "false"} 
                              aria-controls={collapseId}
                            >
                              <i className="bi bi-question-circle text-primary me-2"></i>
                              {faq?.question}
                            </button>
                          </h5>
                          <div 
                            id={collapseId} 
                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                            aria-labelledby={headingId} 
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body text-secondary lh-base fs-6 bg-light-subtle">
                              {faq?.answer}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
