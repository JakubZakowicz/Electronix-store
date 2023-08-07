import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const InputField = ({ ...props }: TextFieldProps) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      fullWidth
      sx={{
        '& .MuiInputLabel-root': { color: 'white' },
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            borderColor: 'white',
            color: 'white',
          },
        '& input': {
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        '& .MuiFormHelperText-root': {
          color: 'red',
          position: 'absolute',
          top: '60px',
          left: '-10px',
        },
        ...props.style
      }}
      {...props}
    />
  );
};

export default InputField;
