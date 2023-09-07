'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, Grid, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/src/components/InputField';
import { signInSchema } from '@/src/utils/validationSchemas';
import { SignInFormSchema } from '@/src/utils/types';
import DefaultButton from '@/src/components/DefaultButton';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useSignIn } from '@/src/api/auth';

const SignInPage = () => {
  const { mutate: signIn } = useSignIn()
  const router = useRouter()

  const { control, handleSubmit } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormSchema> = (data) => {
    signIn(data, { onSuccess: () => router.push('/') })
  };

  return (
    <Box>
      <Typography
        variant="h1"
        fontSize={30}
        fontWeight="bold"
        textAlign="center"
      >
        Sign In
      </Typography>
      <Grid container spacing={20} sx={{ marginTop: '-50px' }}>
        <Grid item xs={12} lg={6}>
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
            <Grid
              item
              sm={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '30px',
              }}
            >
              <DefaultButton type="submit" name="Sign in" />
              <Link
                href={pageRoutes.forgotPassword()}
                style={{ color: 'white', marginTop: '10px' }}
              >
                Forgot Password?
              </Link>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography
            variant="h2"
            sx={{
              fontSize: 30,
              textAlign: 'center',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            No Account?
          </Typography>
          <Typography paragraph>
            Create an account with us and you&apos;ll be able to:
          </Typography>
          <Box
            component="ul"
            sx={{ marginLeft: 7, '& li': { marginTop: '10px' } }}
          >
            <Typography component="li">Check out faster</Typography>
            <Typography component="li">
              Save multiple shipping addresses
            </Typography>
            <Typography component="li">Access your order history</Typography>
            <Typography component="li">Track new orders</Typography>
          </Box>
          <Grid
            item
            sm={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
            }}
          >
            <Link href={pageRoutes.signUp()}>
              <DefaultButton name="Create Account" />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInPage;
