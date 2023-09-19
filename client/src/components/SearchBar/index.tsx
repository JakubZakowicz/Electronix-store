import React from 'react';
import { Autocomplete, Box, Paper, PaperProps, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { pageRoutes } from '@/src/routes/pageRoutes';
import Link from 'next/link';
import Image from 'next/image';
import VRHeadset from '../../images/HP_Reverb.png';
import { useGetProducts } from '@/src/api/products';

const CustomPaper = ({ children }: PaperProps) => {
  return (
    <Paper
      sx={{
        '& .MuiAutocomplete-listbox': {
          bgcolor: 'rgba(0, 0, 0, 0.85)',
          color: 'white',
          "& .MuiAutocomplete-option[aria-selected='true']": {
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            '&.Mui-focused': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
        '& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused': {
          bgcolor: 'rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      {children}
    </Paper>
  );
};

const SearchBar = () => {
  const { data } = useGetProducts();
  const products = data?.map((product) => ({
    name: product.name,
    link: pageRoutes.products(product.id),
  }));

  return (
    <Autocomplete
      freeSolo
      options={products ? products.map((option) => option) : []}
      PaperComponent={CustomPaper}
      getOptionLabel={(option) =>
        typeof option === 'string' ? '' : option.name
      }
      renderOption={(props, option) => (
        <li {...props}>
          <Link
            href={option.link}
            style={{ color: 'white', textDecoration: 'none', width: '100%' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src={VRHeadset}
                alt="Apple vision"
                height={50}
                width={50}
              />
              <Box>{option.name}</Box>
            </Box>
          </Link>
        </li>
      )}
      renderInput={({
        InputProps: { startAdornment, ...InputProps },
        ...params
      }) => (
        <Box width="700px">
          <TextField
            hiddenLabel
            variant="standard"
            placeholder="Search..."
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '3px 15px',
              borderRadius: '20px',
              '& input': {
                color: 'white',
              },
            }}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <SearchIcon
                  sx={{
                    color: '#808080',
                    marginRight: '5px',
                    marginBottom: '2px',
                  }}
                />
              ),
              ...InputProps,
            }}
            {...params}
          />
        </Box>
      )}
    />
  );
};

export default SearchBar;
