'use client';

import InputField from '@/components/InputField';
import {
  Box,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const page = () => {
  return (
    <Box>
      <Typography variant="h1" fontSize="25px">
        User Information
      </Typography>
      <Grid container marginTop="20px" rowSpacing={5}>
        <Grid item xl={6}>
          <Typography>First Name</Typography>
          <TextField
            hiddenLabel
            variant="standard"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '5px 15px',
              border: '1px solid white',
              '& input': {
                color: 'white',
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xl={6}>
          <Typography>First Name</Typography>
          <TextField
            hiddenLabel
            variant="standard"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '5px 15px',
              border: '1px solid white',
              '& input': {
                color: 'white',
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xl={6}>
          <InputField />
          <Typography>First Name</Typography>
          <TextField
            hiddenLabel
            variant="standard"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '5px 15px',
              border: '1px solid white',
              '& input': {
                color: 'white',
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xl={6} marginTop="20px">
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { color: 'white' }, //styles the label
              '& .MuiOutlinedInput-root': {
                '& > fieldset': { borderColor: 'white' },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default page;
