import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const DashboardLinks = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  console.log("Is authenticated:", isAuthenticated);  
  return (
    <nav>
      {isAuthenticated ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/playlists">Playlists</NavLink>
          <NavLink to="/tracks">Tracks</NavLink>
        </>
      ) : (
        <p>Please <NavLink to="/login">Login to Spotify</NavLink> first.</p>
      )}
    </nav>
  );
};

export default DashboardLinks;
