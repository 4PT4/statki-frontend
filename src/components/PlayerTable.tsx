import moment from 'moment';
import Player from "../entities/Player";
import './PlayerTable.css';

const PlayerTable = (props: { players: Player[] }) => {
    const timestampToRelative = (timestamp: number) => {
        return moment.unix(timestamp).fromNow();
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Loses</th>
                    <th>Win streak</th>
                    <th>Last seen</th>
                </tr>
            </thead>
            <tbody>
                {props.players.map(player => (
                    <tr key={player.id}>
                        <td>{player.nickname}</td>
                        <td>{player.wins}</td>
                        <td>{player.loses}</td>
                        <td>{player.winStreak}</td>
                        <td>{timestampToRelative(player.lastSeen)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default PlayerTable;