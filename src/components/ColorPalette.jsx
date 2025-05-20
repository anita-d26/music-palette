const PaletteDisplay = ({ colors }) => (
  <div className="flex gap-2">
    {colors.map((hex, idx) => (
      <div key={idx} style={{ backgroundColor: hex }} className="w-12 h-12 rounded"></div>
    ))}
  </div>
);