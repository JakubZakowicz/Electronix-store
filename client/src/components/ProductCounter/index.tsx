'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface ProductCounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  isAddToCartOption?: boolean;
  cartButtonAction?: () => void;
  amountButtonAction?: () => void;
}

const ProductCounter = ({
  isAddToCartOption,
  count,
  setCount,
  cartButtonAction,
  amountButtonAction,
}: ProductCounterProps) => {
  const isMounted = useRef(false);

  const increaseCount = () => setCount((prevState) => prevState + 1);

  const decreaseCount = () =>
    setCount((prevState) => {
      if (prevState > 1) return prevState - 1;
      return prevState;
    });

  useEffect(() => {
    if (isMounted.current) {
      if (amountButtonAction) amountButtonAction();
    } else {
      isMounted.current = true;
    }
  }, [count]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value === 0) {
      setCount(1);
      return;
    }
    setCount(value);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        sx={{ border: '1px solid white', borderRadius: '0px' }}
        onClick={decreaseCount}
      >
        <RemoveIcon fontSize="small" sx={{ color: 'white' }} />
      </IconButton>
      <TextField
        variant="standard"
        value={count}
        sx={{
          width: '45px',
          height: '38px',
          border: '1px solid white',
          '& input': {
            color: 'white',
            width: '45px',
            height: '30px',
            fontSize: '20px',
            padding: '4px 0',
            textAlign: 'center',
          },
        }}
        InputProps={{
          disableUnderline: true,
        }}
        onChange={onChange}
      />
      <IconButton
        sx={{ border: '1px solid white', borderRadius: '0px' }}
        onClick={increaseCount}
      >
        <AddIcon fontSize="small" sx={{ color: 'white' }} />
      </IconButton>
      {isAddToCartOption && (
        <Button
          startIcon={<ShoppingCartIcon />}
          sx={{
            color: 'white',
            padding: '6px 15px',
            border: '1px solid white',
            borderRadius: '0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
          onClick={cartButtonAction}
        >
          Add to cart
        </Button>
      )}
    </Box>
  );
};

export default ProductCounter;
