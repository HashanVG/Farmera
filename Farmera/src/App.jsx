import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans w-full overflow-x-hidden">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
