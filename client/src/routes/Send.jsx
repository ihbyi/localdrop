import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';
import SendPage from '../pages/SendPage';

export default function Send({ user, setUser, onMount }) {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (onMount) onMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const bottomActions = (
        <>
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
        </>
    );

    return (
        <Layout
            page="Send"
            user={user}
            setUser={setUser}
            bottomActions={bottomActions}
        >
            <SendPage files={files} setFiles={setFiles} />
        </Layout>
    );
}
