import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Box,
  Fade,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <Paper
      elevation={isFocused ? 3 : 1}
      sx={{
        borderRadius: 2,
        transition: "all 0.3s ease",
        mb: 3,
        width: "100%",
        maxWidth: { xs: "100%", md: "500px" },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          placeholder="Search for a country..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <Fade in={searchQuery.length > 0}>
                  <IconButton
                    edge="end"
                    onClick={handleClear}
                    aria-label="clear search"
                    size="small"
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Fade>
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              py: 0.5,
              color: theme.palette.text.primary,
              "& fieldset": {
                borderColor: isFocused
                  ? theme.palette.primary.main
                  : theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: isFocused
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
              },
              "& .MuiInputBase-input::placeholder": {
                color: theme.palette.text.secondary,
                opacity: 0.7,
              },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default SearchBar;
