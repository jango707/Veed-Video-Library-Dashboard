import React from 'react';

import { Group, Text } from '@chakra-ui/react';
import { Video } from '../../../zod/videos';
import { FallbackImage } from './FallbackImage';
import { formatDate, secondsToTime } from '../utils/conversions';

const VideoGridElement = ({ video }: { video: Video }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        width: '20%',
        minWidth: 200,
      }}
    >
      <FallbackImage
        src={video.thumbnail_url}
        fallbackSrc={
          'https://i0.wp.com/aiunleashed.ca/wp-content/uploads/2025/06/Untitled-design-5.jpg?fit=1536%2C1024&ssl=1'
        } // veed logo
        alt={video.title}
        style={{ borderRadius: 4, objectFit: 'cover', widows: '100%', height: 200 }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 10,
          color: 'white',
          textAlign: 'left',
          backgroundColor: ' rgba(0, 0, 0, 0.05)',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <Text fontSize={'sm'}>{secondsToTime(video.duration)} </Text>
        <Text fontWeight="bold" fontSize="md">
          {video.title}
        </Text>
        <Group>
          <Text fontSize={'x-small'}>{video.views} views</Text>
          <Text fontSize={'x-small'}>{formatDate(video.created_at)} </Text>
        </Group>
        {video.tags && <Text fontSize={'x-small'}>{video.tags.join(', ')}</Text>}
      </div>
    </div>
  );
};

export default VideoGridElement;
