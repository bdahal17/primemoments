import React from "react";
import {logout} from "../../store/userSlice.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";

const Account: React.FC = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.user.userInfo);
    const navigate = useNavigate();

    return (
        <div>
            <h1>Hello {user.firstName} {user.lastName}, Welcome to the Account Page</h1>
            <p>Your email: {user.email}</p>
            <p>This is a placeholder for the Account component.</p>
            <button
                onClick={() => {
                    // Implement logout functionality here
                    // clear session jwt
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("authTokenExpiry")
                    // window.location.href = "/";
                    dispatch(logout());
                }}
            >
                logout
            </button>
        </div>
    );
};
export default Account;
