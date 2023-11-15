'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import CheckoutForm from '@/src/components/CheckoutForm';
import { useGetCartData } from '@/src/api/cart';
import { convertPrice } from '@/src/utils/functions.utils';
import { useRouter } from 'next/navigation';
import { pageRoutes } from '@/src/routes/pageRoutes';

const CheckoutPage = () => {
  const router = useRouter();
  const {
    data: cartData,
    isFetched: isCartDataFetched,
    isError: isCartDataError,
    error: cartDataError,
  } = useGetCartData();

  const { products, subtotal, shipping, total } = cartData || {};

  if (isCartDataFetched && cartData?.products.length === 0) {
    router.push(pageRoutes.cart());
  }

  if (isCartDataError) throw new Error(cartDataError.message)

  return (
    <Box>
      <Grid container spacing={8}>
        <Grid item xl={8}>
          <CheckoutForm />
        </Grid>
        <Grid item xl={4}>
          <Card
            sx={{
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid white',
            }}
          >
            <CardHeader title="Order Summary" sx={{ marginBottom: '-20px' }} />
            <CardContent>
              <Typography sx={{ marginBottom: '20px' }}>
                {products?.length}
                &nbsp;
                {products && products?.length > 1 ? 'Items' : 'Item'}
              </Typography>
              {products?.map(({ id, images, name, price, quantity }) => (
                <Grid
                  key={id}
                  container
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <Grid item>
                    <Image
                      src={images[0].url}
                      width="100"
                      height="100"
                      alt="VR order"
                    />
                  </Grid>
                  <Grid item width="200px">
                    <Typography>
                      {quantity} x {name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${convertPrice(price)}</Typography>
                  </Grid>
                </Grid>
              ))}
              <Divider color="white" />
              <Typography sx={{ margin: '20px 0' }}>
                Discount / Coupon Code
              </Typography>
              <Divider color="white" />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '20px',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal && convertPrice(subtotal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Shipping</Typography>
                  <Typography>
                    {shipping && shipping > 0 ? `$${shipping}` : 'Free'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Total</Typography>
                  <Typography>${total && convertPrice(total)}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
