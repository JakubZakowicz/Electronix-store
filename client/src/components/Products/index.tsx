'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import VRHeadset from '../../images/HP_Reverb.png';
import Link from 'next/link';
import { routes } from '@/src/utils/routes';

interface ProductsInterface {
  name: string;
}

const Products = ({ name }: ProductsInterface) => {
  return (
    <Box>
      <Typography
        marginTop="50px"
        variant="h2"
        fontSize="30px"
        fontWeight="bold"
      >
        {name}
      </Typography>
      <Grid container marginTop="-30px" spacing={12} rowSpacing={6}>
        {[
          'HP Reverb G2',
          'HP Reverb G2',
          'HP Reverb G2',
          'HP Reverb G2',
          'HP Reverb G2',
        ].map((text) => (
          <Grid key={text} item sm={12} lg={4} xl={3}>
            <Link href={routes.products(1)} style={{ textDecoration: 'none' }}>
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
