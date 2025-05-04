import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
  Paper,
  useTheme,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const LanguageFilter = ({
  selectedLanguage,
  onLanguageChange,
  availableLanguages,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        width: "100%",
        maxWidth: { xs: "100%", md: "250px" },
        mb: 3,
        bgcolor: "background.paper",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="language-select-label">Filter by Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          input={<OutlinedInput label="Filter by Language" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <TranslateIcon
                fontSize="small"
                color={theme.palette.mode === "dark" ? "primary" : "action"}
              />
              {selected === "All" ? (
                "All Languages"
              ) : (
                <Chip
                  label={selected}
                  size="small"
                  sx={{
                    borderRadius: "16px",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                />
              )}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                borderRadius: 8,
              },
              sx: {
                bgcolor: "background.paper",
              },
            },
          }}
          sx={{
            borderRadius: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: open
                ? "primary.main"
                : theme.palette.mode === "dark"
                ? "divider"
                : "grey.300",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: open
                ? "primary.main"
                : theme.palette.mode === "dark"
                ? "primary.light"
                : "grey.400",
            },
          }}
        >
          <MenuItem value="All">All Languages</MenuItem>
          {availableLanguages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default LanguageFilter;
