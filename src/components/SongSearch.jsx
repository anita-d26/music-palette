// SongSearch.jsx - search bar  

import { useState } from 'react';
import { searchTracks } from '../api/getSpotifyToken';

export default function SongSearch({ onTrackSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setError(null);
      const tracks = await searchTracks(query);
      setResults(tracks);
    } catch (err) {
      setError(err.message);
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
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="bg-purple-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
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
                {track.artists.map((a) => a.name).join(', ')}
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