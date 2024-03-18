import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CircleIcon from '@mui/icons-material/Circle';
import { useGetCartData } from '@/src/api/cart';
import { pageRoutes } from '@/src/routes/pageRoutes';

const ShoppingCart = () => {
  const { data: cartData } = useGetCartData();

  return (
    <Link href={pageRoutes.cart()}>
      <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
      {cartData && cartData.products?.length > 0 && (
        <Box sx={{ position: 'relative' }}>
          <CircleIcon
            sx={{
              color: '#48A623',
              fontSize: 10,
              marginRight: 15,
              position: 'absolute',
              bottom: 21,
              left: 13,
            }}
          />
        </Box>
      )}
    </Link>
  );
};

export default ShoppingCart;
