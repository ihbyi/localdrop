import { Button } from '@/components/ui/button';
import { Activity, useState } from 'react';
import SendPage from './pages/SendPage';
import RecievePage from './pages/RecievePage';
import Header from './components/Header';
import ReciepentPage from './pages/ReciepentPage';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

let socket;
const SERVER_ENDPOINT = 'http://localhost:5000';

function App() {
    const [isSendPage, setIsSendPage] = useState(true);
    const [files, setFiles] = useState([]);
    const [user, setUser] = useState({
        id: null,
        name: 'user',
        type: 'sender',
    });
    const [isReciepentPage, setIsReciepentPage] = useState(false);
    const [recievers, setRecievers] = useState([]);
    const [selectedReciepents, setSelectedReciepents] = useState([]);

    const socketRef = useRef(null);

    const buttonDisabled = files.length <= 0;

    useEffect(() => {
        if (!socketRef.current) socketRef.current = new io(SERVER_ENDPOINT);
        socket = socketRef.current;
        const type = isSendPage ? 'sender' : 'reciever';
        socket.emit('join', { type });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.on('user', ({ user }) => {
            setUser(user);
        });

        return () => {
            socket.off('user');
        };
    }, []);

    useEffect(() => {
        if (socket && user.id && user.id !== null) {
            const updatedUser = {
                ...user,
                type: isSendPage ? 'sender' : 'reciever',
            };
            socket.emit('update user', updatedUser);
            setUser(updatedUser);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSendPage]);

    useEffect(() => {
        socket.on('receivers list', (receivers) => {
            console.log('Receivers updated:', receivers);
            setRecievers(receivers);
        });

        return () => {
            socket.off('receivers list');
        };
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
            socket?.disconnect();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="max-w-100 mx-auto">
            <div className="min-h-screen flex flex-col items-center gap-4 pt-[30vh] pb-35">
                <Header
                    page={isSendPage ? 'Send' : 'Recieve'}
                    name={user.name}
                    setName={(newName) => setUser({ ...user, name: newName })}
                />
                <Activity mode={isSendPage ? 'visible' : 'hidden'}>
                    <Activity mode={!isReciepentPage ? 'visible' : 'hidden'}>
                        <SendPage files={files} setFiles={setFiles} />
                    </Activity>
                    <Activity mode={isReciepentPage ? 'visible' : 'hidden'}>
                        <ReciepentPage
                            reciepents={recievers}
                            setRecievers={setSelectedReciepents}
                        />
                    </Activity>
                </Activity>
                <Activity mode={!isSendPage ? 'visible' : 'hidden'}>
                    <RecievePage />
                </Activity>
            </div>
            <div className="fixed bottom-0 max-w-100 w-full">
                <div
                    className="w-full flex flex-col gap-2 pb-10 pt-6
                    bg-linear-to-b from-transparent to-white"
                >
                    <Button
                        variant="link"
                        onClick={() => {
                            setIsSendPage(!isSendPage);
                        }}
                    >
                        {!isSendPage ? 'Send' : 'Recieve'}
                    </Button>

                    <Activity
                        mode={
                            isSendPage && !isReciepentPage
                                ? 'visible'
                                : 'hidden'
                        }
                    >
                        <Button
                            disabled={buttonDisabled}
                            onClick={() => setIsReciepentPage(true)}
                        >
                            Choose Reciepent
                        </Button>
                    </Activity>

                    <Activity
                        mode={
                            isSendPage && isReciepentPage ? 'visible' : 'hidden'
                        }
                    >
                        <div className="grid grid-cols-[1fr_4fr] gap-2">
                            <Button
                                variant="ghost"
                                onClick={() => setIsReciepentPage(false)}
                            >
                                Back
                            </Button>
                            <Button
                                disabled={selectedReciepents.length <= 0}
                                onClick={() => setIsReciepentPage(true)}
                            >
                                Send
                            </Button>
                        </div>
                    </Activity>
                </div>
            </div>
        </div>
    );
}

export default App;
