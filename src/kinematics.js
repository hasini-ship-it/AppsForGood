import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './kinematics.css';


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
    { term: 'Distance', def: 'How far something travels over the course of the entire journey: If you travel 3 feet to the left and 1 foot to the right, your distance would be 4 feet. This wouldn’t be a vector because it doesn’t have a direction associated with it because you travel in different directions during the journey.' },
    { term: 'Displacement', def: 'How far something has traveled at the end of a journey: If you travel 3 feet to the left and 1 foot to the right you’re displaced 2 feet to the right. This would be a vector because it has a direction associated with it, (to the right).' },
    { term: 'Speed', def: 'How much distance was traveled in a certain amount of time.' },
    { term: 'Velocity', def: 'How far something was displaced in the time it took for that object to be displaced. This is a vector because displacement is a vector' },
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
    <div style={{ position: 'relative', backgroundColor: '#f0f0f0', padding: '20px', overflow: 'auto' }}>
      {/* Back Button */}
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/topics')}
      >
        Back
      </button>

      {/* Intro Paragraph */}
      <p style={{ textAlign: 'center', fontSize: '30px', marginTop: '50px', marginLeft: '15%', marginRight: '15%', color: '#333' }}>
        Kinematics is the branch of physics that deals with the motion of objects without considering the forces that cause the motion.
      </p>

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
                  backgroundColor: '#ffffff',
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
                  backgroundColor: '#dfefff',
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
    </div>)
      {/*start of box bullshittery*/}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', marginTop: '50px' }}>
        {/* Coordinate Plane */}
        <div
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            border: '1px solid #000',
            backgroundColor: '#eaeaea',
          }}
          onDragOver={(e) => e.preventDefault()} // Allow dropping
          onDrop={(e) => {
            const plane = e.currentTarget; // The larger coordinate plane
            const box = document.getElementById('movableBox'); // The blue box
            const { offsetX, offsetY } = JSON.parse(
              e.dataTransfer.getData('text/plain')
            ); // Retrieve the offset
            const rect = plane.getBoundingClientRect(); // Get the bounding rectangle of the plane
            const x = e.clientX - rect.left - offsetX; // Calculate the new x position
            const y = e.clientY - rect.top - offsetY; // Calculate the new y position

            // Ensure the box stays within the bounds of the coordinate plane
            const clampedX = Math.max(
              0,
              Math.min(x, plane.clientWidth - box.clientWidth)
            );
            const clampedY = Math.max(
              0,
              Math.min(y, plane.clientHeight - box.clientHeight)
            );

            // Update the position of the blue box
            box.style.left = `${clampedX}px`;
            box.style.top = `${clampedY}px`;

            // Calculate the distance traveled
            const dx = clampedX - lastPosition.x;
            const dy = clampedY - lastPosition.y;
            const traveled = Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem
            setDistance((prevDistance) => prevDistance + traveled);

            // Update the last position
            setLastPosition({ x: clampedX, y: clampedY });
          }}
        >
        {/* Reload Button */}
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '10px 20px',
            fontSize: '16px',
          }}
          onClick={() => {
            // Reset the blue box position
            const box = document.getElementById('movableBox');
            box.style.left = '0px';
            box.style.top = '0px';

            // Reset distance and last position
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
              // Store the offset of the mouse pointer relative to the box
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
            width: '200px',
            textAlign: 'center',
          }}
        >
          <p><strong>Displacement:</strong></p>
          <p>{Math.sqrt(lastPosition.x ** 2 + lastPosition.y ** 2).toFixed(2)} px</p>
        </div>
        {/* Distance Display */}
        <div
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff',
            fontSize: '16px',
            color: '#333',
            width: '200px',
            textAlign: 'center',
          }}
        >
          <p><strong>Distance Traveled:</strong></p>
          <p>{distance.toFixed(2)} px</p>
        </div>
      </div>
      {/*end of bullshittery*/}
      {/* Additional bullshittery */}
      {/* Second Simulation: Speed and Velocity */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', marginTop: '50px' }}>
        {/* Coordinate Plane */}
        <div
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            border: '1px solid #000',
            backgroundColor: '#eaeaea',
          }}
          onDragOver={(e) => e.preventDefault()} // Allow dropping
          onDrop={(e) => {
            const plane = e.currentTarget; // The larger coordinate plane
            const box = document.getElementById('velocityBox'); // The red box
            const { offsetX, offsetY } = JSON.parse(
              e.dataTransfer.getData('text/plain')
            ); // Retrieve the offset
            const rect = plane.getBoundingClientRect(); // Get the bounding rectangle of the plane
            const x = e.clientX - rect.left - offsetX; // Calculate the new x position
            const y = e.clientY - rect.top - offsetY; // Calculate the new y position

            // Ensure the box stays within the bounds of the coordinate plane
            const clampedX = Math.max(
              0,
              Math.min(x, plane.clientWidth - box.clientWidth)
            );
            const clampedY = Math.max(
              0,
              Math.min(y, plane.clientHeight - box.clientHeight)
            );

            // Update the position of the red box
            box.style.left = `${clampedX}px`;
            box.style.top = `${clampedY}px`;

            // Calculate displacement and velocity
            const dx = clampedX - velocityLastPosition.x;
            const dy = clampedY - velocityLastPosition.y;
            const displacement = Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem
            const currentTime = performance.now();
            const timeElapsed = (currentTime - startTime) / 1000; // Time in seconds

            if (timeElapsed > 0) {
              setVelocity(displacement / timeElapsed); // Velocity = displacement / time
              setSpeed((prevSpeed) => prevSpeed + displacement); // Speed = total distance traveled
            }

            // Update the last position
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
              // Reset the red box position
              const box = document.getElementById('velocityBox');
              box.style.left = '0px';
              box.style.top = '0px';

              // Reset speed, velocity, last position, and start time
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
              // Start the timer on the first drag
              if (!startTime) {
                setStartTime(performance.now());
              }

              // Store the offset of the mouse pointer relative to the box
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
          width: '200px',
          textAlign: 'center',
        }}
      >
        <p><strong>Speed:</strong></p>
        <p>{speed.toFixed(2)} px/s</p>
        <p><strong>Velocity:</strong></p>
        <p>{velocity.toFixed(2)} px/s</p>

        {/* Additional Info Box */}
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            fontSize: '14px',
            color: '#333',
          }}
        >
          <p><strong>Time:</strong> {((startTime ? performance.now() - startTime : 0) / 1000).toFixed(2)} s</p>
          <p><strong>Displacement:</strong> {Math.sqrt(velocityLastPosition.x ** 2 + velocityLastPosition.y ** 2).toFixed(2)} px</p>
          <p><strong>Distance:</strong> {speed.toFixed(2)} px</p>
        </div>
      </div>
      {/* end of additional bullshittery */}
      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '18px',
          color: '#333',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <p>
          <strong>V = X / T:</strong>
        </p>
        <p>
          We can take the definition of velocity that was just given and use it to form an equation for velocity. The displacement of an object can be represented by a displacement X, and since this is on time we divide this displacement by T: giving us the equation X/T. This is also shown in how we describe velocity in everyday life: miles per hour (mph), meters per second (m/s). If you traveled 5 miles in a 10-minute car ride, you would have the velocity being 0.5 miles per minute or 30 miles per hour.
        </p>
      </div>

      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '18px',
          color: '#333',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <p>
          <strong>Acceleration:</strong>
        </p>
        <p>
          You may notice an issue with the previous example, when you go on a car ride you aren’t always going at 30mph, more often than not your velocity fluctuates during the car ride. This is where acceleration comes into play. Acceleration is simply the change in velocity. For example, an acceleration of 2 means the velocity is increasing by 2m/s each time. Acceleration is described as m/s² because it's the change in velocity (m/s) over time, which then leads to the extra s.
        </p>
      </div>

      {/* Kinematic Equations Section */}
      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '18px',
          color: '#333',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
    </div>
  </div>
}


export default Kinematics;