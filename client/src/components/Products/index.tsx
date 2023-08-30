'use client';

import React from 'react';
import Image from 'next/image';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import VRHeadset from '../../images/HP_Reverb.png';
import Link from 'next/link';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { Product } from '@/src/utils/types';

interface ProductsInterface {
  name: string;
  products?: Product[];
}

const Products = ({ name, products }: ProductsInterface) => {
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
        {products &&
          products.map(({ id, name, rating, price }) => (
            <Grid key={id} item sm={12} lg={4} xl={3}>
              <Link
                href={pageRoutes.products(1)}
                style={{ textDecoration: 'none' }}
              >
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
                    <Typography fontSize="20px" margin="10px 0">
                      {name}
                    </Typography>
                    <Rating
                      sx={{ '.MuiRating-iconEmpty': {
                        color: 'rgba(255, 255, 255, 0.5)'
                      }}}
                      name="read-only"
                      value={rating}
                      readOnly
                      precision={0.1}
                    />
                    <Typography marginTop="10px">${price}</Typography>
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
