import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

function Profile() {
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

  // Extract the profile image (if available)
  const profileImage = profile.images[0]?.url;

  return (
    <div className="profile-container">
      <h2>{profile.display_name}</h2>
      {profileImage && <img src={profileImage} alt={profile.display_name} width="150" height="150" />}
      <p>Email: {profile.email}</p>
      <p>Followers: {profile.followers.total}</p>
    </div>
  );
}

export default Profile;
