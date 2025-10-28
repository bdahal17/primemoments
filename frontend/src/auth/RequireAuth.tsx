import React from "react";
import type {JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    const isBootstrapping = useSelector((state: any) => state.user.isBootstrapping);
    const location = useLocation();

    console.log("RequireAuth: isAuthenticated =", isAuthenticated);
    console.log("RequireAuth: isBootstrapping =", isBootstrapping);

    // Wait for bootstrap to complete
    if (isBootstrapping) {
        return <div>Loading...</div>;
    }

    // After bootstrap, check authentication
    if (!isAuthenticated) {
        console.log("RequireAuth: Redirecting to login from", location);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    console.log("RequireAuth: Authorized, rendering children");
    return children;
};

export default RequireAuth;
