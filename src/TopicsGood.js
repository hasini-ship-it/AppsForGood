import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Topics() {
  const navigate = useNavigate(); //hook for navigation
  const [visibleButtons, setVisibleButtons] = useState([]); //useState is to see which buttons are visible

  const pageStyle = {
//main background style -- common theme for the application
    height: '100vh',
    width: '100%',
    backgroundImage: 'url(/cssupernovapic.jpg)', // Add the background image
    backgroundSize: 'cover', // Ensure the image covers the entire area
    backgroundPosition: 'center', // Center the image
    overflowY: 'auto',
    padding: '2vh 5vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    opacity: 1.2,
  };
//centers the buttons veritcally and adds a little spacing
  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2vh',
    width: '100%',
    marginTop: '10vh',
  };
//this is the base style for each button: color, size etc.
  const buttonStyle = {
    width: '90vw', 
    maxWidth: '400px',
    height: '60px',
    borderRadius: '12px',
    backgroundColor: '#f56a00',
    border: 'none',
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', //elevation affect includes shadow
    opacity: 0, //starts hidden for the animation
    transform: 'scale(0.95)', //starts a little smaller
    transition: 'opacity 0.5s ease, transform 0.3s ease',   //animation part of page
  };

    // topic buttons in array with labels and paths 
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
    //when the component mounts, each button will add itself to the visible ones using the array index for the staggered effect
    buttons.forEach((_, index) => {
      setTimeout(() => {
        setVisibleButtons((prev) => [...prev, index]);
      }, index * 200); // 200ms delay between each button
    });
  }, []); // empty dependency array means to run once on mount

  //main return component
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
            onClick={() => navigate(btn.path)} //means to navigate to the path of the button that was clicked
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Topics;

//used w3schools for css stylings similar to other pages
