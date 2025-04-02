import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      alert("Please log in to view your profile.");
      return;
    }

    axios
      .get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProfile(response.data))
      .catch((error) => {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile. Please try again.");
      });
  }, [token]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Your Profile</h1>
      {profile ? (
        <div>
          <img src={profile.images?.[0]?.url} alt="Profile" width="150" />
          <h2>{profile.display_name}</h2>
          <p>Email: {profile.email}</p>
          <p>Followers: {profile.followers.total}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default UserProfile;