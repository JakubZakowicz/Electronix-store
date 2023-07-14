'use client';

import React from 'react';
import Image from 'next/image';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Logo from '../../public/logo.svg';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';

const Footer = () => {
  return (
    <Grid
      container
      component="section"
      id="footer"
      borderTop="1px solid white"
      marginTop="100px"
      padding="70px 20px"
      columnSpacing={20}
    >
      <Grid item alignSelf="center" textAlign="center" xs={12} md={3}>
        <Image src={Logo} width={80} alt="logo" />
        <Typography marginTop="10px">Jz inc.</Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography borderBottom="1px solid white" paddingBottom="10px">
          Contact Us
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailOutlineIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="jz@example.com" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalPhoneIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="+48 123 456 789" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WatchLaterIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <Box>
                <ListItemText primary="Customer Service" />
                <ListItemText primary="Mon-Sun: 9:00 - 17:00" />
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography borderBottom="1px solid white" paddingBottom="10px">
          Informations
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Terms & Conditions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemText primary="Privacy Policy" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemText primary="FAQs" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
      <Grid item textAlign="center" alignSelf="center" xs={12} md={3}>
        <Typography>Follow Us</Typography>
        <Box display="flex" gap="40px" marginTop="20px" justifyContent="center">
          <Link href="https://instagram.com" style={{ color: 'white' }}>
            <InstagramIcon fontSize="large" />
          </Link>
          <Link href="https://facebook.com" style={{ color: 'white' }}>
            <FacebookIcon fontSize="large" />
          </Link>
          <Link href="https://twitter.com" style={{ color: 'white' }}>
            <TwitterIcon fontSize="large" />
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
