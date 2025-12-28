import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Files from '@/components/Files';
import { Button } from '@/components/ui/button';

export default function IncomingTransferModal({
    open,
    onOpenChange,
    sender,
    files = [],
    onAccept,
    onReject,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Incoming File Transfer</DialogTitle>
                    <DialogDescription>
                        {sender} wants to send you {files.length}{' '}
                        {files.length === 1 ? 'file' : 'files'}
                    </DialogDescription>
                </DialogHeader>
                <Files files={files} showProgress={false} />
                <div className="grid grid-cols-[2fr_1fr] gap-2">
                    <Button onClick={onAccept}>Accept</Button>
                    <Button variant="destructive" onClick={onReject}>
                        Reject
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
