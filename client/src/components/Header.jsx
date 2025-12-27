import { Settings } from 'lucide-react';
import Username from './Username';
import { Button } from './ui/button';

export default function Header({ page, name, setName }) {
    return (
        <div className="w-full">
            <h1 className="w-full align-left text-2xl font-medium mb-1">
                {page}
            </h1>
            <div className="flex justify-between items-center">
                <Username name={name} />
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setName('user')}
                >
                    <Settings />
                </Button>
            </div>
        </div>
    );
}
