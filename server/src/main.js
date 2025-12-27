import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import { randomName } from './util.js';
import {
    createUser,
    updateUser,
    removeUser,
    getRecievers,
    getUser,
} from './db/users.js';

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

const broadcastReceivers = () => {
    const receivers = getRecievers();
    io.emit('receivers list', receivers);
};

io.on('connection', (socket) => {
    console.log('User is connected: ', socket.id);

    socket.on('disconnect', () => {
        console.log(`DELETING ${socket.id}`);
        const user = getUser(socket.id);
        removeUser(socket.id);

        if (user?.type === 'reciever') {
            broadcastReceivers();
        }
    });

    socket.on('join', ({ type }) => {
        const id = socket.id;
        const name = randomName();
        const user = createUser(id, name, type);
        socket.emit('user', { user });

        if (type === 'reciever') {
            broadcastReceivers();
        }
    });

    socket.on('update user', (user) => {
        const oldUser = getUser(user.id);
        const updatedUser = updateUser(user);

        if (updatedUser) {
            console.log('User updated:', updatedUser);
            if (oldUser?.type !== updatedUser.type) {
                broadcastReceivers();
            }
        } else {
            console.log('User not found:', user.id);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server listening to http://localhost:${PORT}`);
});
