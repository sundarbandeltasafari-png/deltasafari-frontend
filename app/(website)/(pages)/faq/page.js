import React from 'react'
import pagesData from '@/libs/pagesData.json'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { particularPageUrl } from '@/routes/serviceRoutes'
import NotFound from '@/components/website/common/NotFound'
import { getFaqPageUrl } from '@/routes/commonRoutes'
import './page.css'

async function Page({ params }) {
  const { slug } = await params
  let pageContent = null;
  try {
    const response = await axios.get(`${getFaqPageUrl}?page=faq`);
    if (response.data?.status) {
      pageContent = response.data?.page
    } else {
      redirect('/error');
    }
  } catch (error) {
    redirect('/error');
  }

  if (!pageContent) {
    notFound()
  }



  return (
    <>
      <section className="mt-0 mb-5">
        <div className='page-header-div'>
          <img src={process.env.NEXT_PUBLIC_PUBLIC_URL + 'assets/images/pagebg.jpg'} />
          <h1 className='mb-5'>Frequently Asked Questions</h1>
        </div>
        <div className='container'>
          <div className="faqs p-3">
            <div className="child area row">
              <div className="tab start col-md-12">
                <h2 className="title"></h2>
                <p className="subtitle">Everything you need to know about us</p>

                <div className="contact-us" style={{ maxWidth: "100%" }}>
                  <p>If you still have any questions or need further clarification, feel free to reach out to us directly. We’re here to help!</p>
                </div>
              </div>
              <div className="faq-wrap two col-md-12">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  {
                    pageContent && pageContent.length > 0 && pageContent?.map((faq, index) => {
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
    </>
  )
}

export default Page
