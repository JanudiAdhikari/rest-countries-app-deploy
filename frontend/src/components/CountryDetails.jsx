import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
  CardMedia,
  useTheme,
  Skeleton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Tooltip,
  IconButton,
} from "@mui/material";
import { getCountryByCode } from "../services/api";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TranslateIcon from "@mui/icons-material/Translate";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import FlagIcon from "@mui/icons-material/Flag";
import MapIcon from "@mui/icons-material/Map";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const CountryDetails = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flagLoaded, setFlagLoaded] = useState(false);
  const [coatOfArmsLoaded, setCoatOfArmsLoaded] = useState(false);

  const { user, token } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  // Fetch country data
  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (!countryCode) return;

      try {
        setLoading(true);
        const data = await getCountryByCode(countryCode);
        if (data && data.length > 0) {
          setCountry(data[0]);
          setError(null);
        } else {
          setError("Country not found");
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
        setError("Failed to load country details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  // Check Favorite Status
  useEffect(() => {
    const checkFavorite = async () => {
      if (user && token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/favorites`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Check if the country code exists in the favorites array
          setIsFavorite(
            response.data.some(
              (fav) => fav === countryCode || fav.country === countryCode
            )
          );
        } catch (error) {
          console.error("Error checking favorite:", error);
        }
      }
    };

    checkFavorite();
  }, [user, token, countryCode]);

  // Function to handle favorite toggling
  const toggleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/favorites/${countryCode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites`,
          {
            country: countryCode,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoadingFavorite(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Helper functions for formatting data
  const formatPopulation = (population) => {
    return population?.toLocaleString() || "N/A";
  };

  const getLanguages = (languages) => {
    return languages ? Object.values(languages).join(", ") : "N/A";
  };

  const getCurrencies = (currencies) => {
    if (!currencies) return "N/A";

    return Object.values(currencies)
      .map((currency) => `${currency.name} (${currency.symbol || ""})`)
      .join(", ");
  };

  const getBorders = (borders) => {
    if (!borders || borders.length === 0) return [];
    return borders;
  };

  const getNativeName = (nativeName) => {
    if (!nativeName) return "N/A";

    const firstKey = Object.keys(nativeName)[0];
    return nativeName[firstKey]?.common || "N/A";
  };

  const formatArea = (area) => {
    if (!area && area !== 0) return "N/A";
    return `${area.toLocaleString()} km²`;
  };

  // Consistent section component for reuse
  const InfoSection = ({ title, children, gridSize = { xs: 12 } }) => (
    <Grid item {...gridSize}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: 3,
          height: "100%",
          bgcolor: "background.paper",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0,0,0,0.3)"
              : "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
          color="text.primary"
        >
          {title}
        </Typography>
        {children}
      </Paper>
    </Grid>
  );

  // Info item for consistent display of data
  const InfoItem = ({ icon, primary, secondary }) => (
    <ListItem disablePadding sx={{ py: 1 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={primary}
        secondary={secondary || "N/A"}
        primaryTypographyProps={{ fontWeight: "medium", color: "text.primary" }}
        secondaryTypographyProps={{ color: "text.secondary" }}
      />
    </ListItem>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section with Back Button and Favorite */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            borderRadius: 2,
            transition: "all 0.2s",
            color: "primary.main",
            borderColor: "primary.main",
            "&:hover": {
              transform: "translateX(-5px)",
              borderColor: "primary.main",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(96, 165, 250, 0.1)"
                  : "rgba(59, 130, 246, 0.1)",
            },
          }}
        >
          Back to Countries
        </Button>

        {country && !loading && (
          <Tooltip
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <IconButton
              onClick={toggleFavorite}
              disabled={loadingFavorite}
              sx={{
                color: isFavorite ? "error.main" : "text.secondary",
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                p: 1.5,
                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                },
              }}
              size="large"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {loadingFavorite ? (
                <CircularProgress size={24} color="inherit" />
              ) : isFavorite ? (
                <FavoriteIcon fontSize="medium" />
              ) : (
                <FavoriteBorderIcon fontSize="medium" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{ borderRadius: 2, bgcolor: "background.paper", opacity: 0.1 }}
          />
          <Skeleton
            variant="text"
            width="50%"
            height={60}
            sx={{ bgcolor: "background.paper", opacity: 0.1 }}
          />
          <Skeleton
            variant="text"
            width="70%"
            sx={{ bgcolor: "background.paper", opacity: 0.1 }}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  opacity: 0.1,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  opacity: 0.1,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ) : country ? (
        <Fade in={!loading}>
          <Box>
            {/* Country Header Card */}
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                mb: 4,
                bgcolor: "background.paper",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "center", md: "flex-start" },
                  gap: 3,
                }}
              >
                {/* Country Name Section */}
                <Box
                  sx={{
                    flex: 1,
                    textAlign: { xs: "center", md: "left" },
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      color: "text.primary",
                    }}
                  >
                    {country.name.common}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {country.name.official}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      mt: 2,
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {country.capital && (
                      <Chip
                        icon={<LocationOnIcon />}
                        label={`Capital: ${country.capital[0]}`}
                        sx={{
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(96, 165, 250, 0.1)"
                              : "rgba(59, 130, 246, 0.1)",
                          color: "text.primary",
                        }}
                      />
                    )}
                    <Chip
                      icon={<PublicIcon />}
                      label={country.region}
                      color="primary"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        borderColor: "primary.main",
                        color: "primary.main",
                      }}
                    />
                    {country.subregion && (
                      <Chip
                        icon={<PublicIcon />}
                        label={country.subregion}
                        sx={{
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(96, 165, 250, 0.1)"
                              : "rgba(59, 130, 246, 0.1)",
                          color: "text.primary",
                        }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Flag Preview */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "200px" },
                    maxWidth: { xs: "300px", md: "200px" },
                    aspectRatio: "3/2",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  {!flagLoaded && (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      sx={{ position: "absolute" }}
                    />
                  )}
                  <CardMedia
                    component="img"
                    image={country.flags?.svg || country.flags?.png}
                    alt={country.flags?.alt || `Flag of ${country.name.common}`}
                    onLoad={() => setFlagLoaded(true)}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {/* Main Content Grid */}
            <Grid container spacing={3}>
              {/* Primary Info Section */}
              <InfoSection
                title="Essential Information"
                gridSize={{ xs: 12, md: 6 }}
              >
                <List>
                  <InfoItem
                    icon={<GroupsIcon color="primary" />}
                    primary="Population"
                    secondary={formatPopulation(country.population)}
                  />
                  <InfoItem
                    icon={<MapIcon color="primary" />}
                    primary="Area"
                    secondary={formatArea(country.area)}
                  />
                  <InfoItem
                    icon={<FlagIcon color="primary" />}
                    primary="Native Name"
                    secondary={getNativeName(country.name.nativeName)}
                  />
                  <InfoItem
                    icon={<TranslateIcon color="primary" />}
                    primary="Languages"
                    secondary={getLanguages(country.languages)}
                  />
                  <InfoItem
                    icon={<CurrencyExchangeIcon color="primary" />}
                    primary="Currencies"
                    secondary={getCurrencies(country.currencies)}
                  />
                  <InfoItem
                    icon={<PhoneIcon color="primary" />}
                    primary="Calling Code"
                    secondary={
                      country.idd?.root
                        ? `${country.idd.root}${
                            country.idd.suffixes?.[0] || ""
                          }`
                        : "N/A"
                    }
                  />
                </List>
              </InfoSection>

              {/* National Symbols Section - Coat of Arms */}
              <InfoSection
                title="National Symbols"
                gridSize={{ xs: 12, md: 6 }}
              >
                {country.coatOfArms?.svg && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="medium"
                        gutterBottom
                      >
                        Coat of Arms
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          p: 2,
                          height: "180px",
                        }}
                      >
                        {!coatOfArmsLoaded && (
                          <Skeleton
                            variant="rectangular"
                            width="120px"
                            height="180px"
                            sx={{ borderRadius: 1 }}
                          />
                        )}
                        <Box
                          component="img"
                          src={country.coatOfArms.svg}
                          alt={`Coat of Arms of ${country.name.common}`}
                          onLoad={() => setCoatOfArmsLoaded(true)}
                          sx={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                            display: coatOfArmsLoaded ? "block" : "none",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                )}

                {!country.coatOfArms?.svg && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    No national symbols available for this country
                  </Typography>
                )}
              </InfoSection>

              {/* Location & Maps Section - Simplified */}
              <InfoSection title="Location & Maps">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <List disablePadding>
                      <InfoItem
                        icon={<PublicIcon color="primary" />}
                        primary="Region"
                        secondary={`${country.region}${
                          country.subregion ? ` (${country.subregion})` : ""
                        }`}
                      />
                      {getBorders(country.borders).length > 0 && (
                        <ListItem disablePadding sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <PublicIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Borders With"
                            primaryTypographyProps={{
                              fontWeight: "medium",
                              color: "text.primary",
                            }}
                          />
                        </ListItem>
                      )}
                    </List>

                    {getBorders(country.borders).length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          ml: 6,
                          mt: 1,
                        }}
                      >
                        {getBorders(country.borders).map((border) => (
                          <Chip
                            key={border}
                            label={border}
                            onClick={() => navigate(`/country/${border}`)}
                            sx={{
                              borderRadius: 2,
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "rgba(96, 165, 250, 0.1)"
                                  : "rgba(59, 130, 246, 0.1)",
                              color: "primary.main",
                              transition: "all 0.2s",
                              "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: 1,
                                bgcolor:
                                  theme.palette.mode === "dark"
                                    ? "rgba(96, 165, 250, 0.2)"
                                    : "rgba(59, 130, 246, 0.2)",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    {country.maps?.googleMaps && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<MapIcon />}
                          href={country.maps.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="large"
                          sx={{
                            borderRadius: 2,
                            bgcolor: "primary.main",
                            py: 1.5,
                            px: 4,
                            fontSize: "1rem",
                            "&:hover": {
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "primary.dark"
                                  : "primary.dark",
                              transform: "translateY(-2px)",
                              boxShadow: 3,
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          View on Google Maps
                        </Button>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </InfoSection>
            </Grid>
          </Box>
        </Fade>
      ) : (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h5" color="text.secondary">
            Country not found
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{
              mt: 3,
              borderRadius: 2,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "primary.dark"
                    : "primary.dark",
              },
            }}
          >
            Back to Countries
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CountryDetails;
