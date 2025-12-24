import { Pen } from 'lucide-react';

interface UsernameProps {
    name: string;
    changeName: (name: string) => void;
}

function Username({ name, changeName }: UsernameProps) {
    return (
        <div className="flex items-center gap-2">
            <h1>Display Name: {name}</h1>
            <Pen
                className="w-4 h-4 cursor-pointer"
                onClick={() => changeName('ihbyi')}
            />
        </div>
    );
}

export default Username;
