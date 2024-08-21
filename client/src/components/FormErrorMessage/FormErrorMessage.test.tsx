import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormErrorMessage from '.';

describe('FormErrorMessage', () => {
  it('Renders the error message correctly', () => {
    const errorMessage = 'This is an error message';
    render(<FormErrorMessage message={errorMessage} />);

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
  });
});
