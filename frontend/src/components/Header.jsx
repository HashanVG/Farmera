import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import userIcon from '../assets/user.png';
import cartIcon from '../assets/cart.png';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileSubsidiesOpen, setMobileSubsidiesOpen] = useState(false);

  return (
    <header className="absolute top-0 w-full z-50 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="Farmera Logo" className="h-16 object-contain" />
          </Link>
        </div>

        {/* Desktop Navigation Pill */}
        <nav className="hidden md:flex bg-white/30 backdrop-blur-md rounded-full px-8 py-3 items-center justify-center gap-8">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white font-bold hover:text-yellow-400 transition-colors">Home</Link>
          
          {/* Shop Dropdown */}
          <div className="relative group">
            <Link to="#" className="text-white font-medium hover:text-yellow-400 transition-colors flex items-center gap-1">
              Shop
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
              <div className="py-2 bg-white/95 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                <Link to="/shop/seeds" className="block px-4 py-2 text-gray-800 font-medium hover:bg-green-100 hover:text-green-700 transition-colors">Seeds</Link>
                <Link to="/shop/plants" className="block px-4 py-2 text-gray-800 font-medium hover:bg-green-100 hover:text-green-700 transition-colors">Plants</Link>
                <Link to="/shop/equipments" className="block px-4 py-2 text-gray-800 font-medium hover:bg-green-100 hover:text-green-700 transition-colors">Equipments</Link>
                <Link to="/shop/fertilizers" className="block px-4 py-2 text-gray-800 font-medium hover:bg-green-100 hover:text-green-700 transition-colors">Fertilizers</Link>
              </div>
            </div>
          </div>

          {/* Subsidies Dropdown */}
          <div className="relative group">
            <Link to="#" className="text-white font-medium hover:text-yellow-400 transition-colors flex items-center gap-1">
              Subsidies
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 pt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
              <div className="py-2 bg-white/95 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                <Link to="/subsidies/fertilizer" className="block px-4 py-2 text-gray-800 font-medium hover:bg-green-100 hover:text-green-700 transition-colors whitespace-nowrap">Fertilizer Subsidy</Link>
                <Link to="/subsidies/disaster-relief" className="block px-4 py-2 text-gray-800 font-medium hover:bg-green-100 hover:text-green-700 transition-colors whitespace-nowrap">Disaster Relief Fund</Link>
              </div>
            </div>
          </div>
          <Link to="#" className="text-white font-medium hover:text-yellow-400 transition-colors">Contact Agent</Link>
          <Link to="#" className="text-white font-medium hover:text-yellow-400 transition-colors">Messages</Link>
        </nav>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hover:opacity-80 transition-opacity">
              <img src={userIcon} alt="User" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
          </button>
          <button className="hover:opacity-80 transition-opacity">
             <img src={cartIcon} alt="Cart" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
          </button>
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white hover:text-yellow-400 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 bg-green-800/95 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-4 shadow-xl border border-white/10">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-white font-bold hover:text-yellow-400 transition-colors px-4 py-2">Home</Link>
          
          <div className="flex flex-col">
            <button 
              onClick={() => setMobileShopOpen(!mobileShopOpen)} 
              className="flex items-center justify-between text-white font-medium hover:text-yellow-400 transition-colors px-4 py-2 w-full text-left"
            >
              Shop
              <svg className={`w-4 h-4 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {mobileShopOpen && (
              <div className="flex flex-col gap-2 pl-8 pr-4 pt-2 pb-2 bg-green-900/50 rounded-xl mt-1">
                <Link to="/shop/seeds" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-yellow-400 py-1 transition-colors">Seeds</Link>
                <Link to="/shop/plants" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-yellow-400 py-1 transition-colors">Plants</Link>
                <Link to="/shop/equipments" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-yellow-400 py-1 transition-colors">Equipments</Link>
                <Link to="/shop/fertilizers" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-yellow-400 py-1 transition-colors">Fertilizers</Link>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <button 
              onClick={() => setMobileSubsidiesOpen(!mobileSubsidiesOpen)} 
              className="flex items-center justify-between text-white font-medium hover:text-yellow-400 transition-colors px-4 py-2 w-full text-left"
            >
              Subsidies
              <svg className={`w-4 h-4 transition-transform ${mobileSubsidiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {mobileSubsidiesOpen && (
              <div className="flex flex-col gap-2 pl-8 pr-4 pt-2 pb-2 bg-green-900/50 rounded-xl mt-1">
                <Link to="/subsidies/fertilizer" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-yellow-400 py-1 transition-colors">Fertilizer Subsidy</Link>
                <Link to="/subsidies/disaster-relief" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-yellow-400 py-1 transition-colors">Disaster Relief Fund</Link>
              </div>
            )}
          </div>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-yellow-400 transition-colors px-4 py-2">Contact Agent</Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-yellow-400 transition-colors px-4 py-2">Messages</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
