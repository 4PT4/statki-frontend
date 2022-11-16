import Brush from "../class/Brush";
import Field from "../class/Field";
import Board from "./Board";

interface EnemyBoardProps {
  onShoot: Function;
}

const EnemyBoard = (props: EnemyBoardProps) => {
  const hits: object[] = [];
  let previousField: Field = new Field(-1, -1);

  const handleClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    const field: Field = Field.fromEvent(e);
    const brush: Brush = Brush.fromEvent(e);

    if (field.wasHit(hits))
      return;


    try {
      const wasHit = await props.onShoot(field);
      hits.push({ field: field, hit: wasHit });
      brush
        .clearBoard()
        .markHits(hits);;
    } catch (e) {
      return;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const field: Field = Field.fromEvent(e);
    const brush: Brush = Brush.fromEvent(e);

    if (field.equals(previousField) || field.wasHit(hits))
      return;

    if (!previousField.wasHit(hits))
      brush.clearBoard()
        .markHits(hits);
    brush.fillShip(field, true);
    previousField = field;
  };

  const drawBoard = (context: CanvasRenderingContext2D | null) => {
    new Brush(context).drawGrid();
  }

  return (<Board onMouseMove={handleMouseMove} onClick={handleClick} drawBoard={drawBoard} />)
}

export default EnemyBoard