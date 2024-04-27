import React, { useState } from "react";
import { Box, Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={2}
        width={300}
        margin="auto"
      >
        <h1>Sign in</h1>
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
          onChange={handleChange}
          fullWidth
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Button variant="contained" fullWidth>
            Sign in
          </Button>
          <Link component="button"onClick={() => navigate("/register")} align="right">
            Don't have an account? Sign up!
          </Link>
        </Box>
      </Box>
    )
}