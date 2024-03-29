import React from 'react';
import { getSpecificRatingCount } from '@/src/utils/functions.utils';
import { Box, Typography, Rating, LinearProgress, Grid } from '@mui/material';
import ReviewFormModalButton from '../ReviewFormModalButton';
import { Product } from '@/src/utils/types';

interface ReviewsProps {
  product: Product
}

const Reviews = ({ product }: ReviewsProps) => {
  const { id, reviews } = product || {};
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
              <Typography>{product?.reviews.length} Reviews</Typography>
            </Box>
          </Box>
          {id && <ReviewFormModalButton productId={id} />}
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
        reviews?.map(({ id, title, content, rating, user }) => (
          <Grid key={id} container sx={{ marginBottom: '50px' }}>
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
                {user.created_at}
              </Typography>
            </Grid>
            <Grid item xl={10}>
              <Typography variant="h3" fontSize={25} fontWeight="semibold">
                {title}
              </Typography>
              <Typography marginTop="10px">{content}</Typography>
            </Grid>
          </Grid>
        ))
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
