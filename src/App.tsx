import moment from 'moment';
import React, { useState } from 'react';
import './App.css';
import Select from './components/Select';
import Table from './components/Table';

function App() {
  const [lastSeen, setLastSeen] = useState(moment().subtract(1, 'days').toDate().getTime())

  return (
    <div className="App">
      <Select setLastSeen = {setLastSeen}></Select>
      <Table lastSeen = {lastSeen}></Table>
    </div>
    
  );
}


export default App;
