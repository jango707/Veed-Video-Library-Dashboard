import React from "react";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <Hero>
      <h1>Welcome to the Veed Feed</h1>
      <p>Your place to find the most trending videos</p>
      <span>
        <a href="videos">Videos</a>
        {' '}
        <a href="create">Create</a>
      </span>
    </Hero>
  );
};

export default HomePage;
