import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteCartProduct from '.';
import ReactQueryWrapper from '../ReactQueryWrapper';

describe('DeleteCartProduct', () => {
  it('Renders DeleteCartProduct correctly', () => {
    render(
      <ReactQueryWrapper>
        <DeleteCartProduct productId="id123" />
      </ReactQueryWrapper>
    );
    const element = screen.getByTestId('delete-cart-product');
    expect(element).toBeInTheDocument();
  });
});
