import { useState } from 'react';

import './LoginForm.css';

function LoginForm() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event: any) => {
        event.preventDefault();

        fetch("https://localhost:5000/auth/login", { method: "post", body: JSON.stringify({ login, password }) })
        //jesli sie udalo przejdz do strony gry, jesli nie "nie udalo sie zalogowac"
        console.log({ login, password })
    }

    return (
        
        <div className="form sign-in">
            <form className="" onSubmit={handleSubmit}>
                <div className="">
                    
                    
                    <div className="">
                        <label>Login:</label>
                        <input
                            type="text"
                            className="inside"
                            value={login}
                            placeholder="wprowadz login"
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label>Hasło:</label>
                        <input
                            type="password"
                            className="inside"
                            value={password}
                            placeholder="wprowadz hasło"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <button type="submit" className="button">
                            Zaloguj
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginForm;