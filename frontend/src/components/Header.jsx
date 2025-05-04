import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Tooltip,
  Button,
  useScrollTrigger,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";

const CapitalizedButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  }
}));

const CapitalizedListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    textTransform: 'none',
  }
});

const Header = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "About", path: "/about", icon: <InfoIcon /> },
    { name: "Favorites", path: "/favorites", icon: <FavoriteIcon /> },
    ...(user
      ? [
          {
            name: "Logout",
            onClick: handleLogout,
            icon: <LogoutIcon />,
          },
        ]
      : [{ name: "Login", path: "/login", icon: <LoginIcon /> }]),
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        pt: 2,
        height: "100%",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
      role="presentation"
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
        <IconButton onClick={toggleDrawer(false)} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem
            button
            component={link.path ? RouterLink : "div"}
            to={link.path}
            key={link.name}
            onClick={link.onClick ? link.onClick : toggleDrawer(false)}
            sx={{
              py: 1.5,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              {link.icon}
            </ListItemIcon>
            <CapitalizedListItemText
              primary={link.name}
              primaryTypographyProps={{
                sx: { color: "text.primary" },
              }}
            />
          </ListItem>
        ))}
        <ListItem sx={{ justifyContent: "space-between" }}>
          <ListItemIcon sx={{ color: "primary.main" }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
          <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        color="default"
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(31, 41, 55, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
          transition: "box-shadow 0.3s ease-in-out",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: { xs: 1, sm: 2 },
              gap: 2,
            }}
          >
            {/* Left: World Explorer */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Tooltip title="Explore the World">
                <IconButton
                  color="primary"
                  component={RouterLink}
                  to="/"
                  sx={{ mr: 1 }}
                >
                  <PublicIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "text.primary",
                  whiteSpace: "nowrap",
                }}
              >
                World Explorer
              </Typography>
            </Box>

            {/* Middle: Navigation Links - Only visible on larger screens */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexGrow: 1,
                  gap: 4,
                }}
              >
                {navLinks.map((link) => (
                  <CapitalizedButton
                    key={link.name}
                    component={link.path ? RouterLink : "div"}
                    to={link.path}
                    onClick={link.onClick ? link.onClick : null}
                    sx={{
                      borderRadius: 2,
                      color: "text.primary",
                      px: 2,
                      py: 1,
                      fontSize: "1rem",
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: "action.hover",
                        transform: "translateY(-2px)",
                        boxShadow: 1,
                      },
                      whiteSpace: "nowrap",
                    }}
                    startIcon={link.icon}
                  >
                    {link.name}
                  </CapitalizedButton>
                ))}
              </Box>
            )}

            {/* Right: Dark Mode Toggle */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Tooltip
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <IconButton
                  onClick={toggleDarkMode}
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            color: "text.primary",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Toolbar />
    </>
  );
};

export default Header;