import Field from "./entities/Field";
import GameExitCode from "./entities/game/GameExitCode";
import Warship from "./entities/Warship"

export interface StopMessage {
    code: GameExitCode
}

export interface ShootMessage {
    hit: boolean;
}

export interface HitMessage {
    field: Field;
    wasHit: boolean;
}

export interface StartMessage {
    nickname: string;
    winRate: number;
}

export interface InitMessage {
    nickname: string;
    warships: Warship[];
}