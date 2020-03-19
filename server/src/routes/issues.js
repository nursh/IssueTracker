import { Router } from 'express';
import { requireAuth } from '../passport';

const router = Router();

router.get('/:issueId', requireAuth);
export default router;
