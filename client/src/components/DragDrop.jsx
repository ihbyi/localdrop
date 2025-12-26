import { Upload } from 'lucide-react';

function DragDrop({ setFiles }) {
    const openFile = () => {
        document.getElementById('file').click();
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    return (
        <div
            className="w-full py-10 border border-dashed border-gray-400 text-center rounded-lg text-gray-400 flex flex-col items-center gap-2 cursor-pointer hover:text-gray-600 hover:border-gray-600 transition-colors duration-200"
            onClick={openFile}
        >
            <Upload className="size-8" strokeWidth={1} />
            <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
            />
            <p>Click to upload / Drag and drop files</p>
        </div>
    );
}

export default DragDrop;
