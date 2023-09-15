import { apiRoutes } from '../routes/apiRoutes';
import { useFetch, usePost } from '../utils/reactQuery.utils';
import { pathToUrl } from '../utils/router.utils';
import { Product } from '../utils/types';

export const useGetProduct = (slug: string) =>
  useFetch<Product>(pathToUrl(apiRoutes.getProduct, { slug }));

export const useAddReview = (productId: string) =>
  usePost(pathToUrl(apiRoutes.addReview, { productId }), undefined, {
    withCredentials: true,
  });
