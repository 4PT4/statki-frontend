const Table = () => {
    const data = [{
        "id": "2d783c4f-a32c-4686-9873-cb137e9934f0",
        "username": "Ardella.Schuster23",
        "wins": 25,
        "loses": 13,
        "winStreak": 23,
        "lastSeen": 1663604593464
    },
    {
        "id": "2063362c-b00f-4df2-b2d7-87d9b06f9d93",
        "username": "Juvenal33",
        "wins": 35,
        "loses": 32,
        "winStreak": 27,
        "lastSeen": 1663082345928
    },
    {
        "id": "d7c87522-673c-4fec-9bc2-30b2f3cc0631",
        "username": "Autumn_Terry",
        "wins": 14,
        "loses": 26,
        "winStreak": 13,
        "lastSeen": 1662788102407
    },
    {
        "id": "1bf39981-9d69-4211-a904-fc62d37bb329",
        "username": "Winona_Okuneva50",
        "wins": 45,
        "loses": 15,
        "winStreak": 31,
        "lastSeen": 1663722944529
    },
    {
        "id": "d8213fa0-51b5-4b6a-80ef-117d0c941147",
        "username": "Arvid_Abbott63",
        "wins": 25,
        "loses": 42,
        "winStreak": 20,
        "lastSeen": 1663004748921
    }];

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
                {data.map(player => {
                    return (<tr>
                        <td>{player.username}</td>
                        <td>{player.wins}</td>
                        <td>{player.loses}</td>
                        <td>{player.winStreak}</td>
                        <td>{player.lastSeen}</td>
                    </tr>)
                })}
            </tbody>

        </table>
    </>;
};
export default Table;