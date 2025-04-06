import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const DashboardLinks = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/profile", {
          method: "GET",
          credentials: "same-origin", 
        });
  
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <nav>
        <p>Loading...</p>
      </nav>
    );
  }

  if (!isAuthenticated) {
    return (
      <nav>
        <p>Please <NavLink to="/login">Login to Spotify</NavLink> first.</p>
      </nav>
    );
  }

  return (
    <nav>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/playlists">Playlists</NavLink>
      <NavLink to="/tracks">Tracks</NavLink>
    </nav>
  );
};

export default DashboardLinks;