// this file simulates a database module
import * as fs from 'fs';
import * as path from 'path';
import { SearchParams, Video } from '../zod/videos'; 

const dataPath = path.join(__dirname, './data/videos.json');

const readData = (): Promise<Video[]> => {
  const raw = fs.readFileSync(dataPath)
  const {videos} = JSON.parse(raw.toString()) as { videos: Video[] };

  return new Promise((resolve, reject) => {
    if (!videos || videos.length === 0) {
      return reject(new Error('No videos found'));
    }
    resolve(videos);
  });
}

const writeData = async (data: Video[]) => {
    // overwrites the existing data
  const jsonData = JSON.stringify({videos: data}, null, 2);
  await fs.writeFileSync(dataPath, jsonData);
}

const findMany = ({search, tags, sort}: SearchParams) => {
    const data = readData();
    return data.then(videos => {
        let filteredVideos = videos;

        if (search) {
            filteredVideos = filteredVideos.filter(video => 
                video.title.trim().toLowerCase().includes(search.trim().toLowerCase())
            );
        }

        if (tags && tags.length > 0) {
            filteredVideos = filteredVideos.filter(video => 
                video.tags?.some(tag => tags.includes(tag))
            );
        }
        
        if (sort === 'desc') {
            filteredVideos.sort((a, b) => b.views - a.views);
        }else{
          filteredVideos.sort((a, b) => a.views - b.views);
        }

        return filteredVideos;
    });
}

const deleteById = async (id: string) => {
  const data = await readData();
  const filteredData = data.filter(video => video.id !== id);
  await writeData(filteredData);
  return filteredData;
}

const createOne = async (video: Video) => {
  const data = await readData();
  data.push(video);
  await writeData(data);
  return video;
}


export default {
  findMany,
  deleteById,   
  createOne
};
