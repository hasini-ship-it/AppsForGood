import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useNavigate } from 'react-router-dom';

const KinematicsConcepts = () => {
  const navigate = useNavigate();

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
      opacity: 1, 
    }}>
    <p style={{color: 'white', textAlign: 'center', fontSize: '40px', marginTop: '8%', marginLeft: '15%', marginRight: '15%', fontWeight: 'bold'}}>
        Kinematics Concepts: Equations of Motion 
      </p>
      {/* Velocity Info Section */}
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: 'orange',
          fontSize: '16px',
          color: 'black',
          textAlign: 'center',
          marginLeft: '10%',
          marginRight: '10%',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Velocity</h2>
        <p>
          Let's look back at the definition of velocity: "the total displacement an object went through during some time". This can be expressed as an equation, that being: <InlineMath math="velocity = \frac{\Delta \text{distance}}{\Delta \text{time}}" /> or <InlineMath math="velocity = \frac{\Delta x}{\Delta t}" />
          <br /><br />
          The triangles or deltas represent change in something. For example, say a block goes from <InlineMath math="x = 4" /> to <InlineMath math="x = 7" />, then <InlineMath math="\Delta x = 3" /> as shown by <InlineMath math="x_f - x_i" />.
          <br /><br />
          This can be seen in the way we reference velocity in everyday life: miles per hour or meters per second. How many meters are traveled in some amount of seconds. This is why velocity is a vector quantity—because you cannot move without a direction; every movement results in starting somewhere and going somewhere else.
        </p>
      </div>

      {/* Acceleration Info Section */}
      <div
        style={{
            marginTop: '50px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: 'orange',
            fontSize: '16px',
            color: 'black',
            textAlign: 'center',
            marginLeft: '10%',
            marginRight: '10%',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Acceleration</h2>
        <p>
          You may notice an issue with the previous example: when you go on a car ride you aren't always going at 30 mph. More often than not, your velocity fluctuates during the ride. This is where acceleration comes into play. Acceleration is something's change in velocity over some period of time.
          <br /><br />
          <InlineMath math="acceleration = \frac{\Delta \text{velocity}}{\text{time}}" />
          <br /><br />
          The triangle next to velocity is delta and represents the change in velocity. Another way to show this would be to write <InlineMath math="a = \frac{v_f - v_i}{t}" />. Since acceleration is the change in velocity (m/s) over time (s), we write acceleration as <InlineMath math="a = \frac{m/s}{s}" /> or <InlineMath math="a = \frac{m}{s^2}" />.
          <br /><br />
          This is also shown in how we describe acceleration in everyday life: meters per second per second (m/s²). If you were to accelerate at 10 m/s² for 5 seconds, you would have a final velocity of 50 m/s.
        </p>
      </div>

      {/* Equations Info Section */}
      <div
        style={{
            marginTop: '50px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: 'orange',
            fontSize: '16px',
            color: 'black',
            textAlign: 'center',
            marginLeft: '10%',
            marginRight: '10%',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Equations of Motion</h2>
        <p>
          From these definitions, we can form our first equation of motion. Acceleration, being the change in velocity over time, allows us to form the following equation:
          <br /><br />
          <BlockMath math="v_f = v_i + at" />
          This is the first of three equations of motion. The second equation is formed by using the average velocity and multiplying that by the time. This works because we know <InlineMath math="\text{distance} = \text{velocity} \cdot \text{time}" /> for situations where velocity isn't changing. However, even when there is a change in velocity, the average velocity can be used to find the distance traveled. Thus we get the second equation:
          <br /><br />
          <InlineMath math="\Delta \text{distance} = \frac{v_i + v_f}{2} \cdot t" />
          <br /><br />
          The third and final equation of motion is formed by using the first two equations. If we plug the first equation into the second, we get:
          <br /><br />
          <InlineMath math="\Delta \text{distance} = \frac{v_i + (v_i + at)}{2} \cdot t" /> &nbsp;&nbsp; which simplifies to &nbsp;&nbsp; <InlineMath math="\Delta \text{distance} = v_i \cdot t + \frac{1}{2} at^2" />
          <br /><br />
          The final equation of motion can similarly be derived. First, we take the first equation: <InlineMath math="v_f = v_i + at" />. Then rearrange it as <InlineMath math="t = \frac{v_f - v_i}{a}" />. This gives us:
          <br /><br />
          <InlineMath math="\Delta \text{distance} = \frac{v_i + v_f}{2} \cdot \frac{v_f - v_i}{a}" /> &nbsp;&nbsp; which simplifies to &nbsp;&nbsp; <InlineMath math="\Delta \text{distance} = \frac{v_f^2 - v_i^2}{2a}" />
          <br /><br />
          which we then rearrange into the fourth equation.
          <br /><br />
          <button
  style={{
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: 'white',
    color: 'black',
    border: '3px solid black',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
  onClick={() => window.location.href = '/projectile.html'} 
>
  Projectiles
</button>

          <br /><br />
          These equations are the basis of kinematics. They each help describe the relationship between time, displacement, velocity, and acceleration, and are used to solve a variety of problems.
        </p>
      </div>
    </div>
  );
};

export default KinematicsConcepts;