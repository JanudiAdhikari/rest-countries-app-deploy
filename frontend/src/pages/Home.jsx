import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  Divider,
  Alert,
  Fade,
} from "@mui/material";
import { getAllCountries, getCountriesByRegion } from "../services/api";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import LanguageFilter from "../components/LanguageFilter";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);

  // Fetch all countries initially
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);

        // Extract unique languages from country data
        const languagesSet = new Set();
        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) => {
              languagesSet.add(lang);
            });
          }
        });
        setAvailableLanguages(Array.from(languagesSet).sort());

        setError(null);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to fetch countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Handle filtering by region, language, and search
  useEffect(() => {
    const filterCountries = async () => {
      try {
        setLoading(true);
        let data;

        // First, filter by region if selected
        if (selectedRegion === "All") {
          data = countries;
        } else {
          // If data is already loaded, filter locally
          if (countries.length > 0) {
            data = countries.filter(
              (country) => country.region === selectedRegion
            );
          } else {
            // Otherwise fetch from API
            data = await getCountriesByRegion(selectedRegion);
          }
        }

        // Then, filter by language if selected
        if (selectedLanguage !== "All") {
          data = data.filter((country) => {
            if (!country.languages) return false;
            return Object.values(country.languages).some(
              (lang) => lang === selectedLanguage
            );
          });
        }

        // Finally, apply search filter if it exists
        if (searchQuery) {
          data = data.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }

        setFilteredCountries(data);
        setError(null);
      } catch (error) {
        console.error(`Error filtering countries:`, error);
        setError(`Failed to filter countries. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    filterCountries();
  }, [selectedRegion, selectedLanguage, searchQuery, countries]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3 }}>
      {/* Filter and Search Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <RegionFilter
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
        />
        <LanguageFilter
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          availableLanguages={availableLanguages}
        />
      </Box>

      {/* Results Count (no box) */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredCountries.length}{" "}
        {filteredCountries.length === 1 ? "country" : "countries"}
        {searchQuery && ` for "${searchQuery}"`}
        {selectedRegion !== "All" && ` in ${selectedRegion}`}
        {selectedLanguage !== "All" && ` speaking ${selectedLanguage}`}
      </Typography>

      <Divider sx={{ mb: 4, bgcolor: "divider" }} />

      {/* Error Alert */}
      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        </Fade>
      )}

      {/* Loading Indicator */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCountries.length === 0 ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                py: 8,
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No countries found matching your criteria
              </Typography>
            </Box>
          ) : (
            filteredCountries.map((country) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                <CountryCard country={country} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
