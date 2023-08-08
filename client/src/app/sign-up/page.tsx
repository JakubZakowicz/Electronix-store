'use client';

import React from 'react';
import InputField from '@/src/components/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, Link, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { signUpSchema } from '@/src/utils/validationSchemat';
import { SignUpFormSchema } from '@/src/utils/types';
import { routes } from '@/src/utils/routes';
import DefaultButton from '@/src/components/DefaultButton';

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
                  label="Email"
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
                    label="Password"
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
                    label="Confirm Password"
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
                <DefaultButton type="submit" name="Create Account" />
                <Typography sx={{ marginTop: '10px' }}>
                  Do you have an account? &nbsp;
                  <Link
                    href={routes.singIn()}
                    style={{ color: 'white', textDecoration: 'underline' }}
                  >
                    Sign in here
                  </Link>
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
