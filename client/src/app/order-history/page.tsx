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
import VR1 from '@/src/images/vr1.png';
import VR2 from '@/src/images/HP_Reverb.png';

const OrderHistory = () => {
  return (
    <Box>
      <Typography variant="h2" fontSize={30}>
        Order history
      </Typography>
      <Card
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
            <CircleIcon sx={{ color: '#2DFF0B', fontSize: '18px', marginLeft: '5px' }} />
            <Typography> Delivered</Typography>
          </Box>

          <Divider sx={{ background: 'white', marginTop: '25px' }} />
          {orderHistoryItems.map(({ image, name, price, amount, total }) => (
            <Box key={name}>
              <Grid container spacing={3} sx={{ padding: '25px 0' }}>
                <Grid item xs={1} sm={2} xl={1}>
                  <Image src={image} width="100" height="100" alt="image" />
                </Grid>
                <Grid item xs={12} sm={3} lg={5}>
                  <Typography>{name}</Typography>
                </Grid>
                <Grid item xs={2} sm={3} lg={3}>
                  <Typography textAlign="right">
                    {amount} x ${price}
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} lg={3}>
                  <Typography textAlign="right">${total}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ background: 'white' }} />
            </Box>
          ))}
          <Box
            sx={{
              float: 'right',
              margin: '40px 0',
              '& p': { fontSize: '20px' },
            }}
          >
            <Box sx={{ display: 'flex', gap: '80px' }}>
              <Typography>Delivery:</Typography>
              <Typography>$10</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '80px', marginTop: '10px' }}>
              <Typography>Total:</Typography>
              <Typography>$348.99</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderHistory;

const orderHistoryItems = [
  {
    image: VR1,
    name: 'Meta Quest 2 — Advanced All-In-One Virtual Reality Headset — 128GB',
    price: '299.00',
    amount: 1,
    total: '299.00',
  },
  {
    image: VR2,
    name: 'HP Reverb G2',
    price: '39.99',
    amount: 1,
    total: '39.99',
  },
];
