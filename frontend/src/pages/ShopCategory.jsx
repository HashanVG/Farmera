import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ShopCategory() {
  const { category } = useParams();

  // Capitalize the category name
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-gray-50 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden mt-8">
        <div className="bg-yellow-400 p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{categoryName}</h1>
          <p className="text-gray-800 text-lg">Explore our collection of premium {categoryName.toLowerCase()}.</p>
        </div>
        
        <div className="p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            We are currently stocking up our {categoryName.toLowerCase()} section. Check back soon for high-quality products to boost your farming success!
          </p>
          <Link to="/" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ShopCategory;
