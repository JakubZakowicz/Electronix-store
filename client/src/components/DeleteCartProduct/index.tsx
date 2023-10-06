import React from 'react';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDeleteCartProduct, useGetCartData } from '@/src/api/cart';

interface DeleteCartProductProps {
  productId: string;
}

const DeleteCartProduct = ({ productId }: DeleteCartProductProps) => {
  const { refetch } = useGetCartData();
  const { mutate } = useDeleteCartProduct(productId);

  return (
    <Button
      data-testid="delete-cart-product"
      sx={{ color: 'white' }}
      onClick={() => mutate(productId, { onSuccess: () => refetch() })}
    >
      <HighlightOffIcon />
    </Button>
  );
};

export default DeleteCartProduct;
