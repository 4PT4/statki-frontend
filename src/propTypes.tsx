import { Dispatch } from "react";
import Field from "./entities/board/Field";
import GameWarship from "./entities/board/Warship";
import GameActionType from "./entities/game/GameActionType";

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
    | { type: GameActionType.INITIALIZE, payload: GameWarship[] }
    | { type: GameActionType.START_DRAG, payload: GameWarship }
    | { type: GameActionType.STOP_DRAG }
    | { type: GameActionType.MOVE, payload: Field }


export interface GameState {
    warships: GameWarship[];
    dragging: GameWarship | null;
}