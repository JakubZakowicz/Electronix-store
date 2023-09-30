import React, { useState } from 'react';
import ProductCounter from '../ProductCounter';
import { useGetCartData, useUpdateCartProduct } from '@/src/api/cart';

interface CartProductCounterProps {
  productId: string;
  defaultAmount?: number;
}

const CartProductCounter = ({
  productId,
  defaultAmount,
}: CartProductCounterProps) => {
  const [count, setCount] = useState<number>(defaultAmount ?? 1);
  const { refetch } = useGetCartData();

  const { mutate: updateCartProduct } = useUpdateCartProduct();

  return (
    <ProductCounter
      count={count}
      setCount={setCount}
      amountButtonAction={() =>
        updateCartProduct(
          { productId, quantity: count },
          { onSuccess: () => refetch() }
        )
      }
    />
  );
};

export default CartProductCounter;
