import React from 'react';
import bgImage from '../assets/bg.jpg';

const Hero = () => {
  return (
    <section 
      className="relative w-full h-[600px] md:h-[700px] bg-cover bg-center bg-no-repeat flex items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 container mx-auto px-8 md:px-16 mt-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase">
            <span className="text-yellow-400">FARMERA</span> brings agriculture into the digital age.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white font-bold max-w-xl leading-snug">
            With smart tools, real-time updates, and easy access to services, farmers can manage their work efficiently and stay connected.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
