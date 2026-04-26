import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Admin login logic
    if (formData.username === 'admin@gmail.com' && formData.password === 'admin') {
      alert("Admin Sign In successful! Redirecting to Dashboard...");
      navigate('/admin-dashboard');
    } else {
      alert("Sign In successful! (Standard User Mock)");
      navigate('/');
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 flex flex-col items-center justify-center relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop')" }}>
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      <div className="relative z-10 w-full max-w-md mt-4">
        
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-md">Welcome Back</h1>
              <p className="text-white/80 text-lg">Sign in to manage your FARMERA account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username / Email */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1">Username or Email</label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1 flex justify-between">
                  <span>Password</span>
                  <Link to="#" className="text-yellow-400 hover:text-yellow-300 font-medium text-xs hover:underline transition-colors">Forgot?</Link>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mt-8"
              >
                Sign In
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-white/80 mt-6 font-medium">
                Don't have an account yet?{' '}
                <Link to="/sign-up" className="text-green-400 hover:text-green-300 hover:underline font-bold transition-colors">
                  Sign Up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
