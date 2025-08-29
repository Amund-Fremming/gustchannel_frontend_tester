import { useEffect, useState } from "react";
import { conduit } from "../rust/Conduit";

interface ClientProps {
    name: string
    hub: string
}

export function Client({ name, hub }: ClientProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [room, setRoom] = useState<string>("");
    const [status, setStatus] = useState<string>("not connected");

    useEffect(() => {
        return () => {
            conduit.disconnect();
        };
    }, []);

    const handleConnect = () => {
        setStatus(`connected:${room}`)

        const url = `localhost:3001/${hub}`;
        conduit.connect(url);

        conduit.onReceive((message: string) => {
            console.log(message);
            setMessages(prev => [...prev, "pong"])
        });
    }

    const handleDisconnect = () => {
        conduit.disconnect();
        setStatus("not connected");
    }

    const sendMessage = () => {
        conduit.invoke("hello_backend", 1, 2, 3);
    };

    return (
        <div className="client">
            <p>[{hub}]</p>
            <p>({status})</p>
            <h2>{name}</h2>
            <button onClick={handleConnect}>Connect</button>
            <button onClick={handleDisconnect}>Disconnect</button>
            <input onChange={e => setRoom(e.target.value)} placeholder="group id" />
            <button onClick={sendMessage}>Send</button>
            <div>
                {messages.map((m, i) => (
                    <div key={i}>{m}</div>
                ))}
            </div>
        </div>
    );
}

export default Client;