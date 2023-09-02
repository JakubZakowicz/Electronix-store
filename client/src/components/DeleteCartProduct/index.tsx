import React from 'react';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDeleteCartProduct } from '@/src/api/cart';

interface DeleteCartProductProps {
  productId: string;
}

const DeleteCartProduct = ({ productId }: DeleteCartProductProps) => {

  const { mutate } = useDeleteCartProduct(productId)

  return (
    <Button sx={{ color: 'white' }} onClick={() => mutate(productId)}>
      <HighlightOffIcon />
    </Button>
  );
};

export default DeleteCartProduct;
