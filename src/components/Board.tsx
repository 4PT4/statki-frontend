
import React, {useEffect, useRef } from 'react';
import './Board.css';
import Orientation from '../entities/Orientation';

function Board() {
  const CANVAS = useRef<HTMLCanvasElement | null>(null)
  const CANVAS_CONTEX_REFERENCE = useRef<CanvasRenderingContext2D | null>(null)
  let hits: any[][] = []
  const BOARD_SIZE = 400
  const TILE_COUNT = 10
  const TILE_SIZE = BOARD_SIZE / TILE_COUNT
  let offsetLeft: number, offsetTop: number
  let previousField = {x: 0, y:0}
  let context: CanvasRenderingContext2D | null
  useEffect(()=>{
    if(CANVAS.current){
      CANVAS_CONTEX_REFERENCE.current = CANVAS.current.getContext('2d')
      context = CANVAS_CONTEX_REFERENCE.current
      offsetLeft = CANVAS.current.offsetLeft
      offsetTop = CANVAS.current.offsetTop
      
      drawGrid()
      
    }
    
  }, [])
  let drawGrid = ()=>{
    for(let x=0; x<TILE_COUNT; x++){
      hits.push( [] );
      for(let y=0; y<TILE_COUNT; y++){
        hits[x].push( {} );
        drawSquer(x*TILE_SIZE, y*TILE_SIZE)
      }
    }
  }

  let getMousePosition = (e: React.MouseEvent<HTMLElement>)=>{
    let mouseX = Math.floor((e.clientX - offsetLeft)/TILE_SIZE)
    let mouseY = Math.floor((e.clientY - offsetTop)/TILE_SIZE)
    return {mouseX, mouseY}
  }

 let canvasClicked = (e: React.MouseEvent<HTMLElement>)=>{
  let {mouseX, mouseY} = getMousePosition(e)
  hits[mouseX][mouseY] = {x: mouseX * TILE_SIZE, y: mouseY * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE}
  drawX(hits[mouseX][mouseY].x,hits[mouseX][mouseY].y)
  console.log(previousField);
  previousField = {x: mouseX, y: mouseY}
  

 }

 let mouseMove = (e: React.MouseEvent<HTMLElement>)=>{
  let {mouseX, mouseY} = getMousePosition(e)
  if(mouseX < 0 || mouseX > 9 || mouseY < 0 || mouseY > 9 ){
    clearElement(previousField.x*TILE_SIZE, previousField.y*TILE_SIZE)
    drawSquer(previousField.x*TILE_SIZE, previousField.y*TILE_SIZE)
    if(Object.keys(hits[previousField.x][previousField.y]).length !== 0){
      drawX(previousField.x * TILE_SIZE, previousField.y * TILE_SIZE)
    }
    return
  }
  
  
  if(previousField.x !== mouseX || previousField.y !== mouseY){
    drawCircle(mouseX*TILE_SIZE, mouseY*TILE_SIZE)
    clearElement(previousField.x*TILE_SIZE, previousField.y*TILE_SIZE)
    drawSquer(previousField.x*TILE_SIZE, previousField.y*TILE_SIZE)
    if(Object.keys(hits[previousField.x][previousField.y]).length !== 0){
      drawX(previousField.x * TILE_SIZE, previousField.y * TILE_SIZE)
    }
  }
  previousField = {x: mouseX, y: mouseY}
  console.log(previousField);
 }

 let resetBoard = ()=>{
  context?.clearRect(0, 0, 400, 400)
  drawGrid()
}
let drawCircle = (x: number, y: number)=>{
  context!.beginPath()
  context!.arc(x+(TILE_SIZE/2), y+(TILE_SIZE/2), 3, 0, 2 * Math.PI);
  context!.fill()
  context!.stroke()
}

let drawX = (x: number, y: number)=>{
  context!.beginPath();

  context!.moveTo(x, y);
  context!.lineTo(x + TILE_SIZE, y + TILE_SIZE);

  context!.moveTo(x + TILE_SIZE, y);
  context!.lineTo(x, y + TILE_SIZE);
  context!.stroke();
  
}
let drawSquer = (x: number, y: number)=>{
  context!.strokeRect(x, y, TILE_SIZE, TILE_SIZE)
}
let clearElement = (x: number, y: number)=>{
  context!.clearRect(x, y, TILE_SIZE, TILE_SIZE)
}

  return (
    <div className="boardComponent">
      <h1>to jest board</h1>
      <button onClick={resetBoard}>Clear Board</button>
      <button>Draw Ship</button>
      <canvas ref={CANVAS} onClick={canvasClicked} onMouseMove={mouseMove} className="board" height={BOARD_SIZE} width={BOARD_SIZE}></canvas>
    </div>
  );
}

export default Board;