import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Review } from '@/src/utils/types';
import { useGetMe } from '@/src/api/auth';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useAddReview, useGetReviews } from '@/src/api/reviews';
import { notificationMessages } from '@/src/utils/notificationMessages.utils';
import DefaultButton from '@/src/components/DefaultButton';
import ReviewFormModal from '@/src/components/ReviewFormModal';

interface ReviewFormModalButtonProps {
  productId: string;
}

const AddReviewButton = ({ productId }: ReviewFormModalButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const { refetch } = useGetReviews(productId)

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }

    if (!me) router.push(pageRoutes.singIn());
    setIsModalOpen(true);
  };

  const onSubmit: SubmitHandler<Review> = (data) => {
    addReview(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        refetch()
        toast.success(notificationMessages.success.addedReview);
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
      <ReviewFormModal
        title="Add Review"
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        onSubmit={onSubmit}
        isLoading={isAddReviewLoading}
      />
    </>
  );
};

export default AddReviewButton;
