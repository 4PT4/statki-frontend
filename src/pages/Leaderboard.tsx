import moment from 'moment';
import { useState } from 'react';
import Select from '../components/Select';
import Table from '../components/Table';

const Leaderboard = () => {
    const [lastSeen, setLastSeen] = useState(moment().subtract(1, 'days').toDate().getTime())


    return (
    <div className="App">
        <Select setLastSeen={setLastSeen}></Select>
        <Table lastSeen={lastSeen}></Table>
    </div>)
};

export default Leaderboard;