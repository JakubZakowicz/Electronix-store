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
import VR from '@/src/images/vr1.png';
import CheckoutForm from '@/src/components/CheckoutForm';

const CheckoutPage = () => {
  return (
    <Box>
      <Typography variant="h1" fontSize="25px">
        User Information
      </Typography>
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
              <Typography sx={{ marginBottom: '20px' }}>1 Item</Typography>
              <Grid
                container
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <Grid item>
                  <Image src={VR} width="100" alt="VR order" />
                </Grid>
                <Grid item width="200px">
                  <Typography>
                    1 x Meta Quest 2 - Advanced All-In-One Virtual Reality
                    Headset - 128 GB
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>$299.00</Typography>
                </Grid>
              </Grid>
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
                  <Typography>$299.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Shipping</Typography>
                  <Typography>$0.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Taxes</Typography>
                  <Typography>$0.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Total</Typography>
                  <Typography>$299.00</Typography>
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
