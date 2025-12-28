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
}

export { handleWebRTCSignaling };
