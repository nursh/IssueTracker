import { Router } from 'express';

import { signupController, signinController } from '../controllers/auth';
import { requireAuth, requireSignin } from '../passport';

const router = Router();

router.post('/signup', signupController);
router.post('/signin', requireSignin, signinController);

router.get('/me', requireAuth, (req, res) => {
  res.send({ message: 'Success' });
});

export default router;
