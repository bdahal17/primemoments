import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {replace, useLocation, useNavigate} from "react-router-dom";
import {userLogin, userRegister} from "../../service/userService.ts";
import {login} from "../../store/userSlice.ts";
import {handleJwt} from "../../service/JWTService.ts";

interface UserState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const location = useLocation();

    const [formUser, setFormUser] = useState<UserState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loginPage, setLoginPage] = useState(false);

    useEffect(() => {
        console.log("Login: isAuthenticated =", isAuthenticated);
        if (isAuthenticated) {
            navigate("/"); // redirect if already logged in
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const user = await userLogin({ email: formUser.email, password: formUser.password}); // call backend
            await handleJwt(user);
            dispatch(login(user)); // update Redux
            // go back to where user wanted to go, default to /account
            const from = location.state?.from?.pathname || "/account";
            navigate(from, { replace: true });
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Login failed");
        }
        finally {
           setFormUser(() => {
                return {
                     firstName: "",
                     lastName: "",
                     email: "",
                     password: "",
                };
           })
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const user = await userRegister({
                    email: formUser.email,
                    password: formUser.password,
                    firstName: formUser.firstName,
                    lastName: formUser.lastName,
                });
            console.log("user registered:", user);
            await handleJwt(user);
            dispatch(login(user));
            navigate("/account");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Login failed");
        }
        finally {
            setFormUser(() => {
                return {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                };
            })
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", color: 'black' }}>

            {!loginPage ? (<h2>Login</h2>) : <h2>Register</h2>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loginPage ? (
                <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "10px" }}>
                    <label>email:</label>
                    <input
                        type="email"
                        value={formUser.email}
                        onChange={(e) => {
                            setFormUser(prev => ({ ...prev, email: e.target.value }));
                        }}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={formUser.password}
                        onChange={(e) => {
                            setFormUser(prev => ({ ...prev, password: e.target.value }));
                        }}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px", color: 'white' }}>
                    Login
                </button>
                    <p
                        onClick={() => setLoginPage(true)}
                        style={{cursor: "pointer", color: "blue"}}
                    >
                        Register
                    </p>
                    {isLoading && <p>Loading...</p>}
            </form>) : (
                <form onSubmit={handleRegister}>
                    <div style={{marginBottom: "10px"}}>
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={formUser.firstName}
                            onChange={(e) => {
                                setFormUser(prev => ({ ...prev, firstName: e.target.value }));
                            }}
                            required
                            style={{width: "100%", padding: "8px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={formUser.lastName}
                            onChange={(e) => {
                                setFormUser(prev => ({ ...prev, lastName: e.target.value }));
                            }}
                            required
                            style={{width: "100%", padding: "8px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label>Email:</label>
                        <input
                            type="text"
                            value={formUser.email}
                            onChange={(e) => {
                                setFormUser(prev => ({ ...prev, email: e.target.value }));
                            }}
                            required
                            style={{width: "100%", padding: "8px"}}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={formUser.password}
                            onChange={(e) => {
                                setFormUser(prev => ({ ...prev, password: e.target.value }));
                            }}
                            required
                            style={{width: "100%", padding: "8px"}}
                        />
                    </div>
                    <button type="submit" style={{padding: "10px 20px", color: 'white'}}>
                        Register
                    </button>
                    <p
                        onClick={() => setLoginPage(false)}
                        style={{cursor: "pointer", color: "blue"}}
                    >
                        Login
                    </p>
                    {isLoading && <p>Loading...</p>}
                </form>
            )}
        </div>
    );
};

export default Login;
