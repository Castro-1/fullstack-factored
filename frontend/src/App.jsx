import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserSessionProvider } from "./UserSessionContext";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <UserSessionProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserSessionProvider>
  );
}

export default App;
