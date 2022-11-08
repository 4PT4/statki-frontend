import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faSignIn } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
        const [login, setLogin] = useState("")
        const [password, setPassword] = useState("")

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                fetch("https://localhost:5000/auth/login", { method: "post", body: JSON.stringify({ login, password }) })
                //jesli sie udalo przejdz do strony gry, jesli nie "nie udalo sie zalogowac"
                console.log({ login, password })
        };

        return (
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
                                <FontAwesomeIcon icon={faSignIn} /> Sign in
                        </button>
                        <Link to="/leaderboard">
                                <FontAwesomeIcon icon={faTrophy} /> Leaderboard
                        </Link>
                </form>
        );
};

export default Home;