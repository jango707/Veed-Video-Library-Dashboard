import { IncomingVideo, SearchParams, Video } from '../../../zod/videos';

const BACKEND_URL = 'http://localhost:9999';

const getVideos = async ({ sort, search, tag }: SearchParams) => {
  let url = `${BACKEND_URL}/videos`;
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (tag) params.append('tag', tag);
  if (sort) params.append('sort', sort);
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json() as Promise<Video[]>;
};

const createVideo = async (video: IncomingVideo) => {
  const payload: IncomingVideo = {
    title: video.title,
    ...(video.tags && video.tags.length > 0 && { tags: video.tags }),
    ...(video.thumbnail_url && { thumbnail_url: video.thumbnail_url }),
  };

  const response = await fetch(`${BACKEND_URL}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const serverError = await response.json();
    const errorMessage =
      serverError.error.name === 'ZodError' ? 'Invalid video parameters' : serverError.message;
    throw new Error(errorMessage);
  }
  return response.json() as Promise<{ message: string; video: Video }>;
};

export { getVideos, createVideo };
