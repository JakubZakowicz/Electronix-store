import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortInput from '.';

const mockedUseRouter = jest.fn();
const mockedUsePathname = jest.fn();
const mockedUseSearchParams = { page: 1 };

jest.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouter(),
  usePathname: () => mockedUsePathname(),
  useSearchParams: () => mockedUseSearchParams,
}));

describe('SortInput', () => {
  it('Renders SortInput correctly', () => {
    render(<SortInput />);
    const textElement = screen.getAllByText('Sort by');
    expect(textElement[0]).toBeInTheDocument();
  });
});
