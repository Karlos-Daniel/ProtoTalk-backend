const Server = require('./models/server');
require('dotenv').config();
// Define el comando que deseas ejecutar

const server = new Server();

server.listen();