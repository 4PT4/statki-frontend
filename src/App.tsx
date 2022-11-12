import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';


function App() {
  const [error, setError] = useState<string>("");

  return (
    <Router>
      <Routes>
        <Route index element={<Game />} />
        <Route path='login' element={<Home error={error} onError={setError} />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;