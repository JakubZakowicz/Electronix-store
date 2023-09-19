import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '.';
import ReactQueryWrapper from '../ReactQueryWrapper';

describe('SearchBar', () => {
  it('Renders SearchBar correctly', () => {
    render(
      <ReactQueryWrapper>
        <SearchBar />
      </ReactQueryWrapper>
    );
    const textElement = screen.getByPlaceholderText('Search...');
    expect(textElement).toBeInTheDocument();
  });
});
