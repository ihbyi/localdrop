import { Button } from '@/components/ui/button';
import { Activity, useState } from 'react';
import Username from './components/Username';
import SendPage from './pages/SendPage';
import RecievePage from './pages/RecievePage';

function App() {
    const [isRecieveing, setIsRecieveing] = useState(false);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('user');

    return (
        <div className="min-h-screen max-w-100 flex justify-center items-center mx-auto flex-col gap-4">
            <Username name={name} setName={setName} />
            <Activity mode={!isRecieveing ? 'visible' : 'hidden'}>
                <SendPage files={files} setFiles={setFiles} />
            </Activity>
            <Activity mode={isRecieveing ? 'visible' : 'hidden'}>
                <RecievePage />
            </Activity>
            <Button
                className="w-full"
                onClick={() => {
                    setIsRecieveing(!isRecieveing);
                }}
            >
                {isRecieveing ? 'Send' : 'Recieve'}
            </Button>
        </div>
    );
}

export default App;
