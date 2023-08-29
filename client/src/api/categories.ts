import { apiRoutes } from '../routes/apiRoutes';
import { useFetch } from '../utils/reactQuery.utils';
import { CategoryProps } from '../utils/types';

export const useGetCategories = () =>
  useFetch<CategoryProps[]>(apiRoutes.getCategories);
