import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Public,
  Code,
  DataObject,
  Devices,
  GitHub,
  Language,
  Api,
} from "@mui/icons-material";

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Features data
  const features = [
    {
      icon: <Public sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Global Data",
      description:
        "Access comprehensive information about countries worldwide through the REST Countries API.",
    },
    {
      icon: <Code sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "React Framework",
      description:
        "Built using modern React with functional components and hooks for optimal performance.",
    },
    {
      icon: (
        <DataObject sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: "Material UI",
      description:
        "Styled with Material UI components for a consistent and responsive user interface.",
    },
    {
      icon: (
        <Devices sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      title: "Responsive Design",
      description:
        "Optimized for viewing on all device types from mobile phones to large desktop screens.",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          position: "relative",
          p: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.primary.main}00)`,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: { xs: "2.2rem", sm: "3.5rem" },
          }}
        >
          About World Explorer
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          sx={{
            mb: 3,
            maxWidth: 800,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Discover the world's diverse cultures, languages, and geographic
          details through our interactive platform.
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Language
            sx={{ fontSize: 28, mr: 1, color: theme.palette.primary.main }}
          />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            Our Mission
          </Typography>
        </Box>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          World Explorer aims to provide an accessible and intuitive platform
          for users to explore and learn about countries around the globe. By
          leveraging the REST Countries API, we offer comprehensive data on
          flags, populations, languages, and geographical information in a
          visually appealing interface.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          Whether you're a student researching for a project, a traveler
          planning your next adventure, or simply curious about the world, our
          application is designed to make global information readily available
          at your fingertips.
        </Typography>
      </Box>

      {/* Features */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Key Features
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md="auto"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: 400,
                height: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[8],
                },
              }}
              elevation={3}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: 3,
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* API Information */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Api
            sx={{ fontSize: 28, mr: 1, color: theme.palette.primary.main }}
          />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            REST Countries API Integration
          </Typography>
        </Box>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Our application leverages the powerful REST Countries API to provide
          you with up-to-date information about countries worldwide. We utilize
          multiple endpoints to gather comprehensive data, allowing you to
          search by name, filter by region, explore detailed country
          information, and more.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          The seamless integration with this API enables us to offer features
          like real-time search, detailed country profiles, and organized
          regional browsing - all within an intuitive user interface designed
          for exploration and discovery.
        </Typography>
      </Box>

      {/* GitHub Repository */}
      <Box
        sx={{
          p: 4,
          mb: 6,
          borderRadius: 2,
          background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
          border: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        <GitHub sx={{ fontSize: 80, color: theme.palette.primary.main }} />
        <Box>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Open Source Project
          </Typography>
          <Typography variant="body1" paragraph>
            World Explorer is an open-source project developed as part of a
            React frontend application assignment. The source code is available
            on GitHub, showcasing best practices in React development, API
            integration, and responsive web design.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Repository: https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-JanudiAdhikari
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
