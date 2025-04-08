import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Kinematics() {
  const navigate = useNavigate(); // Hook for navigation
  const [distance, setDistance] = useState(0); // State to track the distance traveled
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 }); // State to track the last position of the box


  const [boxTexts] = useState([
    { term: 'Vector', def: 'Similar to a number but has a direction associated with it. For example “driving 30 mph north” would be a vector' },
    { term: 'Distance', def: 'How far something travels over the course of the entire journey: If you travel 3 feet to the left and 1 foot to the right, your distance would be 4 feet. This wouldn’t be a vector because it doesn’t have a direction associated with it because you travel in different directions during the journey.' },
    { term: 'Displacement', def: 'How far something has traveled at the end of a journey: If you travel 3 feet to the left and 1 foot to the right you’re displaced 2 feet to the right. This would be a vector because it has a direction associated with it, (to the right).' },
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

      {/* Coordinate Plane and Distance Display */}
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
    </div>
  );
}

export default Kinematics;

/* 
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
    </div>
  );
}

export default Kinematics;*/