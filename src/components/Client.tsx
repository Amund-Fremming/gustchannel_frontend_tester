import { useEffect, useState } from "react";
import JsonView from "./JsonView";
import { Conduit } from "../rust/Conduit";

interface ClientProps {
    name: string
    hub: string
}

export function Client({ name, hub }: ClientProps) {
    const [conduit, setConduit] = useState<Conduit>(new Conduit());
    const [messages, setMessages] = useState<string[]>([]);
    const [room, setRoom] = useState<string>("");
    const [status, setStatus] = useState<string>("not connected");

    useEffect(() => {
        return () => {
            conduit.disconnect();
        };
    }, []);

    const isOpen = () => {
        alert(`Connected: ${conduit.isConnected()}`);
    }

    const handleConnect = () => {
        if (room == "") {
            alert("Specify room id to connect!");
            return;
        }

        setStatus(`connected:${room}`)

        const url = `localhost:3001/${hub}/${room}`;
        conduit.connect(url);

        conduit.onReceive((message: string) => {
            setMessages(prev => [...prev, message])
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
            <p onClick={isOpen}>({status})</p>
            <h2>{name}</h2>
            <button onClick={handleConnect}>Connect</button>
            <button onClick={handleDisconnect}>Disconnect</button>
            <input onChange={e => setRoom(e.target.value)} placeholder="group id" />
            <button onClick={sendMessage}>Send</button>
            <div>
                {messages.map((m, i) => (
                    <JsonView data={m} key={i} />
                ))}
            </div>
        </div>
    );
}

export default Client;