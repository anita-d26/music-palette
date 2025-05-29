// getSpotifyToken.js - backend (gets token)

// code verifier (verifies user)
const generateRandomString = (length) => {
  console.log("generating random string")
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier = generateRandomString(128);

// code transform (hash) using the SHA256 algorithm
const sha256 = async (plain) => {
  console.log("encoding sha256")
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// put it together to implement the code challenge generation
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);

// reqesting authorization
const clientId = "00da19f0324840c1902cb05b37529251";
const redirectUri = 'https://chromatone-dusky.vercel.app/homepage';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();

// parse url to get code parameter
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');


// request of token (call backend API)
const getToken = async code => {
  console.log("getting token")

  // stored in the previous step
  const codeVerifier = localStorage.getItem('code_verifier');

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
}

export const searchTracks = async (query) => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Search failed');

  return data.tracks.items;
};