import { Button } from '@/components/ui/button';
import { Activity, useState } from 'react';
import SendPage from './pages/SendPage';
import RecievePage from './pages/RecievePage';
import Header from './components/Header';
import ReciepentPage from './pages/ReciepentPage';

function App() {
    const [isSendPage, setIsSendPage] = useState(true);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('user');
    const [isReciepentPage, setIsReciepentPage] = useState(false);

    const [recievers, setRecievers] = useState([]);

    const buttonDisabled = files.length <= 0;

    const reciepents = [{ id: 1, name: 'Husam' }];

    return (
        <div className="max-w-100 mx-auto">
            <div className="min-h-screen flex flex-col items-center gap-4 pt-[30vh] pb-35">
                <Header
                    page={isSendPage ? 'Send' : 'Recieve'}
                    name={name}
                    setName={setName}
                ></Header>
                <Activity mode={isSendPage ? 'visible' : 'hidden'}>
                    <Activity mode={!isReciepentPage ? 'visible' : 'hidden'}>
                        <SendPage files={files} setFiles={setFiles} />
                    </Activity>
                    <Activity mode={isReciepentPage ? 'visible' : 'hidden'}>
                        <ReciepentPage
                            reciepents={reciepents}
                            setRecievers={setRecievers}
                        />
                    </Activity>
                </Activity>
                <Activity mode={!isSendPage ? 'visible' : 'hidden'}>
                    <RecievePage />
                </Activity>
            </div>
            <div className="fixed bottom-0 max-w-100 w-full">
                <div
                    className="w-full flex flex-col gap-2 pb-10 pt-6
                    bg-linear-to-b from-transparent to-white"
                >
                    <Button
                        variant="link"
                        onClick={() => {
                            setIsSendPage(!isSendPage);
                        }}
                    >
                        {!isSendPage ? 'Send' : 'Recieve'}
                    </Button>

                    <Activity
                        mode={
                            isSendPage && !isReciepentPage
                                ? 'visible'
                                : 'hidden'
                        }
                    >
                        <Button
                            disabled={buttonDisabled}
                            onClick={() => setIsReciepentPage(true)}
                        >
                            Choose Reciepent
                        </Button>
                    </Activity>

                    <Activity
                        mode={
                            isSendPage && isReciepentPage ? 'visible' : 'hidden'
                        }
                    >
                        <div className="grid grid-cols-[1fr_4fr] gap-2">
                            <Button
                                variant="ghost"
                                onClick={() => setIsReciepentPage(false)}
                            >
                                Back
                            </Button>
                            <Button
                                disabled={recievers.length <= 0}
                                onClick={() => setIsReciepentPage(true)}
                            >
                                Send
                            </Button>
                        </div>
                    </Activity>
                </div>
            </div>
        </div>
    );
}

export default App;
