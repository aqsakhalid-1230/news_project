import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSelector from '../components/ThemeSelector';

describe('ThemeSelector Component', () => {
  it('renders accurately with Light Mode by default', () => {
    render(<ThemeSelector darkMode={false} setDarkMode={() => {}} />);
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders accurately with Dark Mode', () => {
    render(<ThemeSelector darkMode={true} setDarkMode={() => {}} />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles accurately when theme switch is clicked', () => {
    const setDarkModeMock = jest.fn();
    render(<ThemeSelector darkMode={false} setDarkMode={setDarkModeMock} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(setDarkModeMock).toHaveBeenCalledWith(true);
  });
});
