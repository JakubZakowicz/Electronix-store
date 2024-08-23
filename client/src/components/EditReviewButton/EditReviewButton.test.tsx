import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import EditReviewButton from '.';
import { useRouter } from 'next/navigation';
import {
  useGetReview,
  useGetReviews,
  useUpdateReview,
} from '../../api/reviews';
import { toast } from 'react-toastify';
import { useGetMe } from '../../api/auth';

// Mock the required hooks and modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('../../api/reviews', () => ({
  useGetReview: jest.fn(),
  useGetReviews: jest.fn(),
  useUpdateReview: jest.fn(),
}));

jest.mock('../../api/auth', () => ({
  useGetMe: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('EditReviewButton', () => {
  const theme = createTheme();
  const mockReviewId = '123';
  const mockProductId = '456';
  const mockReview = {
    id: mockReviewId,
    title: 'Updated Title',
    content: 'Updated content',
    rating: 3,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (useGetMe as jest.Mock).mockReturnValue({
      data: { id: '1' },
      isError: false,
    });
    (useGetReview as jest.Mock).mockReturnValue({ data: mockReview });
    (useGetReviews as jest.Mock).mockReturnValue({ refetch: jest.fn() });
    (useUpdateReview as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
    });
  });

  it('Renders the Edit button correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <EditReviewButton reviewId={mockReviewId} productId={mockProductId} />
      </ThemeProvider>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });

  it('Opens the modal when Edit button is clicked', async () => {
    render(
      <ThemeProvider theme={theme}>
        <EditReviewButton reviewId={mockReviewId} productId={mockProductId} />
      </ThemeProvider>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText('Update Review')).toBeInTheDocument();
    });
  });

  it('Redirects to sign in page if user is not authenticated', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useGetMe as jest.Mock).mockReturnValue({ data: null, isError: false });

    render(
      <ThemeProvider theme={theme}>
        <EditReviewButton reviewId={mockReviewId} productId={mockProductId} />
      </ThemeProvider>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockPush).toHaveBeenCalledWith('/sign-in');
  });
});
