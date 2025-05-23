// Home.jsx - main page to search song

import { useState } from 'react';
import SongSearch from '../components/SongSearch';
import Visualizer from '../components/Visualizer';
import ColorPalette from '../components/ColorPalette';

function Home() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div>
      <h1>Chromatone</h1>

      <SongSearch onSongSelect={setSelectedSong} />

      {selectedSong && (
        <>
          <h2>Now Visualizing: {selectedSong.name} by {selectedSong.artist}</h2>
          <Visualizer song={selectedSong} />
          <ColorPalette song={selectedSong} />
        </>
      )}
    </div>
  );
}

export default Home;