// - SpotifyLogin.jsx - spotify login button

import React from 'react';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  // add other scopes you want
].join('%20');

function getSpotifyAuthUrl() {
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}&show_dialog=true`;
}

export default function SpotifyLoginButton() {
  return (
    <a href={getSpotifyAuthUrl()} className="btn btn-success">
      Login with Spotify
    </a>
  );
}