'use client';

import InputField from '@/src/components/InputField';
import { ForgotPasswordSchema } from '@/src/utils/types';
import { signInSchema } from '@/src/utils/validationSchemat';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const ForgotPasswordPage = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Typography
        variant="h1"
        fontSize={30}
        fontWeight="bold"
        textAlign="center"
      >
        Sign In
      </Typography>
      <Typography paragraph sx={{ textAlign: 'center', marginTop: '50px' }}>
        Fill in your email below to request a new password. An email will be
        sent to the address below containing a link to verify your email
        address.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputField
                helperText={error ? error.message : null}
                labelName="Email"
                type="email"
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            sx={{
              color: 'white',
              padding: '6px 50px',
              border: '1px solid white',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '0',
              fontSize: '18px',
              textTransform: 'capitalize',
              width: '300px',
            }}
          >
            Resset Password
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ForgotPasswordPage;
