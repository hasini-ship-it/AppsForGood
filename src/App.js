
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topics from './TopicsGood';
import Settings from './Settings';
import Awards from './Awards';
import Kinematics from './kinematics';
import Navbar from './Navbar';
import Home from './Home';
import KinematicsConcepts from './kinematicsConcepts';

// Main App component
function App() {
  return (   
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/kinematics" element={<Kinematics />} />
          <Route path="/kinematicsConcepts" element={<KinematicsConcepts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;