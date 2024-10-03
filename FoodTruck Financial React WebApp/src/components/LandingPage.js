import React from 'react';
import '../styles/LandingPage.css'; 
import logo from '../assets/Logo.png'; 

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="brand-logo">
        <img src={logo} alt="FoodTrack Logo" className="logo-image" />
        <h2>FoodTrack</h2>
      </div>

      <div className="intro-section">
        <p className="intro-badge">Introducing FoodTrack</p>
        <h1>Optimize your food truck's financials</h1>
        <p className="intro-description">
          Manage and analyze your expenses, automate receipt processing, and maximize your profits with insights tailored for food truck owners.
        </p>
        <button className="cta-button">Get started</button>
      </div>
      
    </div>
  );
};

export default LandingPage;
