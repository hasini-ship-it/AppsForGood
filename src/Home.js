import React from 'react';

function Home() {
  return (
    <section className="min-h-screen grid md:grid-cols-2">
      {/* Pendulum Section */}
      <div className="relative h-[50vh] md:h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg"
            alt="Physics Lab"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative">
          <div 
            className="w-4 h-48 bg-blue-400 rounded-full origin-top"
            style={{
              animation: 'pendulumSwing 2s ease-in-out infinite',
              transformOrigin: 'top center'
            }}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full absolute -bottom-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Physics in Motion</h2>
          <p className="text-gray-300">Exploring the fundamentals of mechanics</p>
        </div>
      </div>

      {/* Science Lab Section */}
      <div className="relative h-[50vh] md:h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg"
            alt="Science Lab"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        {/* Animated Bubbles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-blue-400/30 rounded-full"
            style={{
              animation: `bubbleFloat ${2 + i}s ease-in-out infinite`,
              top: `${20 + i * 15}%`,
              left: `${20 + i * 15}%`
            }}
          />
        ))}
        <div className="absolute bottom-8 right-8 text-white text-right">
          <h2 className="text-2xl font-bold mb-2">Chemical Reactions</h2>
          <p className="text-gray-300">Where science comes to life</p>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Transform Your <span className="text-blue-400">Digital Experience</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg">
            We create beautiful, functional websites that captivate your audience and drive results.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl pointer-events-auto">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;