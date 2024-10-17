import React from 'react';
import { Banner } from '@/app/landingPage/Banner';
import { Navbar } from '@/app/landingPage/Navbar';
import { Hero } from '@/app/landingPage/Hero';
import { LogoTicker } from '@/app/landingPage/LogoTicker';
import { Features } from '@/app/landingPage/Features';
import { ProductShowcase } from '@/app/landingPage/ProductShowcase';
import { FAQs } from '@/app/landingPage/FAQs';
import { ContactUs } from '@/app/landingPage/ContactUs';
import { Footer } from '@/app/landingPage/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <Hero />
      <LogoTicker />
      <Features />
      <ProductShowcase />
      <FAQs />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Home;