import React from 'react';
import iconWhatsapp from '../assets/Icons8/icons8-whatsapp-100.png';
import iconFacebook from '../assets/Icons8/icons8-facebook-100.png';
import iconLinkedin from '../assets/Icons8/icons8-linkedin-100.png';

const Footer = () => {
  return (
    <footer className="bg-[#FCD34D] w-full py-8 px-6 md:px-12 text-black border-t border-yellow-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left: Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm font-bold text-gray-900">
          <a href="#" className="hover:opacity-60 transition-opacity">Home</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Shop</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Subsidies</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Messages</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Contact Agent</a>
        </nav>

        {/* Center: Social Media Icons */}
        <div className="flex items-center justify-center gap-5">
          <a href="#" className="hover:-translate-y-1 hover:opacity-80 transition-all duration-300">
            <img src={iconWhatsapp} alt="WhatsApp" className="w-6 h-6 object-contain" />
          </a>
          <a href="#" className="hover:-translate-y-1 hover:opacity-80 transition-all duration-300">
            <img src={iconFacebook} alt="Facebook" className="w-6 h-6 object-contain" />
          </a>
          <a href="#" className="hover:-translate-y-1 hover:opacity-80 transition-all duration-300">
            <img src={iconLinkedin} alt="LinkedIn" className="w-6 h-6 object-contain" />
          </a>
        </div>

        {/* Right: Contact Information */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-semibold text-gray-900">
          <a href="#" className="hover:opacity-60 transition-opacity flex items-center gap-1">
            Email Us
          </a>
          <span className="hidden sm:inline text-gray-700 opacity-50">|</span>
          <a href="#" className="hover:opacity-60 transition-opacity flex items-center gap-1">
            WhatsApp 07104978581
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
