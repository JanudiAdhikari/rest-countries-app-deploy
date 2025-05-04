import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
  useTheme,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// Icons
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  const theme = useTheme();

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <Paper
      component="footer"
      square={false}
      elevation={3}
      sx={{
        mt: 5,
        py: 3,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          {/* Logo and About Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PublicIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                World Explorer
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Discover countries around the world, their flags, populations,
              languages, and more.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This application was built using React and the REST Countries API.
            </Typography>
          </Grid>

          {/* Quick Links - Moved to the right */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="primary"
              sx={{
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                pb: 1,
                mb: 2,
                display: "inline-block",
              }}
            >
              QUICK LINKS
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Link
                component={RouterLink}
                to="/"
                color="text.secondary"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="text.secondary"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <InfoIcon fontSize="small" sx={{ mr: 1 }} />
                About
              </Link>
              <Link
                component={RouterLink}
                to="/favorites"
                color="text.secondary"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <FavoriteIcon fontSize="small" sx={{ mr: 1 }} />
                Favorites
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} World Explorer. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              component={RouterLink}
              to="/privacy"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/privacy"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Terms of Service
            </Link>
            <Link
              component={RouterLink}
              to="/privacy"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;
