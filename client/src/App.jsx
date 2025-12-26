import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function App() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Button onClick={() => toast.success('Test')}>Click me</Button>
        </div>
    );
}

export default App;
