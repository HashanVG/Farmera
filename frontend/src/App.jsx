import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShopCategory from './pages/ShopCategory';
import FertilizerSubsidy from './pages/FertilizerSubsidy';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans w-full overflow-x-hidden flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:category" element={<ShopCategory />} />
            <Route path="/subsidies/fertilizer" element={<FertilizerSubsidy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
