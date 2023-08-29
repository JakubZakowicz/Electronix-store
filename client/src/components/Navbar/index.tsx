'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '@/public/logo.svg';
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
import Link from 'next/link';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useGetCategories } from '@/src/api/categories';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [open, setOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, isLoading } = useGetCategories();

  console.log(data);

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
        <Link href={pageRoutes.root()}>
          <Image src={Logo} width={60} alt="logo" />
        </Link>
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
          <Link href={pageRoutes.singIn()}>
            <PersonIcon sx={{ fontSize: '40px', color: 'white' }} />
          </Link>
          <Link href={pageRoutes.cart()}>
            <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
          </Link>
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
            backgroundColor: isMobileView ? 'black' : 'transparent',
            color: 'white',
            marginTop: isMobileView ? 0 : 15,
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
            <List
              component={Link}
              href="/categories/virtual-reality"
              disablePadding
              sx={{ color: 'white', textDecoration: 'none' }}
            >
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
