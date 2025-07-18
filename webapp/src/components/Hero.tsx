import React, { ReactNode } from 'react';

const Hero = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
};

export default Hero;
