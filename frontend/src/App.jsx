import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserSessionProvider } from "./UserSessionContext";
import ProtectedRoute from "./components/ProtectedRoute";
import User from "./pages/User";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <UserSessionProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<ProtectedRoute element={<Home />} />} />
          <Route path="/users/:id" exact element={<ProtectedRoute element={<User />} />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserSessionProvider>
  );
}

export default App;
