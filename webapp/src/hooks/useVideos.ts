import { useEffect, useState } from 'react';
import { SearchParams, Video } from '../../../zod/videos';
import { getVideos } from '../api';

export const useVideos = (search: SearchParams) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      getVideos(search)
        .then((data) => {
          setVideos(data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchVideos();
  }, [search.search, search.tag, search.sort]);

  return { videos, loading, error };
};
