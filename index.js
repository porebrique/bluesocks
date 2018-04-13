import * as settings from './settings';
import Server from './src/server';

const server = new Server(settings);
server.start();
