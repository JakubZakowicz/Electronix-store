import { apiRoutes } from '../routes/apiRoutes';
import { useFetch } from '../utils/reactQuery.utils';

export const useGetCategories = () => useFetch(apiRoutes.getCategories);
