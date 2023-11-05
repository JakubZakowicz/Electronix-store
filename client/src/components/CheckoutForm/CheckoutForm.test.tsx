import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckoutForm from '.';
import ReactQueryWrapper from '../ReactQueryWrapper';

describe('CheckoutForm', () => {
  it('Renders CheckoutForm correctly', () => {
    render(
      <ReactQueryWrapper>
        <CheckoutForm />
      </ReactQueryWrapper>
    );
    const text = screen.getByLabelText(/first name/i);
    expect(text).toBeInTheDocument();
  });
});
