'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useDeleteReview, useGetProduct } from '@/src/api/products';
import { notificationMessages } from '@/src/utils/notificationMessages.utils';
import EditReviewButton from '../EditReviewButton';

interface ReviewAcitonsProps {
  productId: string;
  reviewId: string;
}

const ReviewActions = ({ productId, reviewId }: ReviewAcitonsProps) => {
  const { mutate: deleteMutation } = useDeleteReview();

  const { refetch } = useGetProduct(productId);

  const deleteReview = () => {
    deleteMutation(reviewId, {
      onSuccess: () => {
        refetch();
        toast.success(notificationMessages.success.deletedReview)
      },
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <EditReviewButton reviewId={reviewId} />
      <Button size="small" sx={{ color: 'red' }} onClick={deleteReview}>
        <DeleteIcon />
        <Typography>Delete</Typography>
      </Button>
    </Box>
  );
};

export default ReviewActions;
