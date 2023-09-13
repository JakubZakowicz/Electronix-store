'use client';

import React, { useState } from 'react';
import { Box, Grid, Rating, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import LinearProgress from '@mui/material/LinearProgress';
import ProductCounter from '@/src/components/ProductCounter';
import SwiperGallery from '@/src/components/SwiperGallery';
import { useGetProduct } from '@/src/api/products';
import { convertPrice } from '@/src/utils/functions.utils';
import { useAddToCart } from '@/src/api/cart';
import ReviewFormModalButton from '@/src/components/ReviewFormModalButton';

interface ProductPageProps {
  params: { slug: string };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [tabNumber, setTabNumber] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const { slug } = params;

  const { data: product } = useGetProduct(slug);
  const { mutate: addToCart } = useAddToCart();

  const { id, name, summary, description, price, reviews } = product || {};

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabNumber(newValue);
  };

  const addProductToCart = () => {
    addToCart({ productId: id!, quantity });
  };

  return (
    <Box color="white">
      <Grid container marginTop={10} columnSpacing={6}>
        <Grid item xl={6}>
          <Box maxWidth="730px" width="100vw">
            <SwiperGallery />
          </Box>
        </Grid>
        <Grid item xl={6}>
          <Typography variant="h1" fontSize={26} fontWeight="bold">
            {name}
          </Typography>
          <Typography
            variant="h2"
            fontSize={24}
            fontWeight="semibold"
            marginTop={5}
          >
            {price && <>${convertPrice(price)}</>}
          </Typography>
          <Typography
            paragraph
            marginTop={5}
            marginBottom={5}
            sx={{ lineHeight: '28px' }}
          >
            {summary}
          </Typography>
          <ProductCounter
            count={quantity}
            setCount={setQuantity}
            isAddToCartOption
            cartButtonAction={addProductToCart}
            amountButtonAction={() => console.log(quantity)}
          />
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', typography: 'body1', marginTop: '100px' }}>
        <TabContext value={tabNumber}>
          <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
              TabIndicatorProps={{ sx: { background: 'white' } }}
              TabScrollButtonProps={{ style: { background: 'white' } }}
              sx={{ '&.Mui-selected': { color: 'white' } }}
            >
              <Tab
                label="Description"
                value="1"
                sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
              />
              <Tab
                label={`Reviews (${reviews?.length})`}
                value="2"
                sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">{description}</TabPanel>
          <TabPanel value="2">
            <Box
              sx={{ width: '600px', margin: '0 auto', marginBottom: '80px' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  <Typography sx={{ fontSize: '60px' }}>
                    {product?.rating}
                  </Typography>
                  <Box>
                    <Rating
                      name="read-only"
                      value={product?.rating}
                      sx={{
                        '.MuiRating-iconEmpty': {
                          color: 'rgba(255, 255, 255, 0.5)',
                        },
                      }}
                      precision={0.1}
                      readOnly
                    />
                    <Typography>{product?.reviews.length} Reviews</Typography>
                  </Box>
                </Box>
                <ReviewFormModalButton />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '10px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>5 Stars</Typography>
                  <LinearProgress
                    variant="determinate"
                    color="inherit"
                    value={60}
                    sx={{ width: '80%' }}
                  />
                  <Typography>551</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>4 Stars</Typography>
                  <LinearProgress
                    variant="determinate"
                    color="inherit"
                    value={20}
                    sx={{ width: '80%' }}
                  />
                  <Typography>144</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>3 Stars</Typography>
                  <LinearProgress
                    variant="determinate"
                    color="inherit"
                    value={7}
                    sx={{ width: '80%' }}
                  />
                  <Typography>76</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>2 Stars</Typography>
                  <LinearProgress
                    variant="determinate"
                    color="inherit"
                    value={6}
                    sx={{ width: '80%' }}
                  />
                  <Typography>52</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>1 Star</Typography>
                  <LinearProgress
                    variant="determinate"
                    color="inherit"
                    value={7}
                    sx={{ width: '80%' }}
                  />
                  <Typography>77</Typography>
                </Box>
              </Box>
            </Box>
            {reviews &&
              reviews?.map(({ id, title, content, rating, user }) => (
                <Grid key={id} container sx={{ marginBottom: '50px' }}>
                  <Grid item xl={2}>
                    <Rating
                      name="read-only"
                      value={rating}
                      readOnly
                      sx={{
                        '.MuiRating-iconEmpty': {
                          color: 'rgba(255, 255, 255, 0.5)',
                        },
                      }}
                    />
                    <Typography marginTop="10px">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography fontSize={15} color="#B9B9B9" marginTop="10px">
                      {user.created_at}
                    </Typography>
                  </Grid>
                  <Grid item xl={10}>
                    <Typography
                      variant="h3"
                      fontSize={25}
                      fontWeight="semibold"
                    >
                      {title}
                    </Typography>
                    <Typography marginTop="10px">{content}</Typography>
                  </Grid>
                </Grid>
              ))}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ProductPage;
