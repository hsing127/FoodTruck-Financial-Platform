// pages/index.tsx
import React from 'react';
import { Banner } from '@/components/landingPage/Banner';
import { Navbar } from '@/components/landingPage/Navbar';
import { Hero } from '@/components/landingPage/Hero';
import { LogoTicker } from '@/components/landingPage/LogoTicker';
import { Features } from '@/components/landingPage/Features';

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <Hero />
      <LogoTicker />
      <Features />
    </>
  );
};

export default Home;

