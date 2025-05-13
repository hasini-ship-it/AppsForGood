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

  const [boxTexts] = useState([ // Array of flashcard vocab and definitions
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
    /* normal background css styles for app*/
    <div style={{ 
      padding: '20px',
      height: '100vh',
      width: '100%',
      backgroundImage: 'url(/cssupernovapic.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      overflowY: 'auto',
      padding: '2vh 5vw',
      alignItems: 'center',
      position: 'relative',
      opacity: 1,
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
        <p style={{  /* font styles*/
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
          gridTemplateColumns: 'repeat(2, 1fr)', //creates 2 column grid
          gap: '20px',
          marginTop: '20px',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        {/* loops through the boxTexts array with .map to create the cards */}
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
              {/* Front Side of flashcards */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#fcd66d',
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

              {/* Back Side of flashcards */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  padding: '10px',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  fontWeight: 'normal',
                }}
              >
                {item.def}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Distance vs Displacement Simulation section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '20px', // Space between the simulation and the info group
            marginTop: '50px',
          }}
        >
          {/* Coordinate Plane of Simulation */}
          <div 
            style={{
              position: 'relative',
              width: '400px',
              height: '400px',
              border: '1px solid #4a90e2',
              backgroundColor: '#ffffff',
            }}
            onDragOver={(e) => e.preventDefault()} // Allow dragging of the elements
            onDrop={(e) => {
            e.preventDefault();
            if (!box || !plane) return;


              const plane = e.currentTarget;
              const box = document.getElementById('movableBox');
              const { offsetX, offsetY } = JSON.parse(e.dataTransfer.getData('text/plain'));
             
             //gets the mouse position relative to the plane
              const rect = plane.getBoundingClientRect();
              const x = e.clientX - rect.left - offsetX;
              const y = e.clientY - rect.top - offsetY;

              // Check that the box stays inside the dimensions of the coordinate plane
              const clampedX = Math.max(0, Math.min(x, plane.clientWidth - box.clientWidth));
              const clampedY = Math.max(0, Math.min(y, plane.clientHeight - box.clientHeight));

              //moves the box to new position when dropped
              box.style.left = `${clampedX}px`;
              box.style.top = `${clampedY}px`;

              // Calculate the total distance traveled
              const dx = clampedX - lastPosition.x;
              const dy = clampedY - lastPosition.y;
              const traveled = Math.sqrt(dx * dx + dy * dy);
              setDistance((prevDistance) => prevDistance + traveled);

              setLastPosition({ x: clampedX, y: clampedY });
            }}
          >
            {/*reset button */}
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



            {/* draggable Box */}
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



          {/* Information with display and explanation */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px', // Space between the display and explanation
            }}
          >
            {/* Displacement and Distance Display */}
            <div
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#fff',
                fontSize: '16px',
                color: '#333',
                width: '300px',
                textAlign: 'center',
              }}
            >
              <p><strong>Displacement:</strong></p>
              <p>{Math.sqrt(lastPosition.x ** 2 + lastPosition.y ** 2).toFixed(2)} px</p>
              <p><strong>Distance Traveled:</strong></p>
              <p>{distance.toFixed(2)} px</p>
            </div>

            {/* Conceptual explanation Box */}
            <div
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: 'orange',
                fontSize: '16px',
                color: 'black',
                textAlign: 'center',
                width: '300px', // Match the width of the display box
              }}
            >
              <h2>The simulation shows the differences between displacement and distance.</h2>
              <p>
                You can drag the box, and it displays both displacement and distance. You'll notice that the displacement gets bigger or smaller depending on the position of the box, whereas the distance will keep increasing as the box is moved.
              </p>
            </div>
          </div>
        </div>
      {/* End of Distance vs Displacement Simulation */}
    
      {/* Second Simulation for Speed and Velocity */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', marginTop: '50px' }}>

        {/* Second Coordinate Plane */}
        <div
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            border: '1px solid #4a90e2',
            backgroundColor: '#ffffff',
          }}
          onDragOver={(e) => e.preventDefault()} // Allow dragging an element
          onDrop={(e) => { //on drop then do everything else
              e.preventDefault();
              if (!box || !plane) return;
   
            const plane = e.currentTarget; // The larger coordinate plane
            const box = document.getElementById('velocityBox'); // The red box

            // Get the offset of the mouse pointer relative to the box to find new positiotn of box
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


          {/* Draggable Red Box */}
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


        {/* Speed and Velocity Display corresponding to plane */}
        
      <div //styles for text
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#fff',
          fontSize: '16px',
          color: 'black',
          width: '200px',
          textAlign: 'center',
        }}
      >
        <p><strong>Speed:</strong></p>
        <p>{speed.toFixed(2)} px/s</p>
        <p><strong>Velocity:</strong></p>
        <p>{velocity.toFixed(2)} px/s</p>

        {/* Additional Info Box with time, distance and displacement for first coordinate plane */}
        <div //styles for background and text
          style={{
            marginTop: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff',
            fontSize: '14px',
            color: 'black',
          }}
        >
          {/* components */}
          <p><strong>Time:</strong> {((startTime ? performance.now() - startTime : 0) / 1000).toFixed(2)} s</p>
          <p><strong>Displacement:</strong> {Math.sqrt(velocityLastPosition.x ** 2 + velocityLastPosition.y ** 2).toFixed(2)} px</p>
          <p><strong>Distance:</strong> {speed.toFixed(2)} px</p>
        </div>
      </div>
      </div>
      {/* End of Second Simulation */}



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