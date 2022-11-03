import Brush from "../class/Brush";
import Field from "../class/Field";
import Warship from "../class/Warship";
import Orientation from "../entities/Orientation";
import Board from "./Board";

const warships: Warship[] = [];
let dragging: Warship | null;
let previousField: Field = new Field(-1, -1);
let initialField: Field;
let diffX: number, diffY: number;
let offset: number;

const mouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    let field: Field = Field.fromEvent(e);
    const brush: Brush = Brush.fromEvent(e);

    const rect = e.currentTarget.getBoundingClientRect()

    const mouseX = Math.floor(e.clientX - rect.left);
    const mouseY = Math.floor(e.clientY - rect.top);

    if (mouseX > 400 || mouseY > 400) {
        mouseUp(e);
    }


    if (!dragging)
        return;

    field = offsetCalculator(dragging, field);
    // const drawY = mouseY - ((field.y+1)*Brush.FIELD_SIZE)
    dragging.position = field;
    // const drawX = mouseX - ((field.x+1)*Brush.FIELD_SIZE)

    // brush.drawShip(dragging)
    // brush.clearElement(previousField)
    brush.clearBoard();
    brush.drawWarships(warships);
    if (dragging.position.equals(field)) {
        brush.drawShip(dragging);
        const { x, y } = field.toPosition();
        brush.drawMoveShip(x, y, dragging);
    } else {
        const moveX = mouseX - diffX;
        const moveY = mouseY - diffY;
        brush.drawMoveShip(moveX, moveY, dragging);
    }


    // console.log(mouseX, mouseY);


    previousField = field;
}

const findShip = (field: Field, offset: number, ship: Warship | null) => {
    const warship = warships.find((warship) => {
        let { x, y } = warship.position;
        const initialx = x + offset;
        const initialy = y + offset;
        let endx = -1, endy = -1;
        if (warship.orientation === Orientation.HORIZONTAL) {
            endx = x + warship.length -1 - offset;
            endy = y - offset;
        } else if (warship.orientation === Orientation.VERTICAL) {
            endx = x - offset;
            endy = y + warship.length -1 - offset;
        }

        if ((field.x >= initialx && field.x <= endx) && (field.y >= initialy && field.y <= endy)) {
            if(warship === ship){
                return false;
            }
            return true;
        }

    })
    return warship;
}


const mouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = Math.floor(e.clientX - rect.left);
    const mouseY = Math.floor(e.clientY - rect.top);
    const field = Field.fromEvent(e);
    const warship = findShip(field, 0, null);
    // const warship = warships.find(w => w.position.equals(field));
    if (warship) {
        if (warship.orientation === Orientation.HORIZONTAL) {
            offset = warship.position.x - field.x;
        } else if (warship.orientation === Orientation.VERTICAL) {
            offset = warship.position.y - field.y;
        }
        const { x, y } = warship.position.toPosition();
        diffX = mouseX - x;
        diffY = mouseY - y;
        dragging = warship
        initialField = dragging.position;
    }
}

const checkShipOnBoard = (ship: Warship) => {
    let position: number;
    switch (ship.orientation) {
        case Orientation.HORIZONTAL:
            position = ship.position.x;
            break;

        case Orientation.VERTICAL:
            position = ship.position.y;
            break;


    }
    if (position + ship.length - 1 >= Brush.FIELD_COUNT || position < 0) {
        ship.position = initialField;
    }

}

const offsetCalculator = (warship: Warship, field: Field) => {
    if (warship.orientation === Orientation.HORIZONTAL) {
        field.x = field.x + offset;
    } else if (warship.orientation === Orientation.VERTICAL) {
        field.y = field.y + offset;
    }
    return field;
}


const mouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();



    let field = Field.fromEvent(e);

    const brush: Brush = Brush.fromEvent(e);

    if (!dragging)
        return;


    field = offsetCalculator(dragging, field);
    dragging.position = field;



    checkShipOnBoard(dragging);
    for (let i = 0; i < dragging.length; i++) {
        let temporaryShipX = dragging.position.x;
        let temporaryShipY = dragging.position.y;
        switch (dragging.orientation) {
            case Orientation.HORIZONTAL:
                temporaryShipX += i;

                break;

            case Orientation.VERTICAL:
                temporaryShipY += i;
                break;


        }
        let field = new Field(temporaryShipX, temporaryShipY)
        const warship = findShip(field, -1, dragging)
        if(warship){
            dragging.position = initialField;
        }
    }
    brush.clearBoard();
    brush.drawWarships(warships);
    brush.drawShip(dragging);
    dragging = null;

}

const drawBoard = (context: CanvasRenderingContext2D | null) => {
    const brush = new Brush(context);
    brush.clearBoard();
    brush.drawWarships(warships);
    // brush.drawGrid()

}
const ship = new Warship(new Field(0, 0), 3, Orientation.VERTICAL);
const shi2 = new Warship(new Field(5, 5), 3, Orientation.HORIZONTAL);
warships.push(ship);
warships.push(shi2);


const AllyBoard = () => {


    return (<Board onMouseMove={mouseMove} onMouseDown={mouseDown} onMouseUp={mouseUp} drawBoard={drawBoard} />);
}

export default AllyBoard;