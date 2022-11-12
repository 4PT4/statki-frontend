import { useEffect, useState } from 'react';
import PlayerTable from '../components/PlayerTable';
import './Leaderboard.css';
import moment from 'moment';

const Leaderboard = () => {
    const [isFiltered, setIsFiltered] = useState(false);
    const [players, setPlayers] = useState([]);

    const fetchPlayers = async () => {
        const url = new URL("http://localhost:8000/players");
        if (isFiltered) {
            const previousDay = moment().subtract(1, 'days').unix();
            url.searchParams.append('seen_after', previousDay.toString());
        }

        const res = await fetch(url, { method: 'GET' });
        const data = await res.json();
        setPlayers(data);
    };

    useEffect(() => {
        fetchPlayers();
    }, [isFiltered]);

    return (<>
        <input
            id="filter"
            type="checkbox"
            checked={isFiltered}
            onChange={(e) => setIsFiltered(e.target.checked)} />
        <label htmlFor="filter">Last 24h</label>
        <PlayerTable players={players} />
    </>)
};

export default Leaderboard;