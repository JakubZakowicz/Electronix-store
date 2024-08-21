import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { pageRoutes } from '@/src/routes/pageRoutes';
import DefaultButton from '../DefaultButton';

interface ResultMessageProps {
  message: string;
}

const ResultMessage = ({ message }: ResultMessageProps) => {
  return (
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
      <Typography variant="h2" sx={{ fontSize: 40, marginTop: 3 }}>
        {message}
      </Typography>
      <Link href={pageRoutes.root()}>
        <DefaultButton
          style={{ marginTop: '40px' }}
          name="Go Back to main page"
        />
      </Link>
    </Box>
  );
};

export default ResultMessage;
