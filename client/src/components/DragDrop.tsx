import { Upload } from 'lucide-react';

function DragDrop() {
    return (
        <div
            className="border border-dashed border-2 rounded-lg py-10 flex flex-col items-center justify-center gap-4 hover:border-primary transition-colors cursor-pointer duration-300 w-full"
            onClick={() => document.getElementById('files')?.click()}
        >
            <Upload className="w-10 h-10" strokeWidth={1} />
            <input type="file" name="files" id="files" className="hidden" />
            <p className="text-lg text-foreground">
                Click to upload / Drop files here
            </p>
        </div>
    );
}

export default DragDrop;
