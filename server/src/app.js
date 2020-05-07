import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import 'dotenv/config';

import setDB from './db';
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
app.use('/api/issues', issueRouter);
app.use('/api/projects', projectRouter);

app.get('/api/cleardb', async (req, res) => {
  if (process.env.NODE_ENV === 'test') {
    const db = await setDB();
    await db.collection('users').deleteMany({});
    await db.collection('projects').deleteMany({});
    await db.collection('issues').deleteMany({});
  }
  return res.status(200).json({ message: 'Successfully cleared db' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../../client/build'));

  const path = require('path');
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

export { app };
