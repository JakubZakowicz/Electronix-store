'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Button, Grid, Typography } from '@mui/material';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useGetMe, useGetUser } from '@/src/api/auth';

const AccountDetails = () => {
  const { data: me, isError, error } = useGetMe();

  if (isError) throw new Error(error.message)

  const {
    data: user,
    isError: isUserError,
    error: userError,
  } = useGetUser(me?.userId);

  if (isUserError) throw new Error(userError.message)

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    city,
    streetAddress,
    postCode,
  } = user || {};

  const accountDetails: { label: string; value: string | undefined }[] = [
    {
      label: 'First name',
      value: firstName,
    },
    {
      label: 'Last name',
      value: lastName,
    },
    {
      label: 'Email address',
      value: email,
    },
    {
      label: 'Phone number',
      value: phoneNumber,
    },
    {
      label: 'Country',
      value: country,
    },
    {
      label: 'City',
      value: city,
    },
    {
      label: 'Address',
      value: streetAddress,
    },
    {
      label: 'Postal Code',
      value: postCode,
    },
  ];

  return (
    <Box>
      <Typography variant="h1" fontSize={30}>
        Account details
      </Typography>
      <Box marginTop={8}>
        {accountDetails.map(({ label, value }) => (
          <Grid
            container
            key={label}
            sx={{
              display: 'flex',
              gap: '50px',
              marginTop: '30px',
              paddingBottom: '30px',
              borderBottom: '1px solid white',
              width: '800px',
            }}
          >
            <Grid item xs={2} sm={4}>
              <Typography variant="h2" fontSize={20} fontWeight="bold">
                {label}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4}>
              {value ? (
                <Typography fontWeight="lighter" fontSize={18}>
                  {value}
                </Typography>
              ) : (
                <Typography sx={{ color: 'gray' }}>Empty</Typography>
              )}
            </Grid>
          </Grid>
        ))}
        <Link href={pageRoutes.editAccountDetails()}>
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
              marginTop: '40px',
            }}
          >
            Edit
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AccountDetails;
