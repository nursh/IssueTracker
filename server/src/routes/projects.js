import { Router } from 'express';

import {
  getProjectsController,
  deleteProjectController
} from '../controllers/projects';
import { requireAuth } from '../passport';

const router = Router();

router
  .route('/')
  .all(requireAuth)
  .get(getProjectsController)
  .delete(deleteProjectController);
export default router;
