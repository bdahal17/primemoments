import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {replace, useLocation, useNavigate} from "react-router-dom";
import {userLogin, userRegister} from "../../service/userService.ts";
import {login} from "../../store/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";

interface UserState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const location = useLocation();
    const user = useAppSelector((state) => state.user.userInfo);
    const [error, setError] = useState("");
    const [loginPage, setLoginPage] = useState(true);

    const [formUser, setFormUser] = useState<UserState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isAuthenticated && user.role === "USER") {
            navigate("/account");
        } else if (isAuthenticated && user.role === "ADMIN") {
            navigate("/admin");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        console.log("Login form submitted");
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const user = await userLogin({ email: formUser.email, password: formUser.password});
            console.log("Login successful:", user);
            dispatch(login(user));
            if(user.role === "USER") {
                navigate("/account");
                return;
            } else if (user.role === "ADMIN") {
                navigate("/admin");
                return;
            }
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
            console.log("Register form submitted");
            const user = await userRegister({
                    email: formUser.email,
                    password: formUser.password,
                    firstName: formUser.firstName,
                    lastName: formUser.lastName,
                });
            dispatch(login(user));
            if(user.role === "USER") {
                navigate("/account");
                return;
            } else if (user.role === "ADMIN") {
                navigate("/admin");
                return;
            }
        } catch (err: any) {
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
                    <label>Email:</label>
                    <input
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
