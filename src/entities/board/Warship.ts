import Orientation from "../Orientation";
import Warship from "../Warship";
import Field from "./Field";

class GameWarship {
    id: string;
    position: Field;
    length: number;
    orientation: Orientation;

    constructor(warship: Warship) {
        this.id = warship.id;
        this.position = new Field(warship.x, warship.y);
        this.length = warship.length;
        this.orientation = warship.orientation;
    }
}

export default GameWarship;