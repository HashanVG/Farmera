import React, { useState } from 'react';

const mockMessages = [
  {
    id: 1,
    sender: 'Ministry of Agriculture',
    date: 'Oct 26, 2026 - 09:30 AM',
    title: 'Fertilizer Subsidy Circular No. 45',
    image: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1974&auto=format&fit=crop',
    isUnread: true
  },
  {
    id: 2,
    sender: 'Agricultural Admin',
    date: 'Oct 24, 2026 - 02:15 PM',
    title: 'Notice regarding Weather Conditions',
    image: 'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?q=80&w=2070&auto=format&fit=crop',
    isUnread: false
  },
  {
    id: 3,
    sender: 'Regional Secretariat',
    date: 'Oct 20, 2026 - 11:00 AM',
    title: 'Disaster Relief Form Guidelines',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
    isUnread: false
  }
];

const Messages = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 flex flex-col items-center relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=2070&auto=format&fit=crop')" }}>
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>

      <div className="relative z-10 w-full max-w-4xl mt-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-400 mb-4 drop-shadow-md">
            Official Notices
          </h1>
          <p className="text-white/90 text-lg font-medium max-w-xl mx-auto drop-shadow">
            View scanned letters and official documents uploaded by the administrative team.
          </p>
        </div>

        {/* Messages Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockMessages.map((msg) => (
            <div key={msg.id} className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden relative group hover:bg-white/15 transition-all duration-300 flex flex-col">
              
              {/* Unread Indicator */}
              {msg.isUnread && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)] z-20"></div>
              )}

              {/* Message Header */}
              <div className="p-5 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div className="truncate">
                    <h3 className="text-white font-bold text-base truncate">{msg.sender}</h3>
                    <p className="text-white/50 text-xs">{msg.date}</p>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-yellow-400 truncate" title={msg.title}>{msg.title}</h2>
              </div>

              {/* Letter Image */}
              <div className="flex-grow p-4">
                <div 
                  className="w-full h-80 rounded-xl overflow-hidden border-2 border-white/10 shadow-lg relative cursor-pointer group-hover:border-yellow-400/50 transition-colors"
                  onClick={() => setSelectedImage(msg.image)}
                >
                  <img src={msg.image} alt={msg.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm font-bold flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                      Click to read letter
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={selectedImage} alt="Full Letter" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

    </main>
  );
};

export default Messages;
