class client {
    url: string;
    socket: WebSocket;

    constructor(url: string) {
        this.url = url;
        this.socket = new WebSocket(`ws://${url}`);
    }
}