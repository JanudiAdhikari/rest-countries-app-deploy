import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import LanguageFilter from '../../components/LanguageFilter';
import RegionFilter from '../../components/RegionFilter';
import { describe, it, expect } from 'vitest';

const FilterIntegrationWrapper = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const availableLanguages = ['English', 'French', 'Spanish'];

  return (
    <div>
      <RegionFilter selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
      <LanguageFilter
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        availableLanguages={availableLanguages}
      />
      <div data-testid="summary">
        Selected: {selectedRegion} - {selectedLanguage}
      </div>
    </div>
  );
};

describe('Integration: Language and Region Filters', () => {
  it('renders both filters and allows selections to update state correctly', () => {
    render(<FilterIntegrationWrapper />);

    // Check both filter labels
    expect(screen.getByLabelText(/filter by region/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by language/i)).toBeInTheDocument();

    // Interact with region filter
    fireEvent.mouseDown(screen.getByLabelText(/filter by region/i));
    fireEvent.click(screen.getByText('Asia'));

    // Interact with language filter
    fireEvent.mouseDown(screen.getByLabelText(/filter by language/i));
    fireEvent.click(screen.getByText('French'));

    // Expect the summary to reflect the changes
    expect(screen.getByTestId('summary')).toHaveTextContent('Selected: Asia - French');
  });

  it('shows "All" selections correctly in the summary', () => {
    render(<FilterIntegrationWrapper />);

    expect(screen.getByTestId('summary')).toHaveTextContent('Selected: All - All');
  });
});
