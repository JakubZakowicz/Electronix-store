import React from 'react';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../DefaultButton';
import PaymentForm from '../PaymentForm';

const Payment = () => {
  const stripePromise = loadStripe(
    'pk_test_51MdyLQCiQ4WVfoFr8kOUlXsc2hW7sjqXmjmze8DMi6w6wbXaqTLvTbBXWrlWoHw1By4izQm2CC6O2izfecFhS2ku00uYxkckR2'
  );

  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
      theme: 'night',
    },
  };

  return (
    <Box>
      <Typography variant="h1" fontSize="25px" marginTop="50px">
        Payment Information
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      </Box>
    </Box>
  );
};

export default Payment;
