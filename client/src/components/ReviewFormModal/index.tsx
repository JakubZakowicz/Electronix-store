import React, { useState } from 'react';
import { Modal, Box, Typography, Rating } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import DefaultButton from '../DefaultButton';
import { Review } from '@/src/utils/types';
import { reviewSchema } from '@/src/utils/validationSchemas';

interface ReviewFormModalProps {
  title: string;
  isModalOpen: boolean;
  toggleModal: () => void;
  onSubmit: (data: Review) => void;
  isLoading: boolean;
}

const ReviewFormModal = ({
  title,
  isModalOpen,
  toggleModal,
  onSubmit,
  isLoading,
}: ReviewFormModalProps) => {
  const [rating, setRating] = useState(0);

  const { control, handleSubmit, setValue } = useForm<Review>({
    resolver: zodResolver(reviewSchema),
  });

  const onRatingChange = (value: number) => {
    setRating(value);
    setValue('rating', value);
  };

  return (
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
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
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
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
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
              name={title}
              type="submit"
              disabled={isLoading}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ReviewFormModal;

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
