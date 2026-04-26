import React from 'react';
import imgDrone from '../assets/19396.jpg';
import imgFarmers from '../assets/2569.jpg';
import imgTractor from '../assets/501.jpg';

const AboutSection = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto py-24 px-4 md:px-8 bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 relative z-10">
        
        {/* Row 1 */}
        <div className="flex justify-end">
          <img src={imgDrone} alt="Drone spraying field" className="w-[90%] h-auto object-cover" />
        </div>
        <div className="flex items-center pl-4 md:pl-0">
          <p className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed pr-8">
            FARMERA is a smart agriculture platform designed to support farmers in every step of their journey. From accessing farming resources and government subsidies to connecting with markets and experts, FARMERA brings everything into one convenient digital space. It aims to simplify farming processes, improve efficiency, and build a stronger agricultural community.
          </p>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col items-end justify-center text-right pr-4 md:pr-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">Vision</h2>
          <p className="text-lg md:text-xl font-semibold text-gray-800 max-w-sm leading-relaxed">
            To empower farmers through digital innovation and create a sustainable, connected agricultural future.
          </p>
        </div>
        <div className="flex justify-start">
          <img src={imgFarmers} alt="Farmers looking at tablet" className="w-[90%] h-auto object-cover" />
        </div>

        {/* Row 3 */}
        <div className="flex justify-end">
          <img src={imgTractor} alt="Tractor in orchard" className="w-[90%] h-auto object-cover" />
        </div>
        <div className="flex flex-col items-start justify-center pl-4 md:pl-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">Mission</h2>
          <p className="text-lg md:text-xl font-semibold text-gray-800 max-w-sm leading-relaxed">
            To provide farmers with easy access to modern tools, market opportunities, subsidies, and expert support, helping them improve productivity and livelihoods.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
