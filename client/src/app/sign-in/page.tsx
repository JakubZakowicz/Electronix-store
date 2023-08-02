'use client';

import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import InputField from '@/src/components/InputField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/src/utils/validationSchemat';

interface SignInFormSchema {
  email: string;
  password: string;
}

const SignInPage = () => {
  const { control, handleSubmit } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormSchema> = (data) => {
    console.log(data);
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
                  labelName="Email"
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
                }}
              >
                Sign in
              </Button>
              <Typography sx={{ marginTop: '10px' }}>
                Forgot Password?
              </Typography>
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
            <Button
              sx={{
                color: 'white',
                padding: '6px 50px',
                border: '1px solid white',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '0',
                fontSize: '18px',
                textTransform: 'capitalize',
              }}
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInPage;
