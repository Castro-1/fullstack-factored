import React from "react";
import { useUserSession } from "../UserSessionContext";
import { Box, Button, TextField, Link } from "@mui/material";
import Login from "../components/Login";

export default function Home() {
  const { token } = useUserSession();

  if (!token) {
    return (
      <Login />
    );
  }

  return <h1>Home</h1>;
}
