import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const categoryBackgrounds = {
  seeds: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?q=80&w=2070&auto=format&fit=crop',
  plants: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop',
  equipments: 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?q=80&w=2070&auto=format&fit=crop',
  fertilizers: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop'
};

function ShopCategory() {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Capitalize the category name for display and matching
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';
  const categoryKey = category?.toLowerCase();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/shop');
        const data = await res.json();
        
        // Filter products by category (case-insensitive)
        const filtered = Array.isArray(data) ? data.filter(item => 
          item.category.toLowerCase() === categoryKey
        ) : [];
        
        setProducts(filtered);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryKey]);

  const bgImage = categoryKey && categoryBackgrounds[categoryKey] 
    ? categoryBackgrounds[categoryKey] 
    : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop';

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      alert("This item is out of stock!");
      return;
    }
    addToCart(product);
    alert(`Added ${product.name} to your cart!`);
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
            
            {/* Loading Spinner */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-12">
                {products.map((product) => (
                  <div key={product.id} className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                    {/* Product Image */}
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center font-black text-white/20">NO IMAGE</div>
                      )}
                      
                      {/* Stock Badge */}
                      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <span className={`text-xs font-bold ${product.stock > 10 ? 'text-green-400' : 'text-red-400'}`}>
                          {product.stock} in stock
                        </span>
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <p className="text-yellow-400 font-black text-2xl mb-6">Rs. {product.price}</p>

                      
                      <div className="mt-auto">
                        <button 
                          onClick={() => handleAddToCart(product)}
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
