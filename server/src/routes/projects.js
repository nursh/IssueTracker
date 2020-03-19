import { Router } from 'express';

import { getProjectsController } from '../controllers/projects';
import { requireAuth } from '../passport';

const router = Router();

router.get('/:issueId', requireAuth, getProjectsController);
export default router;
