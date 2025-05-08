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
    <div style={{ position: 'relative', backgroundColor: '#cce4f6', padding: '20px', overflow: 'auto' }}>
      {/* Back Button */}
      

      {/* Intro Paragraph */}
      <p style={{ textAlign: 'center', fontSize: '40px', marginTop: '50px', marginLeft: '15%', marginRight: '15%', color: '#333' }}>
        Kinematics
      </p>
      <p style={{ textAlign: 'center', fontSize: '25px', marginTop: '75px', marginLeft: '15%', marginRight: '15%', color: '#333' }}>
        Kinematics is the branch of physics that deals with how objects move without considering the mass of objects or the forces acting on them. This lesson focuses on introducing you to the basics of kinematics and getting you comfortable with terms which will both be built on in further lessons. Below are the first set of terms.
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
                  backgroundColor: '#4a90e2',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  padding: '10px',
                  boxSizing: 'border-box',
                  color: 'white' 
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
                  backgroundColor: '#BCDEF5',
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
      {/*start of box bullshittery*/}
        {/* Simulation and Info Container */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '20px', // Space between the simulation and the info group
            marginTop: '50px',
          }}
        >
          {/* Coordinate Plane (Simulation) */}
          <div
            style={{
              position: 'relative',
              width: '400px',
              height: '400px',
              border: '1px solid #4a90e2',
              backgroundColor: '#ffffff',
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
          {/* Info Group (Display and Explanation) */}
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

            {/* Explanation Box */}
            <div
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#4a90e2',
                fontSize: '16px',
                color: '#ffffff',
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
            border: '1px solid #4a90e2',
            backgroundColor: '#ffffff',
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
          color: 'black',
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
            backgroundColor: '#fff',
            fontSize: '14px',
            color: 'black',
          }}
        >
          <p><strong>Time:</strong> {((startTime ? performance.now() - startTime : 0) / 1000).toFixed(2)} s</p>
          <p><strong>Displacement:</strong> {Math.sqrt(velocityLastPosition.x ** 2 + velocityLastPosition.y ** 2).toFixed(2)} px</p>
          <p><strong>Distance:</strong> {speed.toFixed(2)} px</p>
        </div>
      </div>
      {/* end of additional bullshittery */}
      </div>
      {/* End of Second Simulation */}
      {/* Acceleration Info Section */}
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#4a90e2',
          fontSize: '16px',
          color: '#ffffff',
          textAlign: 'center',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Velocity</h2>
        <p>
        Let's look back at the definition of velocity "the total displacement an object went through during some time". This can be expressed as an equation, that being: <InlineMath math="velocity = \frac{\Delta distance}{\Delta time}" /> or <InlineMath math="velocity = \frac{\Delta x}{\Delta t}" />
        <br></br><br></br>The triangles or deltas represent change in something. For examples, say a block goes from <InlineMath math="x = 4"/> to <InlineMath math="x = 7"/> the <InlineMath math="\Delta x = 3"/> as shown by <InlineMath math="x_f - x_i" />.
        <br></br><br></br>This can be seen in the way we reference velocity in everyday life, miles per hour or meters per second. How many meters are travelled in some amount of seconds. This is why velocity is a vector quantity, because you cannot move without a direction, every movement results in starting somewhere and going somewhere else.
        </p>
      </div>
      {/* Velocity Info Section */}
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#4a90e2',
          fontSize: '16px',
          color: '#ffffff',
          textAlign: 'center',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Acceleration</h2>
        <p>
        You may notice an issue with the previous example, when you go on a car ride you aren’t always going at 30mph, more often than not your velocity fluctuates during the car ride. This is where acceleration comes into play. Acceleration is something's change in velocity over some period of time. <br></br><br></br><InlineMath math="acceleration = \frac{\Delta velocity}{time}" />.<br></br><br></br> The triangle next to velocity is delta and represents the change in velocity, another way to show this would be to write <InlineMath math="a = \frac{v_f - v_i}{t}" />. Since acceleration is the change in velocity (m/s) over time (s) we write acceleration as <InlineMath math="a = \frac{m/s}{s}" /> or <InlineMath math="a = \frac{m}{s^2}" />. This is also shown in how we describe acceleration in everyday life: meters per second per second (m/s²). If you were to accelerate at 10 m/s² for 5 seconds, you would have a final velocity of 50 m/s.
        </p>
      </div>
      {/* Equations Info Section */}
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#4a90e2',
          fontSize: '16px',
          color: '#ffffff',
          textAlign: 'center',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Equations of Motion</h2>
        <p>
          From these definitions we can form our first equation of motion. Acceleration beign the change in velocity over time, we can multiply acceleration by time to get the change in velocity (as seen in the acceleration example). This allows us to form the following equation:<br></br><br></br><BlockMath math="v_f = v_i + at" />
          This is the first of three equations of motion. The second equation is formed by using the average velocity and multiplying that by the time. This works because we know <InlineMath math="distance = {velocity} \cdot {time}" /> for situations where velocity isn't changing. However, even when there is a change in velocity, the average velocity can be used to find the distance travelled. This is because the average velocity is the same as splitting the velocity up by time. Thus we get the second equation<br></br><br></br> <InlineMath math="\Delta distance = \frac{v_i + v_f}{2}\cdot {t}"></InlineMath><br></br><br></br>
          The third and final equation of motion is formed by using the first two equations. We know that <InlineMath math="v_f = v_i + at" /> and <InlineMath math="\Delta distance = \frac{v_i + v_f}{2}\cdot {t}" />. If we were to plug in the first equation into the second we would get:<br></br><br></br><br></br><InlineMath math="\Delta distance = \frac{v_i + (v_i + at)}{2}\cdot {t}" />    &nbsp;&nbsp;           Which can be simplified to:      &nbsp;&nbsp;        <InlineMath math="\Delta distance = v_i\cdot {t} + \frac{1}{2}at^2" /><br></br><br></br><br></br>
          The final equation of motion can similarly be derived. First we take the first equation of motion: <InlineMath math="v_f = v_i + at" />. Then we can rearrange to become <InlineMath math="t = \frac{v_i + v_f} {a}" />. Then we can plus this into the second equation of motion: <InlineMath math="\Delta distance = \frac{v_i + v_f}{2}\cdot {t}" /> This gives us:<br></br><br></br><br></br><InlineMath math="\Delta distance = \frac{v_i + v_f}{2}\cdot {\frac{v_f - v_i}{a}}" />    &nbsp;&nbsp;           Which can be simplified to:      &nbsp;&nbsp;        <InlineMath math="\Delta distance = \frac{(v_f^2 - v_i^2)}{2a}" /><br></br><br></br><br></br>which we can then further rearrange into the fourth equation:<br></br><br></br><InlineMath math="v_f^2 = v_i^2 + 2a\Delta x" /><br></br>
          <br></br><br></br>These equations are the basis of kinematics. They each help describe the relationship between, time, displacement, velocity, and acceleration, and these will be used to solve a variety of problems.
        </p>
      </div>
      <div> 
          <iframe src= {process.env.PUBLIC_URL + '/projectiles.html'}> 

          </iframe>
      </div>
    </div>
     
        );
}


export default Kinematics;