'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import {
  Box,
  Button,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [open, setOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer = () => setIsDrawerOpen((prevState) => !prevState);

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <Box
        margin="30px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {isMobileView && (
          <Button onClick={toggleDrawer} sx={{ color: 'white', zIndex: 100 }}>
            <MenuIcon />
          </Button>
        )}
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
        open={isMobileView && isDrawerOpen}
        onClose={toggleDrawer}
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
        variant={isMobileView ? 'temporary' : 'permanent'}
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
      <Box width="80%" marginLeft={isMobileView ? '50px' : '350px'}>
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;
