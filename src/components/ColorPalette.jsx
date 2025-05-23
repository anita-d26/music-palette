// ColorPalette.jsx - mockPalettes for now

const moodPalettes = {
  chill: ['#87baab', '#ffe9f3', '#f4bfdb'],
  energetic: ['#b27092', '#512d38', '#f4bfdb']
};

function ColorPalette({ mood }) {
  const palette = moodPalettes[mood] || [];

  return (
    <div className="color-palette">
      {palette.map((color, i) => (
        <div key={i} className="swatch" style={{ backgroundColor: color }}>
          {color}
        </div>
      ))}
    </div>
  );
}

export default ColorPalette;