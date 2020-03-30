import { Router } from 'express';

import {
  getProjectsController,
  deleteProjectController,
  createProjectController,
  updateProjectController
} from '../controllers/projects';
import { requireAuth } from '../passport';

const router = Router();

router
  .route('/')
  .all(requireAuth)
  .get(getProjectsController)
  .delete(deleteProjectController)
  .post(createProjectController)
  .put(updateProjectController);
export default router;
