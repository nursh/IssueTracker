import { Router } from 'express';
import { requireAuth } from '../passport';
import { getIssuesController } from '../controllers/issues';

const router = Router();

router
  .route('/')
  .all(requireAuth)
  .get(getIssuesController);

export default router;
