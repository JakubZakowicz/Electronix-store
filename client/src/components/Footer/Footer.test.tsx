import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '.';

describe('Footer', () => {
  it('Renders Footer correctly', () => {
    render(<Footer />);
    const text = screen.getByText(/contact us/i);
    expect(text).toBeInTheDocument();
  });
});
