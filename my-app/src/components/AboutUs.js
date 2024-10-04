// src/components/AboutUs.js
import React, { useState } from 'react';
import './AboutUs.css';

const flashcardsData = [
  {
    emoji: '🚀',
    title: 'AI-Powered Efficiency',
    description: 'Boost your productivity with cutting-edge AI tools that integrate seamlessly into your workflow. Our intelligent automation algorithms help you reduce errors, automate repetitive tasks, and make better decisions faster. Whether you’re managing large datasets or small projects, we have the tools to make your work smoother and more efficient, day after day, no matter what industry you’re in. Our platform is built to adapt to the growing demands of businesses, making sure you stay ahead of the competition. Streamline your operations and focus on what truly matters: growth.',
  },
  {
    emoji: '🔒',
    title: 'Secure and Reliable',
    description: 'Your data security is our top priority. With industry-leading encryption standards, we ensure that your information stays safe from unauthorized access. We also offer continuous monitoring to detect and respond to any security threats instantly. Reliability is a core feature of our platform, ensuring your tools are always available whenever you need them. Our system undergoes regular security audits, so you can trust that your data is in good hands. We also offer customizable security settings, allowing you to manage access and data flow securely and efficiently.',
  },
  {
    emoji: '🌍',
    title: 'Global Accessibility',
    description: 'CerebroSync works wherever you are. Whether you’re collaborating with a team across continents or working remotely from home, our cloud-based platform provides consistent access to your data and tools. We optimize for different network conditions, ensuring smooth performance even in low bandwidth environments. Stay connected and productive, no matter where you are. Our multilingual interface supports users worldwide, allowing you to bridge the communication gap and collaborate in real-time with colleagues, clients, or customers, no matter where they are.',
  },
  {
    emoji: '🎨',
    title: 'Customizable Experience',
    description: 'Your work environment should fit your unique style. We give you full control over the look and feel of your workspace, with customizable themes, notification preferences, and interface layouts. Whether you prefer a minimalist setup or a detailed dashboard, CerebroSync adapts to your needs. You can also personalize workflows and shortcuts to make the platform truly yours. With intuitive drag-and-drop tools, you can easily build your workspace to fit the exact requirements of your projects. Make every minute more productive with a system designed for you.',
  },
  {
    emoji: '⚡',
    title: 'Fast and Efficient',
    description: 'Speed is essential in today’s fast-paced world. Our platform is designed for quick load times and real-time responsiveness. Whether you’re working with large files, processing complex datasets, or simply switching between tasks, CerebroSync delivers the performance you need without any lag. Get more done in less time with our highly optimized tools and workflows. Our architecture is built for scalability, ensuring you experience the same lightning-fast performance no matter how much data you are working with. Say goodbye to downtime and hello to uninterrupted productivity.',
  },
  {
    emoji: '📈',
    title: 'Scalable Solutions',
    description: 'From small businesses to large enterprises, CerebroSync scales with your needs. Whether you’re managing a small team or overseeing a global organization, our platform can handle the demands of any size operation. As your business grows, so does our platform’s capacity to manage more users, more data, and more complexity, ensuring continuous support at every stage. Whether you are handling a surge in traffic or expanding to new markets, CerebroSync’s flexible architecture is designed to grow with your business, delivering consistent performance every step of the way.',
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
