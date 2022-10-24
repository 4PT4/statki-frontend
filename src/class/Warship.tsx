import Orientation from "../entities/Orientation";
import Field from "./Field";

class Warship{
    position: Field
    length: number
    orientation: Orientation

    constructor(position: Field, length: number, orientation: Orientation){
        this.position = position
        this.length = length
        this.orientation = orientation
    }
    

}

export default Warship;