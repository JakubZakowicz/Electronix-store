'use client';

import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Typography } from '@mui/material';
import { useForgotPassword } from '@/src/api/auth';
import DefaultButton from '@/src/components/DefaultButton';
import InputField from '@/src/components/InputField';
import { ForgotPasswordSchema } from '@/src/utils/types';
import { forgotPasswordSchema } from '@/src/utils/validationSchemas';
import FormErrorMessage from '@/src/components/FormErrorMessage';
import ResultMessage from '@/src/components/ResultMessage';

const ForgotPasswordPage = () => {
  const [isSuccessfullMessage, setIsSuccessfullMessage] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

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
        <ResultMessage message={resultMessage} />
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
            <FormErrorMessage
              message={sendResetPasswordEmailError.response.data.message}
            />
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
