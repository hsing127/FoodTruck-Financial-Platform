import React from 'react';
import { Banner } from '@/app/(components)/LandingPageComponents/Banner';
import { Navbar } from '@/app/(components)/LandingPageComponents/Navbar';
import { Hero } from '@/app/(components)/LandingPageComponents/Hero';
import { LogoTicker } from '@/app/(components)/LandingPageComponents/LogoTicker';
import { Features } from '@/app/(components)/LandingPageComponents/Features';
import { ProductShowcase } from '@/app/(components)/LandingPageComponents/ProductShowcase';
import { FAQs } from '@/app/(components)/LandingPageComponents/FAQs';
import { ContactUs } from '@/app/(components)/LandingPageComponents/ContactUs';
import { Footer } from '@/app/(components)/LandingPageComponents/Footer';

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