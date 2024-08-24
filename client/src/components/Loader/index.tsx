import React from 'react';
import { Box } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';

interface LoaderProps {
  size?: number;
  style?: object;
}

const Loader = ({ size = 200, style }: LoaderProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        ...style
      }}
    >
      <TailSpin
        visible={true}
        height={size}
        width={size}
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </Box>
  );
};

export default Loader;
