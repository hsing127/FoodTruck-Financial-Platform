import React, { Suspense } from "react";
import { Navbar } from "@/app/(components)/LandingPageComponents/Navbar";
import { Footer } from "@/app/(components)/LandingPageComponents/Footer";

const Banner = React.lazy(() =>
  import("@/app/(components)/LandingPageComponents/Banner").then((module) => ({
    default: module.Banner,
  }))
);
const Hero = React.lazy(() =>
  import("@/app/(components)/LandingPageComponents/Hero").then((module) => ({
    default: module.Hero,
  }))
);
const LogoTicker = React.lazy(() =>
  import("@/app/(components)/LandingPageComponents/LogoTicker").then(
    (module) => ({ default: module.LogoTicker })
  )
);
const Features = React.lazy(() =>
  import("@/app/(components)/LandingPageComponents/Features").then(
    (module) => ({ default: module.Features })
  )
);
const ProductShowcase = React.lazy(() =>
  import("@/app/(components)/LandingPageComponents/ProductShowcase").then(
    (module) => ({ default: module.ProductShowcase })
  )
);
const FAQs = React.lazy(() =>
  import("@/app/(components)/LandingPageComponents/FAQs").then((module) => ({
    default: module.FAQs,
  }))
);
const ContactUs = React.lazy(() =>
  import("@/app/(components)/LandingPageComponents/ContactUs").then(
    (module) => ({ default: module.ContactUs })
  )
);

const Home: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Banner...</div>}>
        <Banner />
      </Suspense>
      <Navbar />
      <Suspense fallback={<div>Loading Hero...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading Logo Ticker...</div>}>
        <LogoTicker />
      </Suspense>
      <Suspense fallback={<div>Loading Features...</div>}>
        <Features />
      </Suspense>
      <Suspense fallback={<div>Loading Showcase...</div>}>
        <ProductShowcase />
      </Suspense>
      <Suspense fallback={<div>Loading FAQs...</div>}>
        <FAQs />
      </Suspense>
      <Suspense fallback={<div>Loading Contact Us...</div>}>
        <ContactUs />
      </Suspense>
      <Footer />
    </>
  );
};

export default Home;
