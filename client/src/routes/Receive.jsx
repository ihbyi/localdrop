import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import RecievePage from '@/pages/RecievePage';
import IncomingTransferModal from '@/components/IncomingTransferModal';

export default function Receive({ user, setUser, onMount }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (onMount) onMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const [pendingTransfer, setPendingTransfer] = useState({
        sender: '',
        files: [],
    });

    const handleAccept = () => {
        console.log('Accepted transfer from:', pendingTransfer.sender);
        console.log('Files:', pendingTransfer.files);
        setModalOpen(false);
    };

    const handleReject = () => {
        console.log('Rejected transfer from:', pendingTransfer.sender);
        setModalOpen(false);
    };

    const handleTestModal = () => {
        setPendingTransfer({
            sender: 'Alice',
            files: [{ name: 'document.png', size: 1241232 }],
        });
        setModalOpen(true);
    };

    const bottomActions = (
        <>
            <Button variant="secondary" onClick={handleTestModal}>
                Test Modal
            </Button>
            <Button variant="link" onClick={() => navigate('/')}>
                Send
            </Button>
        </>
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
                open={modalOpen}
                onOpenChange={setModalOpen}
                sender={pendingTransfer.sender}
                files={pendingTransfer.files}
                onAccept={handleAccept}
                onReject={handleReject}
            />
        </Layout>
    );
}
