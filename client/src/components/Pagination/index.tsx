import React from 'react';
import { Pagination as PaginationComponent } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  pageCount: number;
}

const Pagination = ({ pageCount }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const page = Number(params.get('page')) || 1;

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    params.set('page', value.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <PaginationComponent
      page={page}
      count={pageCount || 1}
      onChange={handleChange}
      variant="outlined"
      size="large"
      data-testid="pagination-root"
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
