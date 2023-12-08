import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders correctly', () => {
    render(<LoadingSpinner />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveClass('MuiCircularProgress-root');
  });

  it('renders the loader in the center of the page', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveStyle('display: flex');
    expect(spinner).toHaveStyle('justifyContent: center');
    expect(spinner).toHaveStyle('alignItems: center');
    expect(spinner).toHaveStyle('minHeight: 100vh');
  });
});
