'use client';

import Image from 'next/image';
import React from 'react';
import TextField from '@mui/material/TextField';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Logo from '../public/logo.svg';
import styles from './page.module.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import Vision from '../images/vision.png';
import VRHeadset from '../images/HP_Reverb.png';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Home() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <Box
        margin="30px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image src={Logo} width={60} alt="logo" />
        <Box width="700px">
          <TextField
            hiddenLabel
            className={styles.textfield}
            variant="standard"
            fullWidth
            placeholder="Search"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <SearchIcon sx={{ color: '#808080', marginRight: '5px' }} />
              ),
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap="40px">
          <PersonIcon sx={{ fontSize: '40px' }} />
          <ShoppingCartIcon fontSize="large" />
        </Box>
      </Box>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            color: 'white',
            marginTop: 15,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GridViewIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Categories" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Virtual Reality" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Box width="80%" marginLeft="350px">
        <Card
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            border: '1px solid white',
          }}
          variant="outlined"
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Image src={Vision} alt="vision" />
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
            </Box>
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
        <Box
          display="flex"
          marginTop="10px"
          justifyContent="space-between"
          gap="70px"
          overflow="auto"
          flexWrap="wrap"
        >
          {[
            'HP Reverb G2',
            'HP Reverb G2',
            'HP Reverb G2',
            'HP Reverb G2',
            'HP Reverb G2',
          ].map(text => (
            <Card
              key={text}
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
                <Box marginTop="10px">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </Box>
                <Typography marginTop="10px">$39.68</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Box
        borderTop="1px solid white"
        marginTop="100px"
        display="flex"
        justifyContent="center"
        padding="50px 0"
        gap="150px"
      >
        <Box alignSelf="center" textAlign="center">
          <Image src={Logo} width={80} alt="logo" />
          <Typography marginTop="10px">Jz inc.</Typography>
        </Box>
        <Box>
          <Typography borderBottom="1px solid white" paddingBottom="10px">Contact Us</Typography>
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
        </Box>
        <Box>
          <Typography borderBottom="1px solid white" paddingBottom="10px">Informations</Typography>
          <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Terms & Conditions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Privacy Policy" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="FAQs" />
            </ListItemButton>
          </ListItem>
        </List>
        </Box>
        <Box textAlign="center" alignSelf="center">
          <Typography>Follow Us</Typography>
          <Box display="flex" gap="40px" marginTop="20px">
            <InstagramIcon fontSize="large" />
            <FacebookIcon fontSize="large" />
            <TwitterIcon fontSize="large" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
