import React from 'react';
import Hero from '../components/Hero';
import { Group, Heading, Link, Text } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Hero>
      <Heading size={'5xl'}>Welcome to the Veed Feed</Heading>
      <Text fontSize={'2xl'}>Your place to find the most trending videos</Text>
      <Group style={{ marginTop: 20, gap: 10 }}>
        <Link href="/videos">Go to Videos</Link>
        <Link href="/create">Create Video</Link>
      </Group>
    </Hero>
  );
};

export default HomePage;
