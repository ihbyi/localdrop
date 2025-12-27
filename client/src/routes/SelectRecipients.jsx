import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import ReciepentPage from '../pages/ReciepentPage';

export default function SelectRecipients({ user, setUser, recievers }) {
    const navigate = useNavigate();
    const location = useLocation();
    const files = location.state?.files || [];

    const [selectedReciepents, setSelectedReciepents] = useState([]);

    const handleNameChange = (newName) => {
        setUser({ ...user, name: newName });
    };

    const handleSend = () => {
        console.log('Sending files:', files);
        console.log('To recipients:', selectedReciepents);
    };

    return (
        <div className="max-w-100 mx-auto">
            <div className="min-h-screen flex flex-col items-center gap-4 pt-[30vh] pb-35">
                <Header
                    page="Send"
                    name={user.name}
                    setName={handleNameChange}
                />
                <ReciepentPage
                    reciepents={recievers}
                    setRecievers={setSelectedReciepents}
                />
            </div>

            <div className="fixed bottom-0 max-w-100 w-full">
                <div className="w-full flex flex-col gap-2 pb-10 pt-6 bg-linear-to-b from-transparent to-white">
                    <div className="grid grid-cols-[1fr_4fr] gap-2">
                        <Button variant="ghost" onClick={() => navigate('/')}>
                            Back
                        </Button>
                        <Button
                            disabled={selectedReciepents.length <= 0}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
