import { randomName } from '../util.js';
import { createUser, removeUser, getUser } from '../db/users.js';
import { broadcastReceivers } from '../services/receiverService.js';

export const handleConnection = (socket, io) => {
    console.log('User connected:', socket.id);

    socket.on('join', ({ type }) => {
        const id = socket.id;
        const name = randomName();
        const user = createUser(id, name, type);
        socket.emit('user', { user });

        if (type === 'reciever') {
            broadcastReceivers(io);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        const user = getUser(socket.id);
        removeUser(socket.id);

        if (user?.type === 'reciever') {
            broadcastReceivers(io);
        }
    });
};
