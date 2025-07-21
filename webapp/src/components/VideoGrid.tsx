import React from 'react';
import { Video } from '../../../zod/videos';
import { Alert, Spinner } from '@chakra-ui/react';
import VideoGridElement from './VideoGridElement';

const VideoGrid = ({
  videos,
  loading,
  error,
}: {
  videos: Video[];
  loading: boolean;
  error: string | null;
}) => {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert.Root status="error" style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{error}</Alert.Title>
        </Alert.Content>
      </Alert.Root>
    );
  }
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: '10px 50px',
        gap: 20,
      }}
    >
      {videos.length === 0 && !loading && !error && (
        <Alert.Root status="info" style={{ maxWidth: 600 }}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>No videos found, try a different search term.</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}
      {videos.map((video) => (
        <VideoGridElement key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
