// Navbar.jsx - navigation ui

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">
          <h3>Chromatone</h3>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/profile" className="nav-link">
          <h3>👤</h3>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;