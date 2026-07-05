import React from 'react'
import pagesData from '@/libs/pagesData.json'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { particularPageUrl } from '@/routes/serviceRoutes'
import NotFound from '@/components/website/common/NotFound'
import './pages.css'

async function Page({ params }) {
  const { slug } = await params
  let pageContent = null;
  try {
    const response = await axios.get(`${particularPageUrl}?page=${slug}`);
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
          <img src={process.env.NEXT_PUBLIC_PUBLIC_URL+'assets/images/pagebg.jpg'} />
        <h1 className='mb-5'>{pageContent?.title}</h1>
        </div>
        <div className='container'>
          <div className="row justify-content-center">
            <div className="col-10">
              {pageContent?.content ?
                <div
                  className="policy-content"
                  dangerouslySetInnerHTML={{ __html: pageContent?.content }}
                />
                :
                <NotFound />
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
