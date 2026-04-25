import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans w-full overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
