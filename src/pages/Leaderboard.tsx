import { useState } from 'react';
import Table from '../components/Table';

const Leaderboard = () => {
    const [isFiltered, setIsFiltered] = useState(false);
    return (
        <>
            <input
                id="filter"
                type="checkbox"
                checked={isFiltered}
                onChange={(e) => setIsFiltered(e.target.checked)} />
            <label htmlFor="filter">Last 24h</label>
            <Table lastSeen={isFiltered}></Table>
        </>)
};

export default Leaderboard;