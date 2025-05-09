import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './kinematics.css';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

function Kinematics() {
  const navigate = useNavigate(); // Hook for navigation
  const [distance, setDistance] = useState(0); // State to track the distance traveled
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 }); // State to track the last position of the box
  const [speed, setSpeed] = useState(0); // Total distance traveled
  const [velocity, setVelocity] = useState(0); // Displacement over time
  const [velocityLastPosition, setVelocityLastPosition] = useState({ x: 0, y: 0 }); // Last position of the red box
  const [startTime, setStartTime] = useState(null); // Start time of the simulation

  const [boxTexts] = useState([
    { term: 'Vector', def: 'Has both magnitude and direction. For example “driving 30 mph north” would be a vector' },
    { term: 'Scalar', def: 'Has magnitude but no direction. For example “driving 30 mph” would be a scalar' },
    { term: 'Distance', def: 'How far something travels over the course of the entire journey: If you travel 3 feet to the left and 1 foot to the right, your distance would be 4 feet. This wouldn’t be a vector because it doesn’t have a direction associated with it.' },
    { term: 'Displacement', def: 'How far something has traveled at the end of a journey: If you travel 3 feet to the left and 1 foot to the right you’re displaced 2 feet to the right.' },
    { term: 'Speed', def: 'How much distance was traveled in a certain amount of time.' },
    { term: 'Velocity', def: 'How far something was displaced in the time it took for that object to be displaced.' },
  ]);

  // Track which boxes are flipped
  const [flipped, setFlipped] = useState(Array(boxTexts.length).fill(false));

  // Flip handler
  const handleFlip = (index) => {
    const updated = [...flipped];
    updated[index] = !updated[index];
    setFlipped(updated);
  };

  return (
    <div style={{ 
      height: '100vh',
      width: '100%',
      backgroundImage: 'url(/cssupernovapic.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      overflowY: 'auto',
      padding: '2vh 5vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      opacity: 1.2,
    }}>
      {/* Intro Paragraph */}
      <p style={{color: 'white', textAlign: 'center', fontSize: '45px', marginTop: '8%', marginLeft: '15%', marginRight: '15%', fontWeight: 'bold'}}>
        Kinematics
      </p>

      {/* Background Box for Description of Kinematics */}
      <div style={{ 
        backgroundColor: 'orange', 
        padding: '20px', 
        borderRadius: '8px', 
        marginLeft: '10%', 
        marginRight: '10%', 
        marginTop: '5%', 
      }}>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '20px', 
          color: 'black',
          fontWeight: 'bold',
        }}>
          Kinematics is the branch of physics that deals with how objects move without considering the mass of objects or the forces acting on them. This lesson focuses on introducing you to the basics of kinematics and getting you comfortable with terms which will both be built on in further lessons. Below are the first set of terms.
        </p>
      </div>

      {/* Flippable Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          marginTop: '20px',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        {boxTexts.map((item, index) => (
          <div
            key={index}
            onClick={() => handleFlip(index)}
            style={{
              perspective: '1000px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '150px',
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front Side */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#a68bad',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
              >
                <strong>{item.term}</strong>
              </div>

              {/* Back Side */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#e3cfe8',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  padding: '10px',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                }}
              >
                {item.def}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulation and Info Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row', // Default to row for larger screens
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '20px', // Space between the simulation boxes
          marginTop: '50px',
          flexWrap: 'wrap', // Allow wrapping on smaller screens
        }}
      >
        {/* First Simulation: Displacement */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 400px', minWidth: '300px' }}>
          {/* Coordinate Plane (Simulation) */}
          <div
            style={{
              position: 'relative',
              width: '100%', // Make it responsive
              height: '400px',
              border: '1px solid orange',
              backgroundColor: 'white',
            }}
            onDragOver={(e) => e.preventDefault()} // Allow dropping
            onDrop={(e) => {
              const plane = e.currentTarget;
              const box = document.getElementById('movableBox');
              const { offsetX, offsetY } = JSON.parse(e.dataTransfer.getData('text/plain'));
              const rect = plane.getBoundingClientRect();
              const x = e.clientX - rect.left - offsetX;
              const y = e.clientY - rect.top - offsetY;

              const clampedX = Math.max(0, Math.min(x, plane.clientWidth - box.clientWidth));
              const clampedY = Math.max(0, Math.min(y, plane.clientHeight - box.clientHeight));

              box.style.left = `${clampedX}px`;
              box.style.top = `${clampedY}px`;

              const dx = clampedX - lastPosition.x;
              const dy = clampedY - lastPosition.y;
              const traveled = Math.sqrt(dx * dx + dy * dy);
              setDistance((prevDistance) => prevDistance + traveled);
              setLastPosition({ x: clampedX, y: clampedY });
            }}
          >
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '10px 20px',
                fontSize: '16px',
              }}
              onClick={() => {
                const box = document.getElementById('movableBox');
                box.style.left = '0px';
                box.style.top = '0px';
                setDistance(0);
                setLastPosition({ x: 0, y: 0 });
              }}
            >
              Reload
            </button>
            <div
              id="movableBox"
              style={{
                position: 'absolute',
                width: '50px',
                height: '50px',
                backgroundColor: '#007bff',
                cursor: 'grab',
              }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  'text/plain',
                  JSON.stringify({
                    offsetX: e.nativeEvent.offsetX,
                    offsetY: e.nativeEvent.offsetY,
                  })
                );
              }}
            ></div>
          </div>
          {/* Displacement Display */}
          <div
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              fontSize: '16px',
              color: '#333',
              width: '100%', // Make it responsive
              maxWidth: '200px', // Limit max width
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            <p><strong>Displacement:</strong></p>
            <p>{Math.sqrt(lastPosition.x ** 2 + lastPosition.y ** 2).toFixed(2)} px</p>
            <p><strong>Distance Traveled:</strong></p>
            <p>{distance.toFixed(2)} px</p>
          </div>
        </div>

        {/* Second Simulation: Speed and Velocity */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 400px', minWidth: '300px' }}>
          {/* Coordinate Plane */}
          <div
            style={{
              position: 'relative',
              width: '100%', // Make it responsive
              height: '400px',
              border: '1px solid #4a90e2',
              backgroundColor: '#ffffff',
            }}
            onDragOver={(e) => e.preventDefault()} // Allow dropping
            onDrop={(e) => {
              const plane = e.currentTarget;
              const box = document.getElementById('velocityBox');
              const { offsetX, offsetY } = JSON.parse(e.dataTransfer.getData('text/plain'));
              const rect = plane.getBoundingClientRect();
              const x = e.clientX - rect.left - offsetX;
              const y = e.clientY - rect.top - offsetY;

              const clampedX = Math.max(0, Math.min(x, plane.clientWidth - box.clientWidth));
              const clampedY = Math.max(0, Math.min(y, plane.clientHeight - box.clientHeight));

              box.style.left = `${clampedX}px`;
              box.style.top = `${clampedY}px`;

              const dx = clampedX - velocityLastPosition.x;
              const dy = clampedY - velocityLastPosition.y;
              const displacement = Math.sqrt(dx * dx + dy * dy);
              const currentTime = performance.now();
              const timeElapsed = (currentTime - startTime) / 1000;

              if (timeElapsed > 0) {
                setVelocity(displacement / timeElapsed);
                setSpeed((prevSpeed) => prevSpeed + displacement);
              }

              setVelocityLastPosition({ x: clampedX, y: clampedY });
            }}
          >
            {/* Reload Button for Second Simulation */}
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '10px 20px',
                fontSize: '16px',
              }}
              onClick={() => {
                const box = document.getElementById('velocityBox');
                box.style.left = '0px';
                box.style.top = '0px';
                setSpeed(0);
                setVelocity(0);
                setVelocityLastPosition({ x: 0, y: 0 });
                setStartTime(null);
              }}
            >
              Reload
            </button>
            <div
              id="velocityBox"
              style={{
                position: 'absolute',
                width: '50px',
                height: '50px',
                backgroundColor: '#ff0000',
                cursor: 'grab',
              }}
              draggable
              onDragStart={(e) => {
                if (!startTime) {
                  setStartTime(performance.now());
                }
                e.dataTransfer.setData(
                  'text/plain',
                  JSON.stringify({
                    offsetX: e.nativeEvent.offsetX,
                    offsetY: e.nativeEvent.offsetY,
                  })
                );
              }}
            ></div>
          </div>
          {/* Speed and Velocity Display */}
          <div
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#fff',
              fontSize: '16px',
              color: '#333',
              width: '100%', // Make it responsive
              maxWidth: '200px', // Limit max width
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            <p><strong>Speed:</strong></p>
            <p>{speed.toFixed(2)} px/s</p>
            <p><strong>Velocity:</strong></p>
            <p>{velocity.toFixed(2)} px/s</p>
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#fff',
                fontSize: '14px',
                color: '#333',
              }}
            >
              <p><strong>Time:</strong> {((startTime ? performance.now() - startTime : 0) / 1000).toFixed(2)} s</p>
              <p><strong>Displacement:</strong> {Math.sqrt(velocityLastPosition.x ** 2 + velocityLastPosition.y ** 2).toFixed(2)} px</p>
              <p><strong>Distance:</strong> {speed.toFixed(2)} px</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Button to Next Page */}
      <button
  onClick={() => navigate('/kinematicsConcepts')}
  style={{
    position: 'fixed', // Change to fixed so it stays constant 
    bottom: '3%', // Position from the bottom
    right: '3%', // Position from the right
    padding: '5px 10px',
    fontSize: '15px',
    backgroundColor: 'orange',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'normal',
    zIndex: 1000, // Ensure it stays above other elements
  }}
>
  Next
</button>
    </div>
  );
}

export default Kinematics;