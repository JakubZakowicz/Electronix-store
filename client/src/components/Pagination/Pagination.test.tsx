import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '.';

describe('Pagination', () => {
  const mockHandleChange = jest.fn();

  it('renders correctly with default props', () => {
    render(
      <Pagination page={1} pageCount={10} handleChange={mockHandleChange} />
    );

    const paginationRoot = screen.getByTestId('pagination-root');
    expect(paginationRoot).toBeInTheDocument();
  });

  it('renders correctly with custom props', () => {
    render(
      <Pagination page={3} pageCount={15} handleChange={mockHandleChange} />
    );

    const paginationRoot = screen.getByTestId('pagination-root');
    expect(paginationRoot).toBeInTheDocument();
  });
});
