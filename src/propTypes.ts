import { Dispatch } from "react";
import Field from "./entities/board/Field";
import GameWarship from "./entities/board/Warship";
import GameActionType from "./entities/game/GameActionType";
import WebSocketEvent from "./entities/network/WebSocketEvent";
import { InitMessage, ShootMessage, StartMessage, StopMessage } from "./messages";

export interface AllyBoardProps {
    gameState: GameState;
    onRearrange: Dispatch<GameAction>;
}

export interface EnemyBoardProps {
    onShoot: (field: Field) => Promise<boolean>;
}

export interface HomeProps {
    error: string;
    onError: (setError: React.SetStateAction<string>) => void;
}

// useReducer types
export type GameAction =
    | { type: GameActionType.START_DRAG, payload: GameWarship }
    | { type: GameActionType.STOP_DRAG, payload?: undefined }
    | { type: GameActionType.MOVE, payload: Field }
    | { type: WebSocketEvent.INIT, payload: InitMessage }
    | { type: WebSocketEvent.START, payload: StartMessage }
    | { type: WebSocketEvent.SHOOT, payload: ShootMessage }
    | { type: WebSocketEvent.STOP, payload: StopMessage }

export interface GameState {
    warships: GameWarship[];
    dragging: GameWarship | null;
}