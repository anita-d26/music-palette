// App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/HomePage';
import Profile from './pages/ProfilePage';
import Visualize from './pages/VisualizePage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/visualize" element={<Visualize />} />
      </Routes>
    </Router>
  );
}

export default App;
