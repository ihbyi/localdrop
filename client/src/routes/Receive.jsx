import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import RecievePage from '@/pages/RecievePage';
import IncomingTransferModal from '@/components/IncomingTransferModal';

export default function Receive({
    user,
    setUser,
    onMount,
    incomingTransfer,
    handleAcceptTransfer,
    handleRejectTransfer,
}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (onMount) onMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const bottomActions = (
        <Button variant="link" onClick={() => navigate('/')}>
            Send
        </Button>
    );

    return (
        <Layout
            page="Receive"
            user={user}
            setUser={setUser}
            bottomActions={bottomActions}
        >
            <RecievePage />
            <IncomingTransferModal
                open={incomingTransfer.open}
                onOpenChange={(open) => {
                    if (!open) handleRejectTransfer();
                }}
                sender={incomingTransfer.senderName}
                files={incomingTransfer.files}
                onAccept={handleAcceptTransfer}
                onReject={handleRejectTransfer}
            />
        </Layout>
    );
}
