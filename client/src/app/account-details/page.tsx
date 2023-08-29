'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Button, Grid, Typography } from '@mui/material';
import { pageRoutes } from '@/src/routes/pageRoutes';

const AccountDetails = () => {
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
              <Typography fontWeight="lighter" fontSize={18}>
                {value}
              </Typography>
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

const accountDetails: { label: string; value: string }[] = [
  {
    label: 'First name',
    value: 'John',
  },
  {
    label: 'Last name',
    value: 'Doe',
  },
  {
    label: 'Email address',
    value: 'johndoe@example.com',
  },
  {
    label: 'Phone number',
    value: '+48 123 456 789',
  },
  {
    label: 'Country',
    value: 'Spain',
  },
  {
    label: 'City',
    value: 'Barcelona',
  },
  {
    label: 'Address',
    value: 'Camp Nou 10/9',
  },
  {
    label: 'Postal Code',
    value: '12-345',
  },
];
