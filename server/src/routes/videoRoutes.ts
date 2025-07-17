import { Router } from 'express'
import * as videoController from '../controllers/videoController'

const router = Router();

// GET /videos
// ?search=example (string)
// ?tag=tagExample (string)
// ?sort=asc (asc/desc)
router.get('/', videoController.getVideos);

// POST /videos
router.post('/', videoController.createVideo);

export default router;