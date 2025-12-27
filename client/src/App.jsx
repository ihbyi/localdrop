import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import io from 'socket.io-client';
import Send from './routes/Send';
import Receive from './routes/Receive';
import SelectRecipients from './routes/SelectRecipients';

const SERVER_ENDPOINT = 'http://localhost:5000';

function App() {
    const socketRef = useRef(null);
    const [user, setUser] = useState({
        id: null,
        name: 'user',
        type: 'sender',
    });
    const [recievers, setRecievers] = useState([]);

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(SERVER_ENDPOINT);
            socketRef.current.emit('join', { type: 'sender' });
        }

        socketRef.current.on('user', ({ user }) => {
            setUser(user);
        });

        socketRef.current.on('receivers list', (receivers) => {
            setRecievers(receivers);
        });

        return () => {
            socketRef.current?.off('user');
            socketRef.current?.off('receivers list');
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
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
