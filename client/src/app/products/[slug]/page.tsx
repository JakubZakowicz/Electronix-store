'use client';

import React, { useState } from 'react';
import { Box, Grid, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import ProductCounter from '@/src/components/ProductCounter';
import SwiperGallery from '@/src/components/SwiperGallery';
import { useGetProduct } from '@/src/api/products';
import { convertPrice } from '@/src/utils/functions.utils';
import { useAddToCart, useGetCartData } from '@/src/api/cart';
import { notificationMessages } from '@/src/utils/notificationMessages.utils';
import Reviews from '@/src/components/Reviews';
import { noImageObject } from '@/src/utils/constants';

interface ProductPageProps {
  params: { slug: string };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [tabNumber, setTabNumber] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const { slug } = params;

  const {
    data: product,
    isError: isProductError,
    error: productError,
  } = useGetProduct(slug);
  const { refetch } = useGetCartData();

  const {
    mutate: addToCart,
    isError: isAddToCartError,
    error: addToCartError,
  } = useAddToCart();

  const { id, name, images, summary, description, price, reviews } =
    product || {};

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabNumber(newValue);
  };

  const addProductToCart = () => {
    addToCart(
      { productId: id!, quantity },
      {
        onSuccess: () => {
          refetch();
          toast.success(notificationMessages.success.addedToCart);
        },
      }
    );
  };

  if (isProductError) throw new Error(productError?.message);

  if (isAddToCartError) throw new Error(addToCartError?.message);

  return (
    <Box color="white">
      <Grid container marginTop={10} columnSpacing={6}>
        <Grid item xl={6}>
          <Box maxWidth="730px" width="100vw">
            <SwiperGallery
              images={images?.length === 0 ? [noImageObject] : images}
            />
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
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            <ReactMarkdown>{summary}</ReactMarkdown>
          </Typography>
          <ProductCounter
            count={quantity}
            setCount={setQuantity}
            isAddToCartOption
            cartButtonAction={addProductToCart}
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
          <TabPanel value="1">
            <Box sx={{ whiteSpace: 'pre-wrap' }}>
              <ReactMarkdown>{description}</ReactMarkdown>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            {product && <Reviews product={product} />}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ProductPage;
