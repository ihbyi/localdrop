import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import RecievePage from '../pages/RecievePage';

export default function Receive({ user, setUser, onMount }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (onMount) onMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNameChange = (newName) => {
        setUser({ ...user, name: newName });
    };

    return (
        <div className="max-w-100 mx-auto">
            <div className="min-h-screen flex flex-col items-center gap-4 pt-[30vh] pb-35">
                <Header
                    page="Receive"
                    name={user.name}
                    setName={handleNameChange}
                />
                <RecievePage />
            </div>

            <div className="fixed bottom-0 max-w-100 w-full">
                <div className="w-full flex flex-col gap-2 pb-10 pt-6 bg-linear-to-b from-transparent to-white">
                    <Button variant="link" onClick={() => navigate('/')}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}
