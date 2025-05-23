// ColorPalette.jsx - displays palette

import React from 'react';
import '../styles/Palette.css';

function ColorPalette({ colors = ['#87baab', '#ffe9f3', '#f4bfdb'] }) {
  return (
    <div className="color-palette justify-content-center gap-3 mt-4">
      {colors.map((color, idx) => (
        <div
          key={idx}
          className="swatch"
          style={{
            backgroundColor: color,
            width: '80px',
            height: '80px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          {color}
        </div>
      ))}
    </div>
  );
}

export default ColorPalette;