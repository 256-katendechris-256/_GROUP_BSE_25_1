// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Set the port for the server to listen on
// Use the PORT environment variable if available (for Heroku), otherwise use 3000
const port = process.env.PORT || 3000;

// Serve static files from the 'web-build' directory
// This is where your React Native Web app will be built to
app.use(express.static(path.join(__dirname, 'web-build')));

// For any GET request, send the index.html file
// This enables client-side routing for your React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});