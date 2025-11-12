import React from "react";
import type {JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {logout, RolePermission} from "../store/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {isTokenExpired} from "../service/JWTService.ts";

interface RequireAuthProps {
    children: JSX.Element;
    requiredRole: RolePermission;
    fallbackRoute?: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, requiredRole }: RequireAuthProps) => {
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const isBootstrapping = useAppSelector((state) => state.user.isBootstrapping);
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const jwtToken = localStorage.getItem("jwt");

    console.log("RequireAuth - isAuthenticated:", isAuthenticated, "userRole:", userInfo?.role, "isBootstrapping:", isBootstrapping);

    if(!jwtToken || jwtToken && isTokenExpired(jwtToken)) {
        dispatch(logout());
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (isBootstrapping) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        dispatch(logout());
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && userInfo?.role !== requiredRole) {
        console.log("RequireAuth - Insufficient role. Redirecting based on user role:", userInfo?.role);
        switch (userInfo.role) {
            case RolePermission.ADMIN:
                return <Navigate to="/admin" state={{ from: location }} replace />;
            case RolePermission.USER:
                return <Navigate to="/account" state={{ from: location }} replace />;
            default:
                return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }

    return children;
};

export default RequireAuth;
