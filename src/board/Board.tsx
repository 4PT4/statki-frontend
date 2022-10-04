
import { title } from 'process';
import {useEffect, useRef } from 'react';
import './Board.css';

function Board() {
  enum Orientations {
    HORIZONTAL,
    VERTICAL

  }
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const canvasContexReference = useRef<CanvasRenderingContext2D | null>(null)
  const titleSize = 40
  const boardSize: Number = 10
  const warShips = [{x: 5, y:5, length: 3, orientation: Orientations.VERTICAL}]
  let currentShipIndex: number
  let startX: number, startY: number
  let is_dragging = false
  let shipsOnBoard: any[] = []
  let offsetLeft: number, offsetTop: number
  let titles: any[][] = []
  let first = true
  let context: CanvasRenderingContext2D | null
  useEffect(()=>{
    if(canvas.current){
      canvasContexReference.current = canvas.current.getContext('2d')
      context = canvasContexReference.current
      offsetLeft = canvas.current.offsetLeft
      offsetTop = canvas.current.offsetTop
      titles = []
      for( let i=0; i<boardSize; i++ ) {
        titles.push( [] );
      }
      // console.log(titles);
      // console.log(first);
      
      drawGrid()
      
    }
    
  }, [])
  let drawGrid = ()=>{
    for(let x = 0; x<boardSize; x++){
      for(let y = 0; y<boardSize;y++){
        context!.strokeStyle = "black"
        context!.lineWidth = 4
        // let path = new Path2D()
        // path.rect(x*titleSize, y*titleSize, titleSize, titleSize)
        // squers.push(path)
        if(first){
          titles[x].push({width: titleSize, height: titleSize, busy: false, ship: false})
          
        }
        
        context!.strokeRect(x*titleSize, y*titleSize, titleSize, titleSize)
        // context!.fillRect(50, 50, 100, 100)
      }
    }
    first = false
  }

  let canvasClicked = (e: React.MouseEvent<HTMLElement>) =>{
    
    for(let x = 0; x<titles.length; x++){
      for(let y = 0; y<titles[x].length; y++){
        let mouseX = e.clientX - offsetLeft
        let mouseY = e.clientY - offsetTop
        let path = new Path2D()
        path.rect(x*titleSize, y*titleSize, titleSize, titleSize)

        // console.log("for działa");
        
        if(context?.isPointInPath(path, mouseX, mouseY)){
          console.log("button on"+ x +" "+ y+ " clicked");
          console.log("busy" , titles[x][y].busy);
          console.log("ship", titles[x][y].ship);
          
          
          break
        }
      }
      
      
      
    }
  }

  let mouse_down = (e: React.MouseEvent<HTMLElement>) =>{
    e.preventDefault();
    startX = Math.floor( e.clientX) - offsetLeft
    startY = Math.floor(e.clientY) - offsetTop
    for(let x = 0; x<shipsOnBoard.length; x++){
      
      let path = new Path2D()
      path.rect(shipsOnBoard[x].x*titleSize, shipsOnBoard[x].y*titleSize, shipsOnBoard[x].width*titleSize, shipsOnBoard[x].height*titleSize)
      if(context?.isPointInPath(path, startX, startY)){
        currentShipIndex = x
        is_dragging = true
        return
      }
    }
  }

  let mouse_up = (e: React.MouseEvent<HTMLElement>)=>{
    
    if (!is_dragging) {
      return;
    }
    e.preventDefault()
    is_dragging = false
  }

  let mouse_out = (e: React.MouseEvent<HTMLElement>)=>{
    
    if (!is_dragging) {
      return;
    }
    e.preventDefault()
    is_dragging = false
  }

  let mouse_move = (e: React.MouseEvent<HTMLElement>) =>{
    if(!is_dragging){
      return;
    }
    e.preventDefault()
    let mouseX = Math.floor( e.clientX)- offsetLeft
    let mouseY = Math.floor(e.clientY) - offsetTop

    let moveX = mouseX - startX
    let moveY = mouseY - startY

    let currentShip = shipsOnBoard[currentShipIndex]
    context!.clearRect(currentShip.x*titleSize, currentShip.y*titleSize, currentShip.width*titleSize, currentShip.height*titleSize)
    // console.log(currentShip);
    
    currentShip.x = ((currentShip.x*titleSize) + moveX)/titleSize
    currentShip.y = ((currentShip.y*titleSize) + moveY)/titleSize
    // console.log(currentShip);
    
    
    draw_shapes(currentShip);
    drawGrid()

    startX = mouseX
    startY = mouseY
  }

  let draw_shapes = (ship: { x: number; y: number; width: number; height: number; })=>{
    // let currentShip = shipsOnBoard[currentShipIndex]
   
    context!.fillRect(ship.x*titleSize, ship.y*titleSize, ship.width*titleSize, ship.height*titleSize)
  }

  let generateShips = (warShip: any)=>{
    let checkInTitle = (path: Path2D)=>{
      for(let x = 0; x<titles.length; x++){
        for(let y = 0; y<titles[x].length; y++){
          if(context?.isPointInPath(path, (x*titleSize)+(titleSize/2), (y*titleSize)+ (titleSize/2))){
            titles[x][y].busy = true
          }
        }
      }
    }
    warShip.forEach((element: any) => {
      if(element.orientation === Orientations.VERTICAL){
        context!.fillRect(element.x*titleSize, element.y*titleSize, titleSize, titleSize*element.length)
        let path = new Path2D()
        path.rect((element.x*titleSize) - titleSize, (element.y*titleSize) - titleSize, titleSize*3, ((titleSize*element.length)+(titleSize*2)))
        checkInTitle(path)
        for(let y = element.y; y<element.length + element.y; y++){
          // titles[element.x][y].ship = true
          // titles[element.x][y].busy = true
        }
        shipsOnBoard.push({x: element.x, y: element.y, width: 1, height: element.length})
      }
      if(element.orientation === Orientations.HORIZONTAL){
        context!.fillRect(element.x*titleSize, element.y*titleSize, titleSize*element.length, titleSize)
        let path = new Path2D()
        path.rect((element.x*titleSize) - titleSize, (element.y*titleSize) - titleSize, ((titleSize*element.length)+(titleSize*2)), titleSize*3)
        // context!.fillRect((element.x*titleSize) - titleSize, (element.y*titleSize) - titleSize, ((titleSize*element.length)+(titleSize*2)), titleSize*3)
        
        checkInTitle(path)
        for(let x = element.x; x<element.length + element.x; x++){
          // titles[x][element.y].ship = true
          // titles[x][element.y].busy = true
        }
        shipsOnBoard.push({x: element.x, y: element.y, width: element.length, height: 1})
      }
      
    });

    
  }
  
  let drawSingleShip = () =>{
    generateShips(warShips)
  }



  return (
    <div className="boardComponent">
      <h1>to jest board</h1>
      <button>Draw Board</button>
      <button onClick={drawSingleShip}>Draw Ship</button>
      <canvas ref={canvas} onMouseDown={mouse_down} onClick={canvasClicked} onMouseUp={mouse_up} onMouseOut={mouse_out} onMouseMove={mouse_move} className="board" height={"401px"} width={"401px"}></canvas>
    </div>
  );
}

export default Board;
