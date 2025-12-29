import { getUser } from '../db/users.js';
function handleWebRTCSignaling(socket, io) {
    socket.on('webrtc offer', ({ target, data }) => {
        console.log(`WebRTC offer from ${socket.id} to ${target}`);
        io.to(target).emit('webrtc offer', { from: socket.id, data });
    });

    socket.on('webrtc answer', ({ target, data }) => {
        console.log(`WebRTC answer from ${socket.id} to ${target}`);
        io.to(target).emit('webrtc answer', { from: socket.id, data });
    });

    socket.on('ice candidate', ({ target, data }) => {
        console.log(`WebRTC ICE Candidate from ${socket.id} to ${target}`);
        io.to(target).emit('ice candidate', { from: socket.id, data });
    });

    socket.on('transfer request', ({ target, files }) => {
        console.log(`Transfer request from ${socket.id} to ${target}`);
        const sender = getUser(socket.id);
        io.to(target).emit('transfer request', {
            from: socket.id,
            senderName: sender?.name || 'Unknown',
            files,
        });
    });
    socket.on('transfer response', ({ target, accepted }) => {
        console.log(
            `Transfer response from ${socket.id} to ${target}: ${
                accepted ? 'accepted' : 'rejected'
            }`
        );
        io.to(target).emit('transfer response', { from: socket.id, accepted });
    });
}

export { handleWebRTCSignaling };
