import { useEffect, useRef, useState } from "react";
import Brush from "../entities/board/Brush";
import GameField from "../entities/board/GameField";
import { EnemyBoardProps } from "../propTypes";

const EnemyBoard = ({ onShoot, hitmarks }: EnemyBoardProps) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [currentField, setCurrentField] = useState<GameField>(new GameField(-1, -1));

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const field: GameField = GameField.fromEvent(e);

    if (field.equals(currentField) || field.wasHit(hitmarks))
      return;

    setCurrentField(field);
  };

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    new Brush(context)
      .clearBoard()
      .drawGrid()
      .fillField(currentField, true)
      .markHits(hitmarks);
  }, [currentField]);

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    new Brush(context)
      .clearBoard()
      .drawGrid()
      .markHits(hitmarks);
  }, [hitmarks]);

  return (
    <canvas
      ref={canvas}
      onMouseMove={handleMouseMove}
      onClick={onShoot}
      height={Brush.BOARD_SIZE}
      width={Brush.BOARD_SIZE}></canvas>
  );
}

export default EnemyBoard;