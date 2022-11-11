import AllyBoard from '../components/AllyBoard';
import EnemyBoard from '../components/EnemyBoard';
import './Game.css';

const Game = () => {
    return (
        <div className="game">
            <h1>Warships game</h1>
            <h3>Let the battle begin!</h3>
            <div>
                <AllyBoard />
                <button>Ready</button>
                <EnemyBoard />
            </div>
        </div>
    );
};

export default Game;