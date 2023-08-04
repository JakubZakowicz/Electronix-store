'use client';

import React from 'react';
import InputField from '@/src/components/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { signUpSchema } from '@/src/utils/validationSchemat';
import { SignUpFormSchema } from '@/src/utils/types';
import { routes } from '@/src/utils/routes';

const SignUpPage = () => {
  const { control, handleSubmit } = useForm<SignUpFormSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Typography
        variant="h1"
        textAlign="center"
        fontSize={30}
        fontWeight="bold"
      >
        New Account
      </Typography>
      <Grid
        container
        spacing={20}
        sx={{ marginTop: '-50px', justifyContent: 'center' }}
      >
        <Grid item xs={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Box marginTop="50px">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    helperText={error ? error.message : null}
                    labelName="Password"
                    type="password"
                    {...field}
                  />
                )}
              />
            </Box>
            <Box marginTop="50px">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    helperText={error ? error.message : null}
                    labelName="Confirm Password"
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
                    margin: 'auto',
                  }}
                >
                  Create Account
                </Button>
                <Typography sx={{ marginTop: '10px' }}>
                  Do you have an account?{' '}
                  <Link href={routes.singIn()}>Sign in here</Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpPage;
