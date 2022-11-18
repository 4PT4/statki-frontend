import Orientation from "../Orientation";
import Warship from "../Warship";
import GameField from "./GameField";

class GameWarship {
    id: string;
    position: GameField;
    length: number;
    orientation: Orientation;

    constructor(warship: Warship) {
        this.id = warship.id;
        this.position = new GameField(warship.x, warship.y);
        this.length = warship.length;
        this.orientation = warship.orientation;
    }
}

export default GameWarship;