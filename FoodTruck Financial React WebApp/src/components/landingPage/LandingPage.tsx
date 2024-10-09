"use client"; // Add this directive to make the component a Client Component

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; // Using Next.js Link instead of react-router-dom
import Image from 'next/image'; // Importing Next.js Image component
import logo from '../../assets/Logo.png'; // Logo image
import teamImage from '../../assets/teamImage.png'; // Team image
import '../../styles/LandingPage.css';

const LandingPage: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement | null>(null); // Typing the useRef to handle HTMLDivElement
  const [aboutVisible, setAboutVisible] = useState<boolean>(false); // Typing the useState to be a boolean

  // For animation and scrolling
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
        threshold: 0.02,
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

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="landing-container">
        <nav className="navbar" aria-label="Main navigation">
          <header className="nav-brand" onClick={scrollToTop}>
            {/* Using Next.js Image component for optimized loading */}
            <Image src={logo} className="logo-image" alt="FoodTrack logo - Optimize your food truck's financials" />
            <h2>FoodTrack</h2>
          </header>
          <ul className="nav-links" role="navigation">
            <li><Link href="/about" onClick={scrollToAbout}>About Us</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <div className="nav-right">
            <Link href="/login" className="nav-login" aria-label="Log in">Log in</Link>
            <Link href="/signup" className="nav-signup" aria-label="Sign up">Sign up</Link>
          </div>
        </nav>

        <main className="intro-section">
          <p className="intro-badge" aria-describedby="badge-description">
            Introducing FoodTrack
          </p>
          <h1 className="title">Optimize your food truck&apos;s financials</h1>
          <p className="intro-description">
            Manage and analyze your expenses, automate receipt processing, and maximize your profits with insights tailored for food truck owners.
          </p>
          <Link href="/signup" className="cta-button-link" aria-label="Sign up for FoodTrack">Get started</Link>
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
              providing insightful analytics, FoodTrack helps you focus on what matters most&#8212;running your business.
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
            {/* Using Next.js Image component for optimized loading */}
            <Image src={teamImage} className="about-image" alt="A team collaborating on food truck operations" />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
