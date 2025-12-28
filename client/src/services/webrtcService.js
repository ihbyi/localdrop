export default class WebRTCService {
    constructor(socket) {
        this.socket = socket;
        this.peerConnection = null;
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

        const dataChannel =
            this.peerConnection.createDataChannel('fileTransfer');
        console.log('Data channel created');

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
            const dataChannel = event.channel;
            console.log('Data channel recieved:', dataChannel.label);
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
}
