
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
  let offsetLeft: number, offsetTop: number
  let titles: any[][] = []
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
      console.log(titles);
      
      for(let x = 0; x<boardSize; x++){
        for(let y = 0; y<boardSize;y++){
          context!.strokeStyle = "black"
          context!.lineWidth = 4
          // let path = new Path2D()
          // path.rect(x*titleSize, y*titleSize, titleSize, titleSize)
          // squers.push(path)
          titles[x].push({width: titleSize, height: titleSize, busy: false, ship: false})
          context!.strokeRect(x*titleSize, y*titleSize, titleSize, titleSize)
          // context!.fillRect(50, 50, 100, 100)
        }
      }
      
    }
    
  }, [])
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
          
          generateShips(warShips)
          break
        }
      }
      
      
      
    }
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
          titles[element.x][y].ship = true
          // titles[element.x][y].busy = true
        }
      }
      if(element.orientation === Orientations.HORIZONTAL){
        context!.fillRect(element.x*titleSize, element.y*titleSize, titleSize*element.length, titleSize)
        let path = new Path2D()
        path.rect((element.x*titleSize) - titleSize, (element.y*titleSize) - titleSize, ((titleSize*element.length)+(titleSize*2)), titleSize*3)
        // context!.fillRect((element.x*titleSize) - titleSize, (element.y*titleSize) - titleSize, ((titleSize*element.length)+(titleSize*2)), titleSize*3)
        
        checkInTitle(path)
        for(let x = element.x; x<element.length + element.x; x++){
          titles[x][element.y].ship = true
          // titles[x][element.y].busy = true
        }
      }
      
    });

    
  }
  




  return (
    <div className="boardComponent">
      <h1>to jest board</h1>
      <button>Draw Board</button>
      <button>Draw Ship</button>
      <canvas ref={canvas} onClick={canvasClicked} className="board" height={"401px"} width={"401px"}></canvas>
    </div>
  );
}

export default Board;
