// src/components/AboutUs.js
import React, { useState } from 'react';
import './AboutUs.css';

const flashcardsData = [
  {
    emoji: '🚀',
    title: 'AI-Powered Efficiency',
    description: 'Boost your productivity with cutting-edge AI tools tailored to your workflow.',
  },
  {
    emoji: '🔒',
    title: 'Secure and Reliable',
    description: 'We prioritize security to keep your data safe and provide a seamless experience.',
  },
  {
    emoji: '🌍',
    title: 'Global Accessibility',
    description: 'CerebroSync is accessible anywhere in the world, helping you stay connected.',
  },
  {
    emoji: '🎨',
    title: 'Customizable Experience',
    description: 'Personalize your workspace to suit your unique needs with flexible settings.',
  },
];

const AboutUs = () => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  const handleNext = () => {
    setCurrentFlashcard((prevIndex) =>
      prevIndex === flashcardsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentFlashcard((prevIndex) =>
      prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="about-us-container">
      <div className="flashcard">
        <div className="flashcard-emoji">{flashcardsData[currentFlashcard].emoji}</div>
        <h2 className="flashcard-title">{flashcardsData[currentFlashcard].title}</h2>
        <p className="flashcard-description">{flashcardsData[currentFlashcard].description}</p>
      </div>
      <button className="arrow left-arrow" onClick={handlePrev}>⬅</button>
      <button className="arrow right-arrow" onClick={handleNext}>➡</button>
    </section>
  );
};

export default AboutUs;
