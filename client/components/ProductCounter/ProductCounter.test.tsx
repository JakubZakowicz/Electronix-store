import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCounter from '.';

describe('ProductCounter', () => {
  it('Renders ProductCounter correctly', () => {
    render(
      <ProductCounter />
      
    );
    const textElement = screen.getByText(/add to cart/i);
    expect(textElement).toBeInTheDocument();
  });
});