import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, IconButton, CircularProgress } from "@mui/material";
import { Logout } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL, AVATAR_URL } from "../constants";

export default function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token") || "";

  if (!token) {
    navigate("/login");
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

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

  return (
    <Box width={500} margin="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" align="center" color="primary">
          Users
        </Typography>

        <IconButton onClick={handleLogout}>
          <Logout />
        </IconButton>
      </Box>

      <Box mt={2}>
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              p={2}
              my={1}
              border={1}
              borderColor="grey.300"
              borderRadius={2}
              sx={{
                "&:hover": {
                  backgroundColor: "grey.100",
                },
              }}
            >
              <Avatar
                alt={user.first_name}
                src={`${AVATAR_URL}?seed=${user.username}`}
              />
              <Box ml={2}>
                <Typography variant="h6" color="primary">{`${user.first_name} ${user.last_name}`}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.position}
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
