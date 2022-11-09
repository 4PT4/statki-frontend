import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Leaderboard from './pages/Leaderboard';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;