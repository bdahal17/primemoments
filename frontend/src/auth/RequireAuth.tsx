import React from "react";
import type {JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const isBootstrapping = useAppSelector((state) => state.user.isBootstrapping);
    const location = useLocation();
    const dispatch = useAppDispatch();

    const jwtToken = localStorage.getItem("jwt");

    if(!jwtToken) {
        dispatch(logout());
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Wait for bootstrap to complete
    if (isBootstrapping) {
        return <div>Loading...</div>;
    }

    // After bootstrap, check authentication
    if (!isAuthenticated) {
        dispatch(logout());
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
