import React from "react";
import CountryDetails from "../components/CountryDetails";
import { Box } from "@mui/material";

const CountryPage = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 1,
        p: 3,
      }}
    >
      <CountryDetails />
    </Box>
  );
};

export default CountryPage;
