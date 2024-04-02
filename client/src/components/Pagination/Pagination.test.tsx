import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '.';

const mockedUseRouter = jest.fn();
const mockedUsePathname = jest.fn();
const mockedUseSearchParams = { page: 1 };

jest.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouter(),
  usePathname: () => mockedUsePathname(),
  useSearchParams: () => mockedUseSearchParams,
}));

describe('Pagination', () => {
  it('renders correctly with default props', () => {
    render(
      <Pagination pageCount={10} />
    );

    const paginationRoot = screen.getByTestId('pagination-root');
    expect(paginationRoot).toBeInTheDocument();
  });

  it('renders correctly with custom props', () => {
    render(
      <Pagination pageCount={15} />
    );

    const paginationRoot = screen.getByTestId('pagination-root');
    expect(paginationRoot).toBeInTheDocument();
  });
});
