const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Songs endpoint');
});

// Add more routes as needed

module.exports = router;