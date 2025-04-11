import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Topics() {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // stack buttons vertically
    alignItems: 'center',     // center horizontally
    justifyContent: 'center', // center vertically
    height: '100vh',          // full viewport height
    gap: '20px',              // space between buttons
  };

  const buttonStyle = { //style for the buttons
    padding: '20px 40px',
    fontSize: '24px',
    cursor: 'pointer',
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', height: '100vh' }}>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <h1>Topics Page</h1>
        <button
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '10px 20px',
            fontSize: '16px',
          }}
          onClick={() => window.location.href = '/'} //Home button 
        >
          Home
        </button>
      </div>
  
      <div style={containerStyle}>
        <button style={buttonStyle} onClick={() => navigate('/kinematics')}> 
          Kinematics
        </button>
        <button style={buttonStyle} onClick={() => navigate('/dynamics')}>
          Dynamics
        </button>
        <button style={buttonStyle} onClick={() => navigate('/energy-work-power')}>
          Energy, Work, and Power
        </button>
        <button style={buttonStyle} onClick={() => navigate('/momentum')}>
          Momentum
        </button>
        <button style={buttonStyle} onClick={() => navigate('/circular-motion-gravity')}>
          Circular Motion and Gravity
        </button>
        <button style={buttonStyle} onClick={() => navigate('/rotational-mechanics')}>
          Rotational Mechanics
        </button>
        <button style={buttonStyle} onClick={() => navigate('/simple-harmonic-motion')}>
          Simple Harmonic Motion
        </button>
      </div>
    </div>
  );
} 

export default Topics;