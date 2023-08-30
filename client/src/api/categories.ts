import { apiRoutes } from '../routes/apiRoutes';
import { useFetch } from '../utils/reactQuery.utils';
import { pathToUrl } from '../utils/router.utils';
import { Category } from '../utils/types';

export const useGetCategories = () =>
  useFetch<Category[]>(apiRoutes.getCategories);

export const useGetCategory = (slug: string) =>
  useFetch<Category>(pathToUrl(apiRoutes.getCategory, { slug }));
