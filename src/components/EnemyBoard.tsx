import Brush from "../class/Brush";
import Field from "../class/Field";
import Board from "./Board";

const hits: object[] = [];
let previousField: Field = new Field(-1, -1);
let wasHit = false;
const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
  const field: Field = Field.fromEvent(e);
  const brush: Brush = Brush.fromEvent(e);

  if (field.wasHit(hits))
    return;


  hits.push({field: field, hit: wasHit});
  brush
    .clearBoard()
    .markHits(hits);;
  
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

const drawBoard = (context: CanvasRenderingContext2D | null)=>{
    new Brush(context).drawGrid();
}

function EnemyBoard(){
    return(<Board onMouseMove={handleMouseMove} onClick={handleClick} drawBoard={drawBoard}/>)
}

export default EnemyBoard