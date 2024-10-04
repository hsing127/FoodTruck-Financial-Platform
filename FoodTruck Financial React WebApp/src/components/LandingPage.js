import React from 'react';
import logo from '../assets/Logo.png'; 
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; 

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-brand">
            <img src={logo} alt="FoodTrack Logo" className="logo-image" />
            <h2>FoodTrack</h2>
          </div>
          <ul className="nav-links">
            <li><a href="features">Features</a></li>
            <li><a href="pricing">Pricing</a></li>
            <li><a href="about">About Us</a></li>
            <li><a href="contact">Contact</a></li>
          </ul>
        </div>
        <div className="nav-right">
          <a href="/login" className="nav-login">Log in</a>
          <a href="/signup" className="nav-signup">Sign up</a>
        </div>
      </nav>

      <div className="intro-section">
        <p className="intro-badge">Introducing FoodTrack</p>
        <h1 class="title">Optimize your food truck's financials</h1>
        <p className="intro-description">
          Manage and analyze your expenses, automate receipt processing, and maximize your profits with insights tailored for food truck owners.
        </p>
        <Link to="/login">
          <button className="cta-button">Get started</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
