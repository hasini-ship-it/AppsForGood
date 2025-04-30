import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Topics() {
  const navigate = useNavigate();
  const [visibleButtons, setVisibleButtons] = useState([]);

  const pageStyle = {
    position: 'relative',
    height: '100vh',
    width: '100%',
    backgroundColor: '#cce4f6',
    overflow: 'hidden',
    padding: '20px',
  };

  const homeButtonStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    zIndex: 10,
  };

  const buttonStyle = {
  position: 'absolute',
  width: '250px',
  height: '150px',
  borderRadius: '40%',
  backgroundColor: '#4a90e2',
  border: 'none',
  color: 'white',
  fontSize: '24px',
  fontWeight: 'bold',
  cursor: 'pointer',
  textAlign: 'center',
  padding: '20px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  zIndex: 20,
  opacity: 0,
  transform: 'scale(0.5)',
  transition: 'opacity 0.5s ease, transform 0.3s ease',
  ':hover': {
    transform: 'scale(1.1)',
  },
};
  const buttons = [
    { label: 'Kinematics', path: '/kinematics', top: '10%', left: '5%' },
    { label: 'Dynamics', path: '/dynamics', top: '20%', left: '35%' },
    { label: 'Energy, Work, and Power', path: '/energy-work-power', top: '10%', left: '65%' },
    { label: 'Momentum', path: '/momentum', top: '40%', left: '85%' },
    { label: 'Circular Motion and Gravity', path: '/circular-motion-gravity', top: '60%', left: '55%' },
    { label: 'Rotational Mechanics', path: '/rotational-mechanics', top: '50%', left: '25%' },
    { label: 'Simple Harmonic Motion', path: '/simple-harmonic-motion', top: '70%', left: '5%' },
  ];

  const getPosition = (topPercent, leftPercent) => {
    const pageHeight = window.innerHeight;
    const pageWidth = window.innerWidth;
    const top = parseFloat(topPercent) / 100 * pageHeight + 75;
    const left = parseFloat(leftPercent) / 100 * pageWidth + 125;
    return { top, left };
  };

  // 🧠 Animation Effect
  useEffect(() => {
    buttons.forEach((_, index) => {
      setTimeout(() => {
        setVisibleButtons((prev) => [...prev, index]);
      }, index * 200); // 300ms delay between each button appearing
    });
  }, []);

  return (
    <div style={pageStyle}>
      <button style={homeButtonStyle} onClick={() => navigate('/')}>
        Home
      </button>

      {/* SVG Lines Behind */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
        {buttons.map((btn, index) => {
          if (index === buttons.length - 1) return null;
          const start = getPosition(buttons[index].top, buttons[index].left);
          const end = getPosition(buttons[index + 1].top, buttons[index + 1].left);

          return (
            <line
              key={index}
              x1={start.left}
              y1={start.top}
              x2={end.left}
              y2={end.top}
              stroke="#53719F"
              strokeWidth="5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* All Buttons */}
      {buttons.map((btn, index) => (
        <button
          key={index}
          style={{
            ...buttonStyle,
            top: btn.top,
            left: btn.left,
            opacity: visibleButtons.includes(index) ? 1 : 0,
            transform: visibleButtons.includes(index) ? 'scale(1)' : 'scale(0.5)',
          }}
          onClick={() => navigate(btn.path)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default Topics;
