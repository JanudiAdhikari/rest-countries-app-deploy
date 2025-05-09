import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';
import RegionFilter from '../../components/RegionFilter';
import LanguageFilter from '../../components/LanguageFilter';
import { vi } from 'vitest';

const CombinedComponent = ({
  searchQuery,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedLanguage,
  onLanguageChange,
  availableLanguages,
}) => (
  <div>
    <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
    <RegionFilter selectedRegion={selectedRegion} onRegionChange={onRegionChange} />
    <LanguageFilter
      selectedLanguage={selectedLanguage}
      onLanguageChange={onLanguageChange}
      availableLanguages={availableLanguages}
    />
  </div>
);

describe('Integration Test: SearchBar, RegionFilter, and LanguageFilter', () => {
  let mockSearchChange, mockRegionChange, mockLanguageChange;

  beforeEach(() => {
    mockSearchChange = vi.fn();
    mockRegionChange = vi.fn();
    mockLanguageChange = vi.fn();

    render(
      <CombinedComponent
        searchQuery=""
        onSearchChange={mockSearchChange}
        selectedRegion="All"
        onRegionChange={mockRegionChange}
        selectedLanguage="All"
        onLanguageChange={mockLanguageChange}
        availableLanguages={['English', 'Spanish', 'French']}
      />
    );
  });

  it('should render all three components', () => {
    expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by region/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by language/i)).toBeInTheDocument();
  });

  it('should trigger onSearchChange when typing in search bar', () => {
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: 'Japan' } });
    expect(mockSearchChange).toHaveBeenCalledWith('Japan');
  });

  it('should trigger onRegionChange when selecting a region', () => {
    const regionSelect = screen.getByLabelText(/filter by region/i);
    fireEvent.mouseDown(regionSelect); // open dropdown
    const option = screen.getByText('Asia');
    fireEvent.click(option);
    expect(mockRegionChange).toHaveBeenCalledWith('Asia');
  });

  it('should trigger onLanguageChange when selecting a language', () => {
    const languageSelect = screen.getByLabelText(/filter by language/i);
    fireEvent.mouseDown(languageSelect); // open dropdown
    const option = screen.getByText('French');
    fireEvent.click(option);
    expect(mockLanguageChange).toHaveBeenCalledWith('French');
  });
});
