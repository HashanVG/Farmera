import React from 'react';
import imgDrone from '../assets/19396.jpg';
import imgFarmers from '../assets/2569.jpg';
import imgTractor from '../assets/501.jpg';

const AboutSection = () => {
  return (
    <section 
      className="relative w-full py-24 px-4 md:px-8 bg-cover bg-center bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[3rem] p-8 md:p-16 overflow-hidden">
        
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 relative z-10">
          
          {/* Row 1 */}
          <div className="flex justify-center md:justify-end">
            <img src={imgDrone} alt="Drone spraying field" className="w-[90%] h-auto object-cover rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex items-center pl-4 md:pl-0">
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed pr-8 drop-shadow-md">
              <span className="text-yellow-400 font-bold">FARMERA</span> is a smart agriculture platform designed to support farmers in every step of their journey. From accessing farming resources and government subsidies to connecting with markets and experts, FARMERA brings everything into one convenient digital space. It aims to simplify farming processes, improve efficiency, and build a stronger agricultural community.
            </p>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right pr-4 md:pr-0">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight drop-shadow-lg">Vision</h2>
            <p className="text-lg md:text-xl font-medium text-white/90 max-w-sm leading-relaxed drop-shadow-md">
              To empower farmers through digital innovation and create a sustainable, connected agricultural future.
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            <img src={imgFarmers} alt="Farmers looking at tablet" className="w-[90%] h-auto object-cover rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-500" />
          </div>

          {/* Row 3 */}
          <div className="flex justify-center md:justify-end">
            <img src={imgTractor} alt="Tractor in orchard" className="w-[90%] h-auto object-cover rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left pl-4 md:pl-0">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight drop-shadow-lg">Mission</h2>
            <p className="text-lg md:text-xl font-medium text-white/90 max-w-sm leading-relaxed drop-shadow-md">
              To provide farmers with easy access to modern tools, market opportunities, subsidies, and expert support, helping them improve productivity and livelihoods.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
