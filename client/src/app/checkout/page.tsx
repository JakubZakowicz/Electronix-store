'use client';

import React from 'react';
import InputField from '@/src/components/InputField';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import VR from '@/src/images/vr1.png';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutFormSchema } from '@/src/utils/types';
import { checkoutSchema } from '@/src/utils/validationSchemat';

const inputs: {
  fieldName:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'phoneNumber'
    | 'country'
    | 'city'
    | 'street'
    | 'postalCode';
  labelName: string;
}[] = [
  {
    fieldName: 'firstName',
    labelName: 'First Name',
  },
  {
    fieldName: 'lastName',
    labelName: 'Last Name',
  },
  {
    fieldName: 'email',
    labelName: 'Email address',
  },
  {
    fieldName: 'phoneNumber',
    labelName: 'Phone number',
  },
  {
    fieldName: 'country',
    labelName: 'Country',
  },
  {
    fieldName: 'city',
    labelName: 'City',
  },
  {
    fieldName: 'street',
    labelName: 'Street',
  },
  {
    fieldName: 'postalCode',
    labelName: 'Postal dode',
  },
];

const CheckoutPage = () => {
  const { control, handleSubmit } = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit: SubmitHandler<CheckoutFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Typography variant="h1" fontSize="25px">
        User Information
      </Typography>
      <Grid container spacing={8}>
        <Grid item xl={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container marginTop="20px" rowSpacing={5} columnSpacing={10}>
              {inputs.map(({ fieldName, labelName }) => (
                <Grid key={fieldName} item md={6}>
                  <Controller
                    name={fieldName}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <InputField
                        labelName={labelName}
                        helperText={error ? error.message : null}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid
                item
                sm={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  type="submit"
                  sx={{
                    color: 'white',
                    padding: '6px 50px',
                    border: '1px solid white',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '0',
                    marginTop: '10px',
                    fontSize: '18px',
                    textTransform: 'capitalize',
                  }}
                >
                  Pay
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xl={4}>
          <Card
            sx={{
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid white',
            }}
          >
            <CardHeader title="Order Summary" sx={{ marginBottom: '-20px' }} />
            <CardContent>
              <Typography sx={{ marginBottom: '20px' }}>1 Item</Typography>
              <Grid
                container
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <Grid item>
                  <Image src={VR} width="100" alt="VR order" />
                </Grid>
                <Grid item width="200px">
                  <Typography>
                    1 x Meta Quest 2 - Advanced All-In-One Virtual Reality
                    Headset - 128 GB
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>$299.00</Typography>
                </Grid>
              </Grid>
              <Divider color="white" />
              <Typography sx={{ margin: '20px 0' }}>
                Discount / Coupon Code
              </Typography>
              <Divider color="white" />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '20px',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Subtotal</Typography>
                  <Typography>$299.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Shipping</Typography>
                  <Typography>$0.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Taxes</Typography>
                  <Typography>$0.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Total</Typography>
                  <Typography>$299.00</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
