import { apiRoutes } from '../routes/apiRoutes';
import {
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from '../utils/reactQuery.utils';
import { pathToUrl } from '../utils/router.utils';
import { Review, ReviewData } from '../utils/types';

export const useGetReviews = (productId?: string, page?: number) =>
  useFetch<ReviewData>(
    `${apiRoutes.getReviews}?${productId && `product_id=${productId}&`}sort=created_at:desc&page=${page || 1}&size=20`
  );

export const useGetReview = (reviewId: string) =>
  useFetch<Review>(pathToUrl(apiRoutes.getReview, { reviewId }));

export const useAddReview = (productId: string) =>
  usePost(pathToUrl(apiRoutes.addReview, { productId }), undefined, {
    withCredentials: true,
  });

export const useUpdateReview = (reviewId: string) =>
  useUpdate(pathToUrl(apiRoutes.updateReview, { reviewId }), undefined, {
    withCredentials: true,
  });

export const useDeleteReview = () =>
  useDelete(apiRoutes.deleteReview, undefined, {
    withCredentials: true,
  });
