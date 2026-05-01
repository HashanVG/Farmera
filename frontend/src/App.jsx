import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShopCategory from './pages/ShopCategory';
import FertilizerSubsidy from './pages/FertilizerSubsidy';
import DisasterReliefFund from './pages/DisasterReliefFund';
import ContactAgent from './pages/ContactAgent';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Messages from './pages/Messages';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans w-full overflow-x-hidden flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop/:category" element={<ShopCategory />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />

              {/* Protected Routes - Login Required */}
              <Route path="/subsidies/fertilizer" element={<ProtectedRoute><FertilizerSubsidy /></ProtectedRoute>} />
              <Route path="/subsidies/disaster-relief" element={<ProtectedRoute><DisasterReliefFund /></ProtectedRoute>} />
              <Route path="/contact-agent" element={<ProtectedRoute><ContactAgent /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

              {/* Admin Dashboard */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>

          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
