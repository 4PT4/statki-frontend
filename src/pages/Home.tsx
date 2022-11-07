import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
// import leaderboardlogo from './leaderboard.png';
import leaderboardIcon from '../images/leaderboard-icon.png'




const Home = () => {
        const [login, setLogin] = useState("")
        const [password, setPassword] = useState("")

        const handleSubmit = (event: any) => {
                event.preventDefault();

                fetch("https://localhost:5000/auth/login", { method: "post", body: JSON.stringify({ login, password }) })
                //jesli sie udalo przejdz do strony gry, jesli nie "nie udalo sie zalogowac"
                console.log({ login, password })
        }
        return (
                <>
                        <form onSubmit={handleSubmit}>

                                <input
                                        type="text"
                                        value={login}
                                        placeholder="Login"
                                        onChange={(e) => setLogin(e.target.value)}
                                />
                                <input
                                        type="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit">
                                        Login
                                </button>

                                <Link to="/leaderboard">
                                        <img src={leaderboardIcon} alt="fireSpot" />
                                        Leaderboard
                                </Link>

                        </form>

                </>)
};

export default Home;