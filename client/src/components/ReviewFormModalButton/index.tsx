import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, Box, Typography, Rating } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DefaultButton from '../DefaultButton';
import { reviewSchema } from '@/src/utils/validationSchemas';
import { Review } from '@/src/utils/types';
import InputField from '../InputField';
import { useGetMe } from '@/src/api/auth';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useAddReview } from '@/src/api/products';
import { toast } from 'react-toastify';

interface ReviewFormModalButtonProps {
  productId: string;
}

const ReviewFormModalButton = ({ productId }: ReviewFormModalButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const { data: me, isError, error } = useGetMe();

  if (isError && error?.response?.statusText !== 'Unauthorized')
    throw new Error(error.message);

  const {
    mutate: addReview,
    isLoading: isAddReviewLoading,
    isError: isAddReviewError,
    error: addReviewError,
  } = useAddReview(productId);

  const { control, handleSubmit, setValue } = useForm<Review>({
    resolver: zodResolver(reviewSchema),
  });

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }

    if (!me) router.push(pageRoutes.singIn());
    setIsModalOpen(true);
  };

  const onRatingChange = (value: number) => {
    setRating(value);
    setValue('rating', value);
  };

  const onSubmit: SubmitHandler<Review> = (data) => {
    addReview(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success('Review added successfully!')
      },
    });
  };

  if (isAddReviewError) throw new Error(addReviewError.message);

  return (
    <>
      <DefaultButton
        name="Write a Review"
        style={{ alignSelf: 'center', fontSize: '16px' }}
        onClick={toggleModal}
      />
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Review form
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                alignItems: 'center',
                marginTop: '20px',
              }}
            >
              <Rating
                sx={{
                  '.MuiRating-iconEmpty': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
                name="rating"
                value={rating}
                onChange={(event, newValue) => onRatingChange(newValue!)}
              />
              <Controller
                name="title"
                control={control}
                render={({
                  field: { ref, ...field },
                  fieldState: { error },
                }) => (
                  <InputField
                    helperText={error ? error.message : null}
                    label="Title"
                    defaultValue=""
                    inputRef={ref}
                    {...field}
                  />
                )}
              />
              <Controller
                name="content"
                control={control}
                render={({
                  field: { ref, ...field },
                  fieldState: { error },
                }) => (
                  <InputField
                    helperText={error ? error.message : null}
                    label="Content"
                    style={{ color: 'white' }}
                    multiline
                    inputRef={ref}
                    defaultValue=""
                    rows={4}
                    {...field}
                  />
                )}
              />
              <DefaultButton
                name="Add a Review"
                type="submit"
                disabled={isAddReviewLoading}
              />
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewFormModalButton;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  bgcolor: 'black',
  color: 'white',
  border: '1px solid white',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
