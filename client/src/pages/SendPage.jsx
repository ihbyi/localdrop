import DragDrop from '../components/DragDrop';
import Files from '../components/Files';

function SendPage({ files, setFiles }) {
    return (
        <>
            <DragDrop setFiles={setFiles} />
            <Files files={files} />
        </>
    );
}

export default SendPage;
