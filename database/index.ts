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

const findMany = async ({search, tag, sort}: SearchParams) => {
    const data = await readData();
    let filteredVideos = data;

    if (search) {
        filteredVideos = filteredVideos.filter(video => 
            video.title.trim().toLowerCase().includes(search.trim().toLowerCase())
        );
    }
    
    if (tag){
        filteredVideos = filteredVideos.filter(video => 
            video.tags?.some(t => t === tag)
        );
    }
    
    if (sort === 'desc') {
        filteredVideos.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateA.getTime() - dateB.getTime();
        });
    }else{
        // default, so will always sort in asc
        filteredVideos.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB.getTime() - dateA.getTime();
        });
    }

    return filteredVideos;
}
const createOne = async (video: Video) => {
  const data = await readData();
  data.push(video);
  await writeData(data);
  return video;
}


export default {
  findMany,
  createOne
};

// todo: complete CRUD, add update and delete