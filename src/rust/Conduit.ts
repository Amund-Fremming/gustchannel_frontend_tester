import { Payload } from "./types";

export class Conduit {
    connection: WebSocket | null;

    constructor() {
        this.connection = null;
        console.info("Conduit created");
    }

    isConnected(): boolean {
        if (this.connection == null) {
            return false;
        }

        return true;

        return this.connection?.readyState !== WebSocket.OPEN;
    }

    connect(url: string, onOpen?: () => void) {
        this.connection = new WebSocket(`ws://${url}`);

        this.connection.onopen = () => {
            console.info("WebSocket connected");
            onOpen?.();
        }

        this.connection.onerror = () => {
            console.error("WebSocket error");
            this.connection = null;
        }

        this.connection.onclose = () => {
            console.log("WebSocket closed");
            this.connection = null;
        };
    }

    disconnect() {
        this.connection?.close();
        this.connection = null;
    }

    invoke<Primitive>(function_name: string, ...params: Primitive[]) {
        if (!this.connection || this.connection.readyState !== WebSocket.OPEN) {
            console.warn("Tried to send but WebSocket not open");
            return;
        }

        const payload: Payload<Primitive> = { function_name, params };
        this.connection.send(JSON.stringify(payload));
        console.log("Message sendt");
    }

    onReceive<T>(fn: (t: T) => void) {
        if (!this.connection) {
            console.warn("Tried to set onReceive before connecting");
            return;
        }

        this.connection.onmessage = (event) => {
            try {
                const data: T = JSON.parse(event.data);
                fn(data);
            } catch {
                fn(event.data as unknown as T);
            }
        };
    }
}