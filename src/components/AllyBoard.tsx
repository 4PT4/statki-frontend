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
    dragging.position = field;
    brush.clearBoard();
    brush.drawWarships(warships, dragging);

    

    if (!checkShipColision(dragging)) {
        brush.drawShip(dragging);
        const { x, y } = field.toPosition();
        brush.drawMoveShip(x, y, dragging);
    } else {
        const moveX = mouseX - diffX;
        const moveY = mouseY - diffY;
        brush.drawMoveShip(moveX, moveY, dragging);
    }

    previousField = field;
}

const findShip = (giveX: number, giveY: number, offset: number, ship: Warship | null) => {
    const warship = warships.find((warship) => {
        let { x, y } = warship.position;
        const initialx = x + offset;
        const initialy = y + offset;
        let endx = -1, endy = -1;

        switch (warship.orientation) {
            case Orientation.HORIZONTAL:
                endx = x + warship.length -1 - offset;
                endy = y - offset;
                break;

            case Orientation.VERTICAL:
                endx = x - offset;
                endy = y + warship.length -1 - offset;
                break;
        }

        if ((giveX >= initialx && giveX <= endx) && (giveY >= initialy && giveY <= endy)) {
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
    const mouseFieldX = Math.floor(mouseX / Brush.FIELD_SIZE);
    const mouseFieldY = Math.floor(mouseY / Brush.FIELD_SIZE);
    const field = Field.fromEvent(e);
    const warship = findShip(mouseFieldX, mouseFieldY, 0, null);

    if (warship) {

        switch (warship.orientation) {
            case Orientation.HORIZONTAL:
                offset = warship.position.x - field.x;
                break;

            case Orientation.VERTICAL:
                offset = warship.position.y - field.y;
                break;
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

    if (position + ship.length> Brush.FIELD_COUNT || position < 0) {
        return false;
    }
    return true;

}

const offsetCalculator = (warship: Warship, field: Field) => {

    switch (warship.orientation) {
        case Orientation.HORIZONTAL:
            field.x = field.x + offset;
            break;

        case Orientation.VERTICAL:
            field.y = field.y + offset;
            break;
    }

    return field;
}

const checkShipColision = (ship: Warship)=>{
    for (let i = 0; i < ship.length; i++) {
        let temporaryShipX = ship.position.x;
        let temporaryShipY = ship.position.y;

        switch (ship.orientation) {
            case Orientation.HORIZONTAL:
                temporaryShipX += i;
                break;

            case Orientation.VERTICAL:
                temporaryShipY += i;
                break;
        }

        const warship = findShip(temporaryShipX, temporaryShipY, -1, dragging)
        if(warship){
            return true
        }
    }

    return false
}

const oriChange = (e: React.MouseEvent<HTMLCanvasElement>) =>{
    e.preventDefault();
    const brush: Brush = Brush.fromEvent(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = Math.floor(e.clientX - rect.left);
    const mouseY = Math.floor(e.clientY - rect.top);
    const mouseFieldX = Math.floor(mouseX / Brush.FIELD_SIZE);
    const mouseFieldY = Math.floor(mouseY / Brush.FIELD_SIZE);
    const warship = findShip(mouseFieldX, mouseFieldY, 0, null);

    if (warship) {
        dragging=warship;
        switch (warship.orientation) {
            case Orientation.HORIZONTAL:
                warship.orientation=1;
                if(!checkShipOnBoard(warship)){
                    warship.orientation=0;
                }
                if(checkShipColision(dragging)){
                    warship.orientation=0;
                }
                break;

            case Orientation.VERTICAL:
                warship.orientation=0;
                if(!checkShipOnBoard(warship)){
                    warship.orientation=1;
                }
                if(checkShipColision(dragging)){
                    warship.orientation=1;
                }
                break;
        }

    }
    dragging=null;
    brush.clearBoard();
    brush.drawWarships(warships, null);
}

const mouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    let field = Field.fromEvent(e);
    const brush: Brush = Brush.fromEvent(e);

    if (!dragging)
        return;
    field = offsetCalculator(dragging, field);
    dragging.position = field;
    
    if(!checkShipOnBoard(dragging)){
        dragging.position = initialField;
    }
    if(checkShipColision(dragging))
        dragging.position = initialField;
    

    brush.clearBoard()
    .drawWarships(warships, dragging)
    .drawShip(dragging);
    dragging = null;

}

const drawBoard = (context: CanvasRenderingContext2D | null) => {
    const brush = new Brush(context);
    brush.clearBoard();
    brush.drawWarships(warships, null);

}
const ship = new Warship(new Field(0, 0), 3, Orientation.VERTICAL);
const shi2 = new Warship(new Field(5, 5), 3, Orientation.HORIZONTAL);
warships.push(ship);
warships.push(shi2);


const AllyBoard = () => {


    return (<Board onMouseMove={mouseMove} onMouseDown={mouseDown} onMouseUp={mouseUp} onDoubleClick={oriChange} drawBoard={drawBoard} />);
}

export default AllyBoard;