/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Video } from '../../../zod/videos';
import VideoGrid from './VideoGrid';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
  Image: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
  Alert: {
    Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Indicator: () => <span>Indicator</span>,
    Content: ({ children }: any) => <div>{children}</div>,
    Title: ({ children }: any) => <h2>{children}</h2>,
  },
  Spinner: ({ size }: any) => <div style={{ width: size, height: size }}>Loading...</div>,
  Group: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Text: ({ children, ...props }: any) => <p {...props}>{children}</p>,
}));

test('renders the Video Grid', () => {
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Video 1',
      thumbnail_url: 'thumbnail1.jpg',
      duration: 120,
      views: 100,
      created_at: '2025-01-01',
      tags: ['tag1', 'tag2'],
    },
    {
      id: '2',
      title: 'Video 2',
      thumbnail_url: 'thumbnail2.jpg',
      duration: 150,
      views: 200,
      created_at: '2025-01-02',
      tags: ['tag3', 'tag4'],
    },
  ];
  render(<VideoGrid videos={mockVideos} loading={false} error={''} />);
  const linkElement = screen.getByText(/Video 1/i);
  const linkElement2 = screen.getByText(/Video 2/i);
  const linkElement3 = screen.getByText(/tag3/i);

  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});
test('renders loading spinner when loading', () => {
  render(<VideoGrid videos={[]} loading={true} error={null} />);
  const spinnerElement = screen.getByText('Loading...');
  expect(spinnerElement).toBeInTheDocument();
});

test('renders error message when error is present', () => {
  render(<VideoGrid videos={[]} loading={false} error="Error loading videos" />);
  const errorElement = screen.getByText(/Error loading videos/i);
  expect(errorElement).toBeInTheDocument();
});

test('renders no videos found message when no videos are present', () => {
  render(<VideoGrid videos={[]} loading={false} error={null} />);
  const noVideosElement = screen.getByText(/No videos found, try a different search term./i);
  expect(noVideosElement).toBeInTheDocument();
});
