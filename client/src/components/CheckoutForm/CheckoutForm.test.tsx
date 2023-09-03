import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckoutForm from '.';

describe('CheckoutForm', () => {
  it('Renders CheckoutForm correctly', () => {
    render(<CheckoutForm />);
    const text = screen.getByLabelText(/first name/i);
    expect(text).toBeInTheDocument();
  });
});
