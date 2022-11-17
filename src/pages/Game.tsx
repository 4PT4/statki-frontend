import _, { create } from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import Field from '../entities/board/Field';
import AllyBoard from '../components/AllyBoard';
import EnemyBoard from '../components/EnemyBoard';
import GameActionType from '../entities/game/GameActionType';
import GameError from '../entities/game/GameError';
import { GameAction, GameState } from '../propTypes';
import './Game.css';
import WebSocketEvent from '../entities/network/WebSocketEvent';
import WebSocketMessage from '../entities/network/WebSocketMessage';
import InitResponse from '../DTOs/InitResponse';
import GameWarship from '../entities/board/Warship';

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case GameActionType.INITIALIZE:
            return {
                ...state,
                warships: action.payload
            };
        case GameActionType.START_DRAG:
            return {
                warships: state.warships.filter(w => !_.isEqual(w, action.payload)),
                dragging: action.payload
            };
        case GameActionType.STOP_DRAG:
            return {
                warships: [...state.warships, state.dragging!],
                dragging: null
            };
        case GameActionType.MOVE:
            return {
                ...state,
                dragging: { ...state.dragging!, position: action.payload }
            };
        default:
            return state;
    }
};

function sendMessage(event: WebSocketEvent, data: object) {
    const message: WebSocketMessage = { event, data };
    const payload = JSON.stringify(message);
    socket.send(payload);
}

function onMessage<T>(event: WebSocketEvent): Promise<T> {
    return new Promise((resolve) => {
        socket.addEventListener('message', e => {
            const message: WebSocketMessage = JSON.parse(JSON.parse(e.data));
            if (message.event === event) {
                console.log(message.data)
                resolve(message.data as T);
            }
        });
    });
}

let socket: WebSocket;

const Game = () => {
    const [gameState, dispatch] = useReducer(gameReducer, {
        warships: [],
        dragging: null
    });
    const [status, setStatus] = useState();

    const handleReady = (e: any) => {
        e.preventDefault();
        console.log(gameState.warships);
        // socket.send(createPayload("ready", {}))
    }

    const shootField = (field: Field): Promise<boolean> => {
        console.log(field);

        // const payload = createPayload("shoot", { "x": field.x, "y": field.y });
        // socket.send(payload);

        return new Promise((resolve, reject) => {
            // socket.addEventListener('message', (e) => {
            //     const res: any = deserializeMessage(e.data);
            //     if (res.event === "hit") {
            //         resolve(res.wasHit);
            //     }
            // });

            setTimeout(() => {
                reject(new GameError("Server didn't respond."));
            }, 1000);
        });
    }

    const messageHandler = () => {
        // socket.addEventListener('message', (e) => {
        //     const res: any = deserializeMessage(e.data);

        //     if (res.event === "status") {
        //         setStatus(res.status)
        //     }
        // })
    }

    const updateWarships = async () => {
        const res: InitResponse = await onMessage(WebSocketEvent.INIT);

        dispatch({
            type: GameActionType.INITIALIZE,
            payload: res.warships.map(w => new GameWarship(w))
        });
    };

    useEffect(() => {
        const url = new URL('ws://localhost:8000');
        const token = localStorage.getItem("token");
        url.searchParams.append("token", token ?? "");
        socket = new WebSocket(url);
        updateWarships();
    }, []);

    return (
        <div className="game">
            <h1>Warships game</h1>
            <h3>Let the battle begin!</h3>
            <h2>{status}</h2>
            <div>
                <AllyBoard gameState={gameState} onRearrange={dispatch} />
                <button onClick={handleReady}>Ready</button>
                <EnemyBoard onShoot={shootField} />
            </div>
        </div>
    );
};

export default Game;