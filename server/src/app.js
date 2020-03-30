import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import 'dotenv/config';

import authRouter from './routes/auth';
import issueRouter from './routes/issues';
import projectRouter from './routes/projects';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

app.use('/auth', authRouter);
app.use('/projects/:projectId/issues', issueRouter);
app.use('/projects', projectRouter);

export { app };
