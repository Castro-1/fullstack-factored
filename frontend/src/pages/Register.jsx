import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Link,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

export default function Register() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([
    { name: "", value: 1 },
    { name: "", value: 1 },
    { name: "", value: 1 },
    { name: "", value: 1 },
    { name: "", value: 1 },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    position: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillChange = (index, key, value) => {
    const newSkills = [...skills];
    newSkills[index][key] = value;
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", value: 1 }]);
  };

  const deleteSkill = (index) => {
    if (skills.length > 5) {
      const newSkills = skills.filter((_, i) => i !== index);
      setSkills(newSkills);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.username,
      formData.password,
      formData.position,
      ...skills.map((skill) => skill.name),
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

    const data = {
      username: formData.username,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      position: formData.position,
      skills: skills.map((skill) => ([skill.name, skill.value])),
    };


    try {
      const response = await axios.post(`${API_URL}/register`, data);
      if (response.status === 201) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Registration successful!");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error in registration. Please try again.");
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
      alignItems="center"
      width={350}
      margin="auto"
      gap={2}
    >
      <Typography variant="h3" color="primary">Sign up</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
      >
        <TextField
          name="firstName"
          label="First name"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="lastName"
          label="Last name"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          required
        />
      </Box>
      <TextField
        name="position"
        label="Position"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        required
      />
      <Box display="flex" flexDirection="column" gap={2} width="100%">
        <Typography variant="h4" color="primary">Skills</Typography>
        {skills.map((skill, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <TextField
              label="Skill Name"
              variant="outlined"
              fullWidth
              value={skill.name}
              onChange={(e) => handleSkillChange(index, "name", e.target.value)}
              required
            />
            <FormControl fullWidth>
              <InputLabel id={`skill-value-${index}`}>Skill Level</InputLabel>
              <Select
                label="Skill Level"
                value={skill.value}
                onChange={(e) =>
                  handleSkillChange(index, "value", e.target.value)
                }
                required
              >
                <MenuItem value={1}>1 - Beginner</MenuItem>
                <MenuItem value={2}>2 - Novice</MenuItem>
                <MenuItem value={3}>3 - Intermediate</MenuItem>
                <MenuItem value={4}>4 - Advanced</MenuItem>
                <MenuItem value={5}>5 - Expert</MenuItem>
              </Select>
            </FormControl>
            {skills.length > 5 && (
              <IconButton onClick={() => deleteSkill(index)}>
                <Delete />
              </IconButton>
            )}
          </Box>
        ))}
        <Button startIcon={<Add />} onClick={addSkill}>
          Add Skill
        </Button>
      </Box>
      <TextField
        name="username"
        label="Username"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="password"
        label="Password"
        variant="outlined"
        type="password"
        onChange={handleChange}
        fullWidth
        required
      />
      <Box display="flex" flexDirection="column" gap={1} width="100%">
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Sign up
        </Button>
        <Link align="right" component="button" onClick={() => navigate("/")}>
          Already have an account? Sign in!
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
