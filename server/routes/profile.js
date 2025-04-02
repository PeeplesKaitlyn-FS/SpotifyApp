const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/me", async (req, res) => {
  const accessToken = req.session.access_token;
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Spotify API Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error retrieving profile", details: error.message });
  }
});

module.exports = router;
