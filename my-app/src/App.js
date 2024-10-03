// src/App.js

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';  // Import Hero component
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Other Content */}
      <main>
        {/* Add other sections like Features, FAQs, etc. */}
      </main>
    </div>
  );
}

export default App;
