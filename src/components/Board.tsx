import React, { useEffect, useRef } from 'react';
import './Board.css';
import Brush from '../class/Brush';



const Board = (props: any) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    props.drawBoard(context);
  }, [])

  return (
    <canvas ref={canvas}
      {...props}
      height={Brush.BOARD_SIZE}
      width={Brush.BOARD_SIZE}>
    </canvas>
  );
}

export default Board;