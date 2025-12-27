import { Activity } from 'react';
import Reciepent from '../components/Reciepent';

export default function ReciepentPage({ reciepents, setRecievers }) {
    const reciepentsExist = reciepents.length > 0;

    return (
        <>
            <Activity mode={reciepentsExist ? 'visible' : 'hidden'}>
                <div className={`w-full grid grid-cols-2 gap-4`}>
                    {reciepents.map((reciepent) => (
                        <Reciepent
                            key={reciepent.id}
                            info={reciepent}
                            setRecievers={setRecievers}
                        />
                    ))}
                </div>
            </Activity>
            <Activity mode={!reciepentsExist ? 'visible' : 'hidden'}>
                <h1 className="text-gray-500">Waiting for reciepents...</h1>
            </Activity>
        </>
    );
}
