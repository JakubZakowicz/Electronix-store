'use client';

import React from 'react';
import InputField from '@/components/InputField';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import VR from '@/images/vr1.png';

const page = () => {
  return (
    <Box>
      <Typography variant="h1" fontSize="25px">
        User Information
      </Typography>
      <Grid container spacing={8}>
        <Grid item xl={8}>
          <Grid container marginTop="20px" rowSpacing={5} columnSpacing={10}>
            <Grid item md={6}>
              <InputField labelName="First Name" />
            </Grid>
            <Grid item md={6}>
              <InputField labelName="Last Name" />
            </Grid>
            <Grid item md={6}>
              <InputField labelName="Email address" />
            </Grid>
            <Grid item md={6}>
              <InputField labelName="Phone number" />
            </Grid>
            <Grid item md={6}>
              <InputField labelName="Country" />
            </Grid>
            <Grid item md={6}>
              <InputField labelName="City" />
            </Grid>
            <Grid item md={6}>
              <InputField labelName="Street" />
            </Grid>
            <Grid item md={6}>
              <InputField labelName="Postal Code" />
            </Grid>
            <Grid
              item
              sm={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                sx={{
                  color: 'white',
                  padding: '6px 50px',
                  border: '1px solid white',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0',
                  marginTop: '10px',
                  fontSize: '18px',
                  textTransform: 'capitalize',
                }}
              >
                Pay
              </Button>
            </Grid>
          </Grid>
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

export default page;
