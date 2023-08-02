import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '.';

describe('Navbar', () => {
  it('Renders Navbar correctly', () => {
    const text = 'PageContent';
    render(
      <Navbar>
        <p>{text}</p>
      </Navbar>
    );
    const textElement = screen.getByText(text);
    expect(textElement).toBeInTheDocument();
  });
});
