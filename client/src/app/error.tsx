'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '150px' }}>
      <Typography variant="h2" sx={{ fontSize: 40, fontWeight: 'bold' }}>
        {error.name}
      </Typography>
      <Typography variant="h3" sx={{ fontSize: 30, marginTop: 7 }}>
        {error.message}
      </Typography>
    </Box>
  );
};

export default Error;
