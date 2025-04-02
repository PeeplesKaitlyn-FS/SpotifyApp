import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Callback from "./pages/Callback";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard"; 

const API_BASE_URL = "http://localhost:3000"; 

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", padding: "10px" }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({ marginRight: "20px", fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'green' : 'black' })}>
          Home
        </NavLink>
        <NavLink 
          to="/dashboard" 
          style={({ isActive }) => ({ marginRight: "20px", fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'green' : 'black' })}>
          Dashboard
        </NavLink>
        <NavLink 
          to="/profile" 
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'green' : 'black' })}>
          Profile
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
