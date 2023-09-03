import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '.';
import ReactQueryWrapper from '../ReactQueryWrapper';

describe('Navbar', () => {
  it('Renders Navbar correctly', () => {
    const text = 'PageContent';
    render(
      <ReactQueryWrapper>
        <Navbar>
          <p>{text}</p>
        </Navbar>
      </ReactQueryWrapper>
    );
    const textElement = screen.getByText(text);
    expect(textElement).toBeInTheDocument();
  });
});
