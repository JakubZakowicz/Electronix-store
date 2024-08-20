'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Typography } from '@mui/material';
import { useForgotPassword } from '@/src/api/auth';
import DefaultButton from '@/src/components/DefaultButton';
import InputField from '@/src/components/InputField';
import { ForgotPasswordSchema } from '@/src/utils/types';
import { forgotPasswordSchema } from '@/src/utils/validationSchemas';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { pageRoutes } from '@/src/routes/pageRoutes';

const ForgotPasswordPage = () => {
  const [isSuccessfullMessage, setIsSuccessfullMessage] = useState(false);
  const [resultMessage, setResultMessage] = useState(false)

  const {
    mutate: sendResetPasswordEmail,
    isError: isSendResetPasswordEmailError,
    error: sendResetPasswordEmailError,
  } = useForgotPassword();

  const { control, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = (data) => {
    sendResetPasswordEmail(data, {
      onSuccess: (data) => {
        setIsSuccessfullMessage(true);
        setResultMessage(data.data.message);
      },
    });
  };

  return (
    <Container>
      {isSuccessfullMessage ? (
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
          <Typography variant="h2" sx={{ fontSize: 30, marginTop: 3 }}>
            {resultMessage}
          </Typography>
          <Link href={pageRoutes.root()}>
            <DefaultButton
              style={{ marginTop: '40px' }}
              name="Go Back to main page"
            />
          </Link>
        </Box>
      ) : (
        <>
          <Typography
            variant="h1"
            fontSize={30}
            fontWeight="bold"
            textAlign="center"
          >
            Forgot Password
          </Typography>
          {isSendResetPasswordEmailError && (
            <Typography
              sx={{ color: 'red', textAlign: 'center', marginBottom: 2 }}
            >
              {sendResetPasswordEmailError.response.data.message}
            </Typography>
          )}
          <Typography paragraph sx={{ textAlign: 'center', marginTop: '30px' }}>
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
                    label="Email"
                    type="email"
                    {...field}
                  />
                )}
              />
              <DefaultButton name="Reset Password" style={{ width: '300px' }} />
            </Box>
          </form>
        </>
      )}
    </Container>
  );
};

export default ForgotPasswordPage;
