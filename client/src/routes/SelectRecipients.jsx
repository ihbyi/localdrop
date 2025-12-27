import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';
import ReciepentPage from '../pages/ReciepentPage';

export default function SelectRecipients({ user, setUser, recievers }) {
    const navigate = useNavigate();
    const location = useLocation();
    const files = location.state?.files || [];

    const [selectedReciepents, setSelectedReciepents] = useState([]);

    const handleSend = () => {
        console.log('Sending files:', files);
        console.log('To recipients:', selectedReciepents);
        // TODO: Navigate to progress page when created
        // navigate('/sending-progress', { state: { files, selectedReciepents } });
    };

    const bottomActions = (
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
    );

    return (
        <Layout
            page="Send"
            user={user}
            setUser={setUser}
            bottomActions={bottomActions}
        >
            <ReciepentPage
                reciepents={recievers}
                setRecievers={setSelectedReciepents}
            />
        </Layout>
    );
}
