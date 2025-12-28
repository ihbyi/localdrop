import { File as FileIcon } from 'lucide-react';
import CircleProgress from './ui/CircleProgress';
import { useState, useEffect } from 'react';
import { formatSize } from '../lib/utils';

function Progress({ setIsDownloaded }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const timer = Math.floor(Math.random() * 51) + 50;
        const progression = setInterval(() => {
            setValue((prevValue) => {
                const newValue = prevValue + 5;
                if (newValue >= 100) {
                    clearInterval(progression);
                    return 100;
                }
                return newValue;
            });
        }, timer);

        return () => clearInterval(progression);
    }, []);

    useEffect(() => {
        if (value >= 100) {
            setIsDownloaded(true);
        }
    }, [value, setIsDownloaded]);

    return <CircleProgress value={value} />;
}

export default function File({ file = {}, showProgress = false }) {
    const [isDownloaded, setIsDownloaded] = useState(false);

    return (
        <div className="flex items-center w-full gap-2">
            {!showProgress ? (
                <FileIcon className="text-gray-500" strokeWidth={1} />
            ) : isDownloaded ? (
                <FileIcon className="text-green-500" strokeWidth={1} />
            ) : (
                <Progress setIsDownloaded={setIsDownloaded} />
            )}
            <h3 className="mr-auto">{file.name || 'Document'}</h3>
            <p>{formatSize(file.size) || '--'}</p>
        </div>
    );
}
