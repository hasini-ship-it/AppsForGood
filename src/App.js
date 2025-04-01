import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Topics from './Topics';    // Import Topics component
import Settings from './Settings';  // Import Settings component
import Awards from './Awards';   // Import Awards component
import Home from './Home';   // Import Home component
import './App.css';   // Your CSS for styling

// Navbar component with buttons for navigation
function Navbar() {
  const navigate = useNavigate();  // Hook for navigation

  return (
    <header className="App-header">
      <button
        className="floatRight margin1 margin3 padding1 settingsButton"
        type="button"
        onClick={() => navigate('/Topics.js')}  // Navigate to /topics without reloading
      >
        Topics
      </button>
      <button
        className="floatRight margin1 padding1 settingsButton"
        type="button"
        onClick={() => navigate('/settings')}  // Navigate to /settings
      >
        Settings
      </button>
      <button
        className="floatRight margin1 padding1 settingsButton"
        type="button"
        onClick={() => navigate('/awards')}  // Navigate to /awards
      >
        Awards
      </button>
      <button
        className="floatLeft margin1 padding1 margin2 settingsButton"
        type="button"
        onClick={() => navigate('/')}  // Navigate to / (Home)
      >
        Home
      </button>
    </header>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/awards" element={<Awards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;