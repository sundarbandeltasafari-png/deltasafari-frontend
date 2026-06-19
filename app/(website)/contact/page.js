import React from 'react'
import "./contact.css"
import axios from 'axios';
import { contactDetailsURL } from '@/routes/homeRoutes';
async function page() {
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
        <>
            <section className="container contact-us">
                <div className="tabs row">
                    <div className="tab col-md-6">
                        <div className="title">

                            <h3>Call Us Directly</h3>
                        </div>
                        <p>Our team is available to assist you Monday to Saturday, 10 AM to 5 PM.</p>
                        <div className="contact-info">
                            {contacts?.phone_1 && <a href={`"tel:${contacts.phone_1.replaceAll(" ", "")}`}>{contacts?.phone_1}</a>}
                            {contacts?.phone_2 && <a href={`"tel:${contacts.phone_2.replaceAll(" ", "")}`}>{contacts?.phone_2}</a>}
                        </div>
                    </div>
                    <div className="tab col-md-6">
                        <div className="title">

                            <h3>Email Support</h3>
                        </div>
                        <p>Need assistance? Email us, and we'll get back to you as soon as possible!</p>
                        <div className="contact-info">
                            <a href={`mailto:${contacts?.email}`}>{contacts?.email}</a>
                        </div>
                    </div>
                    <div className="tab col-md-6">
                        <div className="title">

                            <h3>Chat Live</h3>
                        </div>
                        <p>We're available to assist you Monday to Saturday, 10 AM to 5 PM.</p>
                        <div className="contact-info">
                            <a href={contacts?.whatsapp_link}>Chat on WhatsApp</a>
                        </div>
                    </div>
                </div>

                <div className="address">
                    <h2>Our Offices</h2>
                    <div className="tabs">
                        {
                            offices && offices.length > 0 && offices.map((office, index) => {
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
                <div className="faqs p-3">
                    <div className="child area row">
                        <div className="tab start col-md-8">
                            <h2 className="title">Frequently Asked Questions</h2>
                            <p className="subtitle">Everything you need to know about us</p>

                            <div className="contact-us" style={{maxWidth: "100%"}}>
                                <p>If you still have any questions or need further clarification, feel free to reach out to us directly. We’re here to help!</p>
                                <a href="/contact">Contact Us</a>
                            </div>
                        </div>
                        <div className="faq-wrap two col-md-8">
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                {
                                    faqs && faqs.length > 0 && faqs?.map((faq, index) => {
                                        return <div key={index} className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '800ms' }}>
                                            <h5 className="accordion-header" id={"flush-headingFour_"+faq?.id}>
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseFour_"+faq?.id} aria-expanded="false" aria-controls={"flush-collapseFour_"+faq?.id}>{faq?.question}</button>
                                            </h5>
                                            <div id={"flush-collapseFour_"+faq?.id} className="accordion-collapse collapse" aria-labelledby={"flush-headingFour_"+faq?.id} data-bs-parent="#accordionFlushExample">
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
            </section>
        </>
    )
}

export default page