import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Leaderboard from './pages/Leaderboard';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
      </Routes>
    </Router>
  );
}


export default App;
