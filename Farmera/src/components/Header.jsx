import React from 'react';
import logo from '../assets/logo.png';
import userIcon from '../assets/user.png';
import cartIcon from '../assets/cart.png';

const Header = () => {
  return (
    <header className="absolute top-0 w-full z-50 flex items-center justify-between px-8 py-6">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src={logo} alt="Farmera Logo" className="h-16 object-contain" />
      </div>

      {/* Navigation Pill */}
      <nav className="hidden md:flex bg-white/30 backdrop-blur-md rounded-full px-8 py-3 items-center justify-center gap-8">
        <a href="#" className="text-white font-bold hover:text-yellow-400 transition-colors">Home</a>
        <a href="#" className="text-white font-medium hover:text-yellow-400 transition-colors">Shop</a>
        <a href="#" className="text-white font-medium hover:text-yellow-400 transition-colors">Subsidies</a>
        <a href="#" className="text-white font-medium hover:text-yellow-400 transition-colors">Contact Agent</a>
        <a href="#" className="text-white font-medium hover:text-yellow-400 transition-colors">Messages</a>
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-6">
        <button className="hover:opacity-80 transition-opacity">
            <img src={userIcon} alt="User" className="h-10 w-10 object-contain" />
        </button>
        <button className="hover:opacity-80 transition-opacity">
           <img src={cartIcon} alt="Cart" className="h-10 w-10 object-contain" />
        </button>
      </div>
    </header>
  );
};

export default Header;
