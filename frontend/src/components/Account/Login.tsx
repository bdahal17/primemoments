import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {userLogin} from "../../service/userService.ts";
import {login} from "../../store/userSlice.ts";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/"); // redirect if already logged in
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const user = await userLogin({ username, password }); // call backend
            dispatch(login(user)); // update Redux
            navigate("/"); // redirect to home
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Login failed");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", color: 'black' }}>
            {isAuthenticated ? (<h2>Login</h2>) : <h2>Register</h2>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            { isAuthenticated ? (<form onSubmit={handleLogin}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px" }}>
                    Login
                </button>
            </form>) : (
                <form onSubmit={handleLogin}>
                    <div style={{marginBottom: "10px"}}>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{width: "100%", padding: "8px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{width: "100%", padding: "8px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label>Re-enter Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{width: "100%", padding: "8px"}}
                        />
                    </div>
                    <button type="submit" style={{padding: "10px 20px", color: 'white'}}>
                        Register
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;
