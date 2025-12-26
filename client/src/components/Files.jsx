import File from './File';

export default function Files({ files = [] }) {
    return (
        <div className="w-full flex flex-col gap-2">
            {files.map((file, index) => (
                <File key={index} file={file} />
            ))}
        </div>
    );
}
