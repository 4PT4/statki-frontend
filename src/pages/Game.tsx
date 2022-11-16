import { useEffect, useState } from 'react';
import Field from '../class/Field';
import AllyBoard from '../components/AllyBoard';
import EnemyBoard from '../components/EnemyBoard';
import './Game.css';

const createPayload = (event: string, data: object) => {
    return JSON.stringify({ "event": event, "data": data });
}

const deserializeMessage = (data: string) => {
    return JSON.parse(data);
}

const Game = () => {
    const [status, setStatus] = useState('');
    const [warships, setWarships] = useState();
    let socket: WebSocket;

    const handleReady = (e: any) => {
        e.preventDefault();
        socket.send(createPayload("ready", {}))
    }

    const shootField = (field: Field): Promise<boolean> => {
        console.log(field);

        const payload = createPayload("shoot", { "x": field.x, "y": field.y });
        socket.send(payload);

        return new Promise((resolve, reject) => {
            socket.addEventListener('message', (e) => {
                const res: any = deserializeMessage(e.data);
                if (res.event == "hit") {
                    resolve(res.wasHit);
                }
            });

            setTimeout(() => {
                reject();
            }, 1000);
        });
    }

    const messageHandler = () => {
        socket.addEventListener('message', (e) => {
            const res: any = deserializeMessage(e.data);

            if (res.event == "status") {
                setStatus(res.status)
            }
        })
    }

    const getWarships = () => {
        socket.addEventListener('message', (e) => {
            const res: any = deserializeMessage(e.data);
            if (res.event == "init") {
                setWarships(res.data);
            }
        })
    }

    useEffect(() => {
        socket = new WebSocket('ws://localhost:8000');
        // Listen for messages
        getWarships()
        socket.addEventListener('message', (event) => {
            const res: any = deserializeMessage(event.data);
            setStatus(res.status);
        });
    });

    return (
        <div className="game">
            <h1>Warships game</h1>
            <h3>Let the battle begin!</h3>
            <h2>{status}</h2>
            <div>
                <AllyBoard warships={warships}/>
                <button onClick={handleReady}>Ready</button>
                <EnemyBoard onShoot={shootField} />
            </div>
        </div>
    );
};

export default Game;