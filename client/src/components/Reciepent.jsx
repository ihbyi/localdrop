import { MonitorSmartphone } from 'lucide-react';

export default function Reciepent({ info, setReciepent, isActive }) {
    const { id, name } = info;
    return (
        <div
            variant="outline"
            className={`flex flex-col justify-center items-center gap-2 select-none cursor-pointer border rounded-lg p-4 transition-all duration-200 ${
                isActive
                    ? 'border-black bg-black/5 shadow-md ring-2 ring-black ring-opacity-50'
                    : 'border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow'
            }`}
            onClick={() => {
                setReciepent(isActive ? null : id);
            }}
        >
            <MonitorSmartphone />
            {name}
        </div>
    );
}
