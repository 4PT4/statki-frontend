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

    const offsetX: number = e.currentTarget.offsetLeft;
    const offsetY: number = e.currentTarget.offsetTop;

    const mouseX = Math.floor(e.clientX - offsetX);
    const mouseY = Math.floor(e.clientY - offsetY);




    if (!dragging)
        return;
    // const drawY = mouseY - ((field.y+1)*Brush.FIELD_SIZE)
    dragging.position = field
    // const drawX = mouseX - ((field.x+1)*Brush.FIELD_SIZE)

    // brush.drawShip(dragging)
    // brush.clearElement(previousField)
    brush.clearBoard()


    if (dragging.position.equals(field)) {
        brush.drawShip(dragging)
        const { x, y } = field.toPosition()
        brush.drawMoveShip(x, y, dragging)
    } else {
        brush.drawMoveShip(mouseX, mouseY, dragging)
    }


    // console.log(mouseX, mouseY);


    previousField = field;
}

const findShip = (field: Field) => {
    const warship = warships.find((warship) => {
        for (let i = 0; i < warship.length; i++) {
            let { x, y } = warship.position

            switch (warship.orientation) {
                case Orientation.HORIZONTAL:
                    x += i

                    break;

                case Orientation.VERTICAL:
                    y += i
                    break;


            }
            let shipField = new Field(x, y)
            if (shipField.equals(field)) {
                return true
            }
        }

    })
    return warship
}


const mouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()

    const field = Field.fromEvent(e)
    // const warship = findShip(field)
    const warship = warships.find(w => w.position.equals(field));
    if (warship) {
        dragging = warship
        initialField = dragging.position
    }
}

const checkShipOnBoard = (ship: Warship) => {
    switch (ship.orientation) {
        case Orientation.HORIZONTAL:
            if (ship.position.x >= Brush.FIELD_COUNT - ship.length) {
                ship.position = initialField
            }
            break;

        case Orientation.VERTICAL:
            if (ship.position.y >= Brush.FIELD_COUNT - ship.length) {
                ship.position = initialField
            }
            break;


    }

}

const mouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const field = Field.fromEvent(e)
    const brush: Brush = Brush.fromEvent(e);

    if (!dragging)
        return;

    dragging.position = field
    brush.clearBoard()


    checkShipOnBoard(dragging)
    brush.drawShip(dragging)
    dragging = null

}

const drawBoard = (context: CanvasRenderingContext2D | null) => {
    new Brush(context).drawGrid().drawShip(warships[0])

}
const ship = new Warship(new Field(0, 0), 3, Orientation.HORIZONTAL)
warships.push(ship);

const AllyBoard = () => {


    return (<Board onMouseMove={mouseMove} onMouseDown={mouseDown} onMouseUp={mouseUp} drawBoard={drawBoard} />);
}

export default AllyBoard;