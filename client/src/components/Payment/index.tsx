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

  const {
    data: cartData,
    isError: isCartDataError,
    error: cartDataError,
  } = useGetCartData();

  const {
    data: stripeConfigData,
    isError: isStripeConfigDataError,
    error: stripeConfigDataError,
  } = useGetStripeConfig();

  const {
    mutate: makePayment,
    isError: isMakePaymentError,
    error: makePaymentError,
  } = useMakePayment();

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
            console.log(res);
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

  if (isCartDataError) throw new Error(cartDataError.message);
  if (isStripeConfigDataError) throw new Error(stripeConfigDataError.message);
  if (isMakePaymentError) throw new Error(makePaymentError.message);

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
