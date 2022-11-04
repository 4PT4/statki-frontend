import { useEffect, useState } from "react";
import moment from 'moment';
import Player from "../entities/Player";

const Table = (props:{isFiltered:boolean}) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const getPlayersAPI = async () => {

        let url = "http://localhost:8000/players";
        if (props.isFiltered) {
            let timestamp = moment().subtract(1, 'days').toDate().getTime();
            url += `?seen_after=${timestamp}`;
        }

        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
            .then(data => {
                setPlayers(data);
            }).catch(error => {
                // console.error(error);

            });

    }

    useEffect(() => {
        getPlayersAPI();
    }, [props.isFiltered]);


    return <>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Loses</th>
                    <th>Win streak</th>
                    <th>Last Seen</th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => {
                    return (<tr key={player.id}> 
                        <td>{player.nickname}</td>
                        <td>{player.wins}</td>
                        <td>{player.loses}</td>
                        <td>{player.winStreak}</td>
                        <td>{(moment(player.lastSeen)).startOf('day').fromNow()}</td>
                    </tr>)
                })}
            </tbody>

        </table>
    </>;
};

export default Table;