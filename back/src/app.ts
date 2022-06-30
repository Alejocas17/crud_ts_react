import dotenv from 'dotenv'
import Server from './models/servers';

dotenv.config();

const server = new Server();

server.listen();
