import { Box, Typography } from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { SyntheticEvent, useState } from 'react';
import DefaultButton from '../DefaultButton';
import { pageRoutes } from '@/src/routes/pageRoutes';


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { protocol, host } = window.location;

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${protocol}//${host}${pageRoutes.checkoutSuccess()}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <Typography sx={{ color: 'red', textAlign: 'center' }}>
          {message}
        </Typography>
      )}
      <PaymentElement />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '25px',
        }}
      >
        <DefaultButton
          name="Pay now"
          type="submit"
          disabled={isProcessing || !stripe || !elements}
        />
      </Box>
    </form>
  );
};

export default PaymentForm;
