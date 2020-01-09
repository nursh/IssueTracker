import { app } from './app';
import { initDb } from './db';

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDb();
    app.listen(port, () =>
      console.log(`Application is running on port:${port} 🚀🚀🚀`)
    );
  } catch (error) {
    console.error(error);
  }
}

startServer();
