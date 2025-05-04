import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import CountryCard from "../components/CountryCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  // Fetch user's favorite country codes
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Extract country codes from the response
        const favoriteCodes = response.data.map((fav) =>
          typeof fav === "string" ? fav : fav.country
        );
        setFavorites(favoriteCodes);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError(
          "Failed to load your favorite countries. Please try again later."
        );
      }
    };

    fetchFavorites();
  }, [token]);

  // Fetch details for favorite countries
  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (favorites.length === 0 && !loading) {
        setLoading(false);
        return;
      }

      try {
        // Only fetch if we have favorite countries
        if (favorites.length > 0) {
          const codes = favorites.join(",");
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${codes}`
          );
          setCountries(response.data);
        }
      } catch (err) {
        console.error("Error fetching country details:", err);
        setError("Failed to load country details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchCountryDetails();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (countries.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Your Favorites
        </Typography>
        <Typography variant="body1">
          You haven't added any countries to your favorites yet. Browse
          countries and click the heart icon to add them here!
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, textAlign: "center" }}
      >
        Your Favorite Countries
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {countries.map((country) => (
          <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={4}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;
