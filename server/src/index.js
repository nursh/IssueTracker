import { app } from './app';

const port = process.env.PORT || 3000;

(async function startServer() {
  try {
    app.listen(port, () =>
      console.log(`Application is running on port:${port} 🚀🚀🚀`)
    );
  } catch (error) {
    console.error(error);
  }
})();
