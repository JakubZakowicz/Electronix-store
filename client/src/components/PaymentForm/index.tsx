import { Box } from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { SyntheticEvent } from 'react';
import DefaultButton from '../DefaultButton';
import { pageRoutes } from '@/src/routes/pageRoutes';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('payment');

    if (!stripe || !elements) return;
    const response = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: pageRoutes.root() },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '25px',
        }}
      >
        <DefaultButton name="Pay now" type="submit" />
      </Box>
    </form>
  );
};

export default PaymentForm;
