import { apiRoutes } from '../routes/apiRoutes';
import { useFetch, usePost } from '../utils/reactQuery.utils';
import { Cart } from '../utils/types';

export const useGetCartData = () => useFetch<Cart>(apiRoutes.getCartData);
export const useAddToCart = () => usePost(apiRoutes.addToCart, undefined);
