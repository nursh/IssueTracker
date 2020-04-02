import { Router } from 'express';
import { requireAuth } from '../passport';
import {
  getIssuesController,
  createIssueController
} from '../controllers/issues';

const router = Router();

router
  .route('/')
  .all(requireAuth)
  .get(getIssuesController)
  .post(createIssueController);

export default router;
