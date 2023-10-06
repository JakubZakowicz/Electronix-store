'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
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
import DefaultButton from '@/src/components/DefaultButton';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useGetCartData } from '@/src/api/cart';
import { convertPrice } from '@/src/utils/functions.utils';
import CartProductCounter from '@/src/components/CartProductCounter';
import DeleteCartProduct from '@/src/components/DeleteCartProduct';

const CartPage = () => {
  const { data: cartData } = useGetCartData();
  const { products, subtotal, shipping, total } = cartData || {};

  if (!products || products.length === 0)
    return (
      <Box sx={{ borderTop: '1px solid white' }}>
        <Typography sx={{ textAlign: 'center', fontSize: 24, marginTop: 5 }}>
          The cart is empty
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Link href={pageRoutes.root()}>
            <DefaultButton name="Go back to store" />
          </Link>
        </Box>
      </Box>
    );

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map(({ id, name, price, quantity }) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  scope="row"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <Image src={VR} width={100} alt="vr" />
                  {name}
                </TableCell>
                <TableCell>${price && convertPrice(price)}</TableCell>
                <TableCell>
                  {quantity && (
                    <>
                      <CartProductCounter
                        productId={id}
                        defaultAmount={quantity}
                      />
                    </>
                  )}
                </TableCell>
                <TableCell>${convertPrice(price * quantity)}</TableCell>
                <TableCell sx={{ width: '100px' }}>
                  <DeleteCartProduct productId={id} />
                </TableCell>
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
            <Typography>${subtotal && convertPrice(subtotal)}</Typography>
          </Box>
          <Divider color="white" sx={{ margin: '10px 0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Shipping</Typography>
            <Typography>
              {shipping && shipping > 0 ? shipping : 'Free'}
            </Typography>
          </Box>
          <Divider color="white" sx={{ margin: '10px 0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total</Typography>
            <Typography>${total && convertPrice(total)}</Typography>
          </Box>
          <Link href={pageRoutes.checkout()}>
            <DefaultButton
              name="Checkout"
              style={{ float: 'right', marginTop: '30px' }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
