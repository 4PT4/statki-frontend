import { useEffect, useState } from "react";
import moment from 'moment';
import Player from "../entities/Player";

const Table = (props: { isFiltered: boolean }) => {
    const [players, setPlayers] = useState<Player[]>([]);

    const fetchPlayers = async () => {
        const url = new URL("http://localhost:8000/players");
        if (props.isFiltered) {
            const previousDay = moment().subtract(1, 'days').toDate().getTime();
            url.searchParams.append('seen_after', previousDay.toString());
        }

        const res = await fetch(url, { method: 'GET' });
        const data = await res.json();
        setPlayers(data);
    }

    useEffect(() => {
        fetchPlayers();
    }, [props.isFiltered]);

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
                {players.map(player => (
                    <tr>
                        <td>{player.nickname}</td>
                        <td>{player.wins}</td>
                        <td>{player.loses}</td>
                        <td>{player.winStreak}</td>
                        <td>{(moment(player.lastSeen)).startOf('day').fromNow()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default Table;