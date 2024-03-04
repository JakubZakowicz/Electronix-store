import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from '.';

const mockedUseRouter = jest.fn();
const mockedUsePathname = jest.fn();
const mockedUseSearchParams = { page: 1 };

jest.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouter(),
  usePathname: () => mockedUsePathname(),
  useSearchParams: () => mockedUseSearchParams,
}));

describe('Products', () => {
  it('Renders Products correctly', () => {
    const text = 'Virtual Reality';
    render(<Products name={text} />);
    const textElement = screen.getByText(text);
    expect(textElement).toBeInTheDocument();
  });
});
