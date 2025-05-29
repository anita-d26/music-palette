// spotify.js - api

export async function fetchAccessToken(code) {
  const response = await fetch('http://localhost:3001/api/exchange-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token from backend');
  }
  return await response.json();
}