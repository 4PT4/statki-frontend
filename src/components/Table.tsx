import { useEffect, useState } from "react";
import moment from 'moment';


interface Player {
    id: string
    username: string
    wins: number
    loses: number
    winStreak: number
    lastSeen: number
}

const Table = (props: any) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const getPlayersAPI = async () => {


        fetch(`http://localhost:4000/players?lastSeen_gte=${props.lastSeen}`, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
            .then(data => {
                setPlayers(data);
            }).catch(error => {
                console.error(error);

            });

    }

    useEffect(() => {
        getPlayersAPI();
    });


    return <>
        <table>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        WinS
                    </th>
                    <th>
                        Loses
                    </th>
                    <th>
                        Win Streak
                    </th>
                    <th>
                        Last Seen
                    </th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => {
                    return (<tr>
                        <td>{player.username}</td>
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