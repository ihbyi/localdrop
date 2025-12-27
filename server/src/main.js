import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { socketConfig } from './config/socket.config.js';
import { handleConnection } from './handlers/connectionHandler.js';
import { handleUserUpdate } from './handlers/userHandler.js';

const app = express();
const server = createServer(app);
const io = new Server(server, socketConfig);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({
        name: 'LocalDrop Server',
        status: 'running',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

io.on('connection', (socket) => {
    handleConnection(socket, io);
    handleUserUpdate(socket, io);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
