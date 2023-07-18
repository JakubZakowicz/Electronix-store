'use client';

import Image from 'next/image';
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import Vision from '../images/vision.png';
import Products from '@/components/Products';

export default function Home() {
  return (
    <Box>
      <Card
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          border: '1px solid white',
        }}
        variant="outlined"
      >
        <CardContent>
          <Grid
            container
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item sm={12} lg={6}>
              <Image src={Vision} alt="vision" />
            </Grid>
            <Grid item sm={12} lg={6}>
              <Box color="white" textAlign="center" width="500px">
                <Typography marginBottom="10px" color="#ACACAC">
                  Special Offer
                </Typography>
                <Typography paragraph fontSize={30} fontWeight="bold">
                  Apple Vision Pro
                </Typography>
                <Typography paragraph fontSize={30} fontWeight="bold">
                  $3499
                </Typography>
                <Button
                  variant="contained"
                  sx={{ background: 'rgba(255, 255, 255, 0.2)' }}
                >
                  Buy Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
     <Products name="Top Products" />
    </Box>
  );
}
