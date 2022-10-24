import { useRef } from "react";
import Brush from "../class/Brush";
import Field from "../class/Field";
import Warship from "../class/Warship";
import Orientation from "../entities/Orientation";
import Board from "./Board";

const warships: Warship[] = []
let dragging: Warship | null
let previousField: Field = new Field(-1, -1);
let initialField: Field

const mouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const field: Field = Field.fromEvent(e);
    const brush: Brush = Brush.fromEvent(e);

    if (field.equals(previousField) || !dragging)
        return;
    
    dragging.position = field

    brush.drawShip(dragging)
    brush.clearElement(previousField)

    previousField = field;
}

const mouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const field = Field.fromEvent(e)
    const warship = warships.find((warship) => warship.position.equals(field))
    if (warship) {
        dragging = warship
        initialField = dragging.position
    }
    console.log(dragging);



}

const mouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    dragging = null

}

const drawBoard = (context: CanvasRenderingContext2D | null) => {
    new Brush(context).drawGrid().drawShip(warships[0])

}

const AllyBoard = () => {
    const ship = new Warship(new Field(0, 0), 3, Orientation.VERTICAL)
    warships.push(ship);




    return (<Board onMouseMove={mouseMove} onMouseDown={mouseDown} onMouseUp={mouseUp} drawBoard={drawBoard} />);
}

export default AllyBoard;