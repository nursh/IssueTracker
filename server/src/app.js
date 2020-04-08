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

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

app.use('/auth', authRouter);
app.use('/api/issues', issueRouter);
app.use('/api/projects', projectRouter);

export { app };
