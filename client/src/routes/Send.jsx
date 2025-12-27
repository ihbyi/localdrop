import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import SendPage from '../pages/SendPage';

export default function Send({ user, setUser }) {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    const handleNameChange = (newName) => {
        setUser({ ...user, name: newName });
    };

    return (
        <div className="max-w-100 mx-auto">
            <div className="min-h-screen flex flex-col items-center gap-4 pt-[30vh] pb-35">
                <Header
                    page="Send"
                    name={user.name}
                    setName={handleNameChange}
                />
                <SendPage files={files} setFiles={setFiles} />
            </div>

            <div className="fixed bottom-0 max-w-100 w-full">
                <div className="w-full flex flex-col gap-2 pb-10 pt-6 bg-linear-to-b from-transparent to-white">
                    <Button variant="link" onClick={() => navigate('/receive')}>
                        Receive
                    </Button>

                    <Button
                        disabled={files.length <= 0}
                        onClick={() =>
                            navigate('/select-recipients', { state: { files } })
                        }
                    >
                        Choose Recipient
                    </Button>
                </div>
            </div>
        </div>
    );
}
