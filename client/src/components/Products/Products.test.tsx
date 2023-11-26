import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from '.';

const mockedUseRouter = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => mockedUseRouter(),
}));

describe('Products', () => {
  it('Renders Products correctly', () => {
    const text = 'Virtual Reality';
    render(<Products name={text} />);
    const textElement = screen.getByText(text);
    expect(textElement).toBeInTheDocument();
  });
});
