import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  IconButton,
} from "@mui/material";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { API_URL, AVATAR_URL } from "../constants";
import { useUserSession } from "../UserSessionContext";
import { ArrowBack } from "@mui/icons-material";

Chart.register(...registerables);

export default function User() {
  const { token } = useUserSession();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    const skillNames = user.skills.map((skill) => skill[0]);
    const skillValues = user.skills.map((skill) => skill[1]);

    const radarData = {
      labels: skillNames,
      datasets: [
        {
          label: "Skill Levels",
          data: skillValues,
          backgroundColor: "rgba(34, 202, 236, 0.2)",
          borderColor: "rgba(34, 202, 236, 1)",
          pointBackgroundColor: "rgba(34, 202, 236, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(34, 202, 236, 1)",
        },
      ],
    };

    const radarOptions = {
      scale: {
        min: 0,
        max: 5, 
        ticks: {
          stepSize: 1,
        },
      },
    };

    return (
      <Box padding={2} margin="auto" width={800}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => navigate("/")}>
            <ArrowBack />
          </IconButton>

          <Avatar
            alt={user.first_name}
            src={`${AVATAR_URL}?seed=${user.username}`}
            sx={{ width: 100, height: 100 }}
          />
          <Box>
            <Typography variant="h3">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="h4" color="textSecondary">
              {user.position}
            </Typography>
          </Box>
        </Box>

        <Box marginTop={4} marginX="auto" width={600}>
          <Radar
            data={radarData}
            options={radarOptions}
          />
        </Box>
      </Box>
    );
  }

  return null;
}
