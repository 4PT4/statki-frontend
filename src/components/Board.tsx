import React, { useEffect, useRef } from 'react';
import './Board.css';
import Field from '../class/Field';
import Brush from '../class/Brush';

const hits: Field[] = [];
let previousField: Field = new Field(-1, -1);

const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
  const field: Field = Field.fromEvent(e);
  const brush: Brush = Brush.fromEvent(e);

  if (field.wasHit(hits))
    return;

  brush
    .clearElement(field)
    .drawX(field, true);

  hits.push(field);
};

const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
  const field: Field = Field.fromEvent(e);
  const brush: Brush = Brush.fromEvent(e);

  if (field.equals(previousField) || field.wasHit(hits))
    return;

  if (!previousField.wasHit(hits))
    brush.clearElement(previousField);

  brush.drawCircle(field);
  previousField = field;
};

const Board = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    new Brush(context).drawGrid();
  }, [])

  return (
    <canvas ref={canvas}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      height={Brush.BOARD_SIZE}
      width={Brush.BOARD_SIZE}>
    </canvas>
  );
}

export default Board;