import React, { useState, CSSProperties } from 'react';
import { Image } from '@chakra-ui/react';

export const FallbackImage = ({
  src,
  fallbackSrc,
  alt,
  style,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  style?: CSSProperties;
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div
          style={{ width: '100%', height: 200, backgroundColor: '#f0f0f0', borderRadius: '4px' }}
        />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        onError={() => setImgSrc(fallbackSrc)}
        style={style}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};
