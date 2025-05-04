import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../../components/RegionFilter';
import { vi } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Utility to wrap with MUI theme (since you're using `useTheme`)
const renderWithTheme = (ui) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('RegionFilter Component', () => {
  it('renders the region select dropdown with label', () => {
    renderWithTheme(
      <RegionFilter selectedRegion="All" onRegionChange={() => {}} />
    );
    expect(screen.getByLabelText(/filter by region/i)).toBeInTheDocument();
  });

  it('displays the selected region', () => {
    renderWithTheme(
      <RegionFilter selectedRegion="Asia" onRegionChange={() => {}} />
    );
    expect(screen.getByText(/Asia/i)).toBeInTheDocument();
  });

  it('opens the dropdown and displays all regions', () => {
    renderWithTheme(
      <RegionFilter selectedRegion="All" onRegionChange={() => {}} />
    );

    const select = screen.getByLabelText(/filter by region/i);
    fireEvent.mouseDown(select); // open dropdown

    const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
    regions.forEach((region) => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });

  it('calls onRegionChange when a region is selected', () => {
    const mockOnRegionChange = vi.fn();
    renderWithTheme(
      <RegionFilter selectedRegion="All" onRegionChange={mockOnRegionChange} />
    );

    const select = screen.getByLabelText(/filter by region/i);
    fireEvent.mouseDown(select);
    const asiaOption = screen.getByText('Asia');
    fireEvent.click(asiaOption);

    expect(mockOnRegionChange).toHaveBeenCalledWith('Asia');
  });
});
