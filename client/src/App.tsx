import { useState } from 'react';
import Onboarding from './pages/Onboarding';
import { Button } from './components/ui/button';

function App() {
    const [name, setName] = useState('user');

    const [isRecieving, setIsRecieving] = useState(false);

    const changeName = (name: string) => {
        setName(name);
    };

    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4 w-[350px] mx-auto">
            {!isRecieving && <Onboarding name={name} changeName={changeName} />}
            <Button
                className="w-full"
                onClick={() => setIsRecieving(!isRecieving)}
            >
                {isRecieving ? 'Send Files' : 'Recieve Files'}
            </Button>
        </div>
    );
}

export default App;
