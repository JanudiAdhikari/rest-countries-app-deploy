import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Container,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useMediaQuery,
  Divider,
  Fade,
  Grow,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  LoginOutlined as LoginIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const from = location.state?.from?.pathname || "/";

  // If user is already logged in, redirect appropriately
  useEffect(() => {
    if (isAuthenticated) {
      const pendingFavorite = localStorage.getItem("favoriteAfterLogin");

      if (pendingFavorite) {
        navigate("/");
      } else {
        navigate(from);
      }
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 4, sm: 8 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Grow in timeout={800}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(145deg, #1e293b, #111827)"
                : "linear-gradient(145deg, #ffffff, #f9fafb)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <LoginIcon
              sx={{
                fontSize: 48,
                color: theme.palette.primary.main,
                mb: 2,
              }}
            />
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="700"
              sx={{
                background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 0.5,
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Sign in to access your account
            </Typography>
          </Box>

          <Fade in={!!error} timeout={500}>
            <Box sx={{ mb: error ? 3 : 0 }}>
              {error && (
                <Alert
                  severity="error"
                  variant="filled"
                  sx={{
                    borderRadius: 1.5,
                    animation: "pulse 1.5s infinite",
                    "@keyframes pulse": {
                      "0%": { opacity: 1 },
                      "50%": { opacity: 0.85 },
                      "100%": { opacity: 1 },
                    },
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>
          </Fade>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            noValidate
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <Box sx={{ textAlign: "right", mb: 3 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                underline="hover"
                sx={{
                  fontSize: "0.875rem",
                  color: theme.palette.primary.main,
                  "&:hover": {
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{
                mt: 1,
                mb: 3,
                py: 1.5,
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "&:hover": {
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  transform: "translateY(-1px)",
                  transition: "all 0.2s ease-in-out",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/register"
                underline="none"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grow>
    </Container>
  );
};

export default Login;
