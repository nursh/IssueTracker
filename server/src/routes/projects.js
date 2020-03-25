import { Router } from 'express';

import { getProjectsController } from '../controllers/projects';
import { requireAuth } from '../passport';

const router = Router();

router
  .route('/:projectId')
  .all(requireAuth)
  .get(getProjectsController);
export default router;
