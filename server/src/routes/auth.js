import { Router } from 'express';

import {
  signupController,
  signinController,
  githubController,
  googleController
} from '../controllers/auth';
import {
  requireAuth,
  useGithubSignin,
  useGoogleSignin,
  useGoogleAuth
} from '../passport';

const router = Router();

router.post('/signup', signupController);
router.post('/signin', signinController);
router.get('/github', useGithubSignin);
router.get('/github/callback', useGithubSignin, githubController);
router.get('/google', useGoogleSignin);
router.get('/google/callback', useGoogleAuth, googleController);

router.get('/me', requireAuth, (req, res) => {
  res.send({ message: 'success' });
});

export default router;
