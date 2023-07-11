'use client';

import Image from 'next/image';
import React from 'react';
import TextField from '@mui/material/TextField';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
    </Box>
  );
}
