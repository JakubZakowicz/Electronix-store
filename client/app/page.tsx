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
import StarIcon from '@mui/icons-material/Star';
import Vision from '../images/vision.png';
import VRHeadset from '../images/HP_Reverb.png';

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
      <Typography
        marginTop="50px"
        variant="h2"
        fontSize="30px"
        fontWeight="bold"
      >
        Top Products
      </Typography>
      <Grid container marginTop="-30px" spacing={2} rowSpacing={6}>
        {[
          'HP Reverb G2',
          'HP Reverb G2',
          'HP Reverb G2',
          'HP Reverb G2',
          'HP Reverb G2',
        ].map((text) => (
          <Grid key={text} item sm={12} lg={4} xl={3}>
            <Card
              sx={{
                padding: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                border: '1px solid white',
                marginTop: '10px',
                color: 'white',
                width: '300px',
              }}
            >
              <CardContent>
                <Image
                  src={VRHeadset}
                  width="250"
                  height="200"
                  alt="VR headset"
                />
                <Typography fontSize="20px" marginTop="10px">
                  {text}
                </Typography>
                <Box marginTop="10px" color="yellow">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </Box>
                <Typography marginTop="10px">$39.68</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
