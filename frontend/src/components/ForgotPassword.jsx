import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  useMediaQuery,
  Divider,
  Fade,
  Grow,
} from "@mui/material";
import {
  Email as EmailIcon,
  LockReset as LockResetIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Here you would integrate with your auth service to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating API call

      // For demo purposes, just show success
      setSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error);
      setError(
        "An error occurred while sending the reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
            <LockResetIcon
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
              Reset Password
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Enter your email to receive a password reset link
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

          <Fade in={success} timeout={500}>
            <Box sx={{ mb: success ? 3 : 0 }}>
              {success && (
                <Alert
                  severity="success"
                  variant="filled"
                  sx={{
                    borderRadius: 1.5,
                  }}
                >
                  Reset link sent! Please check your email inbox.
                </Alert>
              )}
            </Box>
          </Fade>

          {!success ? (
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
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={loading || !email}
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
                  "Send Reset Link"
                )}
              </Button>
            </Box>
          ) : (
            <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Didn't receive the email? Check your spam folder or try again in
                a few minutes.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                sx={{
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Try Again
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="text"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/login")}
            sx={{
              mt: 1,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            Back to Login
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <Link
              href="/register"
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
        </Paper>
      </Grow>
    </Container>
  );
};

export default ForgotPassword;
