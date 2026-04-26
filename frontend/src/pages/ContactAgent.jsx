import React, { useState } from 'react';

const ContactAgent = () => {
  const [formData, setFormData] = useState({
    officerType: 'Crops Officer',
    name: '',
    phone: '',
    message: ''
  });

  const officers = [
    {
      role: 'Crops Officer',
      name: 'Mr. Sunil Perera',
      contact: '071 234 5678',
      email: 'sunil.crops@farmera.lk',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
      ),
      gradient: 'from-green-400 to-emerald-600',
      shadow: 'shadow-green-500/30'
    },
    {
      role: 'Land Officer',
      name: 'Mrs. Kumari Silva',
      contact: '077 987 6543',
      email: 'kumari.land@farmera.lk',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ),
      gradient: 'from-yellow-400 to-amber-600',
      shadow: 'shadow-yellow-500/30'
    },
    {
      role: 'Animal Officer',
      name: 'Dr. Nimal Fernando',
      contact: '072 456 7890',
      email: 'nimal.animal@farmera.lk',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
      ),
      gradient: 'from-blue-400 to-indigo-600',
      shadow: 'shadow-blue-500/30'
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.phone || !formData.message) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    alert(`Your message has been sent to the ${formData.officerType} successfully! They will contact you soon.`);
    setFormData({ officerType: 'Crops Officer', name: '', phone: '', message: '' });
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop')" }}>
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-16 mt-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-400 mb-6 drop-shadow-lg">
            Contact Agricultural Agents
          </h1>
          <p className="text-white/90 text-xl font-medium max-w-2xl mx-auto drop-shadow">
            Connect directly with our specialized regional officers. Whether you need help with crops, land management, or livestock, our experts are here for you.
          </p>
        </div>

        {/* Officers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {officers.map((officer, index) => (
            <div key={index} className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 shadow-xl hover:${officer.shadow} group relative overflow-hidden`}>
              {/* Decorative blob behind icon */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${officer.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${officer.gradient} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                {officer.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-1">{officer.role}</h3>
              <p className="text-yellow-400 font-semibold text-lg mb-6">{officer.name}</p>
              
              <div className="space-y-3">
                <div className="flex items-center text-white/90">
                  <svg className="w-5 h-5 mr-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {officer.contact}
                </div>
                <div className="flex items-center text-white/90">
                  <svg className="w-5 h-5 mr-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {officer.email}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden relative flex flex-col md:flex-row">
          
          {/* Left Info Panel */}
          <div className="bg-gradient-to-br from-green-600/80 to-green-900/80 p-10 md:w-2/5 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow">Send a Request</h2>
            <p className="text-white/80 mb-8">
              Select the appropriate officer category and describe your issue. Our team aims to respond within 24 hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-white">
                <svg className="w-6 h-6 mr-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Available Mon-Fri, 8am-5pm
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="p-10 md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Select Officer Type */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1">Direct Message To:</label>
                <select
                  name="officerType"
                  value={formData.officerType}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all appearance-none cursor-pointer"
                >
                  <option value="Crops Officer" className="text-gray-900">Crops Officer (Mr. Sunil Perera)</option>
                  <option value="Land Officer" className="text-gray-900">Land Officer (Mrs. Kumari Silva)</option>
                  <option value="Animal Officer" className="text-gray-900">Animal Officer (Dr. Nimal Fernando)</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-10 flex items-center px-2 text-white mt-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {/* Name and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-2 ml-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="07xxxxxxxx"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="How can we help you today?"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </main>
  );
};

export default ContactAgent;
