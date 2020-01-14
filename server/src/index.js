import { app } from './app';

// const port = (process.env.NODE_ENV === 'test')
//   ? process.env.PORT + Number(process.env.JEST_WORKER_ID)
//   : process.env.PORT;

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Application is running on port:${port} 🚀🚀🚀`)
);
