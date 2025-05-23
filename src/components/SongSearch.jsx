// SongSearch.js - search bar  

import { useState } from 'react';

function SongSearch({ onSongSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchSong = async (e) => {
    e.preventDefault();

    const token = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace
    const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setResults(data.tracks.items);
  };

  return (
    <div>
      <form onSubmit={searchSong} className="song-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song..."
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((song) => (
          <li key={song.id} onClick={() => onSongSelect(song.name)}>
            {song.name} - {song.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongSearch;