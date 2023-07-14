'use client';

import React from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
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
            variant="standard"
            fullWidth
            placeholder="Search"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '5px 15px',
              borderRadius: '20px',
              '& input': {
                color: 'white',
              },
            }}
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
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;
