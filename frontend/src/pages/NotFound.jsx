import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found :(
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Link variant="contained" color="primary" to="/">
        Go back to Home
      </Link>
    </Box>
  );
}
