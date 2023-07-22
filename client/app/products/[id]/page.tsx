'use client';

import React from 'react';
import { Box, Grid, Tab, Typography } from '@mui/material';
import ProductCounter from '@/components/ProductCounter';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SwiperGallery from '@/components/Swiper';

const ProductPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box color="white">
      <Grid container marginTop={10}>
        <Grid item xl={6}>
          <Box padding="0 50px">
            <SwiperGallery />
          </Box>
        </Grid>
        <Grid item xl={6}>
          <Typography variant="h1" fontSize={26} fontWeight="bold">
            Meta Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB
          </Typography>
          <Typography
            variant="h2"
            fontSize={24}
            fontWeight="semibold"
            marginTop={5}
          >
            $299.00
          </Typography>
          <Typography
            paragraph
            marginTop={5}
            marginBottom={5}
            sx={{ lineHeight: '28px' }}
          >
            About this item
            <br />
            - Meta Quest is for ages 13+. Certain apps, games and experiences
            may be suitable for a more mature audience. Keep your experience
            smooth and seamless, even as high speed action unfolds around you
            with a super-fast processor and high-resolution display. (Packaging
            may vary) Meta Quest packaging will continue to carry the Oculus
            name and logo during the transition to our new branding.
            <br />
            - Experience total immersion with 3D positional audio, hand tracking
            and haptic feedback, working together to make virtual worlds feel
            real.
            <br />
            - Explore an expanding universe of over 250 titles across gaming,
            fitness, social/multiplayer and entertainment, including exclusive
            blockbuster releases and totally unique VR experiences.
            <br />
            - Travel universes in blockbuster fantasies, scare yourself witless
            in horror adventures or collaborate with colleagues in innovative
            workspaces.
            <br />
            - Come together in incredible social spaces and multiplayer arenas
            as you take in live events with friends and family, find your new
            workout crew or join quests with fellow adventurers.
            <br />- Be truly free to roam in VR With a wireless headset,
            intuitive controls, a built-in battery, easy setup and no PC or
            console needed*
          </Typography>
          <ProductCounter />
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', typography: 'body1', marginTop: '100px' }}>
        <TabContext value={value}>
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
                label="Reviews (0)"
                value="2"
                sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ProductPage;
