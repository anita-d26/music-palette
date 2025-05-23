// spotify.js - spotify api calls

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const scopes = [
  'user-read-private',
  'user-read-email',
].join('%20');

// Authorization for user login
export function getSpotifyAuthUrl() {
  return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&show_dialog=true`;
}

// Access token
export async function fetchAccessToken(code) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }
  return await response.json(); 
}

// Search for tracks
export async function searchTracks(query, accessToken) {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to search tracks');
  }

  return await response.json();
}

// Audio features - tempo, valence, energy, etc.
export async function getAudioFeatures(trackId, accessToken) {
  const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get audio features');
  }

  return await response.json();
}