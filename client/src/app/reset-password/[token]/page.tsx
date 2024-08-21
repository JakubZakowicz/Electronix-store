'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InputField from '@/src/components/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/src/utils/validationSchemas';
import { ResetPasswordSchema } from '@/src/utils/types';
import DefaultButton from '@/src/components/DefaultButton';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useResetPassword } from '@/src/api/auth';

interface ResetPasswordProps {
  params: { token: string };
}

const ResetPasswordPage = ({ params }: ResetPasswordProps) => {
  const { token } = params;
  const [isSuccessfullMessage, setIsSuccessfullMessage] = useState(false);
  const [resultMessage, setResultMessage] = useState(false);

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
                <Typography
                  sx={{ color: 'red', textAlign: 'center', marginBottom: 2 }}
                >
                  {resetPasswordError.response.data.message}
                </Typography>
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
