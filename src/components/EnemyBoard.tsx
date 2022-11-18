import { useEffect, useRef, useState } from "react";
import Brush from "../entities/board/Brush";
import GameField from "../entities/board/GameField";
import GameError from "../entities/game/GameError";
import GameHitmark from "../entities/board/GameHitmark";
import { EnemyBoardProps } from "../propTypes";

const EnemyBoard = ({ onShoot }: EnemyBoardProps) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [hitmarks, setHitmarks] = useState<GameHitmark[]>([]);
  const [currentField, setCurrentField] = useState<GameField>(new GameField(-1, -1));

  const handleClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    const field: GameField = GameField.fromEvent(e);

    if (field.wasHit(hitmarks))
      return;

    try {
      const wasHit = await onShoot(field);
      setHitmarks([...hitmarks, { field, wasHit }]);
    } catch (e) {
      if (e instanceof GameError) {
        console.log(e.message);
      }
    }
  };

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
      onClick={handleClick}
      height={Brush.BOARD_SIZE}
      width={Brush.BOARD_SIZE}></canvas>
  );
}

export default EnemyBoard;