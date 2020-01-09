import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRouter from './routes/auth';

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

app.use('/auth', authRouter);

export { app };
