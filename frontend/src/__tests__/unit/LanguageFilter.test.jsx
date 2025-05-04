import { render, screen, fireEvent } from '@testing-library/react';
import LanguageFilter from '../../components/LanguageFilter';

describe('LanguageFilter Component', () => {
  const mockOnLanguageChange = vi.fn();

  it('renders the LanguageFilter component correctly', () => {
    render(
      <LanguageFilter
        selectedLanguage="All"
        onLanguageChange={mockOnLanguageChange}
        availableLanguages={['English', 'Spanish', 'French']}
      />
    );

    expect(screen.getByText(/filter by language/i)).toBeInTheDocument();
    expect(screen.getByText(/all languages/i)).toBeInTheDocument();
  });

  it('renders available languages in the dropdown menu', () => {
    render(
      <LanguageFilter
        selectedLanguage="All"
        onLanguageChange={mockOnLanguageChange}
        availableLanguages={['English', 'Spanish', 'French']}
      />
    );

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
  });

  it('calls onLanguageChange when a language is selected', () => {
    render(
      <LanguageFilter
        selectedLanguage="All"
        onLanguageChange={mockOnLanguageChange}
        availableLanguages={['English', 'Spanish', 'French']}
      />
    );

    fireEvent.change(screen.getByLabelText(/filter by language/i), {
      target: { value: 'Spanish' },
    });

    expect(mockOnLanguageChange).toHaveBeenCalledWith('Spanish');
  });

  it('displays the selected language correctly in the chip', () => {
    render(
      <LanguageFilter
        selectedLanguage="Spanish"
        onLanguageChange={mockOnLanguageChange}
        availableLanguages={['English', 'Spanish', 'French']}
      />
    );

    expect(screen.getByText('Spanish')).toBeInTheDocument();
  });

  it('displays "All Languages" when "All" is selected', () => {
    render(
      <LanguageFilter
        selectedLanguage="All"
        onLanguageChange={mockOnLanguageChange}
        availableLanguages={['English', 'Spanish', 'French']}
      />
    );

    expect(screen.getByText('All Languages')).toBeInTheDocument();
  });

  it('opens and closes the dropdown when clicked', () => {
    render(
      <LanguageFilter
        selectedLanguage="All"
        onLanguageChange={mockOnLanguageChange}
        availableLanguages={['English', 'Spanish', 'French']}
      />
    );

    const dropdown = screen.getByLabelText(/filter by language/i);
    fireEvent.mouseDown(dropdown); // Open dropdown
    expect(screen.getByText('English')).toBeInTheDocument();

    fireEvent.mouseDown(dropdown); // Close dropdown
    expect(screen.queryByText('English')).not.toBeInTheDocument();
  });
});
