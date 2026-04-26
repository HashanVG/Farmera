import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShopCategory from './pages/ShopCategory';
import FertilizerSubsidy from './pages/FertilizerSubsidy';
import DisasterReliefFund from './pages/DisasterReliefFund';
import ContactAgent from './pages/ContactAgent';

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
            <Route path="/subsidies/disaster-relief" element={<DisasterReliefFund />} />
            <Route path="/contact-agent" element={<ContactAgent />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
