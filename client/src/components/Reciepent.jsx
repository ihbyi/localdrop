import { MonitorSmartphone } from 'lucide-react';
import { useState } from 'react';

export default function Reciepent({ info, setRecievers }) {
    const [active, setActive] = useState(false);

    const { id, name } = info;
    return (
        <div
            variant="outline"
            className={`flex gap-2 select-none cursor-pointer border rounded-lg p-4 transition-all duration-200 ${
                active
                    ? 'border-black bg-black/5 shadow-md ring-2 ring-black ring-opacity-50'
                    : 'border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow'
            }`}
            onClick={() => {
                setRecievers((prev) => {
                    if (active) {
                        return prev.filter((item) => item.id !== id);
                    } else {
                        return [info, ...prev];
                    }
                });

                setActive(!active);
            }}
        >
            <MonitorSmartphone />
            {name}
        </div>
    );
}
