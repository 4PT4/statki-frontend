
import React, {useEffect, useRef } from 'react';
import './Board.css';

function Board() {
  enum Orientation {
    HORIZONTAL,
    VERTICAL
  }
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const canvasContexReference = useRef<CanvasRenderingContext2D | null>(null)
  const tileSize = 40
  let hits: any[][] = []
  // const boardWidth = 400, boardHeight = 400;
  const boardSize = 400
  const warShips = [{x: 5, y:5, length: 3, orientation: Orientation.VERTICAL}]
  let currentShipIndex: number
  let startX: number, startY: number
  let is_dragging = false
  let shipsOnBoard: any[] = []
  let offsetLeft: number, offsetTop: number
  let first = true
  let lastPosition = {x: 0, y:0}
  let context: CanvasRenderingContext2D | null
  useEffect(()=>{
    if(canvas.current){
      canvasContexReference.current = canvas.current.getContext('2d')
      context = canvasContexReference.current
      offsetLeft = canvas.current.offsetLeft
      offsetTop = canvas.current.offsetTop
      // console.log(tiles);
      // console.log(first);
      
      drawGrid()
      
    }
    
  }, [])
  let drawGrid = ()=>{
    hits = []
    for(let x=0; x<boardSize/tileSize; x++){
      hits.push( [] );
      for(let y=0; y<boardSize/tileSize; y++){
        hits[x].push( {} );
        context!.strokeRect(x*tileSize, y*tileSize, tileSize, tileSize)
      }
    }
  }

 let canvasClicked = (e: React.MouseEvent<HTMLElement>)=>{
  let mouseX = Math.floor((e.clientX - offsetLeft)/tileSize)
  let mouseY = Math.floor((e.clientY - offsetTop)/tileSize)
  hits[mouseX][mouseY] = {x: mouseX * tileSize, y: mouseY * tileSize, width: tileSize, height: tileSize}
  context!.beginPath();

  context!.moveTo(hits[mouseX][mouseY].x, hits[mouseX][mouseY].y);
  context!.lineTo(hits[mouseX][mouseY].x + tileSize, hits[mouseX][mouseY].y + tileSize);

  context!.moveTo(hits[mouseX][mouseY].x + tileSize, hits[mouseX][mouseY].y);
  context!.lineTo(hits[mouseX][mouseY].x, hits[mouseX][mouseY].y + tileSize);
  context!.stroke();
  lastPosition = {x: mouseX, y: mouseY}
  console.log(lastPosition);
  
  

 }

 let mouseMove = (e: React.MouseEvent<HTMLElement>)=>{
  let mouseX = Math.floor((e.clientX - offsetLeft)/tileSize)
  let mouseY = Math.floor((e.clientY - offsetTop)/tileSize)
  
  if(lastPosition.x != mouseX || lastPosition.y != mouseY){
    context!.beginPath()
    context!.arc((mouseX*tileSize)+(tileSize/2), (mouseY*tileSize)+(tileSize/2), 3, 0, 2 * Math.PI);
    context!.fill()
    context!.stroke()
    context!.clearRect(lastPosition.x, lastPosition.y, tileSize, tileSize)
  }
  lastPosition = {x: mouseX, y: mouseY}
  console.log(lastPosition);
 }

 let resetBoard = ()=>{
  context?.clearRect(0, 0, 400, 400)
  drawGrid()
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
