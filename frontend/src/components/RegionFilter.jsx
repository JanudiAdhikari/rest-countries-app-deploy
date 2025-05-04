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
import PublicIcon from "@mui/icons-material/Public";

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleChange = (event) => {
    onRegionChange(event.target.value);
  };

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
        <InputLabel id="region-select-label">Filter by Region</InputLabel>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={selectedRegion}
          onChange={handleChange}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          input={<OutlinedInput label="Filter by Region" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PublicIcon
                fontSize="small"
                color={theme.palette.mode === "dark" ? "primary" : "action"}
              />
              {selected === "All" ? (
                "All Regions"
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
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region === "All" ? "All Regions" : region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default RegionFilter;
