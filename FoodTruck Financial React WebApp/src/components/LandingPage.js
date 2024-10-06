import React from 'react';
import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <header className="landing-container">
        <nav className="navbar" aria-label="Main navigation">
          <div className="nav-left">
            <div className="nav-brand">
              <img 
                src={logo} 
                alt="FoodTrack logo - Optimize your food truck's financials" 
                className="logo-image" 
                loading="lazy" 
              />
              <h2>FoodTrack</h2>
            </div>
            <ul className="nav-links" role="navigation">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="nav-right">
            <Link to="/login" className="nav-login">Log in</Link>
            <Link to="/signup" className="nav-signup">Sign up</Link>
          </div>
        </nav>

        <main className="intro-section">
          <p className="intro-badge" aria-describedby="badge-description">Introducing FoodTrack</p>
          <h1 className="title">Optimize your food truck's financials</h1>
          <p className="intro-description">
            Manage and analyze your expenses, automate receipt processing, and maximize your profits with insights tailored for food truck owners.
          </p>
          <Link to="/signup" className="cta-button-link">
            Get started
          </Link>
        </main>
      </header>
    </>
  );
};

export default LandingPage;
