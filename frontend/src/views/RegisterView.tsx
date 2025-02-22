import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import '../styles/auth.css';

const LoginView = () => {

    const auth = useContext(AuthContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Register</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        auth?.register(username, password);
                    }}
                >
                    <div>
                        <h2>Username</h2>
                        <input
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            value={username}
                        />
                    </div>
                    <div>
                        <h2>Password</h2>
                        <input
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
