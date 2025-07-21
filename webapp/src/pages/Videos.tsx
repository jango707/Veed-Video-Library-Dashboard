import React, { useState } from 'react';
import { Heading, Link, Text } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import { useVideos } from '../hooks/useVideos';
import VideoGrid from '../components/VideoGrid';

const VideosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const { videos, loading, error } = useVideos({ search: searchTerm, tag: '', sort }); // todo implement tag
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        gap: 10,
      }}
    >
      <Heading size={'3xl'}>Your Video Feed</Heading>
      <Text>
        Here you can find all your videos. <Link href="/">Home</Link>
      </Text>
      <SearchBar
        submitSearch={setSearchTerm}
        onSortChange={() => setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'))}
      />
      <Text>
        or <Link href="/create">create</Link> a new video
      </Text>
      <VideoGrid videos={videos} loading={loading} error={error} />
    </div>
  );
};

export default VideosPage;
