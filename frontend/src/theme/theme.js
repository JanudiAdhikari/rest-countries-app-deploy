import { createTheme } from "@mui/material/styles";

const commonSettings = {
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
  },
};

// Light Theme
export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "light",
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#3B82F6",
    },
    secondary: {
      main: "#6B7280",
    },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
    },
    divider: "#E5E7EB",
    error: {
      main: "#EF4444",
    },
    success: {
      main: "#10B981",
    },
    info: {
      main: "#0EA5E9",
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    background: {
      default: "#111827",
      paper: "#1F2937",
    },
    primary: {
      main: "#60A5FA",
    },
    secondary: {
      main: "#9CA3AF",
    },
    text: {
      primary: "#F3F4F6",
      secondary: "#D1D5DB",
    },
    divider: "#374151",
    error: {
      main: "#F87171",
    },
    success: {
      main: "#34D399",
    },
    info: {
      main: "#38BDF8",
    },
  },
});
