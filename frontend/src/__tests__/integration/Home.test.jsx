import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import '@testing-library/vi-dom'; // for the "toBeInTheDocument" matcher
import { getAllCountries } from '../../services/api';

// Mock API functions
vi.mock('../services/api', () => ({
  getAllCountries: vi.fn(),
  getCountriesByRegion: vi.fn(),
}));

describe('Home Component', () => {
  const countriesMock = [
    { name: 'India', region: 'Asia', languages: { hindi: 'Hindi', english: 'English' }, population: 1393409038, capital: 'New Delhi', flag: '🇮🇳' },
    { name: 'Spain', region: 'Europe', languages: { spanish: 'Spanish' }, population: 46719142, capital: 'Madrid', flag: '🇪🇸' },
  ];

  beforeEach(() => {
    getAllCountries.mockResolvedValue(countriesMock);
    render(<Home />);
  });

  it('fetches and displays country data', async () => {
    await waitFor(() => screen.getByText(/India/i)); // wait until the data is loaded
    expect(screen.getByText(/India/i)).toBeInTheDocument();
    expect(screen.getByText(/Spain/i)).toBeInTheDocument();
  });

  it('filters countries by region', async () => {
    fireEvent.change(screen.getByLabelText(/Filter by Region/i), { target: { value: 'Asia' } });
    await waitFor(() => screen.getByText(/India/i));
    expect(screen.queryByText(/Spain/i)).not.toBeInTheDocument();
  });

  it('filters countries by language', async () => {
    fireEvent.change(screen.getByLabelText(/Filter by Language/i), { target: { value: 'Spanish' } });
    await waitFor(() => screen.getByText(/Spain/i));
    expect(screen.queryByText(/India/i)).not.toBeInTheDocument();
  });

  it('searches for countries', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Search for a country.../i), { target: { value: 'India' } });
    await waitFor(() => screen.getByText(/India/i));
    expect(screen.queryByText(/Spain/i)).not.toBeInTheDocument();
  });
});
