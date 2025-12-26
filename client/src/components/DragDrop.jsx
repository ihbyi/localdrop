import { Upload } from 'lucide-react';
import { useState, useRef } from 'react';

function DragDrop({ setFiles }) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const openFile = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const dropped = Array.from(e.dataTransfer.files || []);
        if (dropped.length === 0) return;

        setFiles((prev) => [...prev, ...dropped]);
    };

    return (
        <div
            className={`w-full py-10 border border-dashed text-center rounded-lg ${
                isDragging ? 'text-gray-600' : 'text-gray-400'
            } ${
                isDragging ? 'border-gray-600' : 'border-gray-400'
            } flex flex-col items-center gap-2 cursor-pointer transition-colors duration-200`}
            onClick={openFile}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={onDrop}
        >
            <Upload className="size-8" strokeWidth={1} />
            <input
                type="file"
                name="file"
                ref={inputRef}
                className="hidden"
                multiple
                onChange={handleFileChange}
            />
            <p>Click to upload / Drag and drop files</p>
        </div>
    );
}

export default DragDrop;
