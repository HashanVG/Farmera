import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconWhatsapp from '../assets/Icons8/icons8-whatsapp-100.png';
import iconFacebook from '../assets/Icons8/icons8-facebook-100.png';
import iconLinkedin from '../assets/Icons8/icons8-linkedin-100.png';

const Footer = () => {
  const [shopOpen, setShopOpen] = useState(false);
  const [subsidiesOpen, setSubsidiesOpen] = useState(false);

  return (
    <footer className="bg-[#FCD34D] w-full py-8 px-6 md:px-12 text-black border-t border-yellow-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left: Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm font-bold text-gray-900">
          <Link to="/" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setShopOpen(false); setSubsidiesOpen(false); }} className="hover:opacity-60 transition-opacity">Home</Link>
          
          {/* Shop Dropup */}
          <div className="relative group">
            <button 
              onClick={() => { setShopOpen(!shopOpen); setSubsidiesOpen(false); }}
              className="hover:opacity-60 transition-opacity flex items-center gap-1 font-bold outline-none"
            >
              Shop
              <svg className={`w-4 h-4 transition-transform ${shopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            </button>
            <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-lg transition-all duration-300 overflow-hidden transform origin-bottom z-50 ${shopOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 md:group-hover:opacity-100 md:group-hover:visible md:group-hover:scale-100'}`}>
              <div className="py-2 border border-yellow-200 rounded-xl">
                <Link to="/shop/seeds" onClick={() => setShopOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-yellow-100 hover:text-yellow-900 transition-colors text-center">Seeds</Link>
                <Link to="/shop/plants" onClick={() => setShopOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-yellow-100 hover:text-yellow-900 transition-colors text-center">Plants</Link>
                <Link to="/shop/equipments" onClick={() => setShopOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-yellow-100 hover:text-yellow-900 transition-colors text-center">Equipments</Link>
                <Link to="/shop/fertilizers" onClick={() => setShopOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-yellow-100 hover:text-yellow-900 transition-colors text-center">Fertilizers</Link>
              </div>
            </div>
          </div>

          {/* Subsidies Dropup */}
          <div className="relative group">
            <button 
              onClick={() => { setSubsidiesOpen(!subsidiesOpen); setShopOpen(false); }}
              className="hover:opacity-60 transition-opacity flex items-center gap-1 font-bold outline-none"
            >
              Subsidies
              <svg className={`w-4 h-4 transition-transform ${subsidiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            </button>
            <div className={`absolute left-1/2 -translate-x-1/2 bottom-full pb-2 w-56 transition-all duration-300 transform origin-bottom z-50 ${subsidiesOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 md:group-hover:opacity-100 md:group-hover:visible md:group-hover:scale-100'}`}>
              <div className="py-2 bg-white/95 backdrop-blur-md rounded-xl border border-yellow-200 shadow-xl">
                <Link to="/subsidies/fertilizer" onClick={() => setSubsidiesOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-yellow-100 hover:text-yellow-900 transition-colors text-center whitespace-nowrap">Fertilizer Subsidy</Link>
                <Link to="/subsidies/disaster-relief" onClick={() => setSubsidiesOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-yellow-100 hover:text-yellow-900 transition-colors text-center whitespace-nowrap">Disaster Relief Fund</Link>
              </div>
            </div>
          </div>
          <Link to="/messages" onClick={() => { setShopOpen(false); setSubsidiesOpen(false); }} className="hover:opacity-60 transition-opacity">Messages</Link>
          <Link to="/contact-agent" onClick={() => { setShopOpen(false); setSubsidiesOpen(false); }} className="hover:opacity-60 transition-opacity">Contact Agent</Link>
        </nav>


        {/* Center: Social Media Icons */}
        <div className="flex items-center justify-center gap-5">
          <a href="https://wa.me/94710497858" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 hover:opacity-80 transition-all duration-300">
            <img src={iconWhatsapp} alt="WhatsApp" className="w-6 h-6 object-contain" />
          </a>
          <a href="https://www.facebook.com/hashan.vidanagamage" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 hover:opacity-80 transition-all duration-300">
            <img src={iconFacebook} alt="Facebook" className="w-6 h-6 object-contain" />
          </a>
          <a href="#" className="hover:-translate-y-1 hover:opacity-80 transition-all duration-300">
            <img src={iconLinkedin} alt="LinkedIn" className="w-6 h-6 object-contain" />
          </a>
        </div>

        {/* Right: Contact Information */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-semibold text-gray-900">
          <a href="mailto:contact@farmera.com" className="hover:opacity-60 transition-opacity flex items-center gap-1">
            Email Us
          </a>
          <span className="hidden sm:inline text-gray-700 opacity-50">|</span>
          <a href="https://wa.me/94710497858" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity flex items-center gap-1">
            WhatsApp 0710497858
          </a>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
