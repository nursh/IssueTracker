import { Router } from 'express';

import {
  signupController,
  signinController,
  githubController,
  googleController
} from '../controllers/auth';
import {
  requireAuth,
  useLocalSignin,
  useGithubSignin,
  useGoogleSignin
} from '../passport';

const router = Router();

router.post('/signup', signupController);
router.post('/signin', useLocalSignin, signinController);
router.get('/github', useGithubSignin);
router.get('/github/callback', useGithubSignin, githubController);
router.get('/google', useGoogleSignin);
router.get('/google/callback', useGoogleSignin, googleController);

router.get('/me', requireAuth, (req, res) => {
  res.send({ message: 'Success' });
});

export default router;
