import { Router } from 'express';
import passport from 'passport';

import { signupController, signinController } from '../controllers/auth';
/* eslint-disable no-unused-vars */
import { jwtPassport, localPassport } from '../passport';

const router = Router();
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.post('/signup', signupController);
router.post('/signin', requireSignin, signinController);

router.get('/me', requireAuth, (req, res) => {
  res.send({ message: 'Success' });
});

export default router;
