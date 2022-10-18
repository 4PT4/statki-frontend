
import React, {useEffect, useRef } from 'react';
import './Board.css';

function Board() {
  enum Orientation {
    HORIZONTAL,
    VERTICAL
  }
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const canvasContexReference = useRef<CanvasRenderingContext2D | null>(null)
  let hits: any[][] = []
  const tileSize = 40
  const boardSize = 400
  const tileCount = boardSize / tileSize
  const warShips = [{x: 5, y:5, length: 3, orientation: Orientation.VERTICAL}]
  let offsetLeft: number, offsetTop: number
  let lastPosition = {x: 0, y:0}
  let context: CanvasRenderingContext2D | null
  useEffect(()=>{
    if(canvas.current){
      canvasContexReference.current = canvas.current.getContext('2d')
      context = canvasContexReference.current
      offsetLeft = canvas.current.offsetLeft
      offsetTop = canvas.current.offsetTop
      
      drawGrid()
      
    }
    
  }, [])
  let drawGrid = ()=>{
    hits = []
    for(let x=0; x<tileCount; x++){
      hits.push( [] );
      for(let y=0; y<tileCount; y++){
        hits[x].push( {} );
        drawSquer(x*tileSize, y*tileSize)
      }
    }
  }

 let canvasClicked = (e: React.MouseEvent<HTMLElement>)=>{
  let mouseX = Math.floor((e.clientX - offsetLeft)/tileSize)
  let mouseY = Math.floor((e.clientY - offsetTop)/tileSize)
  hits[mouseX][mouseY] = {x: mouseX * tileSize, y: mouseY * tileSize, width: tileSize, height: tileSize}
  drawX(hits[mouseX][mouseY].x,hits[mouseX][mouseY].y)
  console.log(lastPosition);
  lastPosition = {x: mouseX, y: mouseY}
  

 }

 let mouseMove = (e: React.MouseEvent<HTMLElement>)=>{
  let mouseX = Math.floor((e.clientX - offsetLeft)/tileSize)
  let mouseY = Math.floor((e.clientY - offsetTop)/tileSize)
  if(mouseX < 0 || mouseX > 9 || mouseY < 0 || mouseY > 9 ){
    clearElement(lastPosition.x*tileSize, lastPosition.y*tileSize)
    drawSquer(lastPosition.x*tileSize, lastPosition.y*tileSize)
    if(Object.keys(hits[lastPosition.x][lastPosition.y]).length !== 0){
      drawX(lastPosition.x * tileSize, lastPosition.y * tileSize)
    }
    return
  }
  
  
  if(lastPosition.x !== mouseX || lastPosition.y !== mouseY){
    drawCircle(mouseX*tileSize, mouseY*tileSize)
    clearElement(lastPosition.x*tileSize, lastPosition.y*tileSize)
    drawSquer(lastPosition.x*tileSize, lastPosition.y*tileSize)
    if(Object.keys(hits[lastPosition.x][lastPosition.y]).length !== 0){
      drawX(lastPosition.x * tileSize, lastPosition.y * tileSize)
    }
  }
  lastPosition = {x: mouseX, y: mouseY}
  console.log(lastPosition);
 }

 let resetBoard = ()=>{
  context?.clearRect(0, 0, 400, 400)
  drawGrid()
}
let drawCircle = (x: number, y: number)=>{
  context!.beginPath()
  context!.arc(x+(tileSize/2), y+(tileSize/2), 3, 0, 2 * Math.PI);
  context!.fill()
  context!.stroke()
}

let drawX = (x: number, y: number)=>{
  context!.beginPath();

  context!.moveTo(x, y);
  context!.lineTo(x + tileSize, y + tileSize);

  context!.moveTo(x + tileSize, y);
  context!.lineTo(x, y + tileSize);
  context!.stroke();
  
}
let drawSquer = (x: number, y: number)=>{
  context!.strokeRect(x, y, tileSize, tileSize)
}
let clearElement = (x: number, y: number)=>{
  context!.clearRect(x, y, tileSize, tileSize)
}

  return (
    <div className="boardComponent">
      <h1>to jest board</h1>
      <button onClick={resetBoard}>Clear Board</button>
      <button>Draw Ship</button>
      <canvas ref={canvas} onClick={canvasClicked} onMouseMove={mouseMove} className="board" height={"400px"} width={"400px"}></canvas>
    </div>
  );
}

export default Board;