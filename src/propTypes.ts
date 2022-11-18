import { Dispatch } from "react";
import GameField from "./entities/board/GameField";
import GameHitmark from "./entities/board/GameHitmark";
import GameWarship from "./entities/board/GameWarship";
import GameActionType from "./entities/game/GameActionType";
import WebSocketEvent from "./entities/network/WebSocketEvent";
import { HitMessage, InitMessage, ShootMessage, StartMessage, StopMessage } from "./messages";

export interface AllyBoardProps {
    gameState: GameState;
    locked: boolean;
    onRearrange: Dispatch<GameAction>;
}

export interface EnemyBoardProps {
    onShoot: (field: GameField) => Promise<boolean>;
    locked: boolean;
}

export interface HomeProps {
    error: string;
    onError: (setError: React.SetStateAction<string>) => void;
}

// useReducer types
export type GameAction =
    | { type: GameActionType.START_DRAG, payload: GameWarship }
    | { type: GameActionType.STOP_DRAG, payload?: undefined }
    | { type: GameActionType.MOVE, payload: GameField }
    | { type: WebSocketEvent.INIT, payload: InitMessage }
    | { type: WebSocketEvent.START, payload: StartMessage }
    | { type: WebSocketEvent.SHOOT, payload: ShootMessage }
    | { type: WebSocketEvent.STOP, payload: StopMessage }
    | { type: WebSocketEvent.HIT, payload: HitMessage }


export interface GameState {
    warships: GameWarship[];
    dragging: GameWarship | null;
    hitmarks: GameHitmark[];
}