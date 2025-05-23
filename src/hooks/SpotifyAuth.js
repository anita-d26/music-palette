// SpotifyAuth.js - handle tokens

const hooks = require('firebase-functions');
const fetch = require('node-fetch');
const querystring = require('querystring');

const CLIENT_ID = hooks.config().spotify.client_id;
const CLIENT_SECRET = hooks.config().spotify.client_secret;
const REDIRECT_URI = hooks.config().spotify.redirect_uri;

exports.spotifyToken = hooks.https.onRequest(async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const body = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  });

  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error_description || 'Token exchange failed' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});