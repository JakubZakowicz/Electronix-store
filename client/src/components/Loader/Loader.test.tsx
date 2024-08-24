import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from './';

describe('Loader', () => {
  it('renders the loader', () => {
    render(<Loader />);

    const loader = screen.getByLabelText('tail-spin-loading');

    expect(loader).toBeInTheDocument();
  });

  it('applies custom styles to the loader container', () => {
    const customStyle = { marginTop: '20px' };
    const { container } = render(<Loader style={customStyle} />);

    const loaderContainer = container.firstChild;

    expect(loaderContainer).toHaveStyle({ marginTop: '20px' });
    expect(loaderContainer).toHaveStyle({ display: 'flex' });
    expect(loaderContainer).toHaveStyle({ justifyContent: 'center' });
  });
});
