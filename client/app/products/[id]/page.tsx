'use client';

import React from 'react';
import { Box, Grid, Rating, Tab, Typography } from '@mui/material';
import ProductCounter from '@/components/ProductCounter';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SwiperGallery from '@/components/SwiperGallery';

const ProductPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
          <TabPanel value="2">
            {/* <Box display="flex" gap="30px"> */}
            <Grid container>
              <Grid item xl={2}>
                <Rating name="read-only" value={5} readOnly />
                <Typography marginTop="10px">Domynyq</Typography>
                <Typography fontSize={15} color="#B9B9B9" marginTop="10px">
                  July 21st 2023
                </Typography>
              </Grid>
              <Grid item xl={10}>
                <Typography variant="h3" fontSize={25} fontWeight="semibold">
                  Excellent Experience
                </Typography>
                <Typography marginTop="10px">
                  TV wygląda bardzo ładnie, głośniki zadziwiająco dobre
                  (szczególnie w trybie muzyka), lecz muszę się przyczepić do
                  wielkości TV. Może i ma wąskie ramki, ale tak naprawdę to nie
                  - po prostu pod przednią szybą/pleksi czy jak to tam nazwać
                  jest faktyczny ekran, który jest mniejszy o około cala na
                  całej długości przekątnej. Efektem jest wąska biała ramka plus
                  czarna obramówka wokół ekranu. W tym momencie sam ekran nie ma
                  32 cali, tylko ta szybka/pleksi na przodzie TV. Dodatkowo
                  obraz wyświetlany na ekranie lekko się odbija od tej szyby z
                  przodu TV - widać to w okolicy tej obramówki jak się patrzy z
                  boku, na wprost TV jest ok. Ale poza tym jestem bardzo
                  zadowolony z TV, świetnie komponuje się w pokoju, do jakości
                  obrazu brak zastrzeżeń, bo używam go z kablówką. Mediabox HD
                  UPC idealnie wchodzi pod TV ;)
                </Typography>
              </Grid>
            </Grid>

            {/* </Box> */}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ProductPage;
