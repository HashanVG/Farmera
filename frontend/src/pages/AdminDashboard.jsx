import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 flex flex-col items-center justify-center relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c94?q=80&w=2070&auto=format&fit=crop')" }}>
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      <div className="relative z-10 w-full max-w-4xl mt-4 text-center">
        
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-md">Admin Dashboard</h1>
            <p className="text-white/80 text-xl font-medium mb-10 max-w-2xl mx-auto">
              Welcome, Administrator. The full management dashboard is currently under construction. Check back later to manage users, messages, and inventory.
            </p>
            <Link to="/" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transform hover:-translate-y-1 transition-all duration-300">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
