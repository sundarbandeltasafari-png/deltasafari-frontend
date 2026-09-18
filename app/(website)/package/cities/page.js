import CitiesPage from '../../cities/page';
import { fetchPageSeo } from '@/libs/seoHelper';

export async function generateMetadata() {
  return await fetchPageSeo('cities', '/cities');
}

export default CitiesPage;
