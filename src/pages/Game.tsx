import { useState } from 'react';
import Board from '../components/Board';
import Table from '../components/Table';
import './Game.css';
const Game = () => {
    return (
        <>
        <h1>Statki</h1>
        <div className='names'>
           <p>Plansza 1</p> 
           <p>Plansza 2</p>
        </div>
        <div className="boards">
            
            <Board></Board>
            <Board></Board>
        </div>
        <div>
            <button className="btn">Start Game</button>
        </div>
        <footer>
            <p>gra statki 4PT4</p>
        </footer>
        </>)
};

export default Game;