// Profile.jsx - mock profile for user to see saved tracks, visualizations, and colors

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const mockSaved = [
  {
    id: 1,
    song: {
      title: 'Cherry Wine',
      artist: 'Hozier',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b27326a8c971ee84b758f6db393c',
    },
    colors: ['#FFE9F3', '#F4BFDB', '#B27092'],
  },
  {
    id: 2,
    song: {
      title: 'Northern Attitude',
      artist: 'Noah Kahan',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273a9d44cbec7d1d3df83dcdcf5',
    },
    colors: ['#512D38', '#87BAAB', '#B27092'],
  },
];

const Profile = () => {
  const [savedPalettes, setSavedPalettes] = useState([]);

  useEffect(() => {
    // Replace Firebase once working
    setSavedPalettes(mockSaved);
  }, []);

  const handleDelete = (id) => {
    setSavedPalettes((prev) => prev.filter((palette) => palette.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Saved Palettes</h2>

      {savedPalettes.length === 0 ? (
        <p className="text-center">No palettes saved yet. Try creating one!</p>
      ) : (
        <div className="row">
          {savedPalettes.map(({ id, song, colors }) => (
            <div key={id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <img src={song.albumArt} className="card-img-top" alt={song.title} />
                <div className="card-body">
                  <h5 className="card-title">{song.title}</h5>
                  <p className="card-text">by {song.artist}</p>
                  <div className="d-flex mb-3">
                    {colors.map((color, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: color,
                          width: '30px',
                          height: '30px',
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                  <button onClick={() => handleDelete(id)} className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;