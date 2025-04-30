import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Home Page</h1>
      <button
        style={{
          margin: '9px',
          padding: '10px 20px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/topics')}
      >
        Topics
      </button>
      <button
        style={{
          margin: '10px',
          padding: '10px 20px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/settings')}
      >
        Settings
      </button>
      <button
        style={{
          margin: '10px',
          padding: '10px 20px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/awards')}
      >
        Awards
      </button>
    </div>
  );
}

export default Home;