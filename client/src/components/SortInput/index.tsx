import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

const SortInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const sortParameters = [
    {
      label: 'Relevance: highest',
      value: 'created_at:desc',
    },
    {
      label: 'Relevance: lowest',
      value: 'created_at:asc',
    },
    {
      label: 'Price: low to high',
      value: 'price:asc',
    },
    {
      label: 'Price: high to low',
      value: 'price:desc',
    },
    {
      label: 'Rating: highest',
      value: 'rating:desc',
    },
    {
      label: 'Rating: lowest',
      value: 'rating:asc',
    },
  ];

  const handleChange = (event: SelectChangeEvent<string>) => {
    params.set('sort', event.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FormControl
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
        '& input, & textarea': {
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        '& textarea': {
          padding: '10px',
          margin: '-15px -10px',
        },
        '& .MuiFormHelperText-root': {
          color: 'red',
          position: 'absolute',
          top: '60px',
          left: '-10px',
        },
        width: 200,
        zIndex: 10
      }}
    >
      <InputLabel id="sorting-select-label">Sort by</InputLabel>
      <Select
        labelId="sorting-select-label"
        id="sorting-select"
        value={params.get('sort') || undefined}
        label="Sort by"
        onChange={handleChange}
      >
        {sortParameters.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortInput;
