
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
  const boardSize = 400
  const tileCount = boardSize / tileSize
  const warShips = [{x: 5, y:5, shipLength: 3, orientation: Orientation.HORIZONTAL}, {x: 0, y:0, shipLength: 3, orientation: Orientation.VERTICAL}]
  let hits: any[][] = []
  let shipsOnBoard: any[][] = []
  let offsetLeft: number, offsetTop: number
  let lastPosition = {x: 0, y:0}
  let context: CanvasRenderingContext2D | null
  let isDragging = false
  let isGame = false
  useEffect(()=>{
    if(canvas.current){
      canvasContexReference.current = canvas.current.getContext('2d')
      context = canvasContexReference.current
      offsetLeft = canvas.current.offsetLeft
      offsetTop = canvas.current.offsetTop
      
      drawGrid()
      drawWarships(warShips)
    }
    
  }, [])
  let drawGrid = ()=>{
    hits = []
    shipsOnBoard = []
    for(let x=0; x<tileCount; x++){
      hits.push( [] );
      shipsOnBoard.push( [] )
      for(let y=0; y<tileCount; y++){
        hits[x].push( {} );
        shipsOnBoard[x].push( {} )
        drawSquer(x, y)
      }
    }
  }

  let canvasClicked = (e: React.MouseEvent<HTMLElement>)=>{
    let mouseX = Math.floor((e.clientX - offsetLeft)/tileSize)
    let mouseY = Math.floor((e.clientY - offsetTop)/tileSize)
    
    if(isGame){
      hits[mouseX][mouseY] = {x: mouseX, y: mouseY, width: 1, height: 1}
      drawX(hits[mouseX][mouseY].x,hits[mouseX][mouseY].y)
    }
    
    console.log(lastPosition);
    lastPosition = {x: mouseX, y: mouseY}
    

  }
  let mouseDown = (e: React.MouseEvent<HTMLElement>)=>{
    e.preventDefault()
    let mouseX = Math.floor((e.clientX - offsetLeft)/tileSize)
    let mouseY = Math.floor((e.clientY - offsetTop)/tileSize)
    if(Object.keys(shipsOnBoard[mouseX][mouseY]).length !== 0){
      isDragging = true
    }
    console.log(isDragging);
    
  }
  let mouseUp = (e: React.MouseEvent<HTMLElement>)=>{
    e.preventDefault()
    isDragging = false
    console.log(isDragging);
  }
  let mouseMove = (e: React.MouseEvent<HTMLElement>)=>{
    let mouseX = Math.floor((e.clientX - offsetLeft)/tileSize)
    let mouseY = Math.floor((e.clientY - offsetTop)/tileSize)
    if(mouseX < 0 || mouseX > 9 || mouseY < 0 || mouseY > 9 ){
      clearElement(lastPosition.x, lastPosition.y, 1, 1)
      drawSquer(lastPosition.x, lastPosition.y)
      if(Object.keys(hits[lastPosition.x][lastPosition.y]).length !== 0){
        drawX(lastPosition.x , lastPosition.y)
      }
      return
    }
    
    
    if(lastPosition.x !== mouseX || lastPosition.y !== mouseY){
      clearElement(lastPosition.x, lastPosition.y, 1, 1)
      drawSquer(lastPosition.x, lastPosition.y)
      if(isDragging){
        
        let shipIndex = shipsOnBoard[lastPosition.x][lastPosition.y].shipIndex
        let moveX = lastPosition.x - mouseX
        let moveY = lastPosition.y - mouseY
        let ship = warShips[shipIndex]
        console.log(shipsOnBoard);
        
        
          
          removeShipBoard(ship)
          if(ship.orientation === Orientation.VERTICAL){
            fillSquer(ship.x-moveX, ship.y-moveY, 1, ship.shipLength)
          }
          if(ship.orientation === Orientation.HORIZONTAL){
            fillSquer(ship.x-moveX, ship.y-moveY, ship.shipLength, 1)
          }


          ship.x = ship.x-moveX
          ship.y = ship.y-moveY
          addShipBoard(ship, shipIndex)
        
        

      }
      // drawCircle(mouseX*tileSize, mouseY*tileSize)
      
      if(Object.keys(hits[lastPosition.x][lastPosition.y]).length !== 0){
        drawX(lastPosition.x, lastPosition.y )
      }
      if(Object.keys(shipsOnBoard[lastPosition.x][lastPosition.y]).length !== 0){
        fillSquer(lastPosition.x, lastPosition.y, 1, 1)
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
    x = x*tileSize
    y = y*tileSize
    context!.moveTo(x, y);
    context!.lineTo(x + tileSize, y + tileSize);

    context!.moveTo(x + tileSize, y);
    context!.lineTo(x, y + tileSize);
    context!.stroke();
    
  }
  let drawSquer = (x: number, y: number)=>{
    context!.strokeRect(x * tileSize, y *tileSize, tileSize, tileSize)
  }
  let clearElement = (x: number, y: number, width: number, height: number)=>{
    context!.clearRect(x*tileSize, y*tileSize, width*tileSize, height*tileSize)
  }

  let drawWarships = (warShips: any[]) => {
    for(let i=0; i<warShips.length; i++){
      if(warShips[i].orientation === Orientation.VERTICAL){
        fillSquer(warShips[i].x, warShips[i].y, 1, warShips[i].shipLength)
        
        addShipBoard(warShips[i], i)

        // for(let x=warShips[i].x; x<warShips[i].x+1; x++){
        //   // console.log("for1");
          
        //   for(let y=warShips[i].y; y<warShips[i].y+warShips[i].shipLength; y++){
        //     shipsOnBoard[x][y] = {shipIndex: i, busy: true}
        //     // console.log("for2");
            
        //   }
        // }
        
      }
      if(warShips[i].orientation === Orientation.HORIZONTAL){
        fillSquer(warShips[i].x, warShips[i].y, warShips[i].shipLength, 1)
        addShipBoard(warShips[i], i)
      }
    }
  }

  let fillSquer = (x: number, y: number, width: number, height: number) =>{
    context?.fillRect(x*tileSize, y*tileSize, width*tileSize, height*tileSize)
  }
  let addShipBoard = (ship: any, index: number)=>{
    warShips[index] = ship
    if(ship.orientation === Orientation.VERTICAL){
      for(let x=ship.x; x<ship.x+1; x++){
        // console.log("for1");
        
        for(let y=ship.y; y<ship.y+ship.shipLength; y++){
          shipsOnBoard[x][y] = {shipIndex: index, busy: true}
          // console.log("for2");
          
        }
      }
    }else{
      for(let x=ship.x; x<ship.x+ship.shipLength; x++){
        // console.log("for1");
        
        for(let y=ship.y; y<ship.y+1; y++){
          shipsOnBoard[x][y] = {shipIndex: index, busy: true}
          // console.log("for2");
          
        }
      }
    }
    
  }

  let removeShipBoard = (ship: any)=>{
    if(ship.orientation === Orientation.VERTICAL){
      for(let x=ship.x; x<ship.x+1; x++){
        // console.log("for1");
        
        for(let y=ship.y; y<ship.y+ship.shipLength; y++){
          shipsOnBoard[x][y] = {}
          // console.log("for2");
          
        }
      }
      clearElement(ship.x, ship.y, 1, ship.shipLength)
      for(let y = ship.y; y<ship.y+ship.shipLength; y++){
        drawSquer(ship.x, y)
      }
    }else{
      for(let x=ship.x; x<ship.x+ship.shipLength; x++){
        // console.log("for1");
        
        for(let y=ship.y; y<ship.y+1; y++){
          shipsOnBoard[x][y] = {}
          // console.log("for2");
          
        }
      }
      clearElement(ship.x, ship.y, ship.shipLength, 1)
      for(let x = ship.x; x<ship.x+ship.shipLength; x++){
        drawSquer(x, ship.y)
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
