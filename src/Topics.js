import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Topics() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', height: '100vh', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <h1>Topics Page</h1>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          fontSize: '16px',
        }}
        onClick={() => window.location.href = '/'}
      >
        Home
      </button>
      <button
        style={{
          marginTop: '20%',
          padding: '20px 40px',
          fontSize: '24px',
        }}
        onClick={() => navigate('/kinematics')} // Use navigate for routing
      >
        Kinematics
      </button>
    </div>
  );
}

export default Topics;