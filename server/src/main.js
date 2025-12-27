import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import { randomName } from './util.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello world');
});

io.on('connection', (socket) => {
    console.log('a user is connected', socket.id);

    socket.on('join', () => {
        socket.emit('name', { newName: randomName() });
    });
});

server.listen(PORT, () => {
    console.log(`Server listening to http://localhost:${PORT}`);
});
