import React from "react";
import type {JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/userSlice.ts";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    const isBootstrapping = useSelector((state: any) => state.user.isBootstrapping);
    const location = useLocation();
    const dispatch = useDispatch();

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
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
