import React from 'react';
import { Pagination as PaginationComponent } from '@mui/material';

interface PaginationProps {
  page: number;
  pageCount: number;
  handleChange: (_event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination = ({ page, pageCount, handleChange }: PaginationProps) => {
  return (
    <PaginationComponent
      page={page}
      count={pageCount || 1}
      onChange={handleChange}
      variant="outlined"
      size="large"
      sx={{
        '& .MuiPaginationItem-root': {
          color: 'white',
          border: 'none',
        },
        '& .Mui-selected': { background: 'rgba(255, 255, 255, 0.1)' },
      }}
    />
  );
};

export default Pagination;
