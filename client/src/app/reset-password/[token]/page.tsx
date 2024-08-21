'use client';

import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@/src/components/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/src/utils/validationSchemas';
import { ResetPasswordSchema } from '@/src/utils/types';
import DefaultButton from '@/src/components/DefaultButton';
import { useResetPassword } from '@/src/api/auth';
import FormErrorMessage from '@/src/components/FormErrorMessage';
import ResultMessage from '@/src/components/ResultMessage';

interface ResetPasswordProps {
  params: { token: string };
}

const ResetPasswordPage = ({ params }: ResetPasswordProps) => {
  const { token } = params;
  const [isSuccessfullMessage, setIsSuccessfullMessage] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const {
    mutate: resetPassword,
    isError: isResetPasswordError,
    error: resetPasswordError,
  } = useResetPassword();

  const { control, handleSubmit } = useForm<ResetPasswordSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    const { newPassword } = data;
    console.log(token, newPassword);
    resetPassword(
      { token, newPassword },
      {
        onSuccess: (data) => {
          setIsSuccessfullMessage(true);
          setResultMessage(data.data.message);
        },
      }
    );
  };

  return (
    <Box>
      {isSuccessfullMessage ? (
        <ResultMessage message={resultMessage} />
      ) : (
        <>
          <Typography
            variant="h1"
            textAlign="center"
            fontSize={30}
            fontWeight="bold"
            marginTop={10}
          >
            Reset password
          </Typography>
          <Grid
            container
            spacing={20}
            sx={{ marginTop: '-150px', justifyContent: 'center' }}
          >
            <Grid item xs={6}>
              {isResetPasswordError && (
                <FormErrorMessage
                  message={resetPasswordError.response.data.message}
                />
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box marginTop="50px">
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <InputField
                        helperText={error ? error.message : null}
                        label="New Password"
                        type="password"
                        {...field}
                      />
                    )}
                  />
                </Box>
                <Box marginTop="50px">
                  <Controller
                    name="confirmNewPassword"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <InputField
                        helperText={error ? error.message : null}
                        label="Confirm New Password"
                        type="password"
                        {...field}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '50px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box>
                    <DefaultButton type="submit" name="Reset Password" />
                  </Box>
                </Box>
              </form>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ResetPasswordPage;
