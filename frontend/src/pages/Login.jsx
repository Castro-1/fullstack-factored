import React, { useState } from "react";
import { Box, Button, TextField, Link, Snackbar, Alert, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserSession } from "../UserSessionContext";
import { API_URL } from "../constants";

export default function Login() {
  const { setToken } = useUserSession();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      formData.username,
      formData.password
    ];

    return requiredFields.every((field) => field && field.trim() !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill in all required fields.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(
        API_URL+"/login",
        new URLSearchParams(formData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      sessionStorage.setItem("token", response.data.access_token);
      setToken(response.data.access_token);
      navigate("/");
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(error.response.data.detail);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={2}
      width={300}
      margin="auto"
    >
      <Typography variant="h3" align="center" color="primary">Sign in</Typography>
      <TextField
        name="username"
        label="Username"
        variant="outlined"
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="password"
        label="Password"
        variant="outlined"
        type="password"
        onChange={handleChange}
        fullWidth
      />
      <Box display="flex" flexDirection="column" gap={1}>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Sign in
        </Button>
        <Link
          component="button"
          onClick={() => navigate("/register")}
          align="right"
        >
          Don't have an account? Sign up!
        </Link>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
