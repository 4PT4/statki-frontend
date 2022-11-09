import Board from '../components/Board';
import './Game.css';

const Game = () => {
    return (
        <div className="game">
            <h1>Warships game</h1>
            <h3>Let the battle begin!</h3>
            <div>
                <Board />
                <button>Start game</button>
                <Board />
            </div>
        </div>
    );
};

export default Game;