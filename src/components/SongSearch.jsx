// SongSearch.js

import React, { useState } from 'react';

function SongSearch({ onSongSelect }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSongSelect(input);
  };

  return (
    <form onSubmit={handleSubmit} className="song-search">
      <input
        type="text"
        placeholder="Type a song name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Generate Palette</button>
    </form>
  );
}

export default SongSearch;