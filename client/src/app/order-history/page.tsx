'use client';

import React from 'react';
import Image from 'next/image';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useGetOrders } from '@/src/api/orders';
import { convertPrice } from '@/src/utils/functions.utils';
import { useGetMe } from '@/src/api/auth';

const OrderHistory = () => {
  const { data: me, isError, error } = useGetMe();

  if (isError) throw new Error(error.message);

  const {
    data: orderData,
    isError: isOrdersError,
    error: ordersError,
  } = useGetOrders(me?.userId);

  if (isOrdersError) throw new Error(ordersError.message);

  if (orderData?.orders?.length === 0)
    return (
      <Box height="30vh">
        <Typography
          sx={{
            textAlign: 'center',
            marginTop: 15,
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          The are no orders yet
        </Typography>
      </Box>
    );

  return (
    <Box>
      <Typography variant="h2" fontSize={30}>
        Order history
      </Typography>
      {orderData?.orders?.map(
        ({ id, status, orderItems, deliveryPrice, totalPrice }) => (
          <Card
            key={id}
            sx={{
              marginTop: '50px',
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid white',
              padding: '10px 30px',
              '& p': {
                fontSize: '18px',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Typography>Package Status:</Typography>
                <CircleIcon
                  sx={{ color: '#2DFF0B', fontSize: '18px', marginLeft: '5px' }}
                />
                <Typography> {status}</Typography>
              </Box>
              <Divider sx={{ background: 'white', marginTop: '25px' }} />
              {orderItems.map(({ id, product, quantity }) => {
                const { name, price, images } = product;
                return (
                  <Box key={id}>
                    <Grid container spacing={3} sx={{ padding: '25px 0' }}>
                      <Grid item xs={1} sm={2} xl={1}>
                        <Image src={images[0].url} width="100" height="100" alt="image" />
                      </Grid>
                      <Grid item xs={12} sm={3} lg={5}>
                        <Typography>{name}</Typography>
                      </Grid>
                      <Grid item xs={2} sm={3} lg={3}>
                        <Typography textAlign="right">
                          {quantity} x ${convertPrice(price)}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={2} lg={3}>
                        <Typography textAlign="right">
                          ${convertPrice(quantity * price)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ background: 'white' }} />
                  </Box>
                );
              })}
              <Box
                sx={{
                  float: 'right',
                  margin: '40px 0',
                  '& p': { fontSize: '20px' },
                }}
              >
                <Box sx={{ display: 'flex', gap: '80px' }}>
                  <Typography>Delivery:</Typography>
                  <Typography>
                    {deliveryPrice > 0 ? `$${deliveryPrice}` : 'Free'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '80px', marginTop: '10px' }}>
                  <Typography>Total:</Typography>
                  <Typography>${convertPrice(totalPrice)}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )
      )}
    </Box>
  );
};

export default OrderHistory;
