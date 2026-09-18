import React from 'react'
import { fetchPageSeo } from '@/libs/seoHelper';

export async function generateMetadata() {
  return await fetchPageSeo('customized-package', '/customized-package', {
    title: 'Customized Tour Packages | Delta Safari',
    description: 'Design and plan your personalized holiday packages and custom tours with Delta Safari.',
    keywords: 'custom tour, customized packages, personalized travel, delta safari'
  });
}

function page() {
  return (
    <div>page</div>
  )
}

export default page