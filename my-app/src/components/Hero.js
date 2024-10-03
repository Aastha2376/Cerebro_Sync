// src/components/Hero.js

import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-container">
      {/* Animated Circles */}
      <div className="animated-circle circle1"></div>
      <div className="animated-circle circle2"></div>
      <div className="animated-circle circle3"></div>
      <div className="animated-circle circle4"></div> {/* Added */}
      <div className="animated-circle circle5"></div> {/* Added */}
      
      

      {/* Hero Content */}
      <h1 className="hero-title">Welcome to CerebroSync!</h1>
      <p className="hero-description">
        Your <span className="highlight">productivity</span>, synchronized with AI.
      </p>
      <p className="hero-subtext">
        Experience seamless integration of technology to enhance your workflow.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="hero-buttons">
        <button className="hero-button learn-more">Learn More</button>
        <button className="hero-button get-started">Get Started</button>
      </div>
    </section>
  );
};

export default Hero;
