
import React, {useEffect, useRef } from 'react';
import './Board.css';
import Field from '../class/Field';
import FieldManager from '../class/FieldManager';
import Brush from '../class/Brush';

function Board() {
  const CANVAS = useRef<HTMLCanvasElement | null>(null)
  const CANVAS_CONTEX_REFERENCE = useRef<CanvasRenderingContext2D | null>(null)
  let hits: Field[] = []
  const BOARD_SIZE = 400
  const TILE_COUNT = 10
  const TILE_SIZE = BOARD_SIZE / TILE_COUNT
  let previousField: Field
  let context: CanvasRenderingContext2D | null
  useEffect(()=>{
    if(CANVAS.current){
      CANVAS_CONTEX_REFERENCE.current = CANVAS.current.getContext('2d')
      context = CANVAS_CONTEX_REFERENCE.current
      
      drawGrid()
      
    }
    
  }, [])
  let drawGrid = ()=>{
    for(let x=0; x<TILE_COUNT; x++){
      for(let y=0; y<TILE_COUNT; y++){
        drawSquer(x*TILE_SIZE, y*TILE_SIZE)
      }
    }
  }


 let canvasClicked = (e: React.MouseEvent<HTMLCanvasElement>)=>{
  let field: Field = Field.fromEvent(e, TILE_SIZE)
  const BRUSH = Brush.fromEvent(e)
  FieldManager.shoot(field, BRUSH)


  hits.push(field)
  console.log(field);
  
  previousField = field
  

 }



 let resetBoard = ()=>{
  context?.clearRect(0, 0, 400, 400)
  drawGrid()
}



let drawSquer = (x: number, y: number)=>{
  context!.strokeRect(x, y, TILE_SIZE, TILE_SIZE)
}


  return (
    <div className="boardComponent">
      <h1>to jest board</h1>
      <button onClick={resetBoard}>Clear Board</button>
      <button>Draw Ship</button>
      <canvas ref={CANVAS} onClick={canvasClicked}  className="board" height={BOARD_SIZE} width={BOARD_SIZE}></canvas>
    </div>
  );
}

export default Board;