import { Pen, Upload } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center flex-col gap-4 w-[350px] mx-auto">
                <div>You are known as: ihbyi</div>
                <div className="border border-dashed border-2 rounded-lg py-10 flex flex-col items-center justify-center gap-4 hover:border-primary transition-colors cursor-pointer duration-300 w-full">
                    <Upload className="w-10 h-10" strokeWidth={1} />
                    <p className="text-lg text-foreground">
                        Click to upload / Drop files here
                    </p>
                </div>
                <Button className="w-full">Recieve Files</Button>
            </div>
        </div>
    );
}

export default App;
