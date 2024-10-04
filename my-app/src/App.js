// src/App.js

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';  // Import Hero component
import AboutUs from './components/AboutUs';  // Import AboutUs component
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main>
        {/* About Us Section */}
        <AboutUs />
        
        {/* You can add other sections like Features, Contact, etc., here in the future */}
      </main>
    </div>
  );
}

export default App;
