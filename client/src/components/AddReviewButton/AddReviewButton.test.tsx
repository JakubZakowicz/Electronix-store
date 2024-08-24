import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import AddReviewButton from './';
import { useRouter } from 'next/navigation';
import { useGetMe } from '@/src/api/auth';
import { useAddReview, useGetReviews } from '@/src/api/reviews';
import { toast } from 'react-toastify';

// Mock the required hooks and modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('../../api/auth', () => ({
  useGetMe: jest.fn(),
}));
jest.mock('../../api/reviews', () => ({
  useAddReview: jest.fn(),
  useGetReviews: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('AddReviewButton', () => {
  const theme = createTheme();
  const mockProductId = '123';
  const mockUser = { userId: '1' };
  const mockAddReview = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (useGetMe as jest.Mock).mockReturnValue({ data: mockUser });
    (useAddReview as jest.Mock).mockReturnValue({
      mutate: mockAddReview,
      isLoading: false,
      isError: false,
      error: null,
    });
    (useGetReviews as jest.Mock).mockReturnValue({ refetch: mockRefetch });
  });

  it('Renders the Add Review button correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <AddReviewButton productId={mockProductId} />
      </ThemeProvider>
    );

    const addButton = screen.getByRole('button', { name: /write a review/i });
    expect(addButton).toBeInTheDocument();
  });

  it('Opens the modal when Add Review button is clicked', async () => {
    render(
      <ThemeProvider theme={theme}>
        <AddReviewButton productId={mockProductId} />
      </ThemeProvider>
    );

    const addButton = screen.getByRole('button', { name: /write a review/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Review form')).toBeInTheDocument();
    });
  });

  it('Redirects to sign in page if user is not authenticated', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useGetMe as jest.Mock).mockReturnValue({ data: null });

    render(
      <ThemeProvider theme={theme}>
        <AddReviewButton productId={mockProductId} />
      </ThemeProvider>
    );

    const addButton = screen.getByRole('button', { name: /write a review/i });
    fireEvent.click(addButton);

    expect(mockPush).toHaveBeenCalledWith('/sign-in');
  });

  it('Throws an error if adding review fails', async () => {
    (useAddReview as jest.Mock).mockReturnValue({
      mutate: mockAddReview,
      isLoading: false,
      isError: true,
      error: { message: 'Failed to add review' },
    });

    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <AddReviewButton productId={mockProductId} />
        </ThemeProvider>
      );
    }).toThrow('Failed to add review');
  });
});
