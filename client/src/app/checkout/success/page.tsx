'use client';

import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DefaultButton from '@/src/components/DefaultButton';
import Link from 'next/link';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useRouter } from 'next/navigation';
import { useAddNewOrder } from '@/src/api/checkout';

const CheckoutSuccess = ({ searchParams }: any) => {
  const { payment_intent } = searchParams;
  const router = useRouter();

  if (!payment_intent) router.push(pageRoutes.root());

  const { mutate } = useAddNewOrder(payment_intent);

  useEffect(() => {
    mutate(null);
  }, []);

const CheckoutSuccess = ({ searchParams }: any) => {
  const { payment_intent_client_secret } = searchParams;
  const router = useRouter();

  if (!payment_intent_client_secret) router.push(pageRoutes.root());

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#2EDC4A',
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 200, marginTop: 5 }} />
      <Typography variant="h2" sx={{ fontSize: 40, marginTop: 3 }}>
        Payment Successfull
      </Typography>
      <Typography
        sx={{
          color: 'white',
          marginTop: '15px',
          fontSize: 24,
          textAlign: 'center',
        }}
      >
        Thank you for completing your payment.
      </Typography>
      <Typography sx={{ color: 'white', marginTop: '10px', fontSize: 20 }}>
        Have a great day!
      </Typography>
      <Link href={pageRoutes.root()}>
        <DefaultButton style={{ marginTop: '40px' }} name="Go Back" />
      </Link>
    </Box>
  );
};

export default CheckoutSuccess;
