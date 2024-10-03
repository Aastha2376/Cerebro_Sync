// src/components/Header.js

import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        {/* Use an emoji icon or text for the logo */}
        🧠 CerebroSync
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#faqs">FAQs</a></li>
          <li><a href="#help">Help</a></li>
          <li><button className="login-btn">Login</button></li>
          <li><button className="signup-btn">Sign Up</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
