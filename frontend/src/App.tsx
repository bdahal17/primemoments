import { useEffect } from "react";
import emailjs from "@emailjs/browser";
import EventPlanningApp from "./EventPlanningApp";
import Login from "./components/Account/Login.tsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Account from "./components/Account/Account.tsx";
import RequireAuth from "./auth/RequireAuth.tsx";
import {useDispatch, useSelector} from "react-redux";
import {bootstrapUser, logout} from "./store/userSlice.ts";
import {fetchUser} from "./service/userService.ts";

function App() {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.isAuthenticated)


    useEffect(() => {
        emailjs.init({
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        });
    }, []);

    useEffect(() => {
        // Try to bootstrap auth from sessionStorage
        const token = localStorage.getItem("jwt");
        if (!token) {
            console.log("No token found, skipping bootstrap");
            dispatch(bootstrapUser({ userInfo: null, isAuthenticated: false, isBootstrapping: false }));
            return;
        };

        // Optionally verify token server-side and get user info
        (async () => {
            try {
                const user = await fetchUser(token);
                console.log("Bootstrapping user from token:", user);
                dispatch(bootstrapUser({ userInfo: user, isAuthenticated: true, isBootstrapping: false }));
            } catch (err) {
                console.error("Token invalid, logging out:", err);
                localStorage.removeItem("jwt");
                dispatch(logout());
            }
        })();
    }, []);

  return (
    <BrowserRouter>
         <Routes>
            <Route path="/" element={<EventPlanningApp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/account" element={
                <RequireAuth>
                    <Account />
                </RequireAuth>
            } />
         </Routes>
    </BrowserRouter>
  );
}

export default App;
