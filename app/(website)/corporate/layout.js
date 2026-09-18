import { fetchPageSeo } from '@/libs/seoHelper';

export async function generateMetadata() {
  return await fetchPageSeo('corporate', '/corporate', {
    title: 'Corporate Tour Packages & MICE Trips | Delta Safari',
    description: 'Custom corporate tours, team outings, executive offsites, and incentive trips planned with Delta Safari.',
    keywords: 'corporate tours, MICE travel, business offsite, team outing, delta safari'
  });
}

export default function Layout({ children }) {
  return children;
}
