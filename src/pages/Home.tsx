import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faSignIn } from '@fortawesome/free-solid-svg-icons';
import Token from '../entities/Token';
import ErrorMessage from '../entities/ErrorMessage';
import GameError from '../entities/GameError';

const Home = (props: { error: string, onError: Function }) => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = "http://localhost:8000/auth/login";
        const credentials = { nickname, password };
        const options = {
            method: "post",
            body: JSON.stringify(credentials),
            headers: new Headers({ "Content-Type": "application/json" })
        }
        try {
            const res = await fetch(url, options);
            const data = await res.json();

            if (res.ok) {
                const { token } = data as Token;
                localStorage.setItem('token', token);
                navigate('/');
            } else {
                const { detail } = data as ErrorMessage;
                throw new GameError(detail);
            }

        } catch (error) {
            props.onError(error instanceof GameError ? error.message : "Network error.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {props.error && <div className='errorMessage'>
                    {props.error}
            </div>}
            <div className='formGroup'>
                <input
                        type="text"
                        value={nickname}
                        placeholder="Nickname"
                        onChange={(e) => setNickname(e.target.value)}
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
            </div>
        </form>
    );
};

export default Home;