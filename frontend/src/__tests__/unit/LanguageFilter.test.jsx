import { render, screen, fireEvent } from '@testing-library/react';
import LanguageFilter from '../../components/LanguageFilter';
import { vi } from 'vitest';

describe('LanguageFilter Component', () => {
  const mockLanguages = ['English', 'French', 'Spanish'];
  const mockOnLanguageChange = vi.fn();

  const renderComponent = (selected = 'All') =>
    render(
      <LanguageFilter
        selectedLanguage={selected}
        onLanguageChange={mockOnLanguageChange}
        availableLanguages={mockLanguages}
      />
    );

  it('renders the language dropdown', () => {
    renderComponent();
    expect(screen.getByLabelText(/filter by language/i)).toBeInTheDocument();
  });

  it('displays all language options in the dropdown', () => {
    renderComponent();
    fireEvent.mouseDown(screen.getByLabelText(/filter by language/i));
    mockLanguages.forEach((lang) => {
      expect(screen.getByText(lang)).toBeInTheDocument();
    });
  });

  it('displays a chip when a language is selected', () => {
    renderComponent('French');
    expect(screen.getByText('French')).toBeInTheDocument();
  });

  it('calls onLanguageChange when a new language is selected', () => {
    renderComponent();
    fireEvent.mouseDown(screen.getByLabelText(/filter by language/i));
    fireEvent.click(screen.getByText('Spanish'));
    expect(mockOnLanguageChange).toHaveBeenCalledWith('Spanish');
  });

  it('displays "All Languages" when "All" is selected', () => {
    renderComponent('All');
    expect(screen.getByText(/all languages/i)).toBeInTheDocument();
  });
});
