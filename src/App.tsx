import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Game />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;