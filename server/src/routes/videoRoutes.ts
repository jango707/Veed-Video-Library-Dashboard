import { Router } from 'express'
import * as videoController from '../controllers/videoController'

const router = Router()

// GET /videos
// ?search (text)
// ?tags (array of strings)
// ?sort (asc/desc)
router.get('/', videoController.getVideos)

// POST /videos
router.post('/', videoController.createVideo)

export default router