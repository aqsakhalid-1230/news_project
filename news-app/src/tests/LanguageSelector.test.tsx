import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSelector from '../components/LanguageSelector';

describe('LanguageSelector Component', () => {
  it('renders with the default language accurately', () => {
    render(<LanguageSelector language="en" setLanguage={() => {}} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('🇬🇧 English')).toBeInTheDocument();
  });

  it('triggers a new language call to setLanguage by selecting a different choice', () => {
    const setLanguageMock = jest.fn();
    render(<LanguageSelector language="en" setLanguage={setLanguageMock} />);

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('🇦🇪 العربية'));

    expect(setLanguageMock).toHaveBeenCalledWith('ar');
  });
});
