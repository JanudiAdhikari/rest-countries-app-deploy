import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';
import RegionFilter from '../../components/RegionFilter';
import { vi } from 'vitest';

const CombinedComponent = ({ searchQuery, onSearchChange, selectedRegion, onRegionChange }) => {
  return (
    <div>
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <RegionFilter selectedRegion={selectedRegion} onRegionChange={onRegionChange} />
    </div>
  );
};

describe('Integration Test: SearchBar and RegionFilter', () => {
  let mockSearchChange;
  let mockRegionChange;

  beforeEach(() => {
    mockSearchChange = vi.fn();
    mockRegionChange = vi.fn();
    render(
      <CombinedComponent
        searchQuery=""
        onSearchChange={mockSearchChange}
        selectedRegion="All"
        onRegionChange={mockRegionChange}
      />
    );
  });

  it('renders both SearchBar and RegionFilter components', () => {
    expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by region/i)).toBeInTheDocument();
  });

  it('calls onSearchChange when typing in the search input', () => {
    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(input, { target: { value: 'Japan' } });
    expect(mockSearchChange).toHaveBeenCalledWith('Japan');
  });

  it('calls onSearchChange when the clear icon is clicked', () => {
    render(
      <SearchBar searchQuery="India" onSearchChange={mockSearchChange} />
    );
    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);
    expect(mockSearchChange).toHaveBeenCalledWith('');
  });

  it('calls onRegionChange when selecting a different region', () => {
    const regionSelect = screen.getByLabelText(/filter by region/i);
    fireEvent.mouseDown(regionSelect);
    const asiaOption = screen.getByText('Asia');
    fireEvent.click(asiaOption);
    expect(mockRegionChange).toHaveBeenCalledWith('Asia');
  });
});
