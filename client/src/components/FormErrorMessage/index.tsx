import React from 'react';
import { Typography } from '@mui/material';

interface FormErrorMessageProps {
  message: string;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  return ( 
    <Typography sx={{ color: 'red', textAlign: 'center', marginBottom: 2 }}>
      {message}
    </Typography>
  );
};

export default FormErrorMessage;
