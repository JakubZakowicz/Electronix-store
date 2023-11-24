import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from '.';

describe('InputField', () => {
  it('Renders InputField correctly', () => {
    const labelText = 'First Name';
    render(<InputField label={labelText} />);
    const text = screen.getByLabelText(labelText);
    expect(text).toBeInTheDocument();
  });
});
