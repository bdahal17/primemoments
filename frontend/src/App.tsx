import React, {useEffect, useState} from "react";
import EventPlanningApp from "./EventPlanningApp";
import Login from "./components/Account/Login.tsx";
import { Route, Routes, useLocation} from "react-router-dom";
import Account from "./components/Account/Account.tsx";
import RequireAuth from "./auth/RequireAuth.tsx";
import {useDispatch} from "react-redux";
import {login, logout, RolePermission} from "./store/userSlice.ts";
import {fetchUser} from "./service/userService.ts";
import NavBar from "./components/NavBar/NavBar.tsx";
import AdminDashboard from "./components/Admin/AdminDashboard.tsx";
import Unauthorized from "./components/shared/Unauthorized.tsx";
import {useAppSelector} from "./store/hooks.ts";
import {isTokenExpired} from "./service/JWTService.ts";

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        console.log("App useEffect - location changed:", location.pathname);
        const token = localStorage.getItem("jwt");
        if (!token || token && isTokenExpired(token)) {
            dispatch(logout());
            localStorage.removeItem("jwt");
            return;
        }
        (async () => {
            try {
                const user = await fetchUser(token);
                dispatch(login(user));
            } catch (err) {
                localStorage.removeItem("jwt");
                dispatch(logout());
            }
        })();
    }, [isAuthenticated, dispatch, location.pathname]);

  return (<>
        <NavBar
            scrolled={scrolled}
            setShowContactModal={setShowContactModal}
            setShowGalleryModal={setShowGalleryModal}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
        />
        <Routes>
            <Route path="/" element={
                <EventPlanningApp
                    setShowContactModal={setShowContactModal}
                    setShowGalleryModal={setShowGalleryModal}
                    setIsMenuOpen={setIsMenuOpen}
                    setScrolled={setScrolled}
                    scrolled={scrolled}
                    isMenuOpen={isMenuOpen}
                    showGalleryModal={showGalleryModal}
                    showContactModal={showContactModal}
                />
            }/>
            <Route path="/login" element={<Login/>} />
            <Route path="/account" element={
                <RequireAuth requiredRole={RolePermission.USER}>
                    <Account />
                </RequireAuth>
            } />
            <Route path="/admin" element={
                <RequireAuth requiredRole={RolePermission.ADMIN}>
                    <AdminDashboard />
                </RequireAuth>
            } />
            <Route path="/unauthorized" element={<Unauthorized />} />
         </Routes>
      </>
  );
}

export default App;
