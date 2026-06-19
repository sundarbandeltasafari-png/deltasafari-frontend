import React from 'react'
import pagesData from '@/libs/pagesData.json'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { particularPageUrl } from '@/routes/serviceRoutes'

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
      <section className="container mt-5 mb-5">
         <h1 className='mb-5'>{pageContent?.title}</h1>
        <div className="row">
          <div className="col-12">
            <div
              className="policy-content"
              dangerouslySetInnerHTML={{ __html: pageContent?.content }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
