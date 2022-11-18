import { useEffect, useRef } from "react";
import Brush from "../entities/board/Brush";
import Field from "../entities/board/Field";
import { findShip, doesShipCollide, isShipInBoundaries, justifyField, calculateOffset } from "../utils";
import { AllyBoardProps } from "../propTypes";
import GameActionType from "../entities/game/GameActionType";

let offset: number;
let initialField: Field;

const AllyBoard = ({ gameState, gameState: { warships, dragging }, onRearrange }: AllyBoardProps) => {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    const mouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const field = Field.fromEvent(e);

        const warship = findShip(warships, field.x, field.y);

        if (!warship)
            return;

        offset = calculateOffset(warship, field);

        onRearrange({
            type: GameActionType.START_DRAG,
            payload: warship
        });
        initialField = warship.position;
    };

    const mouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const field: Field = Field.fromEvent(e);

        if (!dragging)
            return;

        justifyField(field, dragging.orientation, offset);
        onRearrange({
            type: GameActionType.MOVE,
            payload: field
        });
    };

    const mouseUp = () => {
        if (!dragging)
            return;

        if (!isShipInBoundaries(dragging) || doesShipCollide(warships, dragging, dragging))
            onRearrange({
                type: GameActionType.MOVE,
                payload: initialField
            });

        onRearrange({ type: GameActionType.STOP_DRAG });
    };

    useEffect(() => {
        const context = canvas.current?.getContext("2d");
        new Brush(context)
            .clearBoard()
            .drawWarships(gameState.warships)
            .drawShip(gameState.dragging, true)
    }, [gameState]);

    return (
        <canvas ref={canvas}
            onMouseMove={mouseMove}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            height={Brush.BOARD_SIZE}
            width={Brush.BOARD_SIZE}></canvas>
    );
}

export default AllyBoard;