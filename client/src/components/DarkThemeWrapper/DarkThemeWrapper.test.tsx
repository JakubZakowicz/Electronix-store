import React from 'react';
import { render, screen } from '@testing-library/react';
import DarkThemeWrapper from '.';

describe('DarkThemeWrapper', () => {
  it('renders children within ThemeProvider', () => {
    render(
      <DarkThemeWrapper>
        <div data-testid="child-component">Child Component</div>
      </DarkThemeWrapper>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });
});