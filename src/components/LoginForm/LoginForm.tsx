import { useState } from 'react';

function LoginForm() {
    const [Login, setLogin] = useState("")
    const [Password, setPassword] = useState("")

    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert(`Witaj z powrotem ${Login}!`)
        console.log({Login,Password})
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Logowanie</h3>
                    <div className="form-group mt-3">
                        <label>Login:</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            value={Login}
                            placeholder="wprowadz login"
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Hasło:</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            value={Password}
                            placeholder="wprowadz hasło"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Zaloguj
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginForm;