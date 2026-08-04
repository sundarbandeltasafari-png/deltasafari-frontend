import { fetchPageSeo } from '@/libs/seoHelper';

export async function generateMetadata() {
  return await fetchPageSeo('corporate');
}

export default function Layout({ children }) {
  return children;
}
