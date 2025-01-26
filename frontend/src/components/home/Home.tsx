// Home.tsx
import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Benefits from './Benefits';
import Testimonials from './Testimonials';
import FinalCTA from './FinalCTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <FinalCTA />    </>
  );
};

export default Home;