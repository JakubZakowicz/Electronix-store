import { apiRoutes } from '../routes/apiRoutes';
import {
  useFetch,
  usePost,
  useUpdate,
  useDelete,
} from '../utils/reactQuery.utils';
import { pathToUrl } from '../utils/router.utils';
import { Cart } from '../utils/types';

export const useGetCartData = () =>
  useFetch<Cart>(apiRoutes.getCartData, { withCredentials: true });

export const useAddToCart = () =>
  usePost(apiRoutes.addToCart, undefined, { withCredentials: true });

export const useUpdateCartProduct = () =>
  useUpdate(apiRoutes.updateCartProduct, undefined, { withCredentials: true });

export const useDeleteCartProduct = (productId: string) =>
  useDelete(pathToUrl(apiRoutes.deleteCartProduct, { productId }), undefined, {
    withCredentials: true,
  });
