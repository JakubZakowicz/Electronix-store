'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Button,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';
import CircleIcon from '@mui/icons-material/Circle';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useGetCategories } from '@/src/api/categories';
import Logo from '@/public/logo.svg';
import { useGetMe } from '@/src/api/auth';
import UserMenu from '../UserMenu';
import SearchBar from '../SearchBar';
import { useGetCartData } from '@/src/api/cart';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const [open, setOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const { data: categories } = useGetCategories();
  const { data: me } = useGetMe();
  const { data: cartData } = useGetCartData();

  useEffect(() => {
    if (me) setIsUser(true);
  }, [me]);

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
        flexWrap="wrap"
        rowGap={2}
      >
        {isMobileView && (
          <Button onClick={toggleDrawer} sx={{ color: 'white', zIndex: 100 }}>
            <MenuIcon />
          </Button>
        )}
        <Link href={pageRoutes.root()}>
          <Image src={Logo} width={60} alt="logo" />
        </Link>
        <SearchBar />
        <Box display="flex" alignItems="center" gap="40px">
          {isUser ? (
            <UserMenu userId={me!.userId} setIsUser={setIsUser} />
          ) : (
            <Link href={pageRoutes.singIn()}>
              <PersonIcon sx={{ fontSize: '40px', color: 'white' }} />
            </Link>
          )}
          <Link href={pageRoutes.cart()}>
            <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
            {cartData && cartData.products?.length > 0 && (
              <Box sx={{ position: 'relative' }}>
                <CircleIcon
                  sx={{
                    color: '#48A623',
                    fontSize: 10,
                    marginRight: 15,
                    position: 'absolute',
                    bottom: 21,
                    left: 13,
                  }}
                />
              </Box>
            )}
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
            {categories &&
              categories.categories?.map(({ id, slug, name }) => (
                <List
                  key={id}
                  component={Link}
                  href={pageRoutes.categories(slug)}
                  disablePadding
                  sx={{ color: 'white', textDecoration: 'none' }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </List>
              ))}
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
