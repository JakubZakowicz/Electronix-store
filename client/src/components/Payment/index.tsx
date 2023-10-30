import React, { useEffect, useState } from 'react';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Typography } from '@mui/material';
import PaymentForm from '../PaymentForm';
import { useGetStripeConfig, useMakePayment } from '@/src/api/checkout';
import { useGetCartData } from '@/src/api/cart';

const Payment = () => {
  const [stripePromise, setStripePromise] = useState();
  const [clientSecret, setClientSecret] = useState();

  const { data: cartData } = useGetCartData();

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
    if (stripePromise && cartData) {
      makePayment(
        { sum: cartData.total },
        {
          onSuccess: (res) => {
            setClientSecret(res.data.clientSecret);
          },
        }
      );
    }
  }, [stripePromise, cartData]);

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
