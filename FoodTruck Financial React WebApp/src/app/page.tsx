import React from 'react';
import { Banner } from '@/components/landingPage/Banner';
import { Navbar } from '@/components/landingPage/Navbar';
import { Hero } from '@/components/landingPage/Hero';
import { LogoTicker } from '@/components/landingPage/LogoTicker';
import { Features } from '@/components/landingPage/Features';
import { ProductShowcase } from '@/components/landingPage/ProductShowcase';
import { FAQs } from '@/components/landingPage/FAQs';
import { ContactUs } from '@/components/landingPage/ContactUs';
import { Footer } from '@/components/landingPage/Footer';

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