import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import io from 'socket.io-client';
import Send from './routes/Send';
import Receive from './routes/Receive';
import SelectRecipients from './routes/SelectRecipients';
import WebRTCService from './services/webrtcService';

const SERVER_ENDPOINT = 'http://localhost:5000';

function App() {
    const socketRef = useRef(null);
    const webrtcServiceRef = useRef(null);
    const [user, setUser] = useState({
        id: null,
        name: 'user',
        type: 'sender',
    });
    const [recievers, setRecievers] = useState([]);

    const [incomingTransfer, setIncomingTransfer] = useState({
        open: false,
        from: null,
        files: [],
    });

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(SERVER_ENDPOINT);
            socketRef.current.emit('join', { type: 'sender' });
            webrtcServiceRef.current = new WebRTCService(socketRef.current);
        }

        socketRef.current.on('user', ({ user }) => {
            setUser(user);
        });

        socketRef.current.on('receivers list', (receivers) => {
            setRecievers(receivers);
        });

        socketRef.current.on('webrtc offer', ({ from, data }) => {
            console.log('Received offer from', from);
            webrtcServiceRef.current?.handleOffer(from, data);
        });

        socketRef.current.on('webrtc answer', ({ from, data }) => {
            console.log('Received answer from', from);
            webrtcServiceRef.current?.handleAnswer(data);
        });

        socketRef.current.on('ice candidate', ({ from, data }) => {
            console.log('Received ICE candidate from', from);
            webrtcServiceRef.current?.addIceCandidate(data);
        });

        socketRef.current.on('transfer request', ({ from, files }) => {
            console.log('📥 Transfer request from', from, files);
            setIncomingTransfer({ open: true, from, files });
        });
        socketRef.current.on('transfer response', ({ from, accepted }) => {
            console.log(
                '📨 Transfer response from ' + from + ':',
                accepted ? 'accepted' : 'rejected'
            );
            if (accepted) {
                webrtcServiceRef.current?.handleTransferAccepted();
            } else {
                webrtcServiceRef.current?.handleTransferRejected();
            }
        });

        return () => {
            socketRef.current?.off('user');
            socketRef.current?.off('receivers list');
            socketRef.current?.off('webrtc offer');
            socketRef.current?.off('webrtc answer');
            socketRef.current?.off('ice candidate');
            socketRef.current?.off('transfer request');
            socketRef.current?.off('transfer response');
        };
    }, []);

    useEffect(() => {
        if (socketRef.current && user.id && typeof user.id === 'string') {
            socketRef.current.emit('update user', user);
        }
    }, [user]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            socketRef.current?.disconnect();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () =>
            window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    const updateUserType = (type) => {
        setUser((prev) => ({ ...prev, type }));
    };

    const handleAcceptTransfer = () => {
        console.log('✅ Accepting transfer from:', incomingTransfer.from);

        // Send acceptance via socket
        socketRef.current.emit('transfer response', {
            target: incomingTransfer.from,
            accepted: true,
        });

        // Close modal
        setIncomingTransfer({ open: false, from: null, files: [] });
    };
    const handleRejectTransfer = () => {
        console.log('❌ Rejecting transfer from:', incomingTransfer.from);

        // Send rejection via socket
        socketRef.current.emit('transfer response', {
            target: incomingTransfer.from,
            accepted: false,
        });

        // Close modal
        setIncomingTransfer({ open: false, from: null, files: [] });
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Send
                            user={user}
                            setUser={setUser}
                            onMount={() => updateUserType('sender')}
                        />
                    }
                />
                <Route
                    path="/receive"
                    element={
                        <Receive
                            user={user}
                            setUser={setUser}
                            onMount={() => updateUserType('reciever')}
                            incomingTransfer={incomingTransfer}
                            handleAcceptTransfer={handleAcceptTransfer}
                            handleRejectTransfer={handleRejectTransfer}
                        />
                    }
                />
                <Route
                    path="/select-recipients"
                    element={
                        <SelectRecipients
                            user={user}
                            setUser={setUser}
                            recievers={recievers}
                            webrtcServiceRef={webrtcServiceRef}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
