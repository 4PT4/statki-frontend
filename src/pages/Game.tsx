import { useEffect, useReducer, useState } from 'react';
import GameField from '../entities/board/GameField';
import AllyBoard from '../components/AllyBoard';
import EnemyBoard from '../components/EnemyBoard';
import GameActionType from '../entities/game/GameActionType';
import GameError from '../entities/game/GameError';
import { GameAction, GameState } from '../propTypes';
import './Game.css';
import WebSocketEvent from '../entities/network/WebSocketEvent';
import GameWarship from '../entities/board/GameWarship';
import Warship from '../entities/Warship';
import GameExitCode from '../entities/game/GameExitCode';
import { useNavigate } from 'react-router-dom';

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
    const [locked, setLocked] = useState<boolean>(false);

    const navigate = useNavigate();

    const updateGameStatus = (code: GameExitCode) => {
        switch (code) {
            case GameExitCode.ENEMY_DISCONNECTED:
                setStatus('Enemy disconnected :(');
                break;

            case GameExitCode.WIN:
                setStatus('You won!')
                break;

            case GameExitCode.LOSE:
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
                setLocked(false);
                break;

            case WebSocketEvent.START:
                setStatus(`Playing against ${payload.nickname} (${payload.winRate}% W/R)`)
                break;

            case WebSocketEvent.SHOOT:
                notifyShot?.(payload.hit);
                break;

            case WebSocketEvent.HIT:
                const {x, y} = payload.field;
                return{
                    ...state,
                    hitmarks: [...state.hitmarks, {wasHit: payload.wasHit, field: new GameField(x, y)}] 
                }

            case WebSocketEvent.INIT:
                setStatus(`Hi ${payload.nickname}!`)
                console.log(payload);
                return {
                    ...state,
                    warships: payload.warships.map(w => new GameWarship(w))
                }

            case GameActionType.START_DRAG:
                return {
                    ...state,
                    warships: state.warships.filter(w => w !== payload),
                    dragging: payload

                }

            case GameActionType.STOP_DRAG:
                return {
                    ...state,
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
        dragging: null,
        hitmarks: []
    });

    const shotHandler = (field: GameField): Promise<boolean> => {
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
        setStatus('Looking for player')
        setLocked(true);
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
        
        socket.onerror = () => navigate('/login');
    }, []);

    return (
        <div className="game">
            <h1>Warships game</h1>
            <h3>Let the battle begin!</h3>
            <p>{status}</p>
            <div>
                <AllyBoard gameState={gameState} locked={locked} onRearrange={dispatch}  />
                <button onClick={readyHandler}>Ready</button>
                <EnemyBoard onShoot={shotHandler} locked={locked}/>
            </div>
        </div>
    );
};

export default Game;