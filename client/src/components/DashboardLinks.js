import React from "react";
import { NavLink } from "react-router-dom";

function DashboardLinks() {
  return (
    <nav style={{ textAlign: "center", padding: "10px" }}>
      <NavLink to="/profile" style={{ marginRight: "20px" }}>Profile</NavLink>
      <NavLink to="/playlists" style={{ marginRight: "20px" }}>Playlists</NavLink>
      <NavLink to="/tracks">Tracks</NavLink>
    </nav>
  );
}

export default DashboardLinks;
