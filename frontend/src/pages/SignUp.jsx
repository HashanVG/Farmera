import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    acceptCookies: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptCookies) {
      alert("You must accept the cookies and terms to sign up.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Sign Up successful! (Mock)");
    // Backend integration will go here
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 flex flex-col items-center justify-center relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop')" }}>
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      <div className="relative z-10 w-full max-w-2xl mt-4">
        
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-md">Join FARMERA</h1>
              <p className="text-white/80 text-lg">Create your account to start managing your farm.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 ml-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
                  />
                </div>

                {/* Email / Gmail */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 ml-1">Email (Gmail preferred)</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@gmail.com"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 ml-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="07xxxxxxxx"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 ml-1">Home/Farm Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 ml-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 ml-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
                  />
                </div>
              </div>

              {/* Accept Cookies */}
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="acceptCookies"
                    name="acceptCookies"
                    type="checkbox"
                    checked={formData.acceptCookies}
                    onChange={handleChange}
                    className="w-5 h-5 border border-white/30 rounded bg-white/10 focus:ring-3 focus:ring-green-300 accent-green-500 cursor-pointer"
                    required
                  />
                </div>
                <label htmlFor="acceptCookies" className="ml-3 text-sm font-medium text-white/90 cursor-pointer select-none">
                  I accept the Terms and Conditions and consent to the use of cookies to enhance my experience.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 mt-6"
              >
                Create Account
              </button>

              {/* Sign In Link */}
              <p className="text-center text-white/80 mt-6 font-medium">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-yellow-400 hover:text-yellow-300 hover:underline font-bold transition-colors">
                  Sign In here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
