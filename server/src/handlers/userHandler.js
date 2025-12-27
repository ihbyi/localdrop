import { updateUser, getUser } from '../db/users.js';
import { broadcastReceivers } from '../services/receiverService.js';

export const handleUserUpdate = (socket, io) => {
    socket.on('update user', (user) => {
        const oldUser = getUser(user.id);
        const updatedUser = updateUser(user);

        if (updatedUser) {
            if (oldUser?.type !== updatedUser.type) {
                broadcastReceivers(io);
            }
        }
    });
};
