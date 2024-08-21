'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DefaultButton from '@/src/components/DefaultButton';
import Link from 'next/link';
import { pageRoutes } from '@/src/routes/pageRoutes';
import { useConfirmEmail } from '@/src/api/auth';
import ResultMessage from '@/src/components/ResultMessage';

interface EmailConfirmationProps {
  params: { token: string };
}

const EmailConfirmation = ({ params }: EmailConfirmationProps) => {
  const { token } = params;

  const {
    data: emailConfirmationResult,
    isError: isEmailConfirmationError,
    error: emailConfirmationError,
  } = useConfirmEmail(token);

  return (
    <>
      {emailConfirmationResult && (
        <ResultMessage message={emailConfirmationResult?.message} />
      )}
      {isEmailConfirmationError && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: '#D0312D',
          }}
        >
          <CancelIcon sx={{ fontSize: 200, marginTop: 5 }} />
          <Typography variant="h2" sx={{ fontSize: 40, marginTop: 3 }}>
            {
              (emailConfirmationError?.response?.data as { message: string })
                ?.message
            }
          </Typography>
          <Link href={pageRoutes.root()}>
            <DefaultButton
              style={{ marginTop: '40px' }}
              name="Go Back to main page"
            />
          </Link>
        </Box>
      )}
    </>
  );
};

export default EmailConfirmation;
