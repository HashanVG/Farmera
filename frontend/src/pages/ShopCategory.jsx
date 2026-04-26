import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ShopCategory() {
  const { category } = useParams();

  // Capitalize the category name
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 flex flex-col items-center relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c94?q=80&w=2070&auto=format&fit=crop')" }}>
      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      <div className="relative z-10 w-full max-w-4xl mt-8">
        
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden relative">
          
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header Area */}
            <div className="bg-white/10 border-b border-white/10 p-8 md:p-10 text-center backdrop-blur-md">
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4 drop-shadow-sm">{categoryName}</h1>
              <p className="text-white/90 text-lg font-medium max-w-xl mx-auto drop-shadow">Explore our collection of premium {categoryName.toLowerCase()}.</p>
            </div>
            
            {/* Content Area */}
            <div className="p-8 md:p-12 text-center">
              <div className="w-24 h-24 bg-white/10 border border-white/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner backdrop-blur-md">
                <svg className="w-12 h-12 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Coming Soon!</h2>
              <p className="text-white/80 mb-10 max-w-lg mx-auto text-lg">
                We are currently stocking up our {categoryName.toLowerCase()} section. Check back soon for high-quality products to boost your farming success!
              </p>
              <Link to="/" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transform hover:-translate-y-1 transition-all duration-300">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ShopCategory;
