import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import userIcon from '../assets/user.png';
import cartIcon from '../assets/cart.png';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileSubsidiesOpen, setMobileSubsidiesOpen] = useState(false);
  
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [noticeCount, setNoticeCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Direct Firestore Fetch for user data
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {

        setUserData(null);
      }
    });

    const fetchNotices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'notices'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const storageKey = user ? `lastNoticeViewTime_${user.uid}` : 'lastNoticeViewTime_guest';
        const lastViewed = localStorage.getItem(storageKey) || 0;
        
        const unseen = data.filter(notice => {
          // Handle both Firestore timestamp and regular number
          const noticeTime = notice.createdAt?.toMillis ? notice.createdAt.toMillis() : (notice.createdAt?._seconds * 1000 || 0);
          return noticeTime > lastViewed;
        }).length;

        setNoticeCount(unseen);
      } catch (err) { console.error(err); }
    };




    fetchNotices();
    return () => unsubscribe();
  }, [location]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/sign-in');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


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
          <Link to="/contact-agent" className="text-white font-medium hover:text-yellow-400 transition-colors">Contact Agent</Link>
          <Link to="/messages" className="text-white font-medium hover:text-yellow-400 transition-colors relative">
            Messages
            {noticeCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-yellow-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] animate-pulse min-w-[18px] h-[18px] flex items-center justify-center">
                {noticeCount}
              </span>
            )}
          </Link>

        </nav>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all group"
                >
                  <span className="text-white font-bold text-sm hidden lg:block">Hi, {userData?.username || 'Farmer'}</span>
                  <img src={userIcon} alt="User" className="h-8 w-8 object-contain" />
                </button>
                
                {showUserDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden py-2 animate-fadeIn z-[100]">

                    {userData?.role === 'admin' && (
                      <Link to="/admin-dashboard" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Admin Panel</Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/sign-in" className="hover:opacity-80 transition-opacity">
                <img src={userIcon} alt="User" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
              </Link>
            )}
          </div>
          
          <Link to="/cart" className="relative hover:opacity-80 transition-opacity">
             <img src={cartIcon} alt="Cart" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
             {getCartCount() > 0 && (
               <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-black shadow-lg">
                 {getCartCount()}
               </span>
             )}
          </Link>
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
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {/* Backdrop blur overlay */}
        <div className="absolute inset-0 bg-green-950/80 backdrop-blur-2xl" onClick={() => setMobileMenuOpen(false)}></div>
        
        {/* Menu content */}
        <nav className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white/10 backdrop-blur-md border-l border-white/10 p-8 flex flex-col gap-6 shadow-2xl transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <img src={logo} alt="Farmera" className="h-12 object-contain" />
            <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-black hover:text-yellow-400 transition-colors py-3 border-b border-white/5">Home</Link>
            
            {/* Mobile Shop Section */}
            <div className="py-3 border-b border-white/5">
              <button 
                onClick={() => setMobileShopOpen(!mobileShopOpen)} 
                className="flex items-center justify-between text-white text-2xl font-black hover:text-yellow-400 transition-colors w-full text-left"
              >
                Shop
                <svg className={`w-6 h-6 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {mobileShopOpen && (
                <div className="flex flex-col gap-4 pl-6 pt-4 pb-2 animate-fadeIn">
                  <Link to="/shop/seeds" onClick={() => setMobileMenuOpen(false)} className="text-white/70 text-lg font-bold hover:text-yellow-400 transition-colors">Seeds</Link>
                  <Link to="/shop/plants" onClick={() => setMobileMenuOpen(false)} className="text-white/70 text-lg font-bold hover:text-yellow-400 transition-colors">Plants</Link>
                  <Link to="/shop/equipments" onClick={() => setMobileMenuOpen(false)} className="text-white/70 text-lg font-bold hover:text-yellow-400 transition-colors">Equipments</Link>
                  <Link to="/shop/fertilizers" onClick={() => setMobileMenuOpen(false)} className="text-white/70 text-lg font-bold hover:text-yellow-400 transition-colors">Fertilizers</Link>
                </div>
              )}
            </div>

            {/* Mobile Subsidies Section */}
            <div className="py-3 border-b border-white/5">
              <button 
                onClick={() => setMobileSubsidiesOpen(!mobileSubsidiesOpen)} 
                className="flex items-center justify-between text-white text-2xl font-black hover:text-yellow-400 transition-colors w-full text-left"
              >
                Subsidies
                <svg className={`w-6 h-6 transition-transform ${mobileSubsidiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {mobileSubsidiesOpen && (
                <div className="flex flex-col gap-4 pl-6 pt-4 pb-2 animate-fadeIn">
                  <Link to="/subsidies/fertilizer" onClick={() => setMobileMenuOpen(false)} className="text-white/70 text-lg font-bold hover:text-yellow-400 transition-colors">Fertilizer</Link>
                  <Link to="/subsidies/disaster-relief" onClick={() => setMobileMenuOpen(false)} className="text-white/70 text-lg font-bold hover:text-yellow-400 transition-colors">Disaster Relief</Link>
                </div>
              )}
            </div>


            <Link to="/contact-agent" onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-black hover:text-yellow-400 transition-colors py-3 border-b border-white/5">Contact Agent</Link>
            
            <Link to="/messages" onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-black hover:text-yellow-400 transition-colors py-3 border-b border-white/5 flex items-center justify-between">
              Messages
              {noticeCount > 0 && (
                <span className="bg-yellow-400 text-yellow-950 text-xs font-black px-2 py-1 rounded-full">{noticeCount}</span>
              )}
            </Link>
          </div>

          <div className="mt-auto">
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Account</p>
            {user ? (
              <button onClick={handleLogout} className="w-full bg-red-500/20 text-red-400 font-bold py-4 rounded-2xl border border-red-500/20">Sign Out</button>
            ) : (
              <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)} className="block w-full bg-yellow-400 text-yellow-950 text-center font-black py-4 rounded-2xl">Sign In</Link>
            )}
          </div>
        </nav>
      </div>

    </header>
  );
};

export default Header;
