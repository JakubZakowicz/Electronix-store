import React, { useEffect, useState } from 'react';
import {
  StripeElementsOptions,
  loadStripe,
} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Typography } from '@mui/material';
import PaymentForm from '../PaymentForm';
import { useGetStripeConfig, useMakePayment } from '@/src/api/checkout';

const Payment = () => {
  const [stripePromise, setStripePromise] = useState();
  const [clientSecret, setClientSecret] = useState();

  const { data: stripeConfigData } = useGetStripeConfig();
  const { mutate: makePayment } = useMakePayment();

  useEffect(() => {
    if (stripeConfigData?.publishableKey) {
      const { publishableKey } = stripeConfigData;
      // @ts-ignore
      setStripePromise(loadStripe(publishableKey));
    }
  }, [stripeConfigData]);

  useEffect(() => {
    if (stripePromise) {
      makePayment(
        { sum: 1000 },
        {
          onSuccess: (res) => {
            console.log(res);
            setClientSecret(res.data.clientSecret);
          },
        }
      );
    }
  }, [stripePromise]);

  const options: StripeElementsOptions = {
    appearance: {
      theme: 'night',
    },
  };

  return (
    <Box>
      <Typography variant="h1" fontSize="25px" marginTop="50px">
        Payment Information
      </Typography>
      {clientSecret && stripePromise && (
        <Box sx={{ marginTop: '20px' }}>
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, ...options }}
          >
            <PaymentForm />
          </Elements>
        </Box>
      )}
    </Box>
  );
};

export default Payment;
