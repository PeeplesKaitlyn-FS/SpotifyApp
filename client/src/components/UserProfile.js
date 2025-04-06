import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/profile`, { withCredentials: true })
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch profile.");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>{profile.display_name}</h2>
      <img src={profile.images?.[0]?.url} alt="Profile" width={150} />
      <p>Email: {profile.email}</p>
      <p>Country: {profile.country}</p>
      <p>Followers: {profile.followers?.total}</p>
    </div>
  );
}

export default UserProfile;
