import React from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionSection from '../components/Products/GenderCollectionSection';
import NewsArrivals from '../components/Products/NewsArrivals';

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewsArrivals />
    </div>
  );
};

export default Home;
