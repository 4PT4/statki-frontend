import moment from 'moment';
import Player from "../entities/Player";
import './PlayerTable.css';

const PlayerTable = (props: { players: Player[] }) => {
    const timestampToRelative = (timestamp: number) => {
        return moment.unix(timestamp).fromNow();
    };

    const calculateWinRate = ({wins, loses}: Player)=>{
        if (wins === 0 && loses === 0){
            return 0;

        }
        return (wins/(wins + loses))*100;
        
        
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Loses</th>
                    <th>Win Rate</th>
                    <th>Last seen</th>
                </tr>
            </thead>
            <tbody>
                {props.players.map(player => (
                    <tr key={player.id}>
                        <td>{player.nickname}</td>
                        <td>{player.wins}</td>
                        <td>{player.loses}</td>
                        <th>{calculateWinRate(player)}%</th>
                        <td>{timestampToRelative(player.lastSeen)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default PlayerTable;