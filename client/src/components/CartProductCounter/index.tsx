import React, { useState } from 'react';
import ProductCounter from '../ProductCounter';
import { useUpdateCartProduct } from '@/src/api/cart';

interface CartProductCounterProps {
  productId: string;
  defaultAmount?: number;
}

const CartProductCounter = ({
  productId,
  defaultAmount,
}: CartProductCounterProps) => {
  const [count, setCount] = useState<number>(defaultAmount ?? 1);

  const { mutate: updateCartProduct } = useUpdateCartProduct();

  return (
    <ProductCounter
      count={count}
      setCount={setCount}
      amountButtonAction={() =>
        updateCartProduct({ productId, quantity: count })
      }
    />
  );
};

export default CartProductCounter;
