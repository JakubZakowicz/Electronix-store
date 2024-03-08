import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactQueryWrapper from '.';

jest.mock('@tanstack/react-query', () => ({
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-query-client-provider">{children}</div>
  ),
  QueryClient: jest.fn(),
}));

describe('ReactQueryWrapper', () => {
  it('renders children within QueryClientProvider', () => {
    render(
      <ReactQueryWrapper>
        <div data-testid="child-component">Child Component</div>
      </ReactQueryWrapper>
    );

    expect(screen.getByTestId('mock-query-client-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });
});