import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartProductCounter from '.';
import ReactQueryWrapper from '../ReactQueryWrapper';

describe('CartProductCounter', () => {
  it('Renders CartProductCounter correctly', () => {
    render(
      <ReactQueryWrapper>
        <CartProductCounter productId="id123" />
      </ReactQueryWrapper>
    );
    const element = screen.getByTestId('RemoveIcon');
    expect(element).toBeInTheDocument();
  });
});
