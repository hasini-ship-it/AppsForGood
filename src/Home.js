import React, { useEffect, useState } from 'react';

function Home() {
  //controlling whether the animations is active or not
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationActive(false);
    }, 6000); // Stop animation after 6 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-900 overflow-hidden"> {/* Background css for main section*/}
      {/* Animation Styles keyframes for when the screen is smaller*/}
      <style>{`
        @keyframes bubbleFall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(90vh);
            opacity: 0;
          }
        }
        .bubble {
          animation: ${animationActive ? 'bubbleFall' : 'none'} 3s linear forwards;
        }
        @keyframes slideIn {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .slideIn {
          animation: slideIn 1s ease forwards;
        }

        @keyframes scaleUp {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2); /* Scale up to 120% */
          }
          100% {
            transform: scale(1); /* Return to original size */
          }
        }
        .scaleUp {
          animation: scaleUp 1s ease forwards;
        }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cssupernovapic.jpg" // Background image
          alt="Background" 
          className="w-full h-full object-cover opacity-50" //full screen background
        />
      </div>

      {/* Bubbles Layer */}
      <div className="relative z-10 flex items-center justify-center w-full h-screen overflow-hidden">
        {[...Array(30)].map((_, i) => { // Create 30 bubbles approx. 
          const horizontalPos = Math.random() * 100; // Random horizontal position
          const duration = 3 + Math.random() * 3; // Duration between 3s and 6s
          const delay = Math.random() * 5; // Random delay

          const style = {
            animationDelay: `${delay}s`, // Random delay for each bubble so it comes down in random
            top: `-10%`, // Start above the viewport
            left: `${horizontalPos}%`, // Position bubbles randomly
          };

          return (
            <div
              key={i} 
              className={`absolute w-6 h-6 bg-blue-400/30 rounded-full bubble`} /* the style for a bubble -- color, size with tailwind*/
              style={style}
            />
          );
        })}
      </div>

      {/* Overlay Text with background and text styling*/}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"> 
        <h1 className="text-8xl sm:text-7xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg slideIn scaleUp">
          Learn. Grow. <span className="text-orange-400">Eureka!</span>
        </h1>
      </div>
    </section>
  );
}

export default Home;
// done with the help of tailwind css documentation "https://v2.tailwindcss.com/docs"