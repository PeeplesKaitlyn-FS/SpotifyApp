# MySpotifyApp

MySpotifyApp is a music search app that integrates with Spotify's REST Web API. It allows users to search for music, view results, and access thumbnails that link to the Spotify web player.

## Features
- User Authentication via Spotify OAuth2
- View and manage user profile
- Search for tracks, albums, and playlists
- Display search results with direct links to Spotify web player
- Responsive and user-friendly interface

## Technologies Used
- React (Frontend)
- Express.js (Backend)
- Spotify Web API
- Axios (for API requests)
- React Router (for routing)
- CSS for styling

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v12.x or higher)
- [npm](https://www.npmjs.com/get-npm) (Node package manager)

## Installation

### 1. Clone the Repository

Clone the repo to your local machine:

git clone https://github.com/PeeplesKaitlyn-FS/SpotifyApp.git
cd SpotifyApp

### 2. Set Up Environment Variables
You need to create a .env file in the root of your project to store your Spotify credentials. These credentials are obtained by registering your app on the Spotify Developer Dashboard.

Create a .env file with the following variables:

bash
Copy
Edit
REACT_APP_SPOTIFY_CLIENT_ID=your-client-id
REACT_APP_SPOTIFY_CLIENT_SECRET=your-client-secret
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
SESSION_SECRET=your-session-secret
Make sure to replace your-client-id, your-client-secret, and your-session-secret with your actual secrets.

### 3. Install Dependencies
From the project root, install dependencies for both the client and server.

Client-Side (React)
Navigate to the client directory and install the React dependencies:

bash
Copy
Edit
cd client
npm install
Server-Side (Express)
Navigate to the server directory and install the server dependencies:

bash
Copy
Edit
cd server
npm install
4. Start the Development Servers
Start the Backend (Express Server)
In the server directory, run the following command:

bash
Copy
Edit
node index.js
This will start the server on http://localhost:3000.

Start the Frontend (React Client)
In the client directory, run the following command:

bash
Copy
Edit
npm start
This will start the React development server on http://localhost:3001.

### 4. Start the Development Servers
Start the Backend (Express Server)
In the server directory, run the following command:

bash
Copy
Edit
node index.js
This will start the server on http://localhost:3000.

Start the Frontend (React Client)
In the client directory, run the following command:

bash
Copy
Edit
npm start
This will start the React development server on http://localhost:3001.


### 5. Open the App
Once both servers are running, open your browser and visit http://localhost:3001. You'll be redirected to log in to Spotify and then redirected back to view your profile, playlists, and search for music.

Authentication Flow
When you visit the app for the first time, you'll be redirected to Spotify's OAuth2 login page.

After logging in, you will be redirected back to the app, where your profile and playlists will be displayed.

You can explore your tracks, playlists, and search for new music using the search feature.

API Endpoints
GET /login - Redirects to Spotify OAuth2 login page.

GET /callback - Handles the Spotify callback after authentication.

GET /profile - Fetches the user's profile data from Spotify.

GET /playlists - Fetches the user's playlists from Spotify.

GET /tracks - Fetches the user's saved tracks.

GET /search - Allows searching for tracks, albums, or playlists.

GET /playlists/:id/tracks - Fetches tracks from a specific playlist.

GET /refresh - Refreshes the Spotify access token.

Deployment
Deployment on Heroku
Create a new Heroku app.

Set your environment variables on Heroku:

REACT_APP_SPOTIFY_CLIENT_ID=your-client-id

REACT_APP_SPOTIFY_CLIENT_SECRET=your-client-secret

REACT_APP_SPOTIFY_REDIRECT_URI=http://your-heroku-app.herokuapp.com/callback

SESSION_SECRET=your-session-secret

Push your code to Heroku.

Set up the buildpack for React on Heroku by adding this command:

bash
Copy
Edit
heroku buildpacks:set mars/create-react-app
After deploying, your app will be live on Heroku.

Troubleshooting
CORS Issues: If you're encountering CORS issues between your client and server, ensure that you have set the appropriate headers on the backend, and make sure your frontend is making requests to the correct URL.

Authentication Issues: If the Spotify authentication isn't working correctly, make sure that your Spotify credentials are correctly added to your .env file. You can check the Spotify Developer Dashboard for any updates on your credentials.

Server/Client Not Connecting: If your frontend and backend aren't communicating correctly, ensure that you're running both the frontend and backend servers simultaneously on different ports. The backend should be running on port 3000 and the frontend on port 3001.

