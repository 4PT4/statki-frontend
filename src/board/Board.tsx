
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
  let shipsOnBoard: any[][] = []
  const tileSize = 40
  const boardSize = 400
  const tileCount = boardSize / tileSize
  const warShips = [{x: 5, y:5, shipLength: 3, orientation: Orientation.HORIZONTAL},{x: 0, y:0, shipLength: 3, orientation: Orientation.VERTICAL}]
  let offsetLeft: number, offsetTop: number
  let lastPosition = {x: 0, y:0}
  let context: CanvasRenderingContext2D | null
  let isDragging = false
  useEffect(()=>{
    if(canvas.current){
      canvasContexReference.current = canvas.current.getContext('2d')
      context = canvasContexReference.current
      offsetLeft = canvas.current.offsetLeft
      offsetTop = canvas.current.offsetTop
      
      drawGrid()
      drawWarShips(warShips)
    }
    
  }, [])

  let getMousePosition = (e: React.MouseEvent<HTMLElement>)=>{
    let mouseX = Math.floor((e.clientX - offsetLeft)/tileSize)
    let mouseY = Math.floor((e.clientY - offsetTop)/tileSize)
    return {mouseX, mouseY}
  }

  let drawGrid = ()=>{
    hits = []
    shipsOnBoard = []
    for(let x=0; x<tileCount; x++){
      hits.push( [] );
      shipsOnBoard.push( [] );
      for(let y=0; y<tileCount; y++){
        hits[x].push( {} );
        shipsOnBoard[x].push( [] );
        drawSquer(x, y)
      }
    }
  }

 let canvasClicked = (e: React.MouseEvent<HTMLElement>)=>{

  let {mouseX, mouseY} = getMousePosition(e)
  hits[mouseX][mouseY] = {x: mouseX, y: mouseY, width: tileSize, height: tileSize}
  drawX(hits[mouseX][mouseY].x,hits[mouseX][mouseY].y)
  console.log(lastPosition);
  lastPosition = {x: mouseX, y: mouseY}

 }

 let mouseDown = (e: React.MouseEvent<HTMLElement>)=>{
  e.preventDefault()
  let {mouseX, mouseY} = getMousePosition(e)
  if(shipsOnBoard[mouseX][mouseY].length !== 0){
    isDragging = true
  }
 }
 let mouseUp = (e: React.MouseEvent<HTMLElement>)=>{
  e.preventDefault()
  isDragging = false
 }

 let mouseMove = (e: React.MouseEvent<HTMLElement>)=>{
  let {mouseX, mouseY} = getMousePosition(e)
  if(mouseX < 0 || mouseX > 9 || mouseY < 0 || mouseY > 9 ){
    clearElement(lastPosition.x, lastPosition.y)
    drawSquer(lastPosition.x, lastPosition.y)
    if(Object.keys(hits[lastPosition.x][lastPosition.y]).length !== 0){
      drawX(lastPosition.x, lastPosition.y)
    }
    return
  }
  
  
  if(lastPosition.x !== mouseX || lastPosition.y !== mouseY){
    if(isDragging){
      let id = shipsOnBoard[lastPosition.x][lastPosition.y][0]
      // console.log(id);
      
      clearShip(id)
      console.log(shipsOnBoard);
      
      let moveX = lastPosition.x - mouseX
      let moveY = lastPosition.y - mouseY
      warShips[id].x = warShips[id].x - moveX
      warShips[id].y = warShips[id].y - moveY
      drawSingleShip(id)
    }


    drawCircle(mouseX, mouseY)
    clearElement(lastPosition.x, lastPosition.y)
    drawSquer(lastPosition.x, lastPosition.y)
    if(Object.keys(hits[lastPosition.x][lastPosition.y]).length !== 0){
      drawX(lastPosition.x, lastPosition.y)
    }
    console.log(shipsOnBoard[lastPosition.x][lastPosition.y]);
    
    if(shipsOnBoard[lastPosition.x][lastPosition.y].length !== 0){
      drawFillSquer(lastPosition.x, lastPosition.y)
    }
  }
  lastPosition = {x: mouseX, y: mouseY}
  // console.log(lastPosition);
 }

 let resetBoard = ()=>{
  context?.clearRect(0, 0, 400, 400)
  drawGrid()
}
let drawCircle = (x: number, y: number)=>{
  context!.beginPath()
  context!.arc((x*tileSize)+(tileSize/2), (y*tileSize)+(tileSize/2), 3, 0, 2 * Math.PI);
  context!.fill()
  context!.stroke()
}

let drawX = (x: number, y: number)=>{
  context!.beginPath();
  y = y*tileSize
  x= x*tileSize
  context!.moveTo(x, y);
  context!.lineTo(x + tileSize, y + tileSize);

  context!.moveTo(x + tileSize, y);
  context!.lineTo(x, y + tileSize);
  context!.stroke();
  
}
let drawSquer = (x: number, y: number)=>{
  context!.strokeRect(x*tileSize, y*tileSize, tileSize, tileSize)
}
let clearElement = (x: number, y: number)=>{
  context!.clearRect(x*tileSize, y*tileSize, tileSize, tileSize)
}

let drawFillSquer = (x: number, y: number)=>{
  context!.fillRect(x*tileSize, y*tileSize, tileSize, tileSize)
}

let drawWarShips = (ships: any[])=>{
  
  
  for(let i = 0; i<ships.length; i++){
   drawSingleShip(i)
    
  }
}

let drawSingleShip = (shipId: number) =>{
  let ship = warShips[shipId]
  for(let l = 0; l<ship.shipLength; l++){
    if(ship.orientation === Orientation.VERTICAL){
      drawFillSquer(ship.x, (ship.y+l))
      shipsOnBoard[ship.x][(ship.y+l)].push(shipId)
    }

    if(ship.orientation === Orientation.HORIZONTAL){
      drawFillSquer((ship.x+l), ship.y)
      shipsOnBoard[(ship.x+l)][ship.y].push(shipId)
    }
  }
}
let clearShip = (shipId: number)=>{
  
  let ship = warShips[shipId]
  for(let l = 0; l<ship.shipLength; l++){
    if(ship.orientation === Orientation.VERTICAL){
      shipsOnBoard[ship.x][(ship.y+l)].pop()
      clearElement(ship.x,(ship.y+l))
      drawSquer(ship.x,(ship.y+l))
      if(shipsOnBoard[ship.x][(ship.y+l)].length !== 0){
        drawFillSquer(ship.x, (ship.y+l))
      }
    }

    if(ship.orientation === Orientation.HORIZONTAL){
      shipsOnBoard[(ship.x+l)][ship.y].pop()
      clearElement((ship.x+l),ship.y)
      drawSquer((ship.x+l),ship.y)
      if(shipsOnBoard[(ship.x+l)][ship.y].length !== 0){
        drawFillSquer((ship.x+l), ship.y)
      }
    }
  }
}

  return (
    <div className="boardComponent">
      <h1>to jest board</h1>
      <button onClick={resetBoard}>Clear Board</button>
      <button>Draw Ship</button>
      <canvas ref={canvas} onClick={canvasClicked} onMouseMove={mouseMove} onMouseDown={mouseDown} onMouseUp={mouseUp} className="board" height={"400px"} width={"400px"}></canvas>
    </div>
  );
}

export default Board;
