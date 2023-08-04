'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import VR from '@/src/images/vr1.png';
import ProductCounter from '@/src/components/ProductCounter';
import { routes } from '@/src/utils/routes';

function createData(
  productName: string,
  price: number,
  amount: number,
  total: number
) {
  return { productName, price, amount, total };
}

const rows = [
  createData(
    'Meta Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB',
    299,
    1,
    299
  ),
];

const CartPage = () => {
  return (
    <Box>
      <TableContainer
        sx={{
          background: 'transparent',
          '& th, & td': { color: 'white' },
          '& th': { fontSize: '20px' },
          '& td': { fontSize: '18px' },
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.productName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  scope="row"
                  sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  <Image src={VR} width={100} alt="vr" />
                  {row.productName}
                </TableCell>
                <TableCell>${row.price}</TableCell>
                <TableCell>
                  <ProductCounter />
                </TableCell>
                <TableCell>${row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}>
        <Box width="300px">
          <Typography fontSize="25px" sx={{ marginBottom: '20px' }}>
            Summary
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Subtotal</Typography>
            <Typography>$299.00</Typography>
          </Box>
          <Divider color="white" sx={{ margin: '10px 0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Shipping</Typography>
            <Typography>Free</Typography>
          </Box>
          <Divider color="white" sx={{ margin: '10px 0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total</Typography>
            <Typography>$299.00</Typography>
          </Box>
          <Link href={routes.checkout()}>
            <Button
              sx={{
                color: 'white',
                padding: '6px 50px',
                border: '1px solid white',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '0',
                marginTop: '30px',
                float: 'right',
                fontSize: '18px',
                textTransform: 'capitalize',
              }}
            >
              Checkout
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
