import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';
import ReciepentPage from '../pages/ReciepentPage';

export default function SelectRecipients({
    user,
    setUser,
    recievers,
    webrtcServiceRef,
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const files = location.state?.files || [];

    const [reciepent, setReciepent] = useState(undefined);
    const [canSend, setCanSend] = useState(true);

    const handleSend = () => {
        setCanSend(false);
        console.log('Sending files:', files);
        console.log('To recipient:', reciepent);

        // TODO: Navigate to progress page when created
        // navigate('/sending-progress', { state: { files, reciepent } });

        if (webrtcServiceRef.current && reciepent) {
            webrtcServiceRef.current.createOffer(reciepent);
        }
    };

    const bottomActions = (
        <div className="grid grid-cols-[1fr_4fr] gap-2">
            <Button variant="ghost" onClick={() => navigate('/')}>
                Back
            </Button>
            <Button disabled={!reciepent || !canSend} onClick={handleSend}>
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
                recievers={recievers}
                reciepent={reciepent}
                setReciepent={setReciepent}
            />
        </Layout>
    );
}
