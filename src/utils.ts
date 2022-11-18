import Brush from "./entities/board/Brush";
import GameField from "./entities/board/GameField";
import GameWarship from "./entities/board/GameWarship";
import Orientation from "./entities/Orientation";
import Warship from "./entities/Warship";


export const findShip = (warships: GameWarship[], giveX: number, giveY: number, offset: number = 0) => {
    return warships.find(w => {
        let { x, y } = w.position;
        const initialx = x + offset;
        const initialy = y + offset;
        let endx = -1, endy = -1;

        switch (w.orientation) {
            case Orientation.HORIZONTAL:
                endx = x + w.length - 1 - offset;
                endy = y - offset;
                break;

            case Orientation.VERTICAL:
                endx = x - offset;
                endy = y + w.length - 1 - offset;
                break;
        }

        if ((giveX >= initialx && giveX <= endx) && (giveY >= initialy && giveY <= endy)) {
            return true;
        }
        return false;
    });
};

export const doesShipCollide = (warships: GameWarship[], ship: GameWarship, dragging: GameWarship) => {
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

        const warship = findShip(warships, temporaryShipX, temporaryShipY, -1)
        if (warship) {
            return true
        }
    }

    return false
};

export const isShipInBoundaries = (warship: GameWarship) => {
    let position: number;

    if (warship.orientation === Orientation.HORIZONTAL)
        position = warship.position.x;
    else
        position = warship.position.y;

    if (position + warship.length > Brush.FIELD_COUNT || position < 0)
        return false;

    return true;
};

export const justifyField = (field: GameField, orientation: Orientation, offset: number) => {
    if (orientation === Orientation.HORIZONTAL)
        field.x += offset;
    else if (orientation === Orientation.VERTICAL)
        field.y += offset;
};

export const calculateOffset = (warship: GameWarship, field: GameField): number => {
    if (warship.orientation === Orientation.HORIZONTAL)
        return warship.position.x - field.x;
    else
        return warship.position.y - field.y;
};

export const convertWarships = (warship: GameWarship[]): Warship[] => {
    return warship.map(w => ({
        id: w.id,
        length: w.length,
        x: w.position.x,
        y: w.position.y,
        orientation: w.orientation
    }));
};