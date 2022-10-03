
import { MutableRefObject, useEffect, useRef } from 'react';
import './Board.css';

function Board() {
  
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const canvasContexReference = useRef<CanvasRenderingContext2D | null>(null)
  const sizeOfTitle = 40
  const sizeOfBoard: Number = 10
  const warShips = [{x: 5, y:5, length: 3, orientation: "HORIZONTAL"}]
  let offsetLeft: number, offsetTop: number
  let squers: any[] = []
  let context: CanvasRenderingContext2D | null
  useEffect(()=>{
    if(canvas.current){
      canvasContexReference.current = canvas.current.getContext('2d')
      context = canvasContexReference.current
      offsetLeft = canvas.current.offsetLeft
      offsetTop = canvas.current.offsetTop
      squers = []
      for(let x = 0; x<sizeOfBoard; x++){
        for(let y = 0; y<sizeOfBoard;y++){
          context!.strokeStyle = "black"
          context!.lineWidth = 4
          let path = new Path2D()
          path.rect(x*sizeOfTitle, y*sizeOfTitle, sizeOfTitle, sizeOfTitle)
          squers.push(path)
          context!.strokeRect(x*sizeOfTitle, y*sizeOfTitle, sizeOfTitle, sizeOfTitle)
          // context!.fillRect(50, 50, 100, 100)
        }
      }
      
    }
    
  }, [])
  let canvasClicked = (e: React.MouseEvent<HTMLElement>) =>{
    let button;
    
    for(let a = 0; a<squers.length; a++){
      button = squers[a]
      let x = e.clientX - offsetLeft
      let y = e.clientY - offsetTop
      if(context?.isPointInPath(button, x, y)){
        console.log("button "+ (a+1)+ " clicked");
        generateShips(warShips)
      }
    }
  }

  let generateShips = (warShip: any)=>{
    
    warShip.forEach((element: any) => {
      if(element.orientation === "VERTICAL"){
        context!.fillRect(element.x*sizeOfTitle, element.y*sizeOfTitle, sizeOfTitle, sizeOfTitle*element.length)
      }
      if(element.orientation === "HORIZONTAL"){
        context!.fillRect(element.x*sizeOfTitle, element.y*sizeOfTitle, sizeOfTitle*element.length, sizeOfTitle)
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