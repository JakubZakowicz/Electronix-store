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
import VR1 from '@/src/images/vr1.png';

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
          <Typography>Package Status: Delivered</Typography>
          <Divider sx={{ background: 'white', margin: '25px 0' }} />
          <Grid container spacing={3}>
            <Grid item xs={1} sm={2} xl={1}>
              <Image src={VR1} width="100" height="100" alt="image" />
            </Grid>
            <Grid item xs={12} sm={3} lg={5}>
              <Typography>
                Meta Quest 2 — Advanced All-In-One Virtual Reality Headset — 128
                GB
              </Typography>
            </Grid>
            <Grid item xs={2} sm={3} lg={3}>
              <Typography textAlign="right">1 x $299.00</Typography>
            </Grid>
            <Grid item xs={2} sm={2} lg={3}>
              <Typography textAlign="right">$299.00</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderHistory;
