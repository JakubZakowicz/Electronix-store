import { Review } from './types';

export const convertPrice = (priceInCents: number) =>
  (priceInCents / 100).toFixed(2);

export const getSpecificRatingCount = (rating: number, reviews: Review[]) => {
  let count = 0;
  reviews.forEach((review) => {
    if (review.rating === rating) count++;
  });

  const percentage = (count / reviews.length) * 100;

  return { count, percentage };
};
