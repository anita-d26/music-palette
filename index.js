const functions = require('firebase-functions');
const axios = require('axios');

exports.getSpotifyToken = functions.https.onRequest(async (req, res) => {
  const clientId = functions.config().spotify.client_id;
  const clientSecret = functions.config().spotify.client_secret;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.json({ access_token: response.data.access_token, expires_in: response.data.expires_in });
  } catch (error) {
    console.error('Error getting Spotify token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get Spotify token' });
  }
});