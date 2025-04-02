import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    
    if (code) {
      axios.get(`${API_BASE_URL}/callback?code=${code}`)
        .then((response) => {
          const { access_token, refresh_token } = response.data;
          
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("refreshToken", refresh_token);

          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
        });
    }
  }, [navigate]);

  return <div>Loading...</div>;
}

export default Callback;
