import { Router } from 'express';
import { requireAuth } from '../passport';
import {
  getIssuesController,
  createIssueController,
  deleteIssueController,
  updateIssueController
} from '../controllers/issues';

const router = Router();

router
  .route('/')
  .all(requireAuth)
  .get(getIssuesController)
  .post(createIssueController)
  .delete(deleteIssueController)
  .put(updateIssueController);

export default router;
