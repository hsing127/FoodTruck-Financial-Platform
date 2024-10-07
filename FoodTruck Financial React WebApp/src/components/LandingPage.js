import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import teamImage from '../assets/teamImage.jpg';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  //For animation and scrolling
  useEffect(() => {
    const aboutSection = aboutRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAboutVisible(true);
          } else {
            setAboutVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  const scrollToAbout = (e) => {
    e.preventDefault();
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //auto scrolls to top on refresh
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className="landing-container">
        <nav className="navbar" aria-label="Main navigation">
          <header className="nav-brand" onClick={scrollToTop}>
            <img
              src={logo}
              alt="FoodTrack logo - Optimize your food truck's financials"
              className="logo-image"
              loading="lazy"
            />
            <h2>FoodTrack</h2>
          </header>
          <ul className="nav-links" role="navigation">
            <li><Link to="/about" onClick={scrollToAbout}>About Us</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div className="nav-right">
            <Link to="/login" className="nav-login" aria-label="Log in">Log in</Link>
            <Link to="/signup" className="nav-signup" aria-label="Sign up">Sign up</Link>
          </div>
        </nav>

        <main className="intro-section">
          <p className="padding"></p>
          <p className="intro-badge" aria-describedby="badge-description">
            Introducing FoodTrack
          </p>
          <h1 className="title">Optimize your food truck's financials</h1>
          <p className="intro-description">
            Manage and analyze your expenses, automate receipt processing, and maximize your profits with insights tailored for food truck owners.
          </p>
          <Link to="/signup" className="cta-button-link" aria-label="Sign up for FoodTrack">
            Get started
          </Link>
        </main>
      </header>

      <section
        className={`about-section ${aboutVisible ? 'visible' : ''}`}
        ref={aboutRef}
        aria-label="About FoodTrack section"
      >
        <div className="about-content">
          <div className="about-text">
            <h2>About FoodTrack</h2>
            <p>
              FoodTrack is a comprehensive platform designed to streamline financial
              management for food truck owners. From automating expense tracking to
              providing insightful analytics, FoodTrack helps you focus on what matters most—running your business.
            </p>
            <p>
              Our mission is to empower food truck owners with tools that simplify
              day-to-day operations and increase profitability. With FoodTrack, you can:
            </p>
            <ul>
              <li>Automate receipt processing and expense tracking</li>
              <li>Utilize real-time financial insights and reports</li>
              <li>Optimize your costs and maximize your profits</li>
            </ul>
            <p>
              Join hundreds of other food truck owners who have streamlined their
              operations and improved profitability using FoodTrack!
            </p>
          </div>
          <div className="about-image">
            <img
              src={teamImage}
              alt="A team collaborating on food truck operations"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
