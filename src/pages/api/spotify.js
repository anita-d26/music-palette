// spotify.js - api frontend

export async function fetchAccessToken(code) {
  const response = await fetch('http://localhost:5173//api/getSpotifyToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token from Vercel backend');
  }

  return await response.json();
}