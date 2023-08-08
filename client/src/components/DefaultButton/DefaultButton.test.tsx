import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DefaultButton from '.';

describe('DefaultButton', () => {
  it('Renders Footer correctly', () => {
    const buttonName = 'Button Name';
    render(<DefaultButton name={buttonName} />);
    const text = screen.getByText(buttonName);
    expect(text).toBeInTheDocument();
  });
});
