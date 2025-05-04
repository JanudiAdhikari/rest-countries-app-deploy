import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar Component', () => {
  it('renders the search input field', () => {
    render(<SearchBar searchQuery="" onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', () => {
    const mockOnSearchChange = vi.fn();
    render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);
    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(input, { target: { value: 'India' } });
    expect(mockOnSearchChange).toHaveBeenCalledWith('India');
  });

  it('shows and clears the input when clear button is clicked', () => {
    const mockOnSearchChange = vi.fn();
    render(<SearchBar searchQuery="France" onSearchChange={mockOnSearchChange} />);
    const clearButton = screen.getByLabelText(/clear search/i);
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(mockOnSearchChange).toHaveBeenCalledWith('');
  });
});
