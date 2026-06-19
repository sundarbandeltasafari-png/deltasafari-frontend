import React from 'react'

function Faq({ faqs, faqText }) {
    return (
        <>
            <div className="home4-faq-section mb-100">
                <div className="container">
                    <div className="row justify-content-start mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '200ms' }}>
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Questions &amp; Answer</h2>
                                <p className='m-0'>{faqText}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-xl-12 col-lg-12">
                            <div className="faq-wrap two">
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
            </div>
        </>
    )
}

export default Faq