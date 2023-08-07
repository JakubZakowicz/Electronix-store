'use client';

import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface DefaultButtonProps extends ButtonProps {
  name?: string;
}

const DefaultButton = ({ name = 'Button', ...props }: DefaultButtonProps) => {
  return (
    <Button
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
      {name}
    </Button>
  );
};

export default DefaultButton;
