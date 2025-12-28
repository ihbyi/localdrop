import { Activity } from 'react';
import Reciepent from '../components/Reciepent';

export default function ReciepentPage({ recievers, reciepent, setReciepent }) {
    const recieversExists = recievers?.length > 0;

    return (
        <>
            <Activity mode={recieversExists ? 'visible' : 'hidden'}>
                <div className={`w-full grid grid-cols-4 gap-4`}>
                    {recievers.map((reciever) => (
                        <Reciepent
                            key={reciever.id}
                            info={reciever}
                            setReciepent={setReciepent}
                            isActive={reciepent === reciever.id}
                        />
                    ))}
                </div>
            </Activity>
            <Activity mode={!recieversExists ? 'visible' : 'hidden'}>
                <h1 className="text-gray-500">Waiting for reciepents...</h1>
            </Activity>
        </>
    );
}
