import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topics from './Topics';
import Settings from './Settings';
import Awards from './Awards';
import './App.css';
import Kinematics from './kinematics';
import Navbar from './Navbar';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/kinematics" element={<Kinematics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;