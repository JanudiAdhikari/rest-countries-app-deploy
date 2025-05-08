import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Tooltip,
  Skeleton,
  useTheme,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const CountryCard = ({ country }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const { name, population, region, capital, languages, flags, cca3 } = country;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  // Check if country is already favorite when component mounts or user/token changes
  useEffect(() => {
    const checkFavorite = async () => {
      if (isAuthenticated && token) {
        try {
          setLoadingFavorite(true);
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/favorites`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Check if the country code exists in the favorites array
          const isCountryFavorite = response.data.some((fav) =>
            typeof fav === "string" ? fav === cca3 : fav.country === cca3
          );

          setIsFavorite(isCountryFavorite);
        } catch (error) {
          console.error("Error checking favorite:", error);
        } finally {
          setLoadingFavorite(false);
        }
      }
    };

    checkFavorite();
  }, [isAuthenticated, token, cca3]);

  const handleViewDetails = () => {
    navigate(`/country/${cca3}`);
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      localStorage.setItem("favoriteAfterLogin", cca3);
      navigate("/login");
      return;
    }

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/favorites/${cca3}`,
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
            country: cca3,
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
      alert("Failed to update favorites. Please try again.");
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <Card
      sx={{
        // width: { xs: "100%", sm: 345 },
        width: 345,
        height: 400,
        // display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        bgcolor: "background.paper",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <IconButton
          onClick={toggleFavorite}
          disabled={loadingFavorite}
          sx={{
            color: isFavorite ? "error.main" : "action.active",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <CardActionArea
        onClick={handleViewDetails}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: 180 }}>
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
              sx={{
                bgcolor:
                  theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              }}
            />
          )}
          <CardMedia
            component="img"
            image={flags?.svg || ""}
            alt={`${name?.common || "Country"} flag`}
            onLoad={() => setImageLoaded(true)}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: imageLoaded ? "block" : "none",
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, width: "100%" }}>
          <Tooltip title={name?.common || "No Name"}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              noWrap
              color="text.primary"
            >
              {name?.common}
            </Typography>
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            <Box
              component="span"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              Population:
            </Box>{" "}
            {population?.toLocaleString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box
              component="span"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              Region:
            </Box>{" "}
            {region || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box
              component="span"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              Capital:
            </Box>{" "}
            {capital?.[0] || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            <Box
              component="span"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              Languages:
            </Box>{" "}
            {languages ? Object.values(languages).join(", ") : "N/A"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
