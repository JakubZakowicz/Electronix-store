import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import ResultMessage from '.';
import { pageRoutes } from '@/src/routes/pageRoutes';

describe('ResultMessage', () => {
  const theme = createTheme();

  it('Renders the success message correctly', () => {
    const successMessage = 'Success message';

    render(
      <ThemeProvider theme={theme}>
        <ResultMessage message={successMessage} />
      </ThemeProvider>
    );

    const messageText = screen.getByText(successMessage);
    const checkCircleIcon = screen.getByTestId('CheckCircleIcon');
    const backButton = screen.getByRole('link');

    expect(messageText).toBeInTheDocument();
    expect(checkCircleIcon).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', pageRoutes.root());
    expect(backButton).toContainElement(screen.getByText('Go Back to main page'));
  });

  it('Renders the error message correctly', () => {
    const errorMessage = 'Error message';

    render(
      <ThemeProvider theme={theme}>
        <ResultMessage message={errorMessage} isSuccess={false} />
      </ThemeProvider>
    );

    const messageText = screen.getByText(errorMessage);
    const cancelIcon = screen.getByTestId('CancelIcon');
    const backButton = screen.getByRole('link');

    expect(messageText).toBeInTheDocument();
    expect(cancelIcon).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', pageRoutes.root());
    expect(backButton).toContainElement(screen.getByText('Go Back to main page'));
  });
});