import { useEffect, useReducer, useState } from 'react';
import Field from '../entities/board/Field';
import AllyBoard from '../components/AllyBoard';
import EnemyBoard from '../components/EnemyBoard';
import GameActionType from '../entities/game/GameActionType';
import GameError from '../entities/game/GameError';
import { GameAction, GameState } from '../propTypes';
import './Game.css';
import WebSocketEvent from '../entities/network/WebSocketEvent';
import GameWarship from '../entities/board/Warship';
import Warship from '../entities/Warship';
import GameExitCode from '../entities/game/GameExitCode';

let socket: WebSocket;

function sendMessage(event: WebSocketEvent, data: object) {
    const payload = JSON.stringify({ event, data });
    socket.send(payload);
}

let notifyShot: (hit: boolean) => void;

const onShotResponse = (callback: (hit: boolean) => void) => {
    notifyShot = callback;
};

const Game = () => {
    const [status, setStatus] = useState<string>();

    const updateGameStatus = (code: GameExitCode) => {
        switch (code) {
            case GameExitCode.ENEMY_DISCONNECTED:
                setStatus('Enemy disconnected :(');
                break;

            case GameExitCode.WIN:
                console.log(code)
                setStatus('You won!')
                break;

            case GameExitCode.LOSE:
                console.log(code)
                setStatus('You lost.')
                break;

            default:
                break;
        }
    };

    const gameReducer = (state: GameState, { type, payload }: GameAction): GameState => {
        switch (type) {
            case WebSocketEvent.STOP:
                updateGameStatus(payload.code);
                break;

            case WebSocketEvent.START:
                setStatus(`Playing against ${payload.nickname} (${payload.winRate}% W/R)`)
                break;

            case WebSocketEvent.SHOOT:
                notifyShot?.(payload.hit);
                break;

            case WebSocketEvent.INIT:
                setStatus(`Hi ${payload.nickname}!`)
                console.log(payload);
                return {
                    ...state,
                    warships: payload.warships.map(w => new GameWarship(w))
                }

            case GameActionType.START_DRAG:
                return {
                    warships: state.warships.filter(w => w !== payload),
                    dragging: payload
                }

            case GameActionType.STOP_DRAG:
                return {
                    warships: [...state.warships, state.dragging!],
                    dragging: null
                }

            case GameActionType.MOVE:
                return {
                    ...state,
                    dragging: {
                        ...state.dragging!,
                        position: payload
                    }
                }

            default:
                break;
        }

        return state;
    };

    const [gameState, dispatch] = useReducer(gameReducer, {
        warships: [],
        dragging: null
    });

    const shotHandler = (field: Field): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            onShotResponse((hit: boolean) => {
                resolve(hit);
            });

            const { x, y } = field;
            sendMessage(WebSocketEvent.SHOOT, { x, y });

            setTimeout(() => {
                reject(new GameError("Game server didn't respond."));
            }, 1000);
        });
    };

    const readyHandler = () => {
        const warships: Warship[] = gameState.warships.map(w => {
            return {
                id: w.id,
                length: w.length,
                x: w.position.x,
                y: w.position.y,
                orientation: w.orientation
            }
        });
        sendMessage(WebSocketEvent.READY, { warships });
    };

    useEffect(() => {
        setStatus("Connecting to game server...");
        const url = new URL('ws://localhost:8000');
        const token = localStorage.getItem("token");
        url.searchParams.append("token", token ?? "");
        socket = new WebSocket(url);
        socket.onmessage = (e) => {
            const message = JSON.parse(JSON.parse(e.data));
            console.log(message);
            dispatch({ type: message.event, payload: message.data });
        }
        socket.onerror = () => setStatus("Failed to connect.");
    }, []);

    return (
        <div className="game">
            <h1>Warships game</h1>
            <h3>Let the battle begin!</h3>
            <p>{status}</p>
            <div>
                <AllyBoard gameState={gameState} onRearrange={dispatch} />
                <button onClick={readyHandler}>Ready</button>
                <EnemyBoard onShoot={shotHandler} />
            </div>
        </div>
    );
};

export default Game;