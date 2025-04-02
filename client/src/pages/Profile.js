import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const API_BASE_URL = "http://localhost:3000"; 

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken"); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!token) {
      alert("Please log in to view your profile.");
      navigate("/"); 
      return;
    }

    axios
      .get(`${API_BASE_URL}/profile`, {
        withCredentials: true, 
      })
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile. Please try again.");
        if (error.response && error.response.status === 401) {
            alert("Session expired. Please log in again.");
          navigate("/");
        }
      });
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Spotify Profile</h1>
      {loading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div>
          <img src={profile.images?.[0]?.url} alt="Profile" width="150" />
          <h2>{profile.display_name}</h2>
          <p>Email: {profile.email}</p>
          <p>Followers: {profile.followers.total}</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
}

export default Profile;
