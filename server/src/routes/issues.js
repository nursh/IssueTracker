import { Router } from 'express';
import { requireAuth } from '../passport';

const router = Router();

router.route('/:issueId').all(requireAuth);
export default router;
