import { useEffect, useState } from 'react';
import AllyBoard from '../components/AllyBoard';
import EnemyBoard from '../components/EnemyBoard';
import './Game.css';

const Game = () => {
    const [status, setStatus] = useState('');

    let socket:WebSocket;
    const handleReady = (e:any) => {
        e.preventDefault();
        socket.send(JSON.stringify({"event":"ready", "data": {}}))
        
    }
    useEffect(() => {
        socket = new WebSocket('ws://localhost:8000');
        // Listen for messages
        socket.addEventListener('message', (event) => {
            let stat = JSON.parse(event.data);
            setStatus(stat.data);
            
            // { "event": "ready", "data": "" }
        });
    });

    return (
        <div className="game">
            <h1>Warships game</h1>
            <h3>Let the battle begin!</h3>
            <p>{status}</p>
            <div>
                <AllyBoard />
                <button onClick={handleReady}>Ready</button>
                <EnemyBoard />
            </div>
        </div>
    );
};

export default Game;