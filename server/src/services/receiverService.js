import { getRecievers } from '../db/users.js';

export const broadcastReceivers = (io) => {
    const receivers = getRecievers();
    io.emit('receivers list', receivers);
};
