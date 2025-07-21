import React from 'react';
import Hero from '../components/Hero';

const NotFoundPage = () => {
  return (
    <Hero>
      <h1>Oops, how did we get here now?</h1>
      <span>
        Return back <a href="/">Home</a>
      </span>
    </Hero>
  );
};

export default NotFoundPage;
