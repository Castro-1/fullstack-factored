import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([
    { name: "", value: null },
    { name: "", value: null },
    { name: "", value: null },
    { name: "", value: null },
    { name: "", value: null },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    gender: "",
    position: "",
    skills: skills,
  });

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

  useEffect(() => {
    setFormData({
      ...formData,
      skills: skills.map((skill) => ({
        name: skill.name,
        value: skill.value,
      })),
    });
  }, [skills]);

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
      <h1>Sign up</h1>
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
        />
        <TextField
          name="lastName"
          label="Last name"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
      >
        <FormControl fullWidth>
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            name="gender"
            value={formData.gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value={"m"}>Masculine</MenuItem>
            <MenuItem value={"f"}>Feminine</MenuItem>
            <MenuItem value={"o"}>Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="position"
          label="Position"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
      >
        <h2>Skills</h2>
        {skills.map((skill, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <TextField
              label="Skill Name"
              variant="outlined"
              fullWidth
              value={skill.name}
              onChange={(e) =>
                handleSkillChange(index, "name", e.target.value)
              }
            />
            <FormControl fullWidth>
              <InputLabel id={`skill-value-${index}`}>Skill Level</InputLabel>
              <Select
                labelId={`skill-value-${index}`}
                id={`skill-value-${index}`}
                value={skill.value}
                label="Skill Level"
                onChange={(e) =>
                  handleSkillChange(index, "value", e.target.value)
                }
                fullWidth
              >
                <MenuItem value={1}>1-Beginner</MenuItem>
                <MenuItem value={2}>2-Novice</MenuItem>
                <MenuItem value={3}>3-Intermediate</MenuItem>
                <MenuItem value={4}>4-Advanced</MenuItem>
                <MenuItem value={5}>5-Expert</MenuItem>
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
      />
      <TextField
        name="password"
        label="Password"
        variant="outlined"
        onChange={handleChange}
        fullWidth
        type="password"
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        width="100%"
      >
        <Button variant="contained" fullWidth onClick={() => console.log(formData)}>
          Sign up
        </Button>
        <Link align="right" component="button" onClick={() => navigate("/")}>
          Already have an account? Sign in!
        </Link>
      </Box>
    </Box>
  );
}
