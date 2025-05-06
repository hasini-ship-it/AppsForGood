import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Topics() {
  const navigate = useNavigate();
  const [visibleButtons, setVisibleButtons] = useState([]);

  const pageStyle = {
    height: '100vh',
    width: '100%',
    backgroundColor: '#cce4f6',
    overflowY: 'auto',
    padding: '2vh 5vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };


  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2vh',
    width: '100%',
    marginTop: '10vh',
  };

  const buttonStyle = {
    width: '80vw',
    maxWidth: '400px',
    height: '60px',
    borderRadius: '12px',
    backgroundColor: '#4a90e2',
    border: 'none',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    opacity: 0,
    transform: 'scale(0.95)',
    transition: 'opacity 0.5s ease, transform 0.3s ease',
  };

  const buttons = [
    { label: 'Kinematics', path: '/kinematics' },
    { label: 'Dynamics', path: '/dynamics' },
    { label: 'Energy, Work, and Power', path: '/energy-work-power' },
    { label: 'Momentum', path: '/momentum' },
    { label: 'Circular Motion and Gravity', path: '/circular-motion-gravity' },
    { label: 'Rotational Mechanics', path: '/rotational-mechanics' },
    { label: 'Simple Harmonic Motion', path: '/simple-harmonic-motion' },
  ];

  useEffect(() => {
    buttons.forEach((_, index) => {
      setTimeout(() => {
        setVisibleButtons((prev) => [...prev, index]);
      }, index * 200); // 200ms delay between each button
    });
  }, []);

  return (
    <div style={pageStyle}>

      <div style={buttonContainerStyle}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            style={{
              ...buttonStyle,
              opacity: visibleButtons.includes(index) ? 1 : 0,
              transform: visibleButtons.includes(index) ? 'scale(1)' : 'scale(0.95)',
            }}
            onClick={() => navigate(btn.path)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Topics;
