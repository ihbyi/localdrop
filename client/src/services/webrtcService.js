const CHUNK_SIZE = 16 * 1024;
const MAX_BUFFER_SIZE = CHUNK_SIZE * 1024;

export default class WebRTCService {
    constructor(socket) {
        this.socket = socket;
        this.peerConnection = null;
        this.dataChannel = null;

        this.receivedChunks = [];
        this.fileMetadata = null;
        this.receivedBytes = 0;

        this.onProgress = null;
        this.onTransferComplete = null;

        this.pendingFiles = [];
        this.targetPeer = null;
    }

    createPeerConnection() {
        const config = { iceServers: [] };
        this.peerConnection = new RTCPeerConnection(config);
        console.log('Peer connection created locally');

        return this.peerConnection;
    }

    async createOffer(target) {
        this.createPeerConnection();
        this.setupIceCandidateHandling(target);
        this.setupConnectionStateHandling();

        this.dataChannel =
            this.peerConnection.createDataChannel('fileTransfer');
        console.log('Data channel created');
        this.setupDataChannelListeners();

        const offer = await this.peerConnection.createOffer();
        console.log('Offer created: ', offer);

        await this.peerConnection.setLocalDescription(offer);
        console.log('Local description set');

        this.socket.emit('webrtc offer', {
            target,
            data: offer,
        });
        console.log(`Offer sent to: ${target}`);
    }

    async handleOffer(from, offer) {
        this.createPeerConnection();
        this.setupIceCandidateHandling(from);
        this.setupConnectionStateHandling();

        this.peerConnection.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            console.log('Data channel recieved:', this.dataChannel.label);
            this.setupDataChannelListeners();
        };

        await this.peerConnection.setRemoteDescription(offer);
        console.log('Remote description set');

        const answer = await this.peerConnection.createAnswer();
        console.log('Answer created:', answer);

        await this.peerConnection.setLocalDescription(answer);
        console.log('Local description set');

        this.socket.emit('webrtc answer', {
            target: from,
            data: answer,
        });
        console.log('Answer sent to', from);
    }

    async handleAnswer(answer) {
        await this.peerConnection.setRemoteDescription(answer);
        console.log('Answer recieved and set as remote description');
    }

    setupIceCandidateHandling(peer) {
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('ICE candidate found: ', event.candidate);
                this.socket.emit('ice candidate', {
                    target: peer,
                    data: event.candidate,
                });
            } else {
                console.log('All ICE candidates sent');
            }
        };
    }

    async addIceCandidate(candidate) {
        try {
            await this.peerConnection.addIceCandidate(candidate);
            console.log('ICE candidate added');
        } catch (err) {
            console.error('Error adding ICE candidate:', err);
        }
    }

    setupConnectionStateHandling() {
        this.peerConnection.onconnectionstatechange = () => {
            const state = this.peerConnection.connectionState;
            console.log('Connection state:', state);

            switch (state) {
                case 'connected':
                    console.log('✅ Peer connection established!');
                    break;
                case 'connecting':
                    console.log('🔄️ Peer is connecting');
                    break;
                case 'disconnected':
                    console.log('⚠️ Peer disconnected');
                    break;
                case 'failed':
                    console.log('❌ Connection failed');
                    break;
                case 'closed':
                    console.log('Connection closed');
            }
        };
    }

    setupDataChannelListeners() {
        if (!this.dataChannel) {
            console.error('No data channel to setup listeners for');
            return;
        }

        this.dataChannel.onopen = () => {
            console.log('✅ Data channel opened');
        };

        this.dataChannel.onclose = () => {
            console.log('❌ Data channel closed');
        };

        this.dataChannel.onerror = (err) => {
            console.error('❌ Data channel error:', err);
        };

        this.dataChannel.onmessage = (event) => {
            if (typeof event.data === 'string') {
                this.fileMetadata = JSON.parse(event.data);
                console.log('Received metadata:', this.fileMetadata);

                this.receivedChunks = [];
                this.receivedBytes = 0;
            } else {
                this.receivedChunks.push(event.data);
                this.receivedBytes += event.data.byteLength;

                const progress = Math.min(
                    (this.receivedBytes / this.fileMetadata.size) * 100,
                    100
                );

                if (this.onProgress) {
                    this.onProgress(Math.round(progress));
                }

                console.log(
                    `Received chunk: ${this.receivedChunks.length}/${
                        this.fileMetadata.size
                    } bytes - ${Math.round(progress)}%`
                );

                if (this.receivedBytes === this.fileMetadata.size) {
                    console.log('All chunks recieved! Reconstructing file...');
                    this.reconstructFile();
                }
            }
        };
    }

    async sendFile(file) {
        if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
            console.error('Data channel is not open');
            throw new Error('Data channel is not ready');
        }

        console.log(`Starting file transfer: ${file.name}`);

        const metadata = {
            type: 'metadata',
            name: file.name,
            size: file.size,
            mimeType: file.type,
        };

        this.dataChannel.send(JSON.stringify(metadata));
        console.log('Metadata sent: ', metadata);

        await this.sendFileInChunks(file);
        console.log('File transfer complete');
    }

    async sendFileInChunks(file) {
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        console.log(`Splitting file into ${totalChunks} chunks`);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);

            const chunk = file.slice(start, end);
            const arrayBuffer = await chunk.arrayBuffer();

            while (this.dataChannel.bufferedAmount > MAX_BUFFER_SIZE) {
                await new Promise((resolve) => setTimeout(resolve, 10));
            }

            this.dataChannel.send(arrayBuffer);

            const bytesSent = (i + 1) * CHUNK_SIZE;
            const progress = Math.min((bytesSent / file.size) * 100, 100);

            if (this.onProgress) {
                this.onProgress(Math.round(progress));
            }

            console.log(
                `Sent chunk ${i + 1}/${totalChunks} (${
                    arrayBuffer.byteLength
                } bytes - ${Math.round(progress)}%)`
            );
        }

        console.log('All chunks sent');

        if (this.onTransferComplete) {
            this.onTransferComplete({ success: true });
        }
    }

    reconstructFile() {
        console.log(' Reconstructing file');
        const blob = new Blob(this.receivedChunks, {
            type: this.fileMetadata.mimeType,
        });

        console.log(`File reconstructed: ${blob.size} bytes`);

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.fileMetadata.name;
        a.click();

        URL.revokeObjectURL(url);
        console.log('Download triggered', this.fileMetadata.name);

        if (this.onTransferComplete) {
            this.onTransferComplete({ success: true });
        }

        this.receivedChunks = [];
        this.fileMetadata = null;
        this.receivedBytes = 0;
    }

    async requestTransfer(targetPeer, fileMetadata, files) {
        console.log('📤 Requesting transfer to:', targetPeer);

        this.pendingFiles = files;
        this.targetPeer = targetPeer;

        await this.createOffer(targetPeer);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.socket.emit('transfer request', {
            target: targetPeer,
            files: fileMetadata,
        });

        console.log('📋 Transfer request sent');
    }
    async handleTransferAccepted() {
        console.log('✅ Transfer accepted! Starting file transfer...');

        for (const file of this.pendingFiles) {
            try {
                console.log(`📤 Sending file: ${file.name}`);
                await this.sendFile(file);
                console.log(`✅ File sent: ${file.name}`);
            } catch (error) {
                console.error(`❌ Error sending file ${file.name}:`, error);
            }
        }

        this.pendingFiles = [];
        this.targetPeer = null;
    }
    handleTransferRejected() {
        console.log('❌ Transfer rejected');
        this.pendingFiles = [];
        this.targetPeer = null;
    }
}
