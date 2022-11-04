import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import Leaderboard from './pages/Leaderboard';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/" element={<Home/>}/>    
      </Routes>
    </Router>



  );
}

export default App;