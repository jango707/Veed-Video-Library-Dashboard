import { Request, Response } from 'express';
import videoDatabase from '../../../database/index';
import { IncomingVideoSchema, SearchParamsSchema, Video } from '../../../zod/videos';

// GET /videos
export async function getVideos(req: Request, res: Response) {
  try {
     const {search, sort, tags} = SearchParamsSchema
      .parse(req.query)
    
    // Fetch videos from the database
    const videos = await videoDatabase.findMany({search, tags, sort});

    // TODO: pagination 

    res.json(videos);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message});
    }
    res.status(500).json({ message: 'Failed to fetch videos'});
  }
}

// POST /videos
export async function createVideo(req: Request, res: Response) {
  try {
    const parsed = IncomingVideoSchema
      .parse(req.body)
    
    const uuid = Date.now().toString(); // todo: generate successive ID based on db index

    const newVideo: Video = {
        ...parsed,
        id: `v-${uuid}`, 
        created_at: new Date().toISOString()
    }
    await videoDatabase.createOne(newVideo)

    res.json({message: 'Video created successfully', video: newVideo});
  } catch (error) {
    // Handle database validation errors
    if (error instanceof Error && error.message.includes('expected a Zod schema')) {
      return res.status(400).json({ 
        message: 'Invalid video format', 
        error: error.message 
      });
    }
    res.status(500).json({ message: 'Failed to create video' , error})
  }
}

// DELETE /videos/:id
export async function deleteVideo(req: Request, res: Response) {
  try {
    const id = req.params.id
    const success = await videoDatabase.deleteById(id)
    if (!success) return res.status(404).json({ message: 'Video not found' })
    res.json({ message: `Video with id ${id} deleted successfully` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete video' })
  }
}