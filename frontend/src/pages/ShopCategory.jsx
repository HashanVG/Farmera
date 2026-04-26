import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const mockData = {
  seeds: [
    { id: 1, name: 'Premium Paddy Seed', price: 'Rs. 2,500 / 5kg', stock: 150, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, name: 'Organic Tomato Seeds', price: 'Rs. 450 / pkt', stock: 320, image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=1974&auto=format&fit=crop' },
    { id: 3, name: 'Watermelon Seeds', price: 'Rs. 600 / pkt', stock: 85, image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?q=80&w=2070&auto=format&fit=crop' }
  ],
  plants: [
    { id: 4, name: 'Grafted Mango Plant', price: 'Rs. 800', stock: 45, image: 'https://images.unsplash.com/photo-1601479862899-70cbba4f89fb?q=80&w=2071&auto=format&fit=crop' },
    { id: 5, name: 'Banana Tree Shoot', price: 'Rs. 300', stock: 120, image: 'https://images.unsplash.com/photo-1598512217688-6623e1e6cb7a?q=80&w=1974&auto=format&fit=crop' },
    { id: 6, name: 'Chili Plant (Potted)', price: 'Rs. 250', stock: 200, image: 'https://images.unsplash.com/photo-1554580005-fc71720d201e?q=80&w=2070&auto=format&fit=crop' }
  ],
  equipments: [
    { id: 7, name: 'Mini Tractor', price: 'Rs. 850,000', stock: 2, image: 'https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c94?q=80&w=2070&auto=format&fit=crop' },
    { id: 8, name: 'Water Pump 2HP', price: 'Rs. 45,000', stock: 15, image: 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?q=80&w=2070&auto=format&fit=crop' },
    { id: 9, name: 'Spraying Drone', price: 'Rs. 450,000', stock: 5, image: 'https://images.unsplash.com/photo-1527066236129-b6b669fecf20?q=80&w=2076&auto=format&fit=crop' }
  ],
  fertilizers: [
    { id: 10, name: 'Urea Fertilizer (50kg)', price: 'Rs. 15,000', stock: 500, image: 'https://images.unsplash.com/photo-1627409204456-425d72f10d02?q=80&w=2070&auto=format&fit=crop' },
    { id: 11, name: 'Organic Compost (10kg)', price: 'Rs. 1,200', stock: 150, image: 'https://images.unsplash.com/photo-1615810419262-b94fbb54443a?q=80&w=1974&auto=format&fit=crop' },
    { id: 12, name: 'NPK Mix (25kg)', price: 'Rs. 8,500', stock: 300, image: 'https://images.unsplash.com/photo-1592424040984-6b2cb9d32d73?q=80&w=2070&auto=format&fit=crop' }
  ]
};

const categoryBackgrounds = {
  seeds: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?q=80&w=2070&auto=format&fit=crop',
  plants: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop',
  equipments: 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?q=80&w=2070&auto=format&fit=crop',
  fertilizers: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop'
};

function ShopCategory() {
  const { category } = useParams();
  
  // State for a simple cart notification
  const [cartAlert, setCartAlert] = useState(false);

  // Capitalize the category name
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';
  const categoryKey = category?.toLowerCase();
  
  const products = categoryKey && mockData[categoryKey] ? mockData[categoryKey] : [];

  const bgImage = categoryKey && categoryBackgrounds[categoryKey] 
    ? categoryBackgrounds[categoryKey] 
    : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop';

  const handleAddToCart = (productName) => {
    alert(`Added ${productName} to your cart!`);
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 flex flex-col items-center relative bg-cover bg-center bg-fixed transition-all duration-500" style={{ backgroundImage: `url('${bgImage}')` }}>
      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      <div className="relative z-10 w-full max-w-6xl mt-8">
        
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden relative pb-10">
          
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header Area */}
            <div className="bg-white/10 border-b border-white/10 p-8 md:p-10 text-center backdrop-blur-md mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4 drop-shadow-sm">{categoryName}</h1>
              <p className="text-white/90 text-lg font-medium max-w-xl mx-auto drop-shadow">Explore our collection of premium {categoryName.toLowerCase()}.</p>
            </div>
            
            {/* Content Area - Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-12">
                {products.map((product) => (
                  <div key={product.id} className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                    {/* Product Image */}
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      
                      {/* Stock Badge */}
                      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <span className={`text-xs font-bold ${product.stock > 10 ? 'text-green-400' : 'text-red-400'}`}>
                          {product.stock} in stock
                        </span>
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-yellow-400 font-black text-2xl mb-6">{product.price}</p>
                      
                      <div className="mt-auto">
                        <button 
                          onClick={() => handleAddToCart(product.name)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 md:p-12 text-center">
                <div className="w-24 h-24 bg-white/10 border border-white/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner backdrop-blur-md">
                  <svg className="w-12 h-12 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Coming Soon!</h2>
                <p className="text-white/80 mb-10 max-w-lg mx-auto text-lg">
                  We are currently stocking up our {categoryName.toLowerCase()} section. Check back soon!
                </p>
                <Link to="/" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-4 px-10 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transform hover:-translate-y-1 transition-all duration-300">
                  Return Home
                </Link>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default ShopCategory;
