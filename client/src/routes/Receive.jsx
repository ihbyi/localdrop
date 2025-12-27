import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';
import RecievePage from '../pages/RecievePage';

export default function Receive({ user, setUser, onMount }) {
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
        </Layout>
    );
}
