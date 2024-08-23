'use client';

import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import Loader from '../Loader';

interface DefaultButtonProps extends ButtonProps {
  name?: string;
  isLoading?: boolean;
}

const DefaultButton = ({
  name = 'Button',
  isLoading = false,
  ...props
}: DefaultButtonProps) => {
  return (
    <Button
      disabled={isLoading}
      sx={{
        color: 'white',
        padding: '6px 50px',
        border: '1px solid white',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '0',
        fontSize: '18px',
        textTransform: 'capitalize',
        ...props.style,
      }}
      {...props}
    >
      {isLoading && (
        <Loader
          size={30}
          style={{ position: 'absolute', left: '10px', display: 'block' }}
        />
      )}
      {name}
    </Button>
  );
};

export default DefaultButton;
