import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../../components/RegionFilter';

describe('RegionFilter Component', () => {
  const mockOnRegionChange = vi.fn();

  beforeEach(() => {
    mockOnRegionChange.mockClear();
  });

  it('renders the region dropdown with label', () => {
    render(<RegionFilter selectedRegion="All Region" onRegionChange={mockOnRegionChange} />);
    expect(screen.getByLabelText(/filter by region/i)).toBeInTheDocument();
  });

  it('displays all region options', () => {
    render(<RegionFilter selectedRegion="All Region" onRegionChange={mockOnRegionChange} />);
    // Open the dropdown
    fireEvent.mouseDown(screen.getByLabelText(/filter by region/i));

    // Check each region is listed
    ["All Region", "Africa", "Americas", "Asia", "Europe", "Oceania"].forEach((region) => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });

  it('calls onRegionChange when a region is selected', () => {
    render(<RegionFilter selectedRegion="All Region" onRegionChange={mockOnRegionChange} />);
    fireEvent.mouseDown(screen.getByLabelText(/filter by region/i));
    fireEvent.click(screen.getByText('Asia'));

    expect(mockOnRegionChange).toHaveBeenCalledWith('Asia');
  });

  it('shows selected region as chip (except All)', () => {
    const { rerender } = render(
      <RegionFilter selectedRegion="Asia" onRegionChange={mockOnRegionChange} />
    );

    expect(screen.getByText('Asia')).toBeInTheDocument();

    rerender(<RegionFilter selectedRegion="All" onRegionChange={mockOnRegionChange} />);
    expect(screen.getByText('All Regions')).toBeInTheDocument();
  });
});
