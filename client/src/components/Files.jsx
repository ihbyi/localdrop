import File from './File';

export default function Files({ files = [], showProgress = false }) {
    return (
        <div className="w-full flex flex-col gap-3">
            {files.map((file, index) => (
                <File key={index} file={file} showProgress={showProgress} />
            ))}
        </div>
    );
}
