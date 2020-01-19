import http from 'http';
import { app } from '../src/app';

const port = Number(process.env.PORT) + Number(process.env.JEST_WORKER_ID);

const server = http.createServer(app);
server.listen(port);

export default server;
