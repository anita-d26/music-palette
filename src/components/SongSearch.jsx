// SongSearch.jsx - search bar  

import { useState } from "react";

async function fetchSpotifyToken() {
  const response = await fetch('/api/getSpotifyToken', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to get token from backend');
  }

  const data = await response.json();
  return data.access_token;
}

async function searchTracks(query) {
  const token = await fetchSpotifyToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tracks from Spotify');
  }

  const data = await response.json();
  return data.tracks.items;
}

export default function SongSearch({ onTrackSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const tracks = await searchTracks(query);
      setResults(tracks);
    } catch (error) {
      console.error(error);
      setResults([]);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          placeholder="Search for a song..."
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid gap-4">
        {results.map((track) => (
          <div
            key={track.id}
            className="flex items-center gap-4 bg-white shadow p-3 rounded hover:bg-gray-50"
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className="w-16 h-16 rounded"
            />
            <div>
              <p className="font-semibold">{track.name}</p>
              <p className="text-sm text-gray-500">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
              <button
                onClick={() => onTrackSelect(track)}
                className="text-sm text-purple-600 underline mt-1"
              >
                Select this track
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}