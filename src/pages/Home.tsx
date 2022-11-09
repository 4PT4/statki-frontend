import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faSignIn } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
        const [login, setLogin] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");

        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const credentials = { login, password }
                try {

                        await fetch("https://localhost:5000/auth/login", {
                                method: "post",
                                body: JSON.stringify(credentials)
                        })

                } catch (error) {
                        setError('Server Error.')
                }



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
                        <div className='formFooter'>
                                <span className='errorMessage'>{error}</span>
                                <Link to="/leaderboard">
                                        <FontAwesomeIcon icon={faTrophy} /> Leaderboard
                                </Link>
                        </div>

                </form>
        );
};

export default Home;