
// import { useEffect, useRef } from 'react';
import './Board.css';

function Board() {
  // const canvas = useRef()
  // useEffect(()=>{
  //   console.log(canvas.current);
  // }, [])
  // const canvas = document.querySelector("canvas")
  // const context = canvas.getContext("2d")
  let shipsLocation = Array(10).fill().map(() => Array(10).fill(0));
  let cmd = {
    bw: 401, //box width 
    bh: 401, //box hieght
    cs: 40, //cell size
    p: 0, // padding
    canvas: null,
    context: null,
    drawBoard: () => {
        cmd.canvas = document.querySelector("canvas")
        cmd.context = cmd.canvas.getContext("2d")
        for (let x = 0; x <= cmd.bw; x += cmd.cs) {
            cmd.context.moveTo(0.5 + x + cmd.p, cmd.p);
            cmd.context.lineTo(0.5 + x + cmd.p, cmd.bh + cmd.p);
        }

        for (let x = 0; x <= cmd.bh; x += cmd.cs) {
            cmd.context.moveTo(cmd.p, 0.5 + x + cmd.p);
            cmd.context.lineTo(cmd.bw + cmd.p, 0.5 + x + cmd.p);
        }
        cmd.context.strokeStyle = "black";
        cmd.context.stroke();
        // cmd.drawSingleShip()
        // cmd.drawRandowShips()
    },
    drawRandowShips: ()=>{
      for (let index = 0; index < 5; index++) {
        cmd.drawSingleShip()
        
      }
      for (let index = 0; index < 4; index++) {
        cmd.drawDoubleShip()
        
      }
    },
    drawSingleShip: ()=>{
      // let height_start = cmd.generateNumber(0, 10)
      // let width_start = cmd.generateNumber(0, 10)
      // let height_end = 40
      // let width_end = 40
      // let its_busy = false
      // if (height_start >= 400 && width_start >= 400) {
      //   cmd.drawSingleShip()
      //   return
      // }
      // shipsLocation.forEach((ship)=>{
      //   console.log(ship.x, ship.y);
      //   console.log(width_start, height_start);
      //   console.log(ship.x -40, ship.y - 40);
      //   if((width_start >= (ship.x - 40) && width_start <= (ship.x + 80)) && (height_start >= (ship.y - 40) && height_start <= (ship.y + 80)) ){
      //     its_busy = true
      //   }
      //   // if((width_start >= (ship.x - 40) && width_start <= (ship.x + 80))){
      //   //   console.log(width_start + "zawiera się pomiędzy" + (ship.x - 40) + "a "+ (ship.x + 80));

      //   // }
      //   // if((height_start >= (ship.y - 40) && height_start <= (ship.y + 80))){
      //   //   console.log(height_start + "zawiera się pomiędzy" + (ship.y - 40) + "a "+ (ship.y + 80));
      //   // }
      // })
      // if(its_busy){
      //   cmd.drawSingleShip()
      //   return
      // }
      // cmd.context.fillRect(width_start, height_start, width_end, height_end)
      // shipsLocation.push({x: width_start, y: height_start})
      // // console.log(shipsLocation);
      // // console.log(height_start, width_start);
      // // console.log(height_end, width_end);
      let shipInArrayLocationX = cmd.generateNumber(0, 9)
      let shipInArrayLocationY = cmd.generateNumber(0, 9)
      console.log(shipInArrayLocationX, shipInArrayLocationY);
      shipsLocation[shipInArrayLocationX][shipInArrayLocationY] = 1
      console.log(shipsLocation);

    },
    drawDoubleShip: () =>{
      let height_start = cmd.generateNumber(0, 10)
      let width_start = cmd.generateNumber(0, 10)
      let height_end = 40
      let width_end = 80
      let its_busy = false
      if (height_start >= 400 && width_start >= 400) {
        cmd.drawDoubleShip()
        return
      }
      shipsLocation.forEach((ship)=>{
        console.log(ship.x, ship.y);
        console.log(width_start, height_start);
        console.log(ship.x -40, ship.y - 40);
        if(((width_start >= (ship.x - 40) && width_start <= (ship.x + 120)) && (height_start >= (ship.y - 40) && height_start <= (ship.y + 80))) || (((width_start+width_end) >= (ship.x - 40) && (width_start+width_end) <= (ship.x + 120)) && ((height_start+height_end) >= (ship.y - 40) && (height_start+height_end) <= (ship.y + 80)))){
          its_busy = true
        }
        // if((width_start >= (ship.x - 40) && width_start <= (ship.x + 80))){
        //   console.log(width_start + "zawiera się pomiędzy" + (ship.x - 40) + "a "+ (ship.x + 80));

        // }
        // if((height_start >= (ship.y - 40) && height_start <= (ship.y + 80))){
        //   console.log(height_start + "zawiera się pomiędzy" + (ship.y - 40) + "a "+ (ship.y + 80));
        // }
      })
      if(its_busy){
        cmd.drawDoubleShip()
        return
      }
      cmd.context.fillRect(width_start, height_start, width_end, height_end)
      shipsLocation.push({x: width_start, y: height_start})
    },
    generateNumber: (min, max)=>{
      return (Math.floor(Math.random() * (max - min + 1))+ min);
    }

  }
  // window.addEventListener('load', ()=>{
  //   console.log("załadowano");
  //   cmd.drawBoard()
  // })
  return (
    <div className="boardComponent">
      <h1>to jest board</h1>
      <button onClick={cmd.drawBoard}>Draw Board</button>
      <button onClick={cmd.drawSingleShip}>Draw Ship</button>
      <canvas className="board" height={"401px"} width={"401px"}></canvas>
    </div>
  );
}

export default Board;
