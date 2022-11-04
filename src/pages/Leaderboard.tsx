import { useState } from 'react';
import Table from '../components/Table';
import './Leaderboard.css';

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
            <Table isFiltered={isFiltered}/>
           
        </>)
};

export default Leaderboard;