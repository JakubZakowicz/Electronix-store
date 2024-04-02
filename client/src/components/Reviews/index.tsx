'use client';

import React from 'react';
import { Box, Typography, Rating, LinearProgress, Grid } from '@mui/material';
import ReviewActions from '../ReviewActions';
import AddReviewButton from '../AddReviewButton';
import { getSpecificRatingCount } from '@/src/utils/functions.utils';
import { Product } from '@/src/utils/types';
import { useGetMe } from '@/src/api/auth';
import { useGetReviews } from '@/src/api/reviews';
import Pagination from '../Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ReviewsProps {
  product: Product;
}

const Reviews = ({ product }: ReviewsProps) => {
  const { id: productId } = product || {};

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const page = Number(params.get('page')) || 1;

  const { data: me } = useGetMe();
  const { data: reviewsData } = useGetReviews(productId, page);

  const { reviews, pageCount } = reviewsData || {};

  console.log(reviews)

  const convertDate = (isoDate: string) => {
    const date = new Date(isoDate);
    let year: number | string = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    let dt: number | string = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return `${dt}-${month}-${year}`;
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    params.set('page', value.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box>
      <Box sx={{ maxWidth: '600px', margin: '0 auto', marginBottom: '80px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Typography sx={{ fontSize: '60px' }}>{product?.rating}</Typography>
            <Box>
              <Rating
                name="read-only"
                value={product?.rating}
                sx={{
                  '.MuiRating-iconEmpty': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
                precision={0.1}
                readOnly
              />
              <Typography>{reviews?.length} Reviews</Typography>
            </Box>
          </Box>
          {productId && <AddReviewButton productId={productId} />}
        </Box>
        {reviews && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
            }}
          >
            {[5, 4, 3, 2, 1].map((rating) => {
              const { count, percentage } = getSpecificRatingCount(
                rating,
                reviews
              );
              return (
                <Box
                  key={rating}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>
                    {rating} {rating === 1 ? 'Star' : 'Stars'}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    color="inherit"
                    value={percentage}
                    sx={{ width: '80%' }}
                  />
                  <Typography>{count}</Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      {reviews && reviews.length > 0 ? (
        <>
          {reviews?.map(
            ({ id: reviewId, title, content, rating, user, created_at }) => (
              <Grid key={reviewId} container sx={{ marginBottom: '50px' }}>
                <Grid item xl={2}>
                  <Rating
                    name="read-only"
                    value={rating}
                    readOnly
                    sx={{
                      '.MuiRating-iconEmpty': {
                        color: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  />
                  <Typography marginTop="10px">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography fontSize={15} color="#B9B9B9" marginTop="10px">
                    {convertDate(created_at)}
                  </Typography>
                </Grid>
                <Grid item xl={10}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '20px',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h3"
                        fontSize={25}
                        fontWeight="semibold"
                      >
                        {title}
                      </Typography>
                      <Typography marginTop="10px">{content}</Typography>
                    </Box>
                    <Box>
                      {user?.id === me?.userId && (
                        <ReviewActions
                          productId={productId}
                          reviewId={reviewId}
                        />
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px',
            }}
          >
            {pageCount && pageCount > 1 && (
              <Pagination
                page={page}
                pageCount={pageCount}
                handleChange={handleChange}
              />
            )}
          </Box>
        </>
      ) : (
        <Box>
          <Typography
            sx={{
              textAlign: 'center',
              marginTop: 15,
              fontSize: 30,
              fontWeight: 'bold',
            }}
          >
            The aren&apos;t any reviews yet
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Reviews;
