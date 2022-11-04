import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import './Home.css';

const Home = () => {
    return (
        <>
<LoginForm/>
<Link to={"/leaderboard"}>
        Leaderboard
</Link>
        </>)
};

export default Home;